import _ from "lodash";

interface ApiConfigOptions {
  isProduction?: boolean;
  serverKey?: string;
  clientKey?: string;
}

/**
 * Config Object that stores isProduction, serverKey, clientKey, and API base URLs.
 */
export class ApiConfig {
  isProduction: boolean;
  serverKey: string;
  clientKey: string;

  static readonly CORE_SANDBOX_BASE_URL = "https://api.sandbox.midtrans.com";
  static readonly CORE_PRODUCTION_BASE_URL = "https://api.midtrans.com";
  static readonly SNAP_SANDBOX_BASE_URL =
    "https://app.sandbox.midtrans.com/snap/v1";
  static readonly SNAP_PRODUCTION_BASE_URL = "https://app.midtrans.com/snap/v1";
  static readonly IRIS_SANDBOX_BASE_URL =
    "https://app.sandbox.midtrans.com/iris/api/v1";
  static readonly IRIS_PRODUCTION_BASE_URL =
    "https://app.midtrans.com/iris/api/v1";
  static readonly INVOICE_SANDBOX_BASE_URL =
    "https://api.sandbox.midtrans.com/v1/invoices";
  static readonly INVOICE_PRODUCTION_BASE_URL =
    "https://api.midtrans.com/v1/invoices";

  /**
   * Initiate with options
   * @param options - should have these props: isProduction, serverKey, clientKey
   */
  constructor(
    options: ApiConfigOptions = {
      isProduction: false,
      serverKey: "",
      clientKey: "",
    },
  ) {
    this.isProduction = false;
    this.serverKey = "";
    this.clientKey = "";

    this.set(options);
  }

  /**
   * Return config stored
   * @return object containing isProduction, serverKey, clientKey
   */
  get(): ApiConfigOptions {
    return {
      isProduction: this.isProduction,
      serverKey: this.serverKey,
      clientKey: this.clientKey,
    };
  }

  /**
   * Set config stored
   * @param options - object containing isProduction, serverKey, clientKey
   */
  set(options: ApiConfigOptions): void {
    const currentConfig = {
      isProduction: this.isProduction,
      serverKey: this.serverKey,
      clientKey: this.clientKey,
    };

    const parsedOptions = _.pick(options, [
      "isProduction",
      "serverKey",
      "clientKey",
    ]);
    const mergedConfig = _.merge({}, currentConfig, parsedOptions);

    this.isProduction = mergedConfig.isProduction;
    this.serverKey = mergedConfig.serverKey;
    this.clientKey = mergedConfig.clientKey;
  }

  /**
   * @return core API base URL
   */
  getCoreApiBaseUrl(): string {
    return this.isProduction
      ? ApiConfig.CORE_PRODUCTION_BASE_URL
      : ApiConfig.CORE_SANDBOX_BASE_URL;
  }

  /**
   * @return snap API base URL
   */
  getSnapApiBaseUrl(): string {
    return this.isProduction
      ? ApiConfig.SNAP_PRODUCTION_BASE_URL
      : ApiConfig.SNAP_SANDBOX_BASE_URL;
  }

  getInvoiceApiBaseUrl(): string {
    return this.isProduction
      ? ApiConfig.INVOICE_PRODUCTION_BASE_URL
      : ApiConfig.INVOICE_SANDBOX_BASE_URL;
  }

  /**
   * @return Iris API base URL
   */
  getIrisApiBaseUrl(): string {
    return this.isProduction
      ? ApiConfig.IRIS_PRODUCTION_BASE_URL
      : ApiConfig.IRIS_SANDBOX_BASE_URL;
  }
}
