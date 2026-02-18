import React from "react";

export default function Layout({children} : {children: React.ReactNode}) {
    return (
        <div className="h-full w-full min-h-screen border-x border-subtle">
            <div className="p-2">
            {children}
            </div>
        </div>
    )
}