"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiTwitter, FiYoutube } from "react-icons/fi";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/composants" },
      { label: "Documentation", href: "/documentation" },
      { label: "Demo", href: "/Demo" },
      { label: "Templates", href: "/dashboard/templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/yvankraft/bibliotheque" },
      { label: "Get started", href: "/auth/signup" },
      { label: "Sign in", href: "/auth/login" },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/yvankraft/bibliotheque",
    icon: FiGithub,
  },
  { label: "Twitter", href: "#", icon: FiTwitter },
  { label: "YouTube", href: "#", icon: FiYoutube },
];

export default function Footer() {
  return (
    <div className="w-full mt-10">
      {/* Carte newsletter */}
      <div className="flex justify-center items-center w-full px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden w-full max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-950 p-10 md:p-16 text-white shadow-2xl"
        >
          {/* Halo décoratif */}
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-slate-500/20 blur-3xl rounded-full pointer-events-none"
          />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              Stay in the loop
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-sm mt-3"
            >
              Subscribe to the newsletter to get the latest Library updates and
              new components.
            </motion.p>

            <motion.form
              variants={itemVariants}
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email address"
                className="bg-zinc-800/80 border border-zinc-700 px-5 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 rounded-xl w-full sm:w-80 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-zinc-900 hover:bg-zinc-200 font-semibold px-6 py-3 text-sm rounded-xl transition active:scale-95 cursor-pointer"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Footer principal */}
      <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 space-y-4">
            <p className="font-extrabold tracking-tight text-lg text-zinc-900 dark:text-white">
              Library
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Visual web builder for developers. Design visually, export
              production-ready code.
            </p>
            <div className="flex gap-2 pt-1">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.title} className="flex flex-col gap-3">
              <h6 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                {group.title}
              </h6>
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-900">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 dark:text-zinc-500">
            <p>© {new Date().getFullYear()} Library. All rights reserved.</p>
            <p className="font-mono">Reinventing no-code for engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
