/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { PrizeNumber } from '../../lib/slot/types';
import { PRIZE_NUMBERS } from '../../lib/slot/symbols';

interface MultiplierBoxProps {
  currentPrize: PrizeNumber;
  isSpinning: boolean;
  hasWin: boolean;
}

export const MultiplierBox: React.FC<MultiplierBoxProps> = ({
  currentPrize,
  isSpinning,
  hasWin,
}) => {
  const [displayPrize, setDisplayPrize] = useState<PrizeNumber>(currentPrize);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const wasSpinning = useRef(isSpinning);

  useEffect(() => {
    if (isSpinning) {
      setIsFlashing(false);
      const interval = setInterval(() => {
        const randIndex = Math.floor(Math.random() * PRIZE_NUMBERS.length);
        setDisplayPrize(PRIZE_NUMBERS[randIndex]);
      }, 55);
      return () => clearInterval(interval);
    } else if (wasSpinning.current && !isSpinning) {
      setDisplayPrize(currentPrize);
      setIsFlashing(true);
      const t = setTimeout(() => setIsFlashing(false), 800);
      return () => clearTimeout(t);
    } else {
      setDisplayPrize(currentPrize);
    }
    wasSpinning.current = isSpinning;
  }, [isSpinning, currentPrize]);

  return (
    <div
      id="multiplier-slot-module"
      className="w-full flex items-center justify-between px-2 sm:px-4 py-1 rounded-lg bg-gradient-to-r from-[#200602] via-[#0d0201] to-[#200602] border-2 border-orange-500/80 shadow-[0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,200,100,0.3)] select-none shrink-0"
    >
      {/* Left Marker Arrow */}
      <span className="text-amber-400 font-black text-xs sm:text-sm animate-pulse">▶</span>

      {/* Center Label & Dynamic Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="font-russo text-[10px] sm:text-xs tracking-[0.2em] uppercase text-amber-300 drop-shadow">
          MULTIPLIER
        </span>

        {/* Multiplier Value Tag */}
        <div
          className={`flex items-center justify-center px-2 sm:px-3 py-0.5 rounded border transition-all ${
            hasWin || isFlashing
              ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 border-yellow-200 shadow-[0_0_15px_rgba(255,100,0,0.95)] scale-105'
              : 'bg-black/80 border-orange-500/60 shadow-inner'
          }`}
        >
          <span
            className={`font-orbitron font-black text-xs sm:text-base leading-none ${
              hasWin || isFlashing
                ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse'
                : 'text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.7)]'
            }`}
          >
            {displayPrize}X
          </span>
        </div>
      </div>

      {/* Right Marker Arrow */}
      <span className="text-amber-400 font-black text-xs sm:text-sm animate-pulse">◀</span>
    </div>
  );
};
