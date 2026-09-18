import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, Crown, ShieldCheck } from "lucide-react";


export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/80 dark:border-gray-800/80 shadow-xs dark:shadow-black/20 transition-colors duration-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-16 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <Crown className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight">
                ROYAL BANK
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              Digital Banking Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">

          {user && (
            <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm ring-2 ring-amber-500/30">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-none">Welcome back,</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{user.name}</p>
              </div>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 transition-all shadow-xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
