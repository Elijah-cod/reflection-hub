import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { requireCurrentDbUser } from "@/lib/current-user";

export const dynamic = "force-dynamic";

const Layout = async ({children}) => {
    noStore()
    await requireCurrentDbUser()

    return(
        <div className="container mx-auto">{children}</div>
    )
}


export default Layout
