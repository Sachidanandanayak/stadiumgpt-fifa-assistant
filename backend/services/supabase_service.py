"""
Data access layer for stadium operational data (metrics, gates, parking, etc.)
and emergency data. Reads from Supabase if configured; otherwise serves
realistic in-memory demo data so the API is fully functional out of the box.
"""
import random
from datetime import datetime, timedelta

from database.supabase_client import get_supabase_client
from schemas.dashboard import DashboardMetric, GateStatus, ParkingZone, CrowdDensityPoint
from schemas.emergency import EmergencyContact, EvacuationExit


class SupabaseService:
    def __init__(self):
        self.client = get_supabase_client()

    # ---------- Dashboard ----------
    def get_metrics(self) -> list[DashboardMetric]:
        if self.client:
            try:
                res = self.client.table("dashboard_metrics").select("*").execute()
                if res.data:
                    return [DashboardMetric(**row) for row in res.data]
            except Exception:
                pass
        return [
            DashboardMetric(label="Crowd Density", value=round(random.uniform(60, 92), 1), unit="%", trend="up", changePercent=5.2),
            DashboardMetric(label="Avg Queue Length", value=round(random.uniform(80, 260)), unit="people", trend="down", changePercent=3.1),
            DashboardMetric(label="Parking Occupied", value=round(random.uniform(65, 95), 1), unit="%", trend="up", changePercent=8.4),
            DashboardMetric(label="Avg Wait Time", value=round(random.uniform(5, 25)), unit="min", trend="stable", changePercent=0.5),
        ]

    def get_gates(self) -> list[GateStatus]:
        if self.client:
            try:
                res = self.client.table("gate_status").select("*").execute()
                if res.data:
                    return [GateStatus(**row) for row in res.data]
            except Exception:
                pass
        gates = []
        for name in ["Gate A", "Gate B", "Gate C", "Gate D", "Gate E"]:
            queue = random.randint(0, 350)
            gates.append(
                GateStatus(
                    gate=name,
                    status=random.choice(["open", "open", "open", "delayed"]) if queue else "closed",
                    queueLength=queue,
                    waitTimeMinutes=round(queue / 15),
                )
            )
        return gates

    def get_parking(self) -> list[ParkingZone]:
        if self.client:
            try:
                res = self.client.table("parking_zones").select("*").execute()
                if res.data:
                    return [ParkingZone(**row) for row in res.data]
            except Exception:
                pass
        zones = [("North Lot", 800), ("South Lot", 600), ("VIP Deck", 150), ("East Lot", 500)]
        return [
            ParkingZone(zone=name, totalSlots=total, occupiedSlots=round(total * random.uniform(0.4, 0.98)))
            for name, total in zones
        ]

    def get_crowd_trend(self) -> list[CrowdDensityPoint]:
        if self.client:
            try:
                res = self.client.table("crowd_trend").select("*").execute()
                if res.data:
                    return [CrowdDensityPoint(**row) for row in res.data]
            except Exception:
                pass
        base_time = datetime.now().replace(minute=0, second=0, microsecond=0) - timedelta(hours=6)
        points = []
        density = 15
        for i in range(7):
            density = max(10, min(98, density + random.randint(-8, 22)))
            points.append(
                CrowdDensityPoint(
                    time=(base_time + timedelta(hours=i)).strftime("%-I:%M %p"),
                    density=density,
                )
            )
        return points

    # ---------- Emergency ----------
    def get_emergency_contacts(self) -> list[EmergencyContact]:
        if self.client:
            try:
                res = self.client.table("emergency_contacts").select("*").execute()
                if res.data:
                    return [EmergencyContact(**row) for row in res.data]
            except Exception:
                pass
        return [
            EmergencyContact(id="1", name="Stadium Security", role="On-site Security Team", phone="+1-800-555-0100", available247=True),
            EmergencyContact(id="2", name="Medical Response Unit", role="First Aid & Ambulance", phone="+1-800-555-0111", available247=True),
            EmergencyContact(id="3", name="Lost & Found", role="Guest Services", phone="+1-800-555-0122", available247=False),
            EmergencyContact(id="4", name="Local Police", role="Emergency Law Enforcement", phone="911", available247=True),
        ]

    def get_evacuation_exits(self) -> list[EvacuationExit]:
        if self.client:
            try:
                res = self.client.table("evacuation_exits").select("*").execute()
                if res.data:
                    return [EvacuationExit(**row) for row in res.data]
            except Exception:
                pass
        return [
            EvacuationExit(id="1", gate="Exit Gate A — North", distanceMeters=85, crowdLevel="low", status="open"),
            EvacuationExit(id="2", gate="Exit Gate B — East", distanceMeters=140, crowdLevel="medium", status="open"),
            EvacuationExit(id="3", gate="Exit Gate C — South", distanceMeters=210, crowdLevel="high", status="restricted"),
            EvacuationExit(id="4", gate="Exit Gate D — West", distanceMeters=95, crowdLevel="low", status="open"),
        ]

    def log_sos_event(self, location: str) -> str:
        ticket_id = f"SOS-{random.randint(10000, 99999)}"
        if self.client:
            try:
                self.client.table("sos_events").insert(
                    {"ticket_id": ticket_id, "location": location, "created_at": datetime.utcnow().isoformat()}
                ).execute()
            except Exception:
                pass
        return ticket_id


supabase_service = SupabaseService()
