"use client";

import React from "react";

import Image, { type ImageProps } from "next/image";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function CardProduct({
  name,
  price,
  productImage,
  description,
  buttonChildren,
  onButtonClick,
}: {
  name: string;
  price: number;
  productImage: ImageProps["src"];
  description: string;
  buttonChildren: React.ReactNode;
  onButtonClick?: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative max-w-[350px] w-full overflow-hidden rounded-xl bg-neutral-950"
    >
      <div className="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(51, 51, 51, 0.4), transparent 80%)`,
        }}
      />
      <div className="relative flex flex-col gap-3 rounded-xl border border-white/10 px-4 py-5">
        <div className="space-y-2">
          <Image
            src={productImage}
            alt="Product image"
            height={10}
            width={10}
            className="rounded-xl h-52 w-full object-cover opacity-75"
          />
          <div className="flex flex-row items-center justify-between pt-2">
            <h3 className="text-xl font-semibold text-neutral-200">{name}</h3>
            <p className="text-[13px] text-neutral-300 select-none">${price}</p>
          </div>
          <p className="text-sm leading-[1.5] text-neutral-400 pb-3">
            {description}
          </p>
          <button
            className="inline-flex items-center justify-center gap-1 text-sm py-3 px-4 font-semibold bg-white text-black rounded-lg duration-300 hover:bg-white/70 w-full"
            type="button"
            onClick={onButtonClick}
          >
            {buttonChildren}
          </button>
        </div>
      </div>
    </div>
  );
}
