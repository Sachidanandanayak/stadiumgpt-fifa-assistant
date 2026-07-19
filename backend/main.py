import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import get_settings
from routers import chat, dashboard, emergency, auth

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("stadiumgpt")

settings = get_settings()

app = FastAPI(
    title="StadiumGPT API",
    description="Backend API for StadiumGPT — Smart Stadium Assistant for FIFA World Cup 2026",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled error on %s: %s", request.url.path, exc)
    return JSONResponse(status_code=500, content={"detail": "Internal server error. Please try again."})


app.include_router(chat.router)
app.include_router(dashboard.router)
app.include_router(emergency.router)
app.include_router(auth.router)


@app.get("/")
async def root():
    return {
        "service": "StadiumGPT API",
        "status": "online",
        "gemini_configured": settings.is_gemini_configured,
        "supabase_configured": settings.is_supabase_configured,
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
