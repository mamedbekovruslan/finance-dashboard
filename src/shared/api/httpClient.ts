import { ApiError } from './apiError';

const BASE_PATH = '/api';

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Query params appended to the URL. */
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(`${BASE_PATH}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return `${url.pathname}${url.search}`;
}

async function request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const { params, body, headers, ...rest } = options;
  const url = buildUrl(path, params);

  const res = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    let message = res.statusText || 'Request failed';
    try {
      const payload = (await res.clone().json()) as { message?: string };
      if (payload?.message) message = payload.message;
    } catch {
      // response wasn't JSON — fall back to statusText
    }
    throw new ApiError(message, res.status, url);
  }

  // Some endpoints (e.g. DELETE) may return no content.
  if (res.status === 204) {
    return undefined as TResponse;
  }

  return (await res.json()) as TResponse;
}

/**
 * Minimal typed fetch wrapper. All entity API modules go through this
 * so base URL, JSON handling, and error typing stay in one place.
 */
export const httpClient = {
  get: <TResponse>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(path, { ...options, method: 'GET' }),
  post: <TResponse>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    request<TResponse>(path, { ...options, method: 'POST', body }),
  put: <TResponse>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    request<TResponse>(path, { ...options, method: 'PUT', body }),
  patch: <TResponse>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    request<TResponse>(path, { ...options, method: 'PATCH', body }),
  delete: <TResponse = void>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(path, { ...options, method: 'DELETE' }),
};
