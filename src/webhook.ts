import { createHash } from "crypto";
import { MidtransError } from "./midtransError";
import { MidtransWebhookBody } from "./types";

export class WebhookHandler {
  private readonly serverKey: string;

  constructor(serverKey: string) {
    if (!serverKey) {
      throw new MidtransError("Server key is required", 400);
    }
    this.serverKey = serverKey;
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

      if (!order_id || !status_code || !gross_amount || !signature_key) {
        throw new MidtransError(
          "Missing required fields for signature verification",
          400,
        );
      }

      const stringToHash = `${order_id}${status_code}${gross_amount}${this.serverKey}`;

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
