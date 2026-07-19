from typing import Literal
from pydantic import BaseModel, Field


class ChatMessageSchema(BaseModel):
    id: str
    role: Literal["user", "assistant"]
    content: str
    timestamp: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: list[ChatMessageSchema] = Field(default_factory=list)
    language: Literal["en", "hi", "kn", "es"] = "en"


class ChatResponse(BaseModel):
    reply: str
