export type EnabledPayments =
  | "credit_card"
  | "echannel"
  | "permata_va"
  | "bca_va"
  | "bni_va"
  | "bri_va"
  | "cimb_va"
  | "gopay"
  | "shopeepay"
  | "alfamart"
  | "indomaret"
  | "akulaku"
  | "kredivo";

export type TransactionDetails = {
  order_id: string;
  gross_amount: number;
};

export type Expiry = {
  start_time?: string;
  unit: "minute" | "hour" | "day";
  duration: number;
};

export interface ItemDetails {
  id?: string;
  price: number;
  quantity: number;
  name: string;
  brand?: string;
  category?: string;
  merchant_name?: string;
  url?: string;
}

export interface Address {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country_code?: string;
}

export interface CustomerDetails {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  billing_address?: Address;
  shipping_address?: Address;
}

export interface CreditCard {
  save_card?: boolean;
  secure?: boolean;
  channel?: string;
  bank?: string;
  installment?: {
    required?: boolean;
    terms?: Record<string, number[]>;
  };
  whitelist_bins?: string[];
  dynamic_descriptor?: {
    merchant_name?: string;
    city_name?: string;
    country_code?: string;
  };
}

export interface Callbacks {
  finish?: string;
  error?: string;
}

export interface RequestBody {
  transaction_details: TransactionDetails;
  item_details?: ItemDetails[];
  customer_details?: CustomerDetails;
  enabled_payments?: EnabledPayments[];
  credit_card?: CreditCard;
  bca_va?: {
    va_number?: string;
    sub_company_code?: string;
    free_text?: {
      inquiry?: { en: string; id: string }[];
      payment?: { en: string; id: string }[];
    };
  };
  permata_va?: {
    va_number?: string;
    recipient_name?: string;
  };
  callbacks?: Callbacks;
  expiry?: Expiry;
}

export interface CreateTransactionSuccessResponse {
  token: string;
  redirect_url: string;
}

/**
 * Response interface for transaction error from Midtrans
 * @see https://docs.midtrans.com/reference/sample-response
 */
export interface CreateTransactionErrorResponse {
  /** List of error messages explaining what went wrong */
  error_messages: string[];
}

export type CreateTransactionResponse =
  | CreateTransactionSuccessResponse
  | CreateTransactionErrorResponse;

/**
 * Response interface for transaction status from Midtrans
 * @see https://docs.midtrans.com/reference/sample-response
 */
export interface TransactionStatusResponse {
  /** Status code of the transaction charge result */
  status_code: string;
  /** Description of the transaction charge result */
  status_message: string;
  /** Transaction ID provided by Midtrans */
  transaction_id: string;
  /** Order ID specified by the merchant */
  order_id: string;
  /** Total amount of the transaction in IDR */
  gross_amount: string;
  /** Payment method used by the customer */
  payment_type: string;
  /** Timestamp of the transaction (ISO 8601, GMT+7) */
  transaction_time: string;
  /** Current status of the transaction */
  transaction_status:
    | "capture"
    | "settlement"
    | "deny"
    | "authorize"
    | "pending"
    | "expire"
    | "cancel";
  /** Fraud Detection System (FDS) result */
  fraud_status?: "accept" | "challenge" | "deny";
  /** Approval code from the payment provider */
  approval_code?: string;
  /** Key to validate notifications from Midtrans */
  signature_key?: string;
  /** Acquiring bank of the transaction */
  bank?: string;
  /** Masked credit card number (first 8 and last 4 digits) */
  masked_card?: string;
  /** Response code from the payment channel provider */
  channel_response_code?: string;
  /** Response message from the payment channel provider */
  channel_response_message?: string;
  /** Type of card used in the transaction */
  card_type?: "credit" | "debit";
  /** Type of payment (e.g., GOPAY_WALLET, PAY_LATER) */
  payment_option_type?: string;
  /** ShopeePay reference number (if applicable) */
  shopeepay_reference_number?: string;
  /** Reference ID given by the payment provider */
  reference_id?: string;
  /** Cumulative refund amount in IDR */
  refund_amount?: string;
  /** List of refund details for the transaction */
  refunds?: RefundDetail[];
}

/**
 * Interface for refund details in a transaction
 */
export interface RefundDetail {
  /** Midtrans refund ID */
  refund_chargeback_id: string;
  /** Amount refunded in IDR */
  refund_amount: string;
  /** Timestamp of when the refund was created */
  created_at: string;
  /** Reason for the refund */
  reason: string;
}

