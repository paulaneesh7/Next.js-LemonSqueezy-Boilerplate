# Next.js-LemonSqueezy-Boilerplate


This project serves as a comprehensive boilerplate for building modern web applications with Next.js, incorporating user authentication, database management, and payment processing via Lemon Squeezy. It's designed to be a robust starting point for a SaaS application. (Personal use as of now)

This is a Next.js project bootstrapped with `create-next-app`.


### Features


- **Next.js 14+**: Modern React framework for building full-stack applications.
- **Shadcn UI**: Beautiful, re-usable, and accessible UI components.
- **Auth.js (NextAuth.js)**: Robust authentication system with Google OAuth integration.
- **Prisma**: Powerful ORM for seamless database interaction (PostgreSQL).
- **Neon Database**: Serverless PostgreSQL database for scalability.
- **Lemon Squeezy Integration**: One-time payment processing for product access.



### Getting Started


Follow these steps to set up the project locally.

1. Environment Variables


    Create a .env.local file in the root of your project and populate it with the following:

    ```
        # Database
        DATABASE_URL="postgresql://user:password@host:port/database" # Your Neon PostgreSQL connection string

        # Auth.js (NextAuth.js)
        AUTH_SECRET="your_nextauth_secret_here" # Generate a strong secret: openssl rand -base64 32
        AUTH_GOOGLE_ID="your_google_oauth_client_id"
        AUTH_GOOGLE_SECRET="your_google_oauth_client_secret"

        # Lemon Squeezy API
        LEMON_SQUEEZY_API="Bearer_your_lemon_squeezy_api_key" # From Lemon Squeezy dashboard -> Settings -> API
        LEMON_SQUEEZY_STORE_ID="your_lemon_squeezy_store_id" # From Lemon Squeezy dashboard -> Settings -> General
        LEMON_SQUEEZY_VARIANT_ID="your_lemon_squeezy_variant_id" # From Lemon Squeezy dashboard -> Products -> Your Product -> Your Variant
        LEMON_SQUEEZY_WEBHOOK_SIGNATURE="your_webhook_secret_from_lemonsqueezy" # From Lemon Squeezy dashboard -> Settings -> Webhooks

        # Application URL
        NEXT_PUBLIC_APP_URL="http://localhost:3000" # Your app's public URL for redirects
    ```


2. Install Dependencies

    ```
        npm install
        # or
        yarn install
        # or
        pnpm install
        # or
        bun install
    ```



3. Database Setup (Prisma)

    Ensure your DATABASE_URL in .env.local is correct.


    ```
        # Generate Prisma Client (after modifying schema.prisma)
        npx prisma generate

        # Apply database migrations
        npx prisma migrate dev --name init
    ```



4. Lemon Squeezy Configuration


    Before running the application, ensure your Lemon Squeezy account and product are set up:


    - Create a Store in Lemon Squeezy.
    - Set up Payouts to receive funds.
    - Create a Product (e.g., "AI Thumbnail Generator Access") with a one-time price of $10.
    - Create a Variant for that product (even if it's the only one). Get the Variant ID and store it in LEMON_SQUEEZY_VARIANT_ID.
    - Configure Redirect URLs: For your product's variant in Lemon Squeezy, set the following:
        - Redirect after purchase: https://your-app-url.com/dashboard
        - Cancel URL: https://your-app-url.com/pricing
        - (Optional) Configure a receipt button to lead back to your dashboard.
    - Get your API Key (LEMON_SQUEEZY_API) and Webhook Secret (LEMON_SQUEEZY_WEBHOOK_SIGNATURE).




5. Run the Development Server

    ```
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
    ```



    Open http://localhost:3000 with your browser to see the result.

    You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

6. Test the Payment Flow

    1. Navigate to /pricing (or click the "Get Started" button on the homepage).
    2. Sign in using Google OAuth.
    3. Click "Pay Now". You should be redirected to the Lemon Squeezy checkout page.
    4. Complete a test payment.
    5. Lemon Squeezy should redirect you back to /dashboard (as configured in the LS dashboard).