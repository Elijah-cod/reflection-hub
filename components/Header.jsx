import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
    return(
        <header className="container mx-auto">
            <nav className="py-6 px-5 flex justify-between items-center">
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

                </div>
            </nav>
        </header>
    )
}

export default Header


