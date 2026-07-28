"use client";

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  { id: "all", label: "All Categories" },
  { id: "womens", label: "Women's" },
  { id: "mens", label: "Men's" },
  { id: "accessories", label: "Accessories" },
  { id: "outerwear", label: "Outerwear" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Black", value: "bg-black" },
  { name: "White", value: "bg-white border-gray-200" },
  { name: "Navy", value: "bg-blue-900" },
  { name: "Beige", value: "bg-[#F5F5DC]" },
  { name: "Olive", value: "bg-[#556B2F]" },
];

interface FilterSidebarProps {
  className?: string;
}

export function FilterContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg tracking-tight">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground text-xs">
          Clear All
        </Button>
      </div>

      <Accordion defaultValue={["category", "size", "color"]} className="w-full">
        <AccordionItem value="category" className="border-b-0 mb-4">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <Checkbox id={`cat-${category.id}`} />
                  <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-b-0 mb-4">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {sizes.map((size) => (
                <Label
                  key={size}
                  className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted cursor-pointer transition-colors has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:checked]:border-primary"
                >
                  <input type="checkbox" className="sr-only" />
                  {size}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-3 pt-1">
              {colors.map((color) => (
                <Label
                  key={color.name}
                  className="relative flex cursor-pointer items-center justify-center"
                  title={color.name}
                >
                  <input type="checkbox" className="sr-only peer" />
                  <span className={`h-8 w-8 rounded-full border border-border shadow-sm peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 ${color.value}`} />
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function FilterSidebar({ className = "" }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block w-64 flex-shrink-0 ${className}`}>
        <div className="sticky top-24">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <div className="lg:hidden flex items-center mb-6">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="sm" className="h-10" />}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters & Sort
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
