// src/app/api/checkout/route.ts

import { auth } from "@/auth";
import { lemonSqueezyApiInstance } from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      return new NextResponse("Not Authenticated or Missing User Data", {
        status: 401,
      });
    }

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env.LEMON_SQUEEZY_PRODUCT_ID; // Must be the variant ID
    const lsApiKey = process.env.LEMON_SQUEEZY_API;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!storeId || !variantId || !lsApiKey || !appUrl) {
      console.error(
        "Server configuration error: Missing Lemon Squeezy environment variables (Store ID, Variant ID, API Key, App URL)."
      );
      return new NextResponse(
        "Server configuration error. Please check environment variables.",
        { status: 500 }
      );
    }

    const storeIdAsString = storeId.toString();
    const variantIdAsString = variantId.toString();
    const userIdForCustomData = String(user.id);

    // --- CRITICAL CHANGE: Adapting to the curl example's body structure ---
    const response = await fetch(
      `${lemonSqueezyApiInstance.baseURL}checkouts`,
      {
        method: "POST",
        headers: {
          ...lemonSqueezyApiInstance.headers,
          Authorization: `Bearer ${lsApiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              // --- Direct attributes based on curl example ---
              // If you're selling for a fixed $10, you might not need custom_price.
              // If you were overriding it, you'd set it here in cents (e.g., 1000 for $10)
              // custom_price: 1000, // Example for $10 if you want to override

              // These are optional based on the curl example:
              // product_options: {
              //   enabled_variants: [parseInt(variantIdAsString)], // If you want to restrict variants
              // },
              // checkout_options: {
              //   button_color: "#7047EB", // Custom button color
              // },
              // expires_at: "2022-10-30T15:20:06Z", // Example expiration
              // preview: true, // Example for preview mode

              // This is the essential part for user-specific data
              checkout_data: {
                // IMPORTANT: The email field is NOT directly here as 'billable_email'.
                // Lemon Squeezy expects the email to be passed on the checkout page itself
                // or if you use the pre-fill checkout feature with `email` query param.
                // However, you can pass it via custom data if you want it returned in webhooks.
                // If Lemon Squeezy later complains about missing email, you'll need to look at pre-filling the LS URL.

                // This is where you pass your internal user ID
                custom: {
                  user_id: userIdForCustomData, // Use `user_id` as per curl example
                  // Add user's email here too if you want it in custom data
                  user_email: user.email,
                },
                // If you had a discount code to apply dynamically:
                // discount_code: "YOUR_DISCOUNT_CODE",
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: storeIdAsString,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: variantIdAsString,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Lemon Squeezy API Full Error Response:",
        JSON.stringify(errorData, null, 2)
      );
      return new NextResponse(
        `Failed to create checkout session. Check server logs for full error details.`,
        { status: response.status }
      );
    }

    const { data } = await response.json();
    const checkoutUrl = data.attributes.url;

    // --- IMPORTANT: Append redirect URLs to the generated checkout URL ---
    // The curl example implies these are *not* part of the POST body for checkouts.
    // Instead, they are passed as query parameters when redirecting the user.
    const finalCheckoutUrl = new URL(checkoutUrl);
    finalCheckoutUrl.searchParams.set('redirect_url', `${appUrl}/dashboard`);
    finalCheckoutUrl.searchParams.set('cancel_url', `${appUrl}/pricing`);
    finalCheckoutUrl.searchParams.set('checkout[email]', user.email); // Pre-fill email

    return NextResponse.json({ checkoutUrl });
  } catch (error: unknown) {
    console.error("Error in /api/checkout:", error);
    return new NextResponse(
      JSON.stringify({ message: "An unexpected internal server error occurred." }),
      {
        status: 500,
      }
    );
  }
}