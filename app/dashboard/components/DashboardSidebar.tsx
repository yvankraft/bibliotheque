"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { 
  FiFolder, 
  FiPlusCircle, 
  FiTrash2, 
  FiLayout, 
  FiLogOut, 
  FiUser, 
  FiSettings
} from "react-icons/fi";

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  const handleNewProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/dashboard") {
      window.dispatchEvent(new CustomEvent("open-new-project-modal"));
    } else {
      router.push("/dashboard");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-new-project-modal"));
      }, 300);
    }
  };

  const navLinks = [
    { name: "Projects", href: "/dashboard", icon: FiFolder },
    { name: "New Project", href: "/dashboard/new", icon: FiPlusCircle, onClick: handleNewProjectClick },
    { name: "Templates", href: "/dashboard/templates", icon: FiLayout },
    { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
    { name: "Trash", href: "/dashboard/trash", icon: FiTrash2 },
  ];

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between p-4 select-none shrink-0 transition-colors duration-300">
      
      {/* Haut : Profil utilisateur + Navigation */}
      <div className="space-y-6">
        
        {/* Profil Utilisateur Cliquable */}
        <Link 
          href="/dashboard/profile"
          className="flex items-center gap-3 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition cursor-pointer group"
        >
          {user?.image ? (
            <img 
              src={user.image} 
              alt="Avatar" 
              className="w-9 h-9 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition" 
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold text-xs border border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser size={16} />}
            </div>
          )}
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate group-hover:text-black dark:group-hover:text-white transition">{user?.name || "Developer"}</p>
            <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
          </div>
        </Link>

        {/* Menu de Navigation principal */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? "text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm" 
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                <Icon size={16} className={isActive ? "text-black dark:text-zinc-200" : "text-zinc-400 dark:text-zinc-500"} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Bas : Déconnexion */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <FiLogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  );
}