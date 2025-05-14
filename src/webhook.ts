import { createHash } from "crypto";
import { MidtransError } from "./midtransError";
import { ApiConfig } from "./apiConfig";
import { MidtransWebhookBody } from "./types";

export class WebhookHandler {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Verify the signature key from Midtrans webhook notification
   * @param notification The webhook notification from Midtrans
   * @returns boolean indicating whether the signature is valid
   * @throws MidtransError if verification fails
   */
  public verifySignature(notification: MidtransWebhookBody): boolean {
    try {
      const { order_id, status_code, gross_amount, signature_key } =
        notification;
      const serverKey = this.config.serverKey;

      const stringToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;

      const calculatedSignature = createHash("sha512")
        .update(stringToHash)
        .digest("hex");

      if (calculatedSignature !== signature_key) {
        throw new MidtransError("Invalid signature key", 400);
      }

      return true;
    } catch (error) {
      if (error instanceof MidtransError) {
        throw error;
      }
      throw new MidtransError(
        "Failed to verify webhook signature",
        500,
        null,
        error,
      );
    }
  }
}
