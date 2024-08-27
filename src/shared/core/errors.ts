export class ResponseError extends Error {
  res: Response;
  info: string | null;

  constructor(message: string, res: Response, info?: string) {
    super(message);
    this.res = res;
    this.info = info ?? null;
  }

  async toJSON() {
    const contentType = this.res.headers.get('content-type');
    const isJson = !!contentType?.includes('application/json');
    const body = isJson ? await this.res.json() : await this.res.text();
    return {
      message: this.message,
      info: this.info,
      status: this.res.status,
      contentType,
      body,
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
