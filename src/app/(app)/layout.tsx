import React from "react";

export default function Layout({children} : {children: React.ReactNode}) {
    return (
        <div className="h-full w-full min-h-screen border-x border-subtle">
            {children}
        </div>
    )
}