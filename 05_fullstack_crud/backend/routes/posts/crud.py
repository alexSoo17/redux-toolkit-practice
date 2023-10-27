from database.session import db


async def fetch_all_posts():
    sql = "SELECT * FROM POSTS"
    posts = await db.fetch_all(sql)
    return posts


async def fetch_post_by_id(id: str):
    sql = f"""
    SELECT 
        *
    FROM 
        POSTS 
    WHERE 
        id = '{id}'
    """
    post = await db.fetch_one(sql)
    return post


async def insert_post(title: str, content: str, user_id: str, short_content: str):
    sql = f"""
    INSERT INTO POSTS (title, content, user_id,short_content) 
    VALUES ('{title}', '{content}', '{user_id}', '{short_content}') 
    RETURNING *
    """
    post = await db.fetch_one(sql)
    return post


async def update_post(id: str, title: str, content: str, user_id: str, reactions: str):
    sql = f"""
    UPDATE POSTS SET title = '{title}', content = '{content}', user_id = '{user_id}', reactions = '{reactions}'
    WHERE 
        id = '{id}' 
    RETURNING *
    """
    post = await db.fetch_one(sql)
    return post


async def delete_post(id: str):
    sql = f"DELETE FROM POSTS WHERE id = '{id}' RETURNING *"
    post = await db.fetch_one(sql)
    return post
