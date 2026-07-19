from fastapi import APIRouter, HTTPException

from schemas.dashboard import DashboardMetric, GateStatus, ParkingZone, CrowdDensityPoint
from services.supabase_service import supabase_service

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/metrics", response_model=list[DashboardMetric])
async def get_metrics():
    try:
        return supabase_service.get_metrics()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch metrics: {exc}") from exc


@router.get("/gates", response_model=list[GateStatus])
async def get_gates():
    try:
        return supabase_service.get_gates()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch gate status: {exc}") from exc


@router.get("/parking", response_model=list[ParkingZone])
async def get_parking():
    try:
        return supabase_service.get_parking()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch parking data: {exc}") from exc


@router.get("/crowd-trend", response_model=list[CrowdDensityPoint])
async def get_crowd_trend():
    try:
        return supabase_service.get_crowd_trend()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch crowd trend: {exc}") from exc
