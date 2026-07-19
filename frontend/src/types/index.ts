export type Language = 'en' | 'hi' | 'kn' | 'es';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  available247: boolean;
}

export interface EvacuationExit {
  id: string;
  gate: string;
  distanceMeters: number;
  crowdLevel: 'low' | 'medium' | 'high';
  status: 'open' | 'closed' | 'restricted';
}

export interface DashboardMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface GateStatus {
  gate: string;
  status: 'open' | 'closed' | 'delayed';
  queueLength: number;
  waitTimeMinutes: number;
}

export interface ParkingZone {
  zone: string;
  totalSlots: number;
  occupiedSlots: number;
}

export interface CrowdDensityPoint {
  time: string;
  density: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export interface ApiError {
  detail: string;
  statusCode?: number;
}
