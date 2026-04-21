import { motion } from "framer-motion";

export const MarqueeText = ({
  text = "STRATEGY • DESIGN • DEVELOPMENT • ",
}) => (
  <div className="py-10 overflow-hidden border-y border-zinc-100 whitespace-nowrap bg-white flex">
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="text-6xl font-black italic uppercase tracking-tighter flex shadow-sm"
    >
      <span className="mr-10">{text}</span>
      <span className="mr-10">{text}</span>
      <span className="mr-10">{text}</span>
    </motion.div>
  </div>
);
