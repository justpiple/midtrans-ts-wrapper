/* eslint-disable @typescript-eslint/no-explicit-any */

import { CancelTransactionResponse, TransactionStatusResponse } from "./types";
import ApiConfig from "./apiConfig";
import HttpClient from "./httpClient";

class Transaction {
  parent: { apiConfig: ApiConfig; httpClient: HttpClient };

  constructor(parentObj: { apiConfig: ApiConfig; httpClient: HttpClient }) {
    this.parent = parentObj;
  }

  private getServerKey(): string {
    const serverKey = this.parent.apiConfig.get().serverKey;
    if (!serverKey) {
      throw new Error("Server key is not defined in the API configuration.");
    }
    return serverKey;
  }

  status(transactionId = ""): Promise<TransactionStatusResponse> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/status`;
    return this.parent.httpClient.request("get", this.getServerKey(), apiUrl);
  }

  statusb2b(transactionId = ""): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/status/b2b`;
    return this.parent.httpClient.request("get", this.getServerKey(), apiUrl);
  }

  approve(transactionId = ""): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/approve`;
    return this.parent.httpClient.request("post", this.getServerKey(), apiUrl);
  }

  async deny(transactionId = ""): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/deny`;
    return await this.parent.httpClient.request(
      "post",
      this.getServerKey(),
      apiUrl,
    );
  }

  cancel(transactionId = ""): Promise<CancelTransactionResponse> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/cancel`;
    return this.parent.httpClient.request("post", this.getServerKey(), apiUrl);
  }

  expire(transactionId = ""): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/expire`;
    return this.parent.httpClient.request("post", this.getServerKey(), apiUrl);
  }

  refund(
    transactionId = "",
    parameter: Record<string, any> = {},
  ): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/refund`;
    return this.parent.httpClient.request(
      "post",
      this.getServerKey(),
      apiUrl,
      parameter,
    );
  }

  refundDirect(
    transactionId = "",
    parameter: Record<string, any> = {},
  ): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/refund/online/direct`;
    return this.parent.httpClient.request(
      "post",
      this.getServerKey(),
      apiUrl,
      parameter,
    );
  }

  notification(
    notificationObj: string | Record<string, any> = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let parsedNotificationObj: Record<string, any>;

      if (typeof notificationObj === "string") {
        try {
          parsedNotificationObj = JSON.parse(notificationObj);
        } catch (err: any) {
          reject(
            new MidtransNotificationError(
              `Failed to parse 'notification' string as JSON. Use a valid JSON string or object as 'notification'. Error: ${err.message}`,
            ),
          );
          return;
        }
      } else {
        parsedNotificationObj = notificationObj;
      }

      const transactionId = parsedNotificationObj.transaction_id;
      this.status(transactionId)
        .then((res) => resolve(res))
        .catch((err) => {
          reject(
            err instanceof Error
              ? err
              : new MidtransNotificationError(
                  `Unexpected error: ${JSON.stringify(err)}`,
                ),
          );
        });
    });
  }
}

class MidtransNotificationError extends Error {}

export default Transaction;
