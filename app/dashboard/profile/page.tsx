"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import DashboardSidebar from "../components/DashboardSidebar";
import { FiUser, FiCheck, FiLock, FiShield, FiLogOut, FiTrash2 } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  
  // États pour le changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  
  // États pour les modales de confirmation
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [requiredText, setRequiredText] = useState("");
  const [confirmationText, setConfirmationText] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
        setName(data.user.name || "");
        setImage(data.user.image || "");
      }
      setLoading(false);
    });
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        setErrorMessage(error.message || "Failed to update profile.");
      } else {
        setSuccessMessage("Profile updated successfully.");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setSavingPassword(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        setErrorMessage(error.message || "Failed to change password.");
      } else {
        setSuccessMessage("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred while changing password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login");
          },
        },
      });
    } catch (err) {
      setErrorMessage("An error occurred during sign out.");
    }
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++)
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationText.trim().toUpperCase() !== requiredText.trim().toUpperCase()) {
      setErrorMessage("Confirmation code does not match.");
      return;
    }

    setDeletingAccount(true);
    setErrorMessage("");
    try {
      const { error } = await authClient.deleteUser();
      if (error) {
        setErrorMessage(error.message || "Failed to delete account.");
        setDeletingAccount(false);
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex transition-colors duration-300">
      
      {/* Sidebar fixe qui ne bouge pas */}
      <DashboardSidebar user={user} />
      
      {/* Zone principale qui prend le reste de l'espace et scrolle verticalement */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col bg-white dark:bg-black relative">
        
        {/* Header avec hauteur fixe explicite */}
        <header className="sticky top-0 z-35 min-h-[4rem] h-16 px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">Settings / Profile & Security</h1>
        </header>

        {/* Contenu principal */}
        <div className="p-8 max-w-4xl space-y-8 w-full pb-16">
          
          {/* Messages de retour */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <FiCheck size={14} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
              <FiShield size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1 : Informations Générales */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-900">
              {image ? (
                <img 
                  src={image} 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-full object-cover border border-zinc-300 dark:border-zinc-700" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center text-lg font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser size={24} />}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user?.name || "Developer"}</p>
                <p className="text-xs text-zinc-500">{user?.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase">
                  Role: {user?.role || "DEVELOPER"}
                </span>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Avatar Image URL</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Email Address (Read-only)</label>
                <input 
                  type="email" 
                  disabled 
                  value={user?.email || ""} 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 text-xs text-zinc-500 cursor-not-allowed"
                />
              </div>

              <button 
                type="submit" 
                disabled={savingProfile}
                className="w-full py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              >
                {savingProfile ? "Saving changes..." : "Save Profile"}
              </button>
            </form>
          </div>

          {/* Section 2 : Sécurité & Mot de passe */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-200 dark:border-zinc-900">
              <div className="p-3 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <FiLock size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Security & Password</h3>
                <p className="text-xs text-zinc-500">Update your password to keep your workspace secure.</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={savingPassword}
                className="w-full py-2.5 rounded-lg bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer disabled:opacity-50 mt-4"
              >
                {savingPassword ? "Updating password..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Section 3 : Déconnexion */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sign Out</h3>
              <p className="text-xs text-zinc-500">End your current session on this device.</p>
            </div>
            <button
              onClick={() => setIsSignOutModalOpen(true)}
              className="px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-200 flex items-center gap-2 transition cursor-pointer"
            >
              <FiLogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>

          {/* Section 4 : Zone de Danger (Suppression de compte) */}
          <div className="p-6 border border-red-500/20 rounded-2xl bg-red-500/5 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Delete Account</h3>
              <p className="text-xs text-zinc-500">Permanently remove your account and all data.</p>
            </div>
            <button
              onClick={() => {
                setRequiredText(generateRandomCode());
                setConfirmationText("");
                setIsDeleteModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white flex items-center gap-2 transition cursor-pointer"
            >
              <FiTrash2 size={14} />
              <span>Delete</span>
            </button>
          </div>

        </div>
      </main>

      {/* --- MODALE DE DÉCONNEXION --- */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white mb-1">Sign Out</h2>
              <p className="text-xs text-zinc-500">Are you sure you want to end your current session?</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSignOutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold transition hover:opacity-80 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALE DE SUPPRESSION DE COMPTE --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xl space-y-6">
            <form onSubmit={handleDeleteAccount} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-red-600 mb-1">Delete Account</h2>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  To confirm, type <span className="font-mono bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-bold text-black dark:text-white">{requiredText}</span> below. This action cannot be undone.
                </p>
              </div>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Enter confirmation code"
                className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm text-black dark:text-white outline-none focus:border-black dark:focus:border-white transition-all placeholder-zinc-400"
                required
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={confirmationText !== requiredText || deletingAccount}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-semibold transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  {deletingAccount ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}