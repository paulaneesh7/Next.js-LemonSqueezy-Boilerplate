// src/app/dashboard/page.tsx

import { auth } from "@/auth"; // Your Auth.js configuration
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"; // For redirection in Server Components

export default async function DashboardPage() {
  const session = await auth(); // Get the current user session

  // 1. Check if the user is authenticated at all
  if (!session?.user?.email) {
    // If no session or no email in session, redirect to login
    // You might redirect to a generic sign-in page, or specifically to Google OAuth
    redirect("/"); // Or redirect("/login"); or redirect("/pricing"); depending on your app flow.
  }

  // 2. Fetch the user's full record from the database
  // We need their 'id' to query Prisma, which comes from Auth.js session after successful login
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, // Using email as unique identifier for lookup
    select: {
      hasPaidForAccess: true,
      name: true, // Also fetch name for a personalized greeting
    },
  });

  // 3. Check if user exists in DB and if they have paid
  if (!user || !user.hasPaidForAccess) {
    // If user not found in DB (unlikely if authenticated) OR they haven't paid,
    // redirect them to the pricing/payment page.
    console.log(`User ${session.user.email} tried to access dashboard without payment. Redirecting.`);
    redirect("/pricing"); // Or wherever your pricing/payment page is
  }

  // If we reach here, the user is authenticated and has paid!
  // You can now render your actual dashboard content.

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      <h1 className="text-4xl font-bold">
        Welcome to your Dashboard, {user.name || session.user.name || "User"}!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Start generating amazing YouTube thumbnails!
      </p>
      {/*
        This is where your AI thumbnail generator application logic and UI would go.
        e.g., <ThumbnailGeneratorApp />
      */}
      <div className="mt-8 rounded-lg border bg-card p-6 text-center shadow-lg">
          <p className="text-xl font-semibold text-primary">Access Status: Paid!</p>
          <p className="mt-2 text-muted-foreground">Thank you for your purchase. Enjoy all features.</p>
      </div>
    </div>
  );
}