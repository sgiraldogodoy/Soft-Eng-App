import { Button } from "@/components/ui/button.tsx";
import React from "react";

export default function NavbarLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col min-h-screen max-w-[324px] font-inter justify-between px-5 py-5">
        <div className="space-y-4">
          <div className="flex flex-row gap-3 text-theme-blue">
            <img src="BWH%20Logo.svg" alt="BWH Logo" />
            <h1 className="text-left font-inter text-2xl font-bold">
              Brigham and
              <br />
              Women's Hospital
            </h1>
          </div>
          <hr />
          <p>Create Service Requests</p>
          <p>Manage Service Request</p>
        </div>
        <div className="flex flex-col gap-5">
          <hr />
          <Button variant="ghost">Sign Out</Button>
        </div>
      </div>
      <div className="flex-1 min-w-[1000px] overflow-x-hidden">{children};</div>
    </div>
  );
}
