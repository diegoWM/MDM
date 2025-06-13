"""
Pydantic models for MDM System
Data models matching BigQuery schema
"""

from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

class PartnershipStatus(str, Enum):
    """Partnership status enumeration"""
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    PENDING = "Pending"
    SUSPENDED = "Suspended"

class SourceType(str, Enum):
    """Source type enumeration"""
    EMAIL = "Email"
    PORTAL = "Portal"
    PHONE = "Phone"
    MEETING = "Meeting"
    REFERRAL = "Referral"

class Partnership(BaseModel):
    """Partnership model matching BigQuery schema"""
    id: str = Field(..., description="Partnership ID (e.g., LL, PL, LUX)")
    name: str = Field(..., description="Partnership name")
    status: PartnershipStatus = Field(..., description="Partnership status")
    region: str = Field(..., description="Geographic regions (e.g., AB, ON, AB,MB)")
    tier: Optional[str] = Field(None, description="Partnership tier")
    Parent_Partnership: Optional[str] = Field(None, description="Parent partnership name")
    Parent_ID: Optional[str] = Field(None, description="Parent partnership ID")
    source_type: Optional[SourceType] = Field(None, description="How partnership was established")
    source_link: Optional[str] = Field(None, description="Source link or reference")
    point_contact: Optional[str] = Field(None, description="External contact email")
    Internal_Contact: Optional[str] = Field(None, description="Internal team contacts")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    created_by: Optional[str] = Field(None, description="User who created the record")
    updated_by: Optional[str] = Field(None, description="User who last updated the record")

    @validator('point_contact')
    def validate_email(cls, v):
        """Validate email format if provided"""
        if v and '@' not in v:
            raise ValueError('Invalid email format')
        return v

    @validator('region')
    def validate_region(cls, v):
        """Validate region format"""
        valid_regions = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
        regions = [r.strip() for r in v.split(',')]
        for region in regions:
            if region not in valid_regions:
                raise ValueError(f'Invalid region: {region}. Valid regions: {valid_regions}')
        return v

    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class PartnershipCreate(BaseModel):
    """Model for creating new partnerships"""
    id: str = Field(..., description="Partnership ID (e.g., LL, PL, LUX)")
    name: str = Field(..., description="Partnership name")
    status: PartnershipStatus = Field(default=PartnershipStatus.ACTIVE, description="Partnership status")
    region: str = Field(..., description="Geographic regions (e.g., AB, ON, AB,MB)")
    tier: Optional[str] = Field(None, description="Partnership tier")
    Parent_Partnership: Optional[str] = Field(None, description="Parent partnership name")
    Parent_ID: Optional[str] = Field(None, description="Parent partnership ID")
    source_type: Optional[SourceType] = Field(None, description="How partnership was established")
    source_link: Optional[str] = Field(None, description="Source link or reference")
    point_contact: Optional[str] = Field(None, description="External contact email")
    Internal_Contact: Optional[str] = Field(None, description="Internal team contacts")

    @validator('point_contact')
    def validate_email(cls, v):
        if v and '@' not in v:
            raise ValueError('Invalid email format')
        return v

    @validator('region')
    def validate_region(cls, v):
        valid_regions = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
        regions = [r.strip() for r in v.split(',')]
        for region in regions:
            if region not in valid_regions:
                raise ValueError(f'Invalid region: {region}')
        return v

class PartnershipUpdate(BaseModel):
    """Model for updating partnerships"""
    name: Optional[str] = Field(None, description="Partnership name")
    status: Optional[PartnershipStatus] = Field(None, description="Partnership status")
    region: Optional[str] = Field(None, description="Geographic regions")
    tier: Optional[str] = Field(None, description="Partnership tier")
    Parent_Partnership: Optional[str] = Field(None, description="Parent partnership name")
    Parent_ID: Optional[str] = Field(None, description="Parent partnership ID")
    source_type: Optional[SourceType] = Field(None, description="How partnership was established")
    source_link: Optional[str] = Field(None, description="Source link or reference")
    point_contact: Optional[str] = Field(None, description="External contact email")
    Internal_Contact: Optional[str] = Field(None, description="Internal team contacts")

    @validator('point_contact')
    def validate_email(cls, v):
        if v and '@' not in v:
            raise ValueError('Invalid email format')
        return v

    @validator('region')
    def validate_region(cls, v):
        if v:
            valid_regions = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
            regions = [r.strip() for r in v.split(',')]
            for region in regions:
                if region not in valid_regions:
                    raise ValueError(f'Invalid region: {region}')
        return v

class PartnershipResponse(BaseModel):
    """Response model for partnership operations"""
    success: bool
    message: str
    data: Optional[Partnership] = None
    errors: Optional[List[str]] = None

class PartnershipListResponse(BaseModel):
    """Response model for partnership list operations"""
    success: bool
    message: str
    data: List[Partnership]
    total: int
    page: int = 1
    page_size: int = 100

class PartnershipFilter(BaseModel):
    """Model for filtering partnerships"""
    status: Optional[PartnershipStatus] = None
    region: Optional[str] = None
    search: Optional[str] = None
    tier: Optional[str] = None
    source_type: Optional[SourceType] = None
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=100, ge=1, le=1000)

class User(BaseModel):
    """User model for authentication"""
    uid: str
    email: str
    name: Optional[str] = None
    role: str = "user"
    permissions: List[str] = []

class AuthToken(BaseModel):
    """Authentication token model"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: User 