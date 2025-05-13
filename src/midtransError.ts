/**
 * Custom HTTP Error Class that also exposes httpStatusCode, ApiResponse, rawHttpClientData.
 * To provide more detailed information for library users.
 */
export class MidtransError extends Error {
  httpStatusCode: number | null;
  ApiResponse: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  rawHttpClientData: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor(
    message: string,
    httpStatusCode: number | null = null,
    ApiResponse: any = null, // eslint-disable-line @typescript-eslint/no-explicit-any
    rawHttpClientData: any = null, // eslint-disable-line @typescript-eslint/no-explicit-any
  ) {
    super(message);

    // Ensure the name of this error matches the class name
    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.ApiResponse = ApiResponse;
    this.rawHttpClientData = rawHttpClientData;
    // Clip the constructor invocation from the stack trace
    // @ts-ignore
    if (Error.captureStackTrace) {
      // @ts-ignore
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
