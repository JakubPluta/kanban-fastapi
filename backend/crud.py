from schemas import *
from models import *
from security import get_password_hash, verify_password


async def get_user(user_id: int):
    return await UserPydantic.from_queryset_single(User.get(id=user_id))

async def get_user_by_username(username: str):
    return await UserPydantic.from_queryset_single(User.get(username=username))


async def get_users():
    return await UserPydantic.from_queryset(User.all())


async def create_user(user: UserInPydantic):
    user_obj = User(username=user.username, hashed_password=get_password_hash(user.hashed_password))
    await user_obj.save()
    return await UserPydantic.from_tortoise_orm(user_obj)

