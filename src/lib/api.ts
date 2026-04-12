import * as SecureStore from 'expo-secure-store';

const API_BASE = 'https://app.roofax.ai';
const SESSION_KEY = 'roofax_session';

let sessionCookie: string | null = null;

export async function loadSession(): Promise<string | null> {
  try {
    sessionCookie = await SecureStore.getItemAsync(SESSION_KEY);
    return sessionCookie;
  } catch {
    return null;
  }
}

async function saveSession(cookie: string) {
  sessionCookie = cookie;
  try {
    await SecureStore.setItemAsync(SESSION_KEY, cookie);
  } catch { /* ignore on web */ }
}

export async function clearSession() {
  sessionCookie = null;
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  } catch { /* ignore */ }
}

export async function api<T = unknown>(path: string, options?: RequestInit): Promise<{ success: boolean; data?: T; error?: string }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(sessionCookie ? { Cookie: sessionCookie } : {}),
    ...(options?.headers as Record<string, string> ?? {}),
  };

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      await saveSession(setCookie);
    }

    return await res.json();
  } catch (err) {
    return { success: false, error: 'Network error. Check your connection.' };
  }
}

export async function login(emailOrPhone: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Use CSRF token flow
    const csrfRes = await fetch(`${API_BASE}/api/auth/csrf`, { credentials: 'include' });
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;

    const csrfCookie = csrfRes.headers.get('set-cookie');
    if (csrfCookie) await saveSession(csrfCookie);

    const res = await fetch(`${API_BASE}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(sessionCookie ? { Cookie: sessionCookie } : {}),
      },
      body: `email=${encodeURIComponent(emailOrPhone)}&password=${encodeURIComponent(password)}&csrfToken=${encodeURIComponent(csrfToken)}&json=true`,
      credentials: 'include',
      redirect: 'manual',
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) await saveSession(setCookie);

    // NextAuth redirects on success
    if (res.status === 200 || res.status === 302) {
      return { success: true };
    }

    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.error ?? 'Invalid credentials' };
  } catch {
    return { success: false, error: 'Network error' };
  }
}

export async function getSession() {
  return api<{ user: { id: string; name: string; email: string; role: string; mustChangePassword?: boolean } }>('/api/auth/session');
}

export async function getSubscription() {
  return api<{ plan: string | null; status: string | null; currentPeriodEnd: string | null }>('/api/homeowner/billing/subscription');
}

export async function getProperties() {
  return api<{ items: Property[] }>('/api/properties?limit=50');
}

export async function getProperty(id: string) {
  return api<PropertyDetail>(`/api/properties/${id}`);
}

export async function getProjectDetail(propertyId: string, recordId: string) {
  return api<ProjectRecord>(`/api/properties/${propertyId}/records/${recordId}`);
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return api('/api/homeowner/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// Types
export interface Property {
  id: string;
  homeId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  roofScore: number | null;
  roofScoreDate: string | null;
  roofAgeYears: number | null;
  roofRemainingYears: number | null;
  roofCondition: string | null;
}

export interface WorkRecord {
  id: string;
  trade: string;
  jobDate: string;
  jobType: string;
  status: string;
  invoiceAmount: string | null;
  notes: string | null;
  contractor: {
    companyName: string;
    verified: boolean;
    logoUrl: string | null;
    phone: string | null;
    website: string | null;
  };
  files: Array<{ id: string; fileName: string }>;
}

export interface PropertyDetail extends Property {
  ownedSince: string | null;
  workRecords: WorkRecord[];
  accessGrants: unknown[];
  insuranceClaims: unknown[];
}

export interface ProjectPhoto {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  caption: string | null;
  category: string;
  takenAt: string | null;
}

export interface ProjectRecord {
  id: string;
  trade: string;
  jobDate: string;
  jobType: string;
  status: string;
  invoiceAmount: string | null;
  description: string | null;
  startDate: string | null;
  completionDate: string | null;
  inspectionDate: string | null;
  inspectionResult: string | null;
  permitNumber: string | null;
  warrantyExpiry: string | null;
  materials: string[];
  notes: string | null;
  contractor: {
    id: string;
    companyName: string;
    licenseNumber: string;
    verified: boolean;
    phone: string | null;
    website: string | null;
    logoUrl: string | null;
    bio: string | null;
    user: { name: string | null; phone: string | null; email: string | null };
  };
  photos: ProjectPhoto[];
  documents: Array<{ id: string; name: string; url: string; fileType: string }>;
  timelineEntries: Array<{ id: string; date: string; title: string; description: string | null }>;
  workRecordNotes: Array<{ id: string; content: string; authorRole: string; createdAt: string }>;
}
