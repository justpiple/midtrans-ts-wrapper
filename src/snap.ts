import { ApiConfig } from "./apiConfig";
import { HttpClient } from "./httpClient";
import { Transaction } from "./transaction";
import { RequestBody, CreateTransactionSuccessResponse } from "./types";

interface SnapOptions {
  isProduction?: boolean;
  serverKey?: string;
  clientKey?: string;
}

/**
 * Snap object used to perform requests to Midtrans Snap API
 */
export class Snap {
  apiConfig: ApiConfig;
  httpClient: HttpClient;
  transaction: Transaction;

  constructor(
    options: SnapOptions = {
      isProduction: false,
      serverKey: "",
      clientKey: "",
    },
  ) {
    this.apiConfig = new ApiConfig(options);
    this.httpClient = new HttpClient(this);
    this.transaction = new Transaction(this);
  }

  /**
   * Perform `/transactions` API request to Snap API
   * @param parameter - Object of Core API JSON body as parameter
   * @returns Promise containing the JSON API response
   */
  createTransaction(
    parameter: RequestBody,
  ): Promise<CreateTransactionSuccessResponse> {
    const apiUrl = `${this.apiConfig.getSnapApiBaseUrl()}/transactions`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Wrapper function that calls `createTransaction` and returns the transaction token
   * @param parameter - Object of Core API JSON body as parameter
   * @returns Promise of string token
   */
  createTransactionToken(parameter: RequestBody): Promise<string> {
    return this.createTransaction(parameter).then((res) => res.token);
  }

  /**
   * Wrapper function that calls `createTransaction` and returns the redirect URL
   * @param parameter - Object of Core API JSON body as parameter
   * @returns Promise of string redirect_url
   */
  createTransactionRedirectUrl(parameter: RequestBody): Promise<string> {
    return this.createTransaction(parameter).then((res) => res.redirect_url);
  }
}
