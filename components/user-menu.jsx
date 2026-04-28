"use client"

import { UserButton } from "@clerk/nextjs"
import { ChartNoAxesGantt } from "lucide-react"


const UserMenu = () => {
    return <UserButton
    appearance={{
        elements: {
            userButtonTrigger: "flex h-10 w-10 items-center justify-center rounded-md border border-transparent",
            userButtonAvatarBox: "h-10 w-10",
        },
    }}
    >

    <UserButton.MenuItems>
        <UserButton.Link 
        label="Dashboard"
        labelIcon = {<ChartNoAxesGantt size={18} />}
        href="/dashboard"
        />
        <UserButton.Action label="manageAccount" />
    </UserButton.MenuItems>
    


    </UserButton>
}

export default UserMenu
