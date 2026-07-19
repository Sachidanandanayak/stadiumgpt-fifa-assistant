from typing import Literal
from pydantic import BaseModel


class EmergencyContact(BaseModel):
    id: str
    name: str
    role: str
    phone: str
    available247: bool


class EvacuationExit(BaseModel):
    id: str
    gate: str
    distanceMeters: int
    crowdLevel: Literal["low", "medium", "high"]
    status: Literal["open", "closed", "restricted"]


class SOSRequest(BaseModel):
    location: str


class SOSResponse(BaseModel):
    status: str
    ticketId: str
