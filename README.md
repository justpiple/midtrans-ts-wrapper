# Unofficial Midtrans TypeScript Wrapper

A TypeScript wrapper for Midtrans Payment Gateway API. This library provides type-safe methods to interact with Midtrans payment services.

[![npm version](https://img.shields.io/npm/v/midtrans-ts-wrapper)](https://www.npmjs.com/package/midtrans-ts-wrapper)

## Installation

```bash
npm install midtrans-ts-wrapper
```

## Quick Start

```typescript
import { MidtransClient } from "midtrans-ts-wrapper";

const midtrans = new MidtransClient({
  clientKey: "YOUR_CLIENT_KEY",
  serverKey: "YOUR_SERVER_KEY",
  isProduction: false, // Set to true for production
});

// Create a transaction
const transaction = await midtrans.createTransaction({
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
```

## Available Methods

- `createTransaction()` - Create a new transaction
- `getTransactionStatus()` - Get transaction status
- `cancelTransaction()` - Cancel a transaction
- `expireTransaction()` - Expire a transaction
- `refundTransaction()` - Refund a transaction

## Type Definitions Status

This wrapper is currently in development and not all Midtrans API types are fully implemented. Some types might be incomplete or missing. If you find any missing or incorrect types, please contribute by:

1. Opening an issue to report missing types
2. Submitting a pull request with the type definitions
3. Providing examples of the API responses you're working with

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
