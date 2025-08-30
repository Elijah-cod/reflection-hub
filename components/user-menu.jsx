"use client"

import { UserButton } from "@clerk/nextjs"
import { ChartNoAxesGantt } from "lucide-react"


const UserMenu = () => {
    return <UserButton>

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