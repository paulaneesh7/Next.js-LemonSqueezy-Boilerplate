// src/components/PricingPage.tsx (or wherever your PricingPage is)

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function PricingPageComponent({ session }: {session: Session | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayNow = async () => {
    // The backend now relies solely on the session for user.email and user.id
    if (!session || !session.user?.email || !session.user?.id) { // Ensure user.id is also checked
      router.push("/api/auth/signin");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // No need to send userEmail or userId in the body from frontend
        // The backend gets it directly from the session
        body: JSON.stringify({ /* empty or other data if needed */ }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // This 'errorData.message' will come from your backend's NextResponse message
        throw new Error(errorData.message || `Failed to create checkout session (Status: ${response.status})`);
      }

      const { checkoutUrl } = await response.json();
      router.push(checkoutUrl);
      // window.open(checkoutUrl, "_blank");

    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Select the option that best fits your needs
        </p>
      </div>

      <div className="mt-12 w-full max-w-sm">
        <Card className="rounded-lg border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <CardTitle className="text-2xl font-bold text-foreground">Starter</CardTitle>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Test Mode
            </span>
          </CardHeader>
          <CardContent className="px-6 py-0">
            <p className="text-5xl font-extrabold text-foreground">
              $10<span className="text-lg font-medium text-muted-foreground">/one-time</span>
            </p>
            <CardDescription className="mt-4 text-muted-foreground">
              This is the one-time access for the AI Thumbnail Generator.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center p-6 pt-6">
            <Button
              className="w-full py-7 text-lg font-semibold"
              onClick={handlePayNow}
              disabled={isLoading}
            >
              {isLoading ? "Redirecting..." : "Pay Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}