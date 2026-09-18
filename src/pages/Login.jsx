import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Crown, ShieldCheck, Eye, EyeOff, Lock, Mail, Loader2, AlertCircle, Sparkles } from "lucide-react";


export default function Login({ onLoginSuccess }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleFillDemo = () => {
    setEmail("user@royalbank.com");
    setPassword("password123");
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill out both email and password fields.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "user@bank.com" && password === "password123") {
        login(email);
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage("Invalid credentials. Try using the Demo Fill button!");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-4 py-12 relative overflow-hidden">

      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full z-10">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/20 mb-4">
            <Crown className="w-8 h-8 fill-slate-950" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              ROYAL DIGITAL BANK
            </h1>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs text-amber-200/90 mt-1 font-medium">
            Secure Online Customer Banking Portal
          </p>
        </div>

        <div className="bg-white/10 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Sign In to Account</h2>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700 px-2.5 py-0.5 rounded-full">
              256-Bit SSL Encrypted
            </span>
          </div>

          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-between text-xs">
            <div className="text-amber-100">
              <span className="font-semibold block flex items-center gap-1 text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Demo Credentials:
              </span>
              <span className="font-mono opacity-90 text-[11px]">user@royalbank.com / password123</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition-colors text-xs"
            >
              Auto Fill
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-950/90 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Username / Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-slate-950/70 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/20 bg-slate-950/70 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1 font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Royal Financial Group. All Rights Reserved. FDIC Insured.
        </p>
      </div>
    </div>
  );
}
