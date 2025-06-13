"""
Authentication Service for MDM System
Handles Firebase authentication and user management
"""

import firebase_admin
from firebase_admin import auth
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
import logging

from app.models import User

logger = logging.getLogger(__name__)

# Security scheme for Bearer token
security = HTTPBearer()

class AuthService:
    """Service for authentication operations"""
    
    def __init__(self):
        """Initialize authentication service"""
        self.required_permissions = {
            "partnerships:read": "Read partnership data",
            "partnerships:write": "Create and update partnerships",
            "partnerships:delete": "Delete partnerships",
            "partnerships:approve": "Approve partnership changes",
            "admin": "Full administrative access"
        }
    
    async def verify_token(self, credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
        """Verify Firebase ID token and return user"""
        try:
            # Extract token from Authorization header
            token = credentials.credentials
            
            # Verify the token with Firebase Admin SDK
            decoded_token = auth.verify_id_token(token)
            
            # Extract user information
            uid = decoded_token['uid']
            email = decoded_token.get('email', '')
            name = decoded_token.get('name', '')
            
            # Get user permissions based on email domain or specific rules
            permissions = await self._get_user_permissions(email)
            role = await self._get_user_role(email)
            
            user = User(
                uid=uid,
                email=email,
                name=name,
                role=role,
                permissions=permissions
            )
            
            logger.info(f"User authenticated: {email}")
            return user
            
        except auth.InvalidIdTokenError:
            logger.warning("Invalid ID token provided")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except auth.ExpiredIdTokenError:
            logger.warning("Expired ID token provided")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication failed",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    async def _get_user_permissions(self, email: str) -> List[str]:
        """Get user permissions based on email and role"""
        try:
            # Default permissions for all authenticated users
            permissions = ["partnerships:read"]
            
            # Check if user is from WeedMe domain
            if email.endswith("@weedme.ca"):
                permissions.extend([
                    "partnerships:write",
                    "partnerships:delete"
                ])
                
                # Check for admin users (you can customize this logic)
                admin_emails = [
                    "diego@weedme.ca",
                    # Add other admin emails here
                ]
                
                if email in admin_emails:
                    permissions.extend([
                        "partnerships:approve",
                        "admin"
                    ])
            
            return permissions
            
        except Exception as e:
            logger.error(f"Error getting user permissions: {str(e)}")
            return ["partnerships:read"]  # Default minimal permissions
    
    async def _get_user_role(self, email: str) -> str:
        """Get user role based on email"""
        try:
            # Admin users
            admin_emails = [
                "diego@weedme.ca",
                # Add other admin emails here
            ]
            
            if email in admin_emails:
                return "admin"
            
            # WeedMe employees
            if email.endswith("@weedme.ca"):
                return "employee"
            
            # External users (read-only)
            return "user"
            
        except Exception as e:
            logger.error(f"Error getting user role: {str(e)}")
            return "user"
    
    async def check_permission(self, user: User, required_permission: str) -> bool:
        """Check if user has required permission"""
        try:
            # Admin users have all permissions
            if "admin" in user.permissions:
                return True
            
            # Check specific permission
            return required_permission in user.permissions
            
        except Exception as e:
            logger.error(f"Error checking permission: {str(e)}")
            return False
    
    async def require_permission(self, required_permission: str):
        """Dependency to require specific permission"""
        async def permission_checker(user: User = Depends(self.verify_token)) -> User:
            if not await self.check_permission(user, required_permission):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Insufficient permissions. Required: {required_permission}"
                )
            return user
        return permission_checker
    
    async def get_current_user(self, credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
        """Get current authenticated user (dependency)"""
        return await self.verify_token(credentials)
    
    async def get_optional_user(self, credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[User]:
        """Get current user if authenticated, None otherwise"""
        if not credentials:
            return None
        
        try:
            return await self.verify_token(credentials)
        except HTTPException:
            return None

# Create global auth service instance
auth_service = AuthService()

# Common dependency functions
async def get_current_user(user: User = Depends(auth_service.get_current_user)) -> User:
    """Dependency to get current authenticated user"""
    return user

async def get_optional_user(user: Optional[User] = Depends(auth_service.get_optional_user)) -> Optional[User]:
    """Dependency to get current user if authenticated"""
    return user

async def require_read_permission(user: User = Depends(auth_service.require_permission("partnerships:read"))) -> User:
    """Dependency to require read permission"""
    return user

async def require_write_permission(user: User = Depends(auth_service.require_permission("partnerships:write"))) -> User:
    """Dependency to require write permission"""
    return user

async def require_delete_permission(user: User = Depends(auth_service.require_permission("partnerships:delete"))) -> User:
    """Dependency to require delete permission"""
    return user

async def require_admin_permission(user: User = Depends(auth_service.require_permission("admin"))) -> User:
    """Dependency to require admin permission"""
    return user 