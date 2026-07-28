# Implementation Plan: Backend & Payment Integration

We are moving on to Phase 6: Making the Checkout real by integrating a backend database and a live payment gateway for processing Naira (NGN) transactions.

## User Review Required
> [!IMPORTANT]
> To process real payments, we need to choose our payment provider and set up the backend. Please review this strategy and confirm if you want me to proceed with setting it up.

## Open Questions
- Do you have a preference between **Paystack** or **Flutterwave**? (Paystack is generally easier to set up and very popular for Next.js apps).
- I will set up **Supabase** for the database to store the orders and user accounts. Is that okay?

## Proposed Changes

### 1. Payment Integration (Paystack)
- Create a Next.js API route (`src/app/api/checkout/route.ts`) to initialize a Paystack transaction securely on the server.
- Update `src/app/checkout/page.tsx` so that when the user clicks "Proceed to Payment", it calls our API route, gets an access URL, and redirects the user to the secure Paystack checkout page.

### 2. Database Integration (Supabase)
- Set up the Supabase client (`src/lib/supabase.ts`).
- Create an `orders` table structure in the database to store:
  - Customer details (name, email, address).
  - Order items (from our Zustand cart).
  - Total amount and payment status.
- Once Paystack confirms the payment is successful, we will update the order status in Supabase to "Paid".

### 3. Success Page
#### [NEW] `src/app/checkout/success/page.tsx`
- Create a beautiful "Order Confirmed" page that thanks the user and displays their order number.
- This page will automatically clear the Zustand cart.

## Verification Plan
1. I will use Paystack's **Test Mode** (no real money involved) to simulate a complete checkout flow.
2. I will verify that clicking "Proceed to Payment" successfully opens the Paystack test modal.
3. I will verify that the order data is correctly sent to our database.
