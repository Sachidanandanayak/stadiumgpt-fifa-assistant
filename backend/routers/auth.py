from fastapi import APIRouter, HTTPException

from config import get_settings
from database.supabase_client import get_supabase_client
from schemas.auth import RegisterRequest, LoginRequest, AuthResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
async def register(payload: RegisterRequest):
    settings = get_settings()
    client = get_supabase_client()
    if not client:
        raise HTTPException(
            status_code=503,
            detail="Supabase is not configured on this server. Set SUPABASE_URL and SUPABASE_SERVICE_KEY, "
            "or use the frontend's built-in demo mode.",
        )
    try:
        result = client.auth.sign_up(
            {"email": payload.email, "password": payload.password, "options": {"data": {"full_name": payload.full_name}}}
        )
        return AuthResponse(
            user_id=result.user.id,
            email=result.user.email,
            access_token=result.session.access_token if result.session else None,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Registration failed: {exc}") from exc


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest):
    client = get_supabase_client()
    if not client:
        raise HTTPException(
            status_code=503,
            detail="Supabase is not configured on this server. Set SUPABASE_URL and SUPABASE_SERVICE_KEY, "
            "or use the frontend's built-in demo mode.",
        )
    try:
        result = client.auth.sign_in_with_password({"email": payload.email, "password": payload.password})
        return AuthResponse(
            user_id=result.user.id,
            email=result.user.email,
            access_token=result.session.access_token if result.session else None,
        )
    except Exception as exc:
        raise HTTPException(status_code=401, detail=f"Login failed: {exc}") from exc
