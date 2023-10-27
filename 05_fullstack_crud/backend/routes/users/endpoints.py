
from fastapi import APIRouter
from .crud import fetch_all_users, fetch_user_by_id

router = APIRouter()


@router.get("/users")
async def get_users():
    users = await fetch_all_users()
    return users


@router.get("/users/{user_id}")
async def get_user_by_id(user_id):
    user = await fetch_user_by_id(user_id)
    return user
