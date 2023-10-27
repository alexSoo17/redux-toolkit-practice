
from fastapi import APIRouter
from .crud import fetch_all_posts, fetch_post_by_id, insert_post, update_post, delete_post
from .schema import NewPost, FormattedPost, UpdatePost


router = APIRouter()


@router.get("/posts")
async def get_all_posts():
    try:
        res = await fetch_all_posts()
        posts = [FormattedPost.model_validate(postItem) for postItem in res]
        return posts
    except Exception as e:
        print(e)


@router.get("/posts/{id}")
async def get_post_by_id(id: str):
    try:
        res = await fetch_post_by_id(id)
        post = FormattedPost.model_validate(res)
        return post.model_dump(exclude=["short_content"])
    except Exception as e:
        print(e)


@router.post("/posts")
async def create_post(new_post: NewPost):
    try:
        res = await insert_post(**new_post.model_dump())
        post = FormattedPost.model_validate(res)
        return post
    except Exception as e:
        print(e)


@router.put("/posts/{id}")
async def update_post_by_id(id: str, new_post: UpdatePost):
    try:
        res = await update_post(id, **new_post.model_dump(exclude=["short_content"]))
        post = FormattedPost.model_validate(res)
        return post
    except Exception as e:
        print(e)


@router.delete("/posts/{id}")
async def delete_post_by_id(id: str):
    try:
        res = await delete_post(id)
        post = FormattedPost.model_validate(res)
        return post
    except Exception as e:
        print(e)
