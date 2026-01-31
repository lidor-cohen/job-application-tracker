"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageTabsHeroComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 justify-center mb-8">
            {/* Buttons */}
            <Button
              onClick={() => setActiveTab(0)}
              className={
                activeTab === 0
                  ? ""
                  : "text-muted-foreground bg-gray-100 hover:bg-gray-200"
              }
            >
              Organize Applications
            </Button>
            <Button
              onClick={() => setActiveTab(1)}
              className={
                activeTab === 1
                  ? ""
                  : "text-muted-foreground bg-gray-100 hover:bg-gray-200"
              }
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab(2)}
              className={
                activeTab === 2
                  ? ""
                  : "text-muted-foreground bg-gray-100 hover:bg-gray-200"
              }
            >
              Manage Boards
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {/* Images */}
            <Image
              className={activeTab === 0 ? "block" : "hidden"}
              src="/hero-images/hero1.png"
              alt={"Organize Applications Image"}
              width={1200}
              height={800}
            />
            <Image
              className={activeTab === 1 ? "block" : "hidden"}
              src="/hero-images/hero2.png"
              alt={"Get Hired Image"}
              width={1200}
              height={800}
            />
            <Image
              className={activeTab === 2 ? "block" : "hidden"}
              src="/hero-images/hero3.png"
              alt={"Manage Boards Image"}
              width={1200}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ImageTabsHeroComponent;
