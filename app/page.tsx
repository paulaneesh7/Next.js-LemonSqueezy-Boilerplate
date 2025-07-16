// src/app/page.tsx (App Router)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CodeIcon,
  DatabaseIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  Github, // Assuming this is your Github icon from lucide-react
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center bg-background text-foreground">
      {/* Navbar (Implied from your setup) */}
      {/* Assuming a navbar that handles "LEMONSQUEEZY" branding and "Sign In" */}

      {/* Hero Section - Boilerplate Focus */}
      <section className="relative flex w-full flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-20 text-center dark:from-gray-900 dark:to-gray-800 md:py-32">
        {/* Ensure 'container' and 'mx-auto' are used for centering main content */}
        <div className="container max-w-5xl mx-auto px-4"> {/* ADDED mx-auto explicitly */}
          <h1 className="mt-5 md:mt-0 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Next.js SaaS Boilerplate
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Jumpstart your next project with a robust foundation: Next.js 14,
            Auth.js, Prisma, PostgreSQL, and Lemon Squeezy integration.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="https://github.com/paulaneesh7/Next.js-LemonSqueezy-Boilerplate"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="px-8 py-3 text-lg">
                <Github className="mr-2 h-5 w-5" />
                Clone on GitHub
              </Button>
            </Link>
            <Link href="/pricing" passHref>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                See Live Demo (Payment Flow)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack / Features Section */}
      <section
        id="features"
        className="w-full bg-card py-16 dark:bg-card-dark md:py-24"
      >
        {/* Ensure 'container' and 'mx-auto' are used for centering main content */}
        <div className="container max-w-6xl mx-auto px-4 text-center"> {/* ADDED mx-auto explicitly */}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What's Included
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A battle-tested setup to accelerate your SaaS development.
          </p>

          {/* This is the grid container for the cards */}
          {/* Ensure 'mx-auto' is correctly applied to center the grid within its parent */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto"> {/* 'mx-auto' IS CORRECTLY HERE */}
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <CodeIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Next.js 14 (App Router)
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Modern full-stack framework with Server Components & API Routes.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <ShieldCheckIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Auth.js (NextAuth.js)
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Secure authentication with Google OAuth integration.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <DatabaseIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Prisma & PostgreSQL
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Type-safe ORM for database management with Neon.tech.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <CreditCardIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Lemon Squeezy Payments
              </h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Integrated one-time payment flow with webhook handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started / Call to Action */}
      <section className="w-full py-16 text-center md:py-24">
        {/* Ensure 'container' and 'mx-auto' are used for centering main content */}
        <div className="container max-w-4xl mx-auto px-4"> {/* ADDED mx-auto explicitly */}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Build?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started by cloning the repository and following the setup
            instructions in the README.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="https://github.com/paulaneesh7/Next.js-LemonSqueezy-Boilerplate?tab=readme-ov-file#nextjs-lemonsqueezy-boilerplate"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="px-10 py-4 text-xl">
                Read the Docs & Setup
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full border-t bg-card py-8 text-center text-muted-foreground">
        {/* Ensure 'container' and 'mx-auto' are used for centering main content */}
        <div className="container px-4 mx-auto"> {/* ADDED mx-auto explicitly */}
          <p>
            &copy; {new Date().getFullYear()} Next.js SaaS Boilerplate. Built
            for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}