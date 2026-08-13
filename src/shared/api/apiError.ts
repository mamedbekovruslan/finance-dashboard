/**
 * Typed error thrown by httpClient whenever a response is not `ok`.
 * Carries the HTTP status so callers (and TanStack Query error
 * boundaries) can branch on it without re-parsing anything.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}