/**
 * Response interface for cancelled transaction
 */
export interface CancelTransactionResponse {
  /** Status code of the transaction cancel result */
  status_code: string;
  /** Description of the transaction cancel result */
  status_message: string;
  /** Transaction ID assigned by Midtrans */
  transaction_id: string;
  /** First 8-digits and last 4-digits of the customer's credit card (if applicable) */
  masked_card?: string;
  /** Order ID specified by the merchant */
  order_id: string;
  /** Payment method used by the customer */
  payment_type: string;
  /** Timestamp of the transaction (ISO 8601 format, GMT+7) */
  transaction_time: string;
  /** Status of the transaction (e.g., "cancel") */
  transaction_status: "cancel";
  /** Fraud Detection System (FDS) result */
  fraud_status?: "accept" | "deny";
  /** Acquiring bank for the transaction (if applicable) */
  bank?: string;
  /** Total amount of the transaction in IDR */
  gross_amount: string;
}

export interface ItemDetail {
  item_id?: string;
  description: string;
  quantity: number;
  price: number;
}
export interface PaymentLinkOptions {
  is_custom_expiry?: boolean;
  enabled_payments: string[];
  credit_card?: {
    secure: boolean;
    type: string;
    bank: string;
    whitelist_bins: string[];
    installment: {
      required: boolean;
      terms: {
        mandiri: number[];
        bca: number[];
        bni: number[];
        bri: number[];
        cimb: number[];
        maybank: number[];
        offline: number[];
      };
    };
  };
  bca_va?: {
    /** 11 characters */
    number: string;
    free_text?: {
      inquiry?: { id: string; en: string }[];
      payment?: { id: string; en: string }[];
    };
  };
  /** 1-8 characters */
  bni_va?: { number: string };
  permata_va?: {
    /** 10 characters */
    number: string;
    recipient_name?: string;
  };
  /** 1-13 characters */
  bri_va?: { number: string };
  /** 1-16 characters */
  cimb_va?: { number: string };
  expiry?: {
    unit: string;
    duration: number;
    start_time: string;
  };
}

/**
 * Interface for customer details in invoice
 */
export interface CustomerDetailsInvoice {
  /** Optional, max 36 characters */
  id?: string;
  /** Required, max 40 characters */
  name: string;
  /** Optional, max 255 characters */
  email?: string;
  /** Optional, max 15 characters, cannot start with "0" */
  phone?: string;
}

/**
 * Interface for amount details in invoice
 */
export interface AmountDetails {
  /** Integer 0-99999999999 */
  vat: string;
  /** Integer 0-99999999999 */
  discount: string;
  /** Optional Integer 0-99999999999 */
  shipping?: string;
}

/**
 * Interface for virtual account details
 */
export interface VirtualAccount {
  name:
    | "bca_va"
    | "mandiri_bill"
    | "bni_va"
    | "bri_va"
    | "cimb_va"
    | "permata_va";
  /** Optional custom VA number with specific length constraints:
   * - bca_va: 11 characters
   * - mandiri_bill: 1-12 characters
   * - bni_va: 1-8 characters
   * - bri_va: 1-13 characters
   * - cimb_va: 1-16 characters
   * - permata_va: 10 characters
   */
  number?: string;
}

export interface InvoiceRequestBody {
  order_id: string;
  invoice_number: string;
  due_date: string;
  invoice_date: string;
  customer_details: CustomerDetailsInvoice;
  payment_type: "payment_link" | "virtual_account";
  reference?: string;
  item_details: ItemDetail[];
  notes?: string;
  payment_link?: PaymentLinkOptions;
  virtual_accounts?: VirtualAccount[];
  amount?: AmountDetails;
}

export interface CreateInvoiceSuccessResponse {
  order_id: string;
  invoice_number: string;
  published_date: string;
  due_date: string;
  invoice_date: string;
  reference?: string;
  customer_details: CustomerDetailsInvoice;
  item_details: ItemDetail[];
  id: string;
  status: "draft" | "pending" | "expired" | "overdue" | "paid" | "voided";
  gross_amount: number;
  pdf_url: string;
  payment_type: "payment_link" | "virtual_account";
  virtual_accounts: VirtualAccount[];
  payment_link_url: string;
}

/**
 * Interface for webhook body from Midtrans
 */
export type MidtransWebhookBody = {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status?: string;
  settlement_time?: string;
  currency: string;
  /** Allow additional fields for forward compatibility */
  [key: string]: unknown;
};
