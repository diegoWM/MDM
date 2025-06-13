"""
MDM System - FastAPI Backend
Master Data Management API for WeedMe Inc
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth
import os
from pathlib import Path
import logging

# Import our modules
from app.config import settings
from app.models import Partnership, PartnershipCreate, PartnershipUpdate
from app.services.bigquery_service import BigQueryService
from app.services.auth_service import AuthService
from app.routers import partnerships

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="MDM System API",
    description="Master Data Management System for WeedMe Inc",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK with service account"""
    try:
        # Path to your service account key
        service_account_path = Path(__file__).parent.parent.parent / "Key" / "weedme-379116-37e1b699dcd2.json"
        
        if not service_account_path.exists():
            logger.error(f"Service account key not found at {service_account_path}")
            raise FileNotFoundError("Firebase service account key not found")
        
        # Initialize Firebase Admin
        cred = credentials.Certificate(str(service_account_path))
        firebase_admin.initialize_app(cred, {
            'projectId': 'weedme-379116',
        })
        
        logger.info("Firebase Admin SDK initialized successfully")
        return True
        
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {str(e)}")
        return False

# Initialize Firebase on startup
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting MDM System API...")
    
    # Initialize Firebase
    if not initialize_firebase():
        logger.warning("Firebase initialization failed - authentication will not work")
    
    # Initialize BigQuery service
    try:
        bigquery_service = BigQueryService()
        logger.info("BigQuery service initialized successfully")
    except Exception as e:
        logger.error(f"BigQuery initialization failed: {str(e)}")
    
    logger.info("MDM System API started successfully")

# Include routers
app.include_router(partnerships.router, prefix="/api/v1", tags=["partnerships"])

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MDM System API",
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "MDM System API",
        "description": "Master Data Management System for WeedMe Inc",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 