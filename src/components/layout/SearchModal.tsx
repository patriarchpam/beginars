"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  trigger: React.ReactElement;
}

const recentSearches = ["Wool Coat", "Linen Trousers", "Crossbody Bag", "T-Shirt"];

const popularProducts = [
  {
    id: "1",
    name: "Minimalist Wool Coat",
    price: 299.00,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop",
  }
];

export function SearchModal({ trigger }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-[600px] gap-0 p-0 overflow-hidden rounded-2xl" showCloseButton={false}>
        <DialogHeader className="p-4 sm:p-6 border-b border-border">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 w-full pl-11 pr-4 border-none bg-transparent focus-visible:ring-0 text-lg shadow-none"
              autoFocus
            />
            {query && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="p-4 sm:p-6 bg-muted/30">
          {!query ? (
            <div className="space-y-8">
              {/* Recent Searches */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <Button 
                      key={term} 
                      variant="secondary" 
                      size="sm"
                      className="rounded-full bg-background"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Popular Products */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Popular Now</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      className="flex items-center gap-4 p-2 rounded-xl hover:bg-background transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative h-16 w-12 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Searching for "{query}"...</p>
              <Button render={<Link href={`/search?q=${query}`} />} onClick={() => setIsOpen(false)}>
                View all results
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
