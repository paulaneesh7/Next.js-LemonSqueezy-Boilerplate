import { auth } from "@/auth";
import PricingPageComponent from "@/components/PricingPage";


export default async function PricingPage() {
  
  const session = await auth();

  return (
    <PricingPageComponent session={session}/>
  );
}