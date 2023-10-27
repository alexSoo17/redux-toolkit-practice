import asyncpg
from fastapi.encoders import jsonable_encoder
from typing import List, Any
from config import settings


class __Database:
    def __init__(self) -> None:
        self._connection_pool = None

    async def connect(self) -> None:
        if self._connection_pool is None:
            try:
                self._connection_pool = await asyncpg.create_pool(dsn=settings.DSN, min_size=1, max_size=10, command_timeout=1000)
            except Exception as e:
                print(e)

    async def fetch_one(self, query: str) -> dict:
        if self._connection_pool is None:
            await self.connect()
        async with self._connection_pool.acquire() as con:
            result = await con.fetchrow(query)
            return jsonable_encoder(result)

    async def fetch_all(self, query: str) -> List:
        if self._connection_pool is None:
            await self.connect()
        async with self._connection_pool.acquire() as con:
            result = await con.fetch(query)
            return jsonable_encoder(result)

    async def fetch_value(self, query: str) -> Any:
        if self._connection_pool is None:
            await self.connect()
        async with self._connection_pool.acquire() as con:
            result = await con.fetchval(query)
            return result

    async def execute(self, query: str) -> None:
        if self._connection_pool is None:
            await self.connect()
        async with self._connection_pool.acquire() as con:
            await con.execute(query)
            return None


db = __Database()


def get_db():
    global db
    return db
