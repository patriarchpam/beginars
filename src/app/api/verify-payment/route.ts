import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, orderData } = body;

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Missing transaction reference" },
        { status: 400 }
      );
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const isMock =
      !paystackSecretKey ||
      paystackSecretKey === "sk_test_placeholder_key_replace_me" ||
      reference.startsWith("mock_");

    let isVerified = false;

    if (isMock) {
      // Mock verification for development / testing without live keys
      console.log(`[API verify-payment] Mock verification for ref: ${reference}`);
      isVerified = true;
    } else {
      // Live / Real test Paystack verification via Paystack REST API
      const paystackRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
        {
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const paystackData = await paystackRes.json();

      if (paystackData.status && paystackData.data?.status === "success") {
        isVerified = true;
      } else {
        return NextResponse.json(
          {
            success: false,
            error: paystackData.message || "Payment verification failed",
          },
          { status: 400 }
        );
      }
    }

    if (isVerified) {
      const dbOrderData = {
        user_id: orderData.user_id || null,
        customer_email: orderData.customer_email,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone || null,
        delivery_address: orderData.delivery_address || null,
        delivery_state: orderData.delivery_state || null,
        total_amount: orderData.total_amount,
        items: orderData.items,
        paystack_reference: reference,
        status: "paid",
      };

      const supabase = await createClient();
      const { data, error } = await supabase
        .from("orders")
        .insert([dbOrderData])
        .select();

      if (error) {
        console.error("[API verify-payment] Supabase insert error:", error);
        // Even if DB insert fails (e.g. table doesn't exist yet in Supabase UI), return partial success with notice
        return NextResponse.json(
          {
            success: true,
            warning: "Payment verified but database insert failed. Please ensure Supabase 'orders' table is created.",
            dbError: error.message,
          },
          { status: 200 }
        );
      }

      return NextResponse.json({
        success: true,
        order: data?.[0] || null,
      });
    }

    return NextResponse.json(
      { success: false, error: "Payment verification unconfirmed" },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("[API verify-payment] Exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
