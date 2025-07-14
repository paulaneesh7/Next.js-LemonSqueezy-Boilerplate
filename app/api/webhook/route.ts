
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Ensures this route is dynamic and not cached

export async function POST(request: NextRequest) {
  const lemonSqueezyWebhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;

  if (!lemonSqueezyWebhookSecret) {
    console.error(
      "LEMON_SQUEEZY_WEBHOOK_SIGNATURE is not set in environment variables."
    );
    return new NextResponse("Webhook secret not configured.", { status: 500 });
  }

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature"); // Get the x-signature header

    if (!signature) {
      console.error("Lemon Squeezy signature header missing.");
      return new NextResponse("Signature header missing.", { status: 401 });
    }

    const hmac = crypto.createHmac("sha256", lemonSqueezyWebhookSecret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      throw new Error("Invalid Lemon Squeezy webhook signature.");
    }

    const payload = JSON.parse(rawBody);

    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data; // This will contain { user_id: "...", user_email: "..." }
    const orderId = payload.data.id; // Lemon Squeezy Order ID (e.g., "5946220")
    const orderStatus = payload.data.attributes.status; // Order status (e.g., "paid")
    const lemonSqueezyCustomerEmail = payload.data.attributes.user_email; // Customer's email from LS order

    console.log(`Received Lemon Squeezy event: ${eventName}`);
    console.log(`Order ID: ${orderId}, Status: ${orderStatus}`);
    console.log(`Custom Data: ${JSON.stringify(customData)}`);
    console.log(`Lemon Squeezy Customer Email: ${lemonSqueezyCustomerEmail}`);

    // --- Handling the 'order_created' event ---
    if (eventName === "order_created") {
      // Prioritize userId from custom_data, as you pass it from your Auth.js session
      let userId = customData?.user_id;
      let userEmail = customData?.user_email || lemonSqueezyCustomerEmail; // Fallback to LS email if custom_data.user_email isn't present

      // If custom_data.user_id is not present (e.g., due to an old checkout, or issue)
      // you might try to look up the user by email, but this is less reliable.
      // Given your current frontend, user_id should always be present.
      if (!userId && userEmail) {
        console.warn(`Webhook: custom_data.user_id missing for order ${orderId}, attempting lookup by email: ${userEmail}`);
        const userByEmail = await prisma.user.findUnique({
          where: { email: userEmail },
          select: { id: true } // Only select the ID
        });
        userId = userByEmail?.id;
      }


      if (!userId) {
        console.error(`Webhook: Could not determine user ID for order ${orderId}. Missing from custom data and no email to fallback.`);
        return new NextResponse("User ID not found in webhook payload.", { status: 400 });
      }

      // Find the user in your database using the extracted userId
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        console.error(`Webhook: User not found in database with ID ${userId} for order ${orderId}. This user might be external or deleted.`);
        return new NextResponse("User not found in database.", { status: 404 });
      }

      // Proceed only if the order is 'paid' and the user hasn't already received access
      if (orderStatus === "paid" && !user.hasPaidForAccess) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            hasPaidForAccess: true,
            lemonSqueezyOrderId: orderId, // Store the Lemon Squeezy Order ID
            accessGrantedAt: new Date(),
          },
        });
        console.log(`Webhook: User ${user.email} (ID: ${userId}) access granted for order ${orderId}.`);
      } else if (orderStatus === "paid" && user.hasPaidForAccess) {
          console.log(`Webhook: User ${user.email} (ID: ${userId}) already has access. Order ${orderId} is paid.`);
      } else {
          console.log(`Webhook: Order ${orderId} for user ${user.email} is not 'paid' yet (status: ${orderStatus}). No access update.`);
      }
    } else {
      console.log(`Webhook: Ignoring event of type ${eventName}`);
    }

    // Acknowledge receipt of the webhook for any event (even unhandled ones)
    return NextResponse.json({ message: "Webhook received and processed." }, { status: 200 });

  } catch (error: unknown) {
    console.error("Webhook processing error:", error);

    if (error instanceof Error && error.message.includes("signature")) {
      return new NextResponse("Invalid webhook signature.", { status: 401 });
    }

    return new NextResponse("Internal server error during webhook processing.", {
      status: 500,
    });
  }
}