"""
Configuration settings for MDM System
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    app_name: str = "MDM System API"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Google Cloud Platform
    gcp_project_id: str = "weedme-379116"
    gcp_region: str = "us-central1"
    
    # BigQuery
    bigquery_dataset: str = "your_dataset_name"  # You'll need to specify this
    bigquery_location: str = "US"
    
    # Partnership table configuration
    partnership_table_id: str = "Partnership_Master_List"
    partnership_staging_table_id: str = "Partnership_Staging"
    partnership_history_table_id: str = "Partnership_History"
    
    # Firebase
    firebase_project_id: str = "mdmweedme"  # From your Firebase screenshot
    firebase_service_account_path: str = "../Key/weedme-379116-37e1b699dcd2.json"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True
    
    # CORS
    cors_origins: list = [
        "http://localhost:3000",
        "https://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # Security
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Logging
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings()

# BigQuery table configurations
BIGQUERY_TABLES = {
    "partnerships": {
        "table_id": f"{settings.gcp_project_id}.{settings.bigquery_dataset}.{settings.partnership_table_id}",
        "staging_table_id": f"{settings.gcp_project_id}.{settings.bigquery_dataset}.{settings.partnership_staging_table_id}",
        "history_table_id": f"{settings.gcp_project_id}.{settings.bigquery_dataset}.{settings.partnership_history_table_id}",
    }
}

# Partnership table schema (matching your BigQuery structure)
PARTNERSHIP_SCHEMA = [
    {"name": "id", "type": "STRING", "mode": "REQUIRED"},
    {"name": "name", "type": "STRING", "mode": "REQUIRED"},
    {"name": "status", "type": "STRING", "mode": "REQUIRED"},
    {"name": "region", "type": "STRING", "mode": "REQUIRED"},
    {"name": "tier", "type": "STRING", "mode": "NULLABLE"},
    {"name": "Parent_Partnership", "type": "STRING", "mode": "NULLABLE"},
    {"name": "Parent_ID", "type": "STRING", "mode": "NULLABLE"},
    {"name": "source_type", "type": "STRING", "mode": "NULLABLE"},
    {"name": "source_link", "type": "STRING", "mode": "NULLABLE"},
    {"name": "point_contact", "type": "STRING", "mode": "NULLABLE"},
    {"name": "Internal_Contact", "type": "STRING", "mode": "NULLABLE"},
    {"name": "created_at", "type": "TIMESTAMP", "mode": "NULLABLE"},
    {"name": "updated_at", "type": "TIMESTAMP", "mode": "NULLABLE"},
    {"name": "created_by", "type": "STRING", "mode": "NULLABLE"},
    {"name": "updated_by", "type": "STRING", "mode": "NULLABLE"},
] 