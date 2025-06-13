"""
Partnership API Routes for MDM System
RESTful endpoints for partnership management
"""

from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List, Optional
import logging

from app.models import (
    Partnership, 
    PartnershipCreate, 
    PartnershipUpdate, 
    PartnershipResponse,
    PartnershipListResponse,
    PartnershipFilter,
    User
)
from app.services.bigquery_service import BigQueryService
from app.services.auth_service import (
    get_current_user,
    get_optional_user,
    require_read_permission,
    require_write_permission,
    require_delete_permission,
    require_admin_permission
)

logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

# Initialize BigQuery service
bigquery_service = BigQueryService()

@router.get("/partnerships", response_model=PartnershipListResponse)
async def get_partnerships(
    status: Optional[str] = Query(None, description="Filter by status"),
    region: Optional[str] = Query(None, description="Filter by region"),
    search: Optional[str] = Query(None, description="Search in name or ID"),
    tier: Optional[str] = Query(None, description="Filter by tier"),
    source_type: Optional[str] = Query(None, description="Filter by source type"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(100, ge=1, le=1000, description="Items per page"),
    user: User = Depends(require_read_permission)
):
    """
    Get partnerships with optional filtering and pagination
    
    Requires: partnerships:read permission
    """
    try:
        # Create filter object
        filters = PartnershipFilter(
            status=status,
            region=region,
            search=search,
            tier=tier,
            source_type=source_type,
            page=page,
            page_size=page_size
        )
        
        # Get partnerships from BigQuery
        partnerships = await bigquery_service.get_partnerships(filters)
        
        # Get total count for pagination (simplified - you might want to optimize this)
        all_partnerships = await bigquery_service.get_partnerships()
        total = len(all_partnerships)
        
        logger.info(f"Retrieved {len(partnerships)} partnerships for user {user.email}")
        
        return PartnershipListResponse(
            success=True,
            message=f"Retrieved {len(partnerships)} partnerships",
            data=partnerships,
            total=total,
            page=page,
            page_size=page_size
        )
        
    except Exception as e:
        logger.error(f"Error retrieving partnerships: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve partnerships: {str(e)}"
        )

@router.get("/partnerships/{partnership_id}", response_model=PartnershipResponse)
async def get_partnership(
    partnership_id: str,
    user: User = Depends(require_read_permission)
):
    """
    Get a specific partnership by ID
    
    Requires: partnerships:read permission
    """
    try:
        partnership = await bigquery_service.get_partnership_by_id(partnership_id)
        
        if not partnership:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Partnership with ID {partnership_id} not found"
            )
        
        logger.info(f"Retrieved partnership {partnership_id} for user {user.email}")
        
        return PartnershipResponse(
            success=True,
            message=f"Partnership {partnership_id} retrieved successfully",
            data=partnership
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving partnership {partnership_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve partnership: {str(e)}"
        )

@router.post("/partnerships", response_model=PartnershipResponse, status_code=status.HTTP_201_CREATED)
async def create_partnership(
    partnership: PartnershipCreate,
    user: User = Depends(require_write_permission)
):
    """
    Create a new partnership
    
    Requires: partnerships:write permission
    """
    try:
        # Create partnership in BigQuery
        created_partnership = await bigquery_service.create_partnership(partnership, user.uid)
        
        logger.info(f"Created partnership {partnership.id} by user {user.email}")
        
        return PartnershipResponse(
            success=True,
            message=f"Partnership {partnership.id} created successfully",
            data=created_partnership
        )
        
    except ValueError as e:
        # Handle business logic errors (e.g., duplicate ID)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error creating partnership: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create partnership: {str(e)}"
        )

@router.put("/partnerships/{partnership_id}", response_model=PartnershipResponse)
async def update_partnership(
    partnership_id: str,
    updates: PartnershipUpdate,
    user: User = Depends(require_write_permission)
):
    """
    Update an existing partnership
    
    Requires: partnerships:write permission
    """
    try:
        # Update partnership in BigQuery
        updated_partnership = await bigquery_service.update_partnership(
            partnership_id, updates, user.uid
        )
        
        if not updated_partnership:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Partnership with ID {partnership_id} not found"
            )
        
        logger.info(f"Updated partnership {partnership_id} by user {user.email}")
        
        return PartnershipResponse(
            success=True,
            message=f"Partnership {partnership_id} updated successfully",
            data=updated_partnership
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating partnership {partnership_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update partnership: {str(e)}"
        )

@router.delete("/partnerships/{partnership_id}", response_model=PartnershipResponse)
async def delete_partnership(
    partnership_id: str,
    user: User = Depends(require_delete_permission)
):
    """
    Delete a partnership (soft delete - sets status to Inactive)
    
    Requires: partnerships:delete permission
    """
    try:
        # Soft delete partnership in BigQuery
        deleted = await bigquery_service.delete_partnership(partnership_id, user.uid)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Partnership with ID {partnership_id} not found"
            )
        
        logger.info(f"Deleted partnership {partnership_id} by user {user.email}")
        
        return PartnershipResponse(
            success=True,
            message=f"Partnership {partnership_id} deleted successfully",
            data=None
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting partnership {partnership_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete partnership: {str(e)}"
        )

@router.get("/partnerships/stats/summary")
async def get_partnership_stats(
    user: User = Depends(require_read_permission)
):
    """
    Get partnership statistics and summary
    
    Requires: partnerships:read permission
    """
    try:
        stats = await bigquery_service.get_partnership_stats()
        
        logger.info(f"Retrieved partnership stats for user {user.email}")
        
        return {
            "success": True,
            "message": "Partnership statistics retrieved successfully",
            "data": stats
        }
        
    except Exception as e:
        logger.error(f"Error retrieving partnership stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve partnership statistics: {str(e)}"
        )

@router.post("/partnerships/bulk", response_model=dict)
async def bulk_create_partnerships(
    partnerships: List[PartnershipCreate],
    user: User = Depends(require_write_permission)
):
    """
    Create multiple partnerships in bulk
    
    Requires: partnerships:write permission
    """
    try:
        created_partnerships = []
        errors = []
        
        for partnership in partnerships:
            try:
                created = await bigquery_service.create_partnership(partnership, user.uid)
                created_partnerships.append(created)
            except Exception as e:
                errors.append({
                    "partnership_id": partnership.id,
                    "error": str(e)
                })
        
        logger.info(f"Bulk created {len(created_partnerships)} partnerships by user {user.email}")
        
        return {
            "success": True,
            "message": f"Bulk operation completed. Created: {len(created_partnerships)}, Errors: {len(errors)}",
            "data": {
                "created": created_partnerships,
                "errors": errors,
                "summary": {
                    "total_requested": len(partnerships),
                    "successful": len(created_partnerships),
                    "failed": len(errors)
                }
            }
        }
        
    except Exception as e:
        logger.error(f"Error in bulk create partnerships: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to bulk create partnerships: {str(e)}"
        )

@router.get("/partnerships/export/csv")
async def export_partnerships_csv(
    status: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    user: User = Depends(require_read_permission)
):
    """
    Export partnerships to CSV format
    
    Requires: partnerships:read permission
    """
    try:
        from fastapi.responses import StreamingResponse
        import io
        import csv
        
        # Get partnerships with filters
        filters = PartnershipFilter(status=status, region=region)
        partnerships = await bigquery_service.get_partnerships(filters)
        
        # Create CSV content
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        writer.writerow([
            'ID', 'Name', 'Status', 'Region', 'Tier', 'Parent_Partnership',
            'Parent_ID', 'Source_Type', 'Source_Link', 'Point_Contact',
            'Internal_Contact', 'Created_At', 'Updated_At'
        ])
        
        # Write data
        for partnership in partnerships:
            writer.writerow([
                partnership.id,
                partnership.name,
                partnership.status,
                partnership.region,
                partnership.tier,
                partnership.Parent_Partnership,
                partnership.Parent_ID,
                partnership.source_type,
                partnership.source_link,
                partnership.point_contact,
                partnership.Internal_Contact,
                partnership.created_at,
                partnership.updated_at
            ])
        
        output.seek(0)
        
        logger.info(f"Exported {len(partnerships)} partnerships to CSV for user {user.email}")
        
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode('utf-8')),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=partnerships.csv"}
        )
        
    except Exception as e:
        logger.error(f"Error exporting partnerships to CSV: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to export partnerships: {str(e)}"
        ) 