export class ResponseError extends Error {
  res: Response;
  info: string | null;

  constructor(message: string, res: Response, info?: string) {
    super(message);
    this.res = res;
    // Preserve the response for callers, but do not log its URL, headers, or body
    // when Next.js or an error reporter inspects enumerable error properties.
    Object.defineProperty(this, 'res', { enumerable: false });
    this.info = info ?? null;
  }

  async toJSON() {
    const contentType = this.res.headers.get('content-type');
    return {
      message: this.message,
      info: this.info,
      status: this.res.status,
      contentType,
    };
  }
}

export const errMsg = {
  ERR_BAD_REQUEST: 'Bad Request',
  ERR_RESPONSE: 'Non 200 Response',
  INTERNAL: 'Something went wrong :(',
  INVALID_JSON: 'Invalid JSON Response',
  INVALID_RESPONSE_SCHEMA: 'Invalid response schema',
  OFFLINE: 'No internet connection',
  NOT_FOUND: '404 Not Found',
} as const;
