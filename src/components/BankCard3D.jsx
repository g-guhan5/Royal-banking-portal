import React, { useState } from "react";
import { RotateCw, Cpu, Wifi, Crown, Eye, EyeOff } from "lucide-react";


export default function BankCard3D({ userCard }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[310px] sm:w-[340px] h-[205px] perspective-1000 my-2">
        <div
          onClick={handleFlipCard}
          className={`relative w-full h-full rounded-2xl cursor-pointer transition-transform duration-700 transform-style-3d shadow-xl dark:shadow-2xl dark:shadow-black/60 ${isFlipped ? "rotate-y-180" : ""
            }`}
        >
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 p-5 flex flex-col justify-between text-white backface-hidden border border-white/20 shadow-inner">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5">
                <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-extrabold tracking-widest text-sm bg-gradient-to-r from-amber-200 via-yellow-100 to-white bg-clip-text text-transparent">
                  ROYAL PLATINUM
                </span>
              </div>
              <Wifi className="w-6 h-6 text-slate-300 rotate-90" />
            </div>

            <div className="flex justify-between items-center my-1 z-10">
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-500 p-1 flex items-center justify-center shadow-md">
                <Cpu className="w-7 h-7 text-amber-950 opacity-85" />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullNumber(!showFullNumber);
                }}
                className="text-[11px] font-semibold text-slate-200 hover:text-white flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md backdrop-blur-sm transition-colors border border-white/10"
                title="Toggle Card Number Masking"
              >
                {showFullNumber ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Mask
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Reveal
                  </>
                )}
              </button>
            </div>

            <div className="z-10 tracking-widest font-mono text-lg sm:text-xl font-semibold text-slate-100 drop-shadow-md">
              {showFullNumber
                ? userCard?.cardFullNumber || "4532 8901 2345 4829"
                : userCard?.cardNumberMasked || "**** **** **** 4829"}
            </div>

            <div className="flex justify-between items-end z-10 font-mono">
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans">
                  Card Holder
                </span>
                <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase text-slate-100">
                  {userCard?.cardHolder || "ALEX MORGAN"}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans">
                  Expires
                </span>
                <span className="font-semibold text-xs sm:text-sm tracking-wide text-slate-100">
                  {userCard?.cardExpiry || "08/28"}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 p-5 flex flex-col justify-between text-white rotate-y-180 backface-hidden border border-white/20 shadow-2xl">
            <div className="absolute top-5 left-0 w-full h-10 bg-slate-950 shadow-inner"></div>

            <div className="mt-12 z-10">
              <div className="text-[9px] text-slate-400 mb-1 flex justify-between font-mono tracking-wider">
                <span>AUTHORIZED SIGNATURE</span>
                <span>CVV CODE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-slate-200 rounded flex items-center px-3 text-slate-900 italic font-serif text-xs font-semibold select-none">
                  Alex Morgan
                </div>
                <div className="w-12 h-8 bg-white text-slate-900 rounded font-mono font-bold text-center flex items-center justify-center text-sm shadow-md border-2 border-amber-400">
                  {userCard?.cardCvv || "839"}
                </div>
              </div>
            </div>

            <div className="z-10 text-[8px] text-slate-400 leading-tight border-t border-white/10 pt-2">
              Issued by Royal Digital Bank NA. Card use subject to agreement.
              Support: 1-800-555-ROYAL
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFlipCard}
        className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all shadow-xs"
      >
        <RotateCw className="w-3.5 h-3.5" />
        <span>{isFlipped ? "Flip to Front" : "Flip to Back (View CVV)"}</span>
      </button>
    </div>
  );
}
