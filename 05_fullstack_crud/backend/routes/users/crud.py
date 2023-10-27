from database.session import db


async def fetch_all_users():
    try:
        users = await db.fetch_all("SELECT * FROM users")
        return users
    except Exception as e:
        print(e)
        raise e


async def fetch_user_by_id(user_id):
    try:
        sql = f"SELECT * FROM users WHERE id = '{user_id}'"
        user = await db.fetch_one(sql)
        return user
    except Exception as e:
        print(e)
        raise e
