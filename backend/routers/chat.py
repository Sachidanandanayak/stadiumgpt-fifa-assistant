from fastapi import APIRouter, HTTPException

from schemas.chat import ChatRequest, ChatResponse
from services.gemini_service import gemini_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def send_chat_message(payload: ChatRequest) -> ChatResponse:
    try:
        reply = gemini_service.generate_reply(
            message=payload.message,
            history=payload.history,
            language=payload.language,
        )
        return ChatResponse(reply=reply)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to generate reply: {exc}") from exc
