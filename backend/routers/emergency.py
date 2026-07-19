from fastapi import APIRouter, HTTPException

from schemas.emergency import EmergencyContact, EvacuationExit, SOSRequest, SOSResponse
from services.supabase_service import supabase_service

router = APIRouter(prefix="/api/emergency", tags=["emergency"])


@router.get("/contacts", response_model=list[EmergencyContact])
async def get_contacts():
    try:
        return supabase_service.get_emergency_contacts()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch contacts: {exc}") from exc


@router.get("/exits", response_model=list[EvacuationExit])
async def get_exits():
    try:
        return supabase_service.get_evacuation_exits()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch exits: {exc}") from exc


@router.post("/sos", response_model=SOSResponse)
async def trigger_sos(payload: SOSRequest):
    try:
        ticket_id = supabase_service.log_sos_event(payload.location)
        return SOSResponse(status="dispatched", ticketId=ticket_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to process SOS: {exc}") from exc
