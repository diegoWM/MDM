"""
BigQuery Service for MDM System
Handles all BigQuery operations for Partnership data
"""

from google.cloud import bigquery
from google.cloud.exceptions import NotFound
from typing import List, Optional, Dict, Any
import pandas as pd
from datetime import datetime
import logging
from pathlib import Path

from app.config import settings, BIGQUERY_TABLES, PARTNERSHIP_SCHEMA
from app.models import Partnership, PartnershipCreate, PartnershipUpdate, PartnershipFilter

logger = logging.getLogger(__name__)

class BigQueryService:
    """Service for BigQuery operations"""
    
    def __init__(self):
        """Initialize BigQuery client"""
        try:
            # Initialize BigQuery client with service account
            service_account_path = Path(__file__).parent.parent.parent.parent / "Key" / "weedme-379116-37e1b699dcd2.json"
            
            if service_account_path.exists():
                self.client = bigquery.Client.from_service_account_json(
                    str(service_account_path),
                    project=settings.gcp_project_id
                )
            else:
                # Fallback to default credentials
                self.client = bigquery.Client(project=settings.gcp_project_id)
            
            self.dataset_id = settings.bigquery_dataset
            self.project_id = settings.gcp_project_id
            
            logger.info(f"BigQuery client initialized for project: {self.project_id}")
            
        except Exception as e:
            logger.error(f"Failed to initialize BigQuery client: {str(e)}")
            raise

    async def get_partnerships(self, filters: PartnershipFilter = None) -> List[Partnership]:
        """Get partnerships with optional filtering"""
        try:
            # Build query
            base_query = f"""
                SELECT 
                    id,
                    name,
                    status,
                    region,
                    tier,
                    Parent_Partnership,
                    Parent_ID,
                    source_type,
                    source_link,
                    point_contact,
                    Internal_Contact,
                    created_at,
                    updated_at,
                    created_by,
                    updated_by
                FROM `{self.project_id}.{self.dataset_id}.{settings.partnership_table_id}`
            """
            
            where_conditions = []
            query_params = []
            
            if filters:
                if filters.status:
                    where_conditions.append("status = @status")
                    query_params.append(bigquery.ScalarQueryParameter("status", "STRING", filters.status.value))
                
                if filters.region:
                    where_conditions.append("region LIKE @region")
                    query_params.append(bigquery.ScalarQueryParameter("region", "STRING", f"%{filters.region}%"))
                
                if filters.search:
                    where_conditions.append("(LOWER(name) LIKE @search OR LOWER(id) LIKE @search)")
                    query_params.append(bigquery.ScalarQueryParameter("search", "STRING", f"%{filters.search.lower()}%"))
                
                if filters.tier:
                    where_conditions.append("tier = @tier")
                    query_params.append(bigquery.ScalarQueryParameter("tier", "STRING", filters.tier))
                
                if filters.source_type:
                    where_conditions.append("source_type = @source_type")
                    query_params.append(bigquery.ScalarQueryParameter("source_type", "STRING", filters.source_type.value))
            
            # Add WHERE clause if conditions exist
            if where_conditions:
                base_query += " WHERE " + " AND ".join(where_conditions)
            
            # Add ordering and pagination
            base_query += " ORDER BY name ASC"
            
            if filters and filters.page and filters.page_size:
                offset = (filters.page - 1) * filters.page_size
                base_query += f" LIMIT {filters.page_size} OFFSET {offset}"
            
            # Configure query job
            job_config = bigquery.QueryJobConfig(query_parameters=query_params)
            
            # Execute query
            query_job = self.client.query(base_query, job_config=job_config)
            results = query_job.result()
            
            # Convert to Partnership objects
            partnerships = []
            for row in results:
                partnership_data = dict(row)
                partnerships.append(Partnership(**partnership_data))
            
            logger.info(f"Retrieved {len(partnerships)} partnerships")
            return partnerships
            
        except Exception as e:
            logger.error(f"Error retrieving partnerships: {str(e)}")
            raise

    async def get_partnership_by_id(self, partnership_id: str) -> Optional[Partnership]:
        """Get a specific partnership by ID"""
        try:
            query = f"""
                SELECT 
                    id,
                    name,
                    status,
                    region,
                    tier,
                    Parent_Partnership,
                    Parent_ID,
                    source_type,
                    source_link,
                    point_contact,
                    Internal_Contact,
                    created_at,
                    updated_at,
                    created_by,
                    updated_by
                FROM `{self.project_id}.{self.dataset_id}.{settings.partnership_table_id}`
                WHERE id = @partnership_id
            """
            
            job_config = bigquery.QueryJobConfig(
                query_parameters=[
                    bigquery.ScalarQueryParameter("partnership_id", "STRING", partnership_id)
                ]
            )
            
            query_job = self.client.query(query, job_config=job_config)
            results = query_job.result()
            
            for row in results:
                partnership_data = dict(row)
                return Partnership(**partnership_data)
            
            return None
            
        except Exception as e:
            logger.error(f"Error retrieving partnership {partnership_id}: {str(e)}")
            raise

    async def create_partnership(self, partnership: PartnershipCreate, user_id: str) -> Partnership:
        """Create a new partnership"""
        try:
            # Check if partnership ID already exists
            existing = await self.get_partnership_by_id(partnership.id)
            if existing:
                raise ValueError(f"Partnership with ID {partnership.id} already exists")
            
            # Prepare data for insertion
            now = datetime.utcnow()
            partnership_data = partnership.dict()
            partnership_data.update({
                'created_at': now,
                'updated_at': now,
                'created_by': user_id,
                'updated_by': user_id
            })
            
            # Insert into BigQuery
            table_ref = self.client.dataset(self.dataset_id).table(settings.partnership_table_id)
            table = self.client.get_table(table_ref)
            
            rows_to_insert = [partnership_data]
            errors = self.client.insert_rows_json(table, rows_to_insert)
            
            if errors:
                logger.error(f"BigQuery insert errors: {errors}")
                raise Exception(f"Failed to insert partnership: {errors}")
            
            # Return the created partnership
            created_partnership = Partnership(**partnership_data)
            logger.info(f"Created partnership: {partnership.id}")
            return created_partnership
            
        except Exception as e:
            logger.error(f"Error creating partnership: {str(e)}")
            raise

    async def update_partnership(self, partnership_id: str, updates: PartnershipUpdate, user_id: str) -> Optional[Partnership]:
        """Update an existing partnership"""
        try:
            # Check if partnership exists
            existing = await self.get_partnership_by_id(partnership_id)
            if not existing:
                return None
            
            # Prepare update data
            update_data = {k: v for k, v in updates.dict().items() if v is not None}
            update_data['updated_at'] = datetime.utcnow()
            update_data['updated_by'] = user_id
            
            # Build UPDATE query
            set_clauses = []
            query_params = []
            
            for field, value in update_data.items():
                set_clauses.append(f"{field} = @{field}")
                if isinstance(value, datetime):
                    query_params.append(bigquery.ScalarQueryParameter(field, "TIMESTAMP", value))
                else:
                    query_params.append(bigquery.ScalarQueryParameter(field, "STRING", str(value)))
            
            query_params.append(bigquery.ScalarQueryParameter("partnership_id", "STRING", partnership_id))
            
            update_query = f"""
                UPDATE `{self.project_id}.{self.dataset_id}.{settings.partnership_table_id}`
                SET {', '.join(set_clauses)}
                WHERE id = @partnership_id
            """
            
            job_config = bigquery.QueryJobConfig(query_parameters=query_params)
            query_job = self.client.query(update_query, job_config=job_config)
            query_job.result()  # Wait for completion
            
            # Return updated partnership
            updated_partnership = await self.get_partnership_by_id(partnership_id)
            logger.info(f"Updated partnership: {partnership_id}")
            return updated_partnership
            
        except Exception as e:
            logger.error(f"Error updating partnership {partnership_id}: {str(e)}")
            raise

    async def delete_partnership(self, partnership_id: str, user_id: str) -> bool:
        """Delete a partnership (soft delete by setting status to Inactive)"""
        try:
            # Check if partnership exists
            existing = await self.get_partnership_by_id(partnership_id)
            if not existing:
                return False
            
            # Soft delete by updating status
            update_query = f"""
                UPDATE `{self.project_id}.{self.dataset_id}.{settings.partnership_table_id}`
                SET 
                    status = 'Inactive',
                    updated_at = @updated_at,
                    updated_by = @updated_by
                WHERE id = @partnership_id
            """
            
            job_config = bigquery.QueryJobConfig(
                query_parameters=[
                    bigquery.ScalarQueryParameter("partnership_id", "STRING", partnership_id),
                    bigquery.ScalarQueryParameter("updated_at", "TIMESTAMP", datetime.utcnow()),
                    bigquery.ScalarQueryParameter("updated_by", "STRING", user_id)
                ]
            )
            
            query_job = self.client.query(update_query, job_config=job_config)
            query_job.result()
            
            logger.info(f"Soft deleted partnership: {partnership_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error deleting partnership {partnership_id}: {str(e)}")
            raise

    async def get_partnership_stats(self) -> Dict[str, Any]:
        """Get partnership statistics"""
        try:
            stats_query = f"""
                SELECT 
                    COUNT(*) as total_partnerships,
                    COUNTIF(status = 'Active') as active_partnerships,
                    COUNTIF(status = 'Inactive') as inactive_partnerships,
                    COUNT(DISTINCT region) as unique_regions,
                    COUNT(DISTINCT source_type) as unique_source_types
                FROM `{self.project_id}.{self.dataset_id}.{settings.partnership_table_id}`
            """
            
            query_job = self.client.query(stats_query)
            results = query_job.result()
            
            for row in results:
                return dict(row)
            
            return {}
            
        except Exception as e:
            logger.error(f"Error getting partnership stats: {str(e)}")
            raise

    async def ensure_tables_exist(self):
        """Ensure required BigQuery tables exist"""
        try:
            dataset_ref = self.client.dataset(self.dataset_id)
            
            # Check if dataset exists
            try:
                self.client.get_dataset(dataset_ref)
            except NotFound:
                logger.info(f"Creating dataset: {self.dataset_id}")
                dataset = bigquery.Dataset(dataset_ref)
                dataset.location = settings.bigquery_location
                self.client.create_dataset(dataset)
            
            # Check if main table exists
            table_ref = dataset_ref.table(settings.partnership_table_id)
            try:
                self.client.get_table(table_ref)
                logger.info(f"Table {settings.partnership_table_id} already exists")
            except NotFound:
                logger.info(f"Creating table: {settings.partnership_table_id}")
                schema = [bigquery.SchemaField(**field) for field in PARTNERSHIP_SCHEMA]
                table = bigquery.Table(table_ref, schema=schema)
                self.client.create_table(table)
            
        except Exception as e:
            logger.error(f"Error ensuring tables exist: {str(e)}")
            raise 