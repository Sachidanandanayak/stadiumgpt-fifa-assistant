"""
Supabase client factory. Returns None if credentials are not configured,
so the rest of the app can gracefully fall back to in-memory demo data.
"""
import logging
from functools import lru_cache

from config import get_settings

logger = logging.getLogger("stadiumgpt.supabase")


@lru_cache
def get_supabase_client():
    settings = get_settings()
    if not settings.is_supabase_configured:
        logger.warning("Supabase not configured — using in-memory demo data.")
        return None
    try:
        from supabase import create_client

        return create_client(settings.supabase_url, settings.supabase_service_key)
    except Exception as exc:  # pragma: no cover
        logger.error("Failed to initialize Supabase client: %s", exc)
        return None
