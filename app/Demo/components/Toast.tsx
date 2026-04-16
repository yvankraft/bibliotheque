import { motion } from "framer-motion";

export const Toast = ({ message = "Update Successful", type = "success" }) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-8 right-8 bg-black text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-2xl"
  >
    <div
      className={`w-2 h-2 rounded-full ${type === "success" ? "bg-green-400" : "bg-red-400"}`}
    />
    <span className="text-xs font-bold uppercase tracking-wider">
      {message}
    </span>
  </motion.div>
);
