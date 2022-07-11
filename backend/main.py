
from fastapi import FastAPI, status, HTTPException
from models import *
from schemas import *
from tortoise.contrib.fastapi import register_tortoise
import crud as crud
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from config import settings
from auth import get_current_user, authenticate,  encode_jwt_token


app = FastAPI()



@app.post('/token')
async def generate_jwt_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate(username=form_data.username, password=form_data.password)
    if user is None:
        raise  HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    token = await encode_jwt_token(str(user.id))
    return {
        'access_token': token,
        'token_type' : 'bearer'
    }

@app.post('/users', response_model=UserPydantic)
async def create_user(user_in: UserInPydantic):
    return await crud.create_user(user_in)

@app.get('/users', response_model=List[UserPydantic])
async def get_users():
    return await crud.get_users()

@app.get('/users/{user_id}', response_model=UserPydantic)
async def get_user(user_id: int):
    return await crud.get_user(user_id)

@app.get('/auth/me')
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get('/board')
async def get_board(user: UserPydantic = Depends(get_current_user)):
    return {'board' : user.board_data}


@app.post('/board')
async def save_board(board: Board, current_user: UserPydantic = Depends((get_current_user))):
    user = await User.get(id=current_user.id)
    user.board_data = board.json()

    await user.save()
    return {'msg' : 'board data added successfully'}



# TODO: Replace with postgres db
register_tortoise(
    app, 
    db_url=settings.SQL_DATABASE_URI,
    modules={'models': ['models']},
    generate_schemas=True,
    add_exception_handlers=True
)