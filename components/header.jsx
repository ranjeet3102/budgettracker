
import { SignedIn ,SignedOut, SignInButton, UserButton,SignUpButton} from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkuser";


const Header = async () => {

  await checkUser();
  
  return (
   <div className="fixed top-0 w-full bg-[#f5f5f5] z-50 border-b border-gray-200">

      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
       <Link href="/" className="flex items-center gap-1">
  <Image
    src="/logo1.png"
    alt="SmartSpend logo"
    height={60}
    width={60}
    className="h-12 w-12 object-contain"
  />
  <span className="text-2xl font-bold hidden sm:inline">
    <span className="text-gray-700">$mart</span>
    <span className="text-orange-500">Spend</span>
  </span>
</Link>

       <div className="flex items-center space-x-6 ">
        
        <SignedIn>
          <Link href={"/dashboard"} className="text-black  flex item-center gap-2 ">
           <Button variant="outline" className="hover:bg-gray-300">
            <LayoutDashboard size={18}/>
            <span className="hidden md:inline">Dashboard</span></Button>
           </Link>

          <Link href={"/transaction/create"}>
           <Button  className="flex item-center gap-2">
            <PenBox size={18}/>
            <span className="hidden md:inline">Add Transaction</span></Button>
           </Link>
        </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
              appearance={{elements: {avatarBox:"w-10 h-10"}}}/>
            </SignedIn>
       </div>
      </nav>
    </div>
  )
}

export default Header;
