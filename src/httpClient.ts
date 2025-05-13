/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance, AxiosError } from "axios";
import { MidtransError } from "./midtransError";

/**
 * Wrapper of Axios to perform API requests to Midtrans API.
 * @return {Promise} of API response, or exception during the request.
 * Capable of performing HTTP `request`.
 */
export class HttpClient {
  parent: Record<string, any>;
  http_client: AxiosInstance;

  constructor(parentObj: Record<string, any> = {}) {
    this.parent = parentObj;
    this.http_client = axios.create();
  }

  async request(
    httpMethod: string,
    serverKey: string,
    requestUrl: string,
    firstParam: Record<string, any> | string = {},
    secondParam: Record<string, any> | string = {},
  ): Promise<any> {
    const headers = {
      "content-type": "application/json",
      accept: "application/json",
      "user-agent": "midtransclient-nodejs/1.4.2",
    };

    let reqBodyPayload: Record<string, any> = {};
    let reqQueryParam: Record<string, any> = {};

    try {
      if (httpMethod.toLowerCase() === "get") {
        reqQueryParam =
          typeof firstParam === "string" ? JSON.parse(firstParam) : firstParam;
        reqBodyPayload =
          typeof secondParam === "string"
            ? JSON.parse(secondParam)
            : secondParam;
      } else {
        reqBodyPayload =
          typeof firstParam === "string" ? JSON.parse(firstParam) : firstParam;
        reqQueryParam =
          typeof secondParam === "string"
            ? JSON.parse(secondParam)
            : secondParam;
      }
    } catch (err) {
      return Promise.reject(
        new MidtransError(
          `Failed to parse JSON. Error: ${err}`,
          null,
          null,
          null,
        ),
      );
    }

    return new Promise((resolve, reject) => {
      this.http_client({
        method: httpMethod,
        headers,
        url: requestUrl,
        data: reqBodyPayload,
        params: reqQueryParam,
        auth: {
          username: serverKey,
          password: "",
        },
      })
        .then((res) => {
          if (
            res.data.hasOwnProperty("status_code") &&
            res.data.status_code >= 400 &&
            res.data.status_code !== 407
          ) {
            reject(
              new MidtransError(
                `Midtrans API is returning API error. HTTP status code: ${
                  res.data.status_code
                }. API response: ${JSON.stringify(res.data)}`,
                res.data.status_code,
                res.data,
                res,
              ),
            );
          } else {
            resolve(res.data);
          }
        })
        .catch((err: AxiosError) => {
          const res = err.response;

          if (res && res.status >= 400) {
            reject(
              new MidtransError(
                `Midtrans API is returning API error. HTTP status code: ${
                  res.status
                }. API response: ${JSON.stringify(res.data)}`,
                res.status,
                res.data,
                res,
              ),
            );
          } else if (!res) {
            reject(
              new MidtransError(
                `Midtrans API request failed. HTTP response not found, likely connection failure, with message: ${JSON.stringify(
                  err.message,
                )}`,
                null,
                null,
                err,
              ),
            );
          } else {
            reject(
              new MidtransError(
                `Unexpected error: ${err.message}`,
                null,
                null,
                err,
              ),
            );
          }
        });
    });
  }
}
