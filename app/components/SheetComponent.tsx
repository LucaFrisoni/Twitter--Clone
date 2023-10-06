"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Menu } from "lucide-react";
import SidebarMobile from "./Layout/SidebarMobile";
const SheetComponent = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black/90">
        <div className="">
          <SidebarMobile toggleSheet={toggleSheet}></SidebarMobile>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
