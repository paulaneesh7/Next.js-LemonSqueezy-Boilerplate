// src/app/page.tsx (App Router) or src/pages/index.tsx (Pages Router)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon, ScissorsIcon, ImageIcon } from "lucide-react"; // Example icons, install 'lucide-react' if you haven't

// You might want to install lucide-react if you don't have it already:
// npm install lucide-react

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-20 text-center dark:from-gray-900 dark:to-gray-800 md:py-32">
        <div className="container max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Unleash Your Video's Potential with AI-Powered Thumbnails
          </h1>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Generate captivating YouTube thumbnails in seconds, then customize them with our intuitive editor. Get more clicks, more views.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/pricing" passHref>
              <Button size="lg" className="px-8 py-3 text-lg">
                Get Started for $10 (One-Time)
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-card py-16 dark:bg-card-dark md:py-24">
        <div className="container max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Our Thumbnail Generator?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We combine cutting-edge AI with user-friendly editing tools to make thumbnail creation effortless.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <SparklesIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">AI-Powered Generation</h3>
              <p className="mt-2 text-muted-foreground">
                Instantly create stunning thumbnails from your video content using advanced AI algorithms.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <ScissorsIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Intuitive Editor</h3>
              <p className="mt-2 text-muted-foreground">
                Fine-tune your designs with an easy-to-use editor. Add text, shapes, and effects.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <ImageIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Custom Image Uploads</h3>
              <p className="mt-2 text-muted-foreground">
                Integrate your own images and branding elements seamlessly into your thumbnails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 text-center md:py-24">
        <div className="container max-w-4xl px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Boost Your YouTube Views?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of creators who are already getting more clicks with our AI thumbnail generator.
          </p>
          <div className="mt-8">
            <Link href="/pricing" passHref>
              <Button size="lg" className="px-10 py-4 text-xl">
                Get Instant Access for $10
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Optional: Footer (You might have this in a separate component) */}
      <footer className="mt-auto w-full border-t bg-card py-8 text-center text-muted-foreground">
        <div className="container px-4">
          <p>&copy; {new Date().getFullYear()} AI Thumbnail Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}