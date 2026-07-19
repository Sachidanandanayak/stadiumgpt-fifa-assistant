from typing import Literal
from pydantic import BaseModel


class DashboardMetric(BaseModel):
    label: str
    value: float
    unit: str
    trend: Literal["up", "down", "stable"]
    changePercent: float


class GateStatus(BaseModel):
    gate: str
    status: Literal["open", "closed", "delayed"]
    queueLength: int
    waitTimeMinutes: int


class ParkingZone(BaseModel):
    zone: str
    totalSlots: int
    occupiedSlots: int


class CrowdDensityPoint(BaseModel):
    time: str
    density: float
