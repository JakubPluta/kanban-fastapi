from jose import jwt
from security import verify_password
from models import User, UserPydantic
from schemas import *
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from config import settings
from fastapi import status
from typing import Optional
import crud as crud 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')



async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
            options={'verify_aud': False}
        )
        user_id = payload.get('sub')
        user = await crud.get_user(user_id=user_id)
        
    except Exception as e:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    return user



async def authenticate(*, username: str, password: str) -> Optional[User]:
    user = await crud.get_user_by_username(username=username)

    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None 
    return user




async def encode_jwt_token(user_id: str) -> str:
    payload = {
        "exp": datetime.utcnow()
        + timedelta(days=0, minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow(),
        "scope": "access_token",
        "sub": user_id,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)