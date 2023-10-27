
from fastapi import FastAPI
from uvicorn import run
from database.session import db
from contextlib import asynccontextmanager
from routes import posts, users
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def on_startup(app: FastAPI):
    await db.connect()
    print("db connected successfully")
    yield

app = FastAPI(lifespan=on_startup)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

app.include_router(posts)
app.include_router(users)


if __name__ == "__main__":
    run("main:app", host="0.0.0.0", port=8000, reload=True)
