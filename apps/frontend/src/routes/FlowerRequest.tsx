"use client";
import React from "react";
import FlowerCarousel from "@/components/FlowerCarousel.tsx";
import FlowerRequestForm from "@/components/FlowerRequestForm.tsx";

export default function FlowerRequest() {
  return (
    <div className="w-screen h-screen flex flex-row px-60 py-64 space-x-72 font-inter outline-transparent">
      <FlowerRequestForm />
      <FlowerCarousel />
    </div>
  );
}
