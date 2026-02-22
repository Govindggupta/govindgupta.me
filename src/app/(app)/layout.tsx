import SiteHeader from "@/components/SiteHeader";
import React from "react";
import { IPadCursorProvider } from "@/components/IPadCursor";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <IPadCursorProvider>
            <div>
                <div className="h-2 sticky top-0 z-50 bg-background"></div>
            <div className="h-full w-full min-h-screen border-x border-subtle">
                <SiteHeader />
                {children}
            </div>
            <div className="h-2 sticky bottom-0 z-50 bg-background"></div>
        </div>
        </IPadCursorProvider>
    )
}