from uuid import UUID
from pydantic import BaseModel, field_validator, model_validator, Field
from datetime import datetime
from json import loads, dumps


class NewPost(BaseModel):
    user_id: UUID
    title: str
    content: str
    short_content: str

    @model_validator(mode="before")
    @classmethod
    def shorten_content(cls, data):
        if data.get("short_content") is None:
            if len(data["content"]) > 100:
                data["short_content"] = f"{data['content'][:100]}..."
            else:
                data["short_content"] = data["content"]
        return data


class UpdatePost(NewPost):
    reactions: str

    @field_validator("reactions", mode="before")
    @classmethod
    def transform_reactions(cls, v):
        if v is None:
            return None
        else:
            return dumps(v)


class FormattedPost(NewPost):
    id: UUID
    reactions: dict
    created_at: str
    updated_at: str
    short_content: str

    @field_validator("reactions", mode="before")
    @classmethod
    def transform_reactions(cls, v):
        if v is None:
            return None
        else:
            return loads(v)

    @field_validator("created_at", "updated_at", mode="before")
    @classmethod
    def transform_time(cls, v):
        if v is None:
            return None
        else:
            dt_obj = datetime.fromisoformat(v)
            formatted_dt = dt_obj.strftime("%Y-%m-%d %H:%M:%S")
            return formatted_dt
