const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let refreshingPromise: Promise<string | null> | null = null;

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function setAccessToken(access: string) {
  localStorage.setItem("access_token", access);
}
export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      });

      if (!res.ok) {
        clearTokens();
        return null;
      }

      const data = (await res.json()) as {
        access_token: string;
        refresh_token?: string;
      };

      setAccessToken(data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      return data.access_token;
    })().finally(() => {
      refreshingPromise = null;
    });
  }

  return refreshingPromise;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const access = getAccessToken();
  const doFetch = (token?: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  // 1st try
  let res = await doFetch(access ?? undefined);
  if (res.status !== 401) return res;

  // refresh + retry once
  const newAccess = await refreshAccessToken();
  if (!newAccess) return res;

  res = await doFetch(newAccess);
  return res;
}
