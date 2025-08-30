import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Button } from "./ui/button";
import { FolderOpen, PenBox } from "lucide-react";
import UserMenu from "./user-menu";

const Header = () => {
    return(
        <header className="container mx-auto">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src={"/logo.jpg"}
                        alt = "Logo"
                        width={200}
                        height={60}
                        className="h-30 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-4">

                    <SignedIn>
                        <Link href="/dashboard#collections">
                            <Button variant="outline" >
                            <FolderOpen />
                            <span className="hidden md:inline">
                                Collections
                            </span>
                            </Button>
                        </Link>
                    </SignedIn>

                    <Link href="/journal/write">
                        <Button variant="journal" >
                            <PenBox />
                            <span className="hidden md:inline">
                                Write New
                            </span>
                            </Button>
                    </Link>

                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button variant="outline">Login</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserMenu />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default Header


