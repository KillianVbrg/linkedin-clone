import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Briefcase, HomeIcon, MessageSquare, SearchIcon, UsersIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      <Link href={"/"}>
        <Image
          className="rounded-lg"
          src="https://links.papareact.com/b3z"
          height={40}
          width={40}
          alt="Logo"
        />
      </Link>

      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input type="text" placeholder="Search" className="bg-transparent flex-1 outline-none" />
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/" className="icon">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </Link>
        
        <Link href="/" className="icon hidden md:flex">
          <UsersIcon className="h-5" />
          <p>Network</p>
        </Link>

        <Link href="/" className="icon hidden md:flex">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </Link>

        <Link href="/" className="icon hidden md:flex">
          <MessageSquare className="h-5" />
          <p>Messaging</p>
        </Link>

        {/* User button if signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Sign in button if not signed in */}
        <SignedOut>
          {/* asChild so the whole button is clickable, not just the text */}
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

export default Header