import type { ChatMessage, DashboardMetric, GateStatus, ParkingZone, CrowdDensityPoint, EmergencyContact, EvacuationExit } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ detail: 'Unknown error' }));
      throw new ApiError(body.detail || `Request failed with ${res.status}`, res.status);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError('Network error — is the backend running?', 0);
  }
}

export const chatApi = {
  sendMessage: (message: string, history: ChatMessage[], language: string) =>
    request<{ reply: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history, language }),
    }),
};

export const dashboardApi = {
  getMetrics: () => request<DashboardMetric[]>('/dashboard/metrics'),
  getGates: () => request<GateStatus[]>('/dashboard/gates'),
  getParking: () => request<ParkingZone[]>('/dashboard/parking'),
  getCrowdTrend: () => request<CrowdDensityPoint[]>('/dashboard/crowd-trend'),
};

export const emergencyApi = {
  getContacts: () => request<EmergencyContact[]>('/emergency/contacts'),
  getExits: () => request<EvacuationExit[]>('/emergency/exits'),
  sendSOS: (location: string) =>
    request<{ status: string; ticketId: string }>('/emergency/sos', {
      method: 'POST',
      body: JSON.stringify({ location }),
    }),
};

export { ApiError };
