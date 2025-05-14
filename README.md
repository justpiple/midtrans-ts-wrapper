# Unofficial Midtrans TypeScript Wrapper

A TypeScript wrapper for Midtrans Payment Gateway API. This library provides type-safe methods to interact with Midtrans payment services including Snap, Invoice, and Webhook handling.

[![npm version](https://img.shields.io/npm/v/midtrans-ts-wrapper)](https://www.npmjs.com/package/midtrans-ts-wrapper)

## Installation

```bash
npm install midtrans-ts-wrapper
```

## Quick Start

```typescript
import { Snap, Invoice, WebhookHandler } from "midtrans-ts-wrapper";

// Configuration
const isSandbox = clientKey.includes("SB-");
const apiConfig = {
  isProduction: !isSandbox,
  serverKey: serverKey, // Your server key
  clientKey: clientKey, // Your client key
};

// Initialize clients
const snapClient = new Snap(apiConfig);
const invoiceClient = new Invoice(apiConfig);
const webhookHandler = new WebhookHandler(apiConfig.serverKey);

// Create a transaction using Snap
const transaction = await snapClient.createTransaction({
  transaction_details: {
    order_id: "ORDER-123",
    gross_amount: 100000,
  },
  customer_details: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  },
});

// Create an invoice
const invoice = await invoiceClient.createInvoice({
  transaction_details: {
    order_id: "INV-123",
    gross_amount: 100000,
  },
  customer_details: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  },
});

// Verify webhook signature
const isValid = webhookHandler.verifySignature(webhookNotification);
```

## Available Modules

### Snap

- `createTransaction()` - Create a new transaction
- `createTransactionToken()` - Get transaction token
- `createTransactionRedirectUrl()` - Get redirect URL

### Invoice

- `createInvoice()` - Create a new invoice
- `createInvoicePaymentLink()` - Get payment link URL
- `createInvoicePdfUrl()` - Get invoice PDF URL

### WebhookHandler

- `verifySignature()` - Verify webhook notification signature

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
