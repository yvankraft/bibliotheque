"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface Props {
  href: string;
  text: string;
}

const arrowVariants: Variants = {
  rest: { x: 0, opacity: 1 },
  hover: {
    x: 6,
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
  },
  pressed: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function SeeMoreButton({ href, text }: Props) {
  return (
    <Link href={href} className="flex justify-center no-underline ">
      <motion.button
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
        className="mt-4 px-4 py-2 flex flex-row items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white transition-colors duration-300 group rounded-2xl"
      >
        <span className=" md:text-sm font-bold uppercase tracking-wider whitespace-nowrap ">
          {text}
        </span>

        <motion.svg
          variants={arrowVariants}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </motion.svg>
      </motion.button>
    </Link>
  );
}
