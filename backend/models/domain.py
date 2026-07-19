"""
Domain model definitions (plain dataclasses) representing core StadiumGPT
entities independent of API transport schemas (see /schemas) or DB rows.
Useful if the project grows beyond simple pass-through Supabase queries.
"""
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class ChatSession:
    id: str
    user_id: str | None
    messages: list[dict] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class SOSEvent:
    ticket_id: str
    location: str
    status: str = "dispatched"
    created_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class StadiumGate:
    name: str
    status: str
    queue_length: int
    wait_time_minutes: int
