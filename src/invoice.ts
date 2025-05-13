import { ApiConfig } from "./apiConfig";
import { HttpClient } from "./httpClient";
import { InvoiceRequestBody, CreateInvoiceSuccessResponse } from "./types";

interface InvoiceOptions {
  isProduction?: boolean;
  serverKey?: string;
  clientKey?: string;
}

/**
 * Invoice class for interacting with Midtrans Invoice API
 */
export class Invoice {
  apiConfig: ApiConfig;
  httpClient: HttpClient;

  constructor(
    options: InvoiceOptions = {
      isProduction: false,
      serverKey: "",
      clientKey: "",
    },
  ) {
    this.apiConfig = new ApiConfig(options);
    this.httpClient = new HttpClient(this);
  }

  /**
   * Create an invoice through Midtrans Invoice API
   * @param parameter - Invoice creation request body
   * @returns Promise containing the invoice creation response
   */
  createInvoice(
    parameter: InvoiceRequestBody,
  ): Promise<CreateInvoiceSuccessResponse> {
    const apiUrl = `${this.apiConfig.getInvoiceApiBaseUrl()}`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Create an invoice and return the payment link URL
   * @param parameter - Invoice creation request body
   * @returns Promise of payment link URL
   */
  createInvoicePaymentLink(parameter: InvoiceRequestBody): Promise<string> {
    return this.createInvoice(parameter).then((res) => res.payment_link_url);
  }

  /**
   * Create an invoice and return the invoice PDF URL
   * @param parameter - Invoice creation request body
   * @returns Promise of invoice PDF URL
   */
  createInvoicePdfUrl(parameter: InvoiceRequestBody): Promise<string> {
    return this.createInvoice(parameter).then((res) => res.pdf_url);
  }
}
