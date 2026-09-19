/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SlotSymbol, PrizeNumber } from '../../lib/slot/types';
import { SlotHeader } from './SlotHeader';
import { SymbolReels } from './SymbolReels';
import { MultiplierBox } from './MultiplierBox';
import { SideFlames } from './SideFlames';

interface SlotCabinet3DProps {
  reels: [
    [SlotSymbol, SlotSymbol, SlotSymbol],
    [SlotSymbol, SlotSymbol, SlotSymbol],
    [SlotSymbol, SlotSymbol, SlotSymbol]
  ];
  spinningReels: [boolean, boolean, boolean];
  winningLines: number[];
  hoveredPayline: number | null;
  winTier?: 'NONE' | 'NORMAL' | 'BIG_WIN' | 'MEGA_WIN' | 'JACKPOT' | null;
  prizeNumber: PrizeNumber;
  prizeSpinning: boolean;
  currentBet: number;
  hasWin: boolean;
  onHoverPayline: (lineId: number | null) => void;
  onAllReelsSettled?: () => void;
}

export const SlotCabinet3D: React.FC<SlotCabinet3DProps> = ({
  reels,
  spinningReels,
  winningLines,
  hoveredPayline,
  winTier,
  prizeNumber,
  prizeSpinning,
  hasWin,
  onHoverPayline,
  onAllReelsSettled,
}) => {
  return (
    <div
      id="slot-machine-3d-wrapper"
      className="relative flex flex-col items-center justify-center w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-full max-h-full my-auto select-none"
    >
      {/* 1. Left & Right Blazing Fire Pillars Flanking the 3D Slot Machine */}
      <SideFlames position="left" intensity={hasWin ? 'high' : 'normal'} />
      <SideFlames position="right" intensity={hasWin ? 'high' : 'normal'} />

      {/* 2. Top Marquee: FLAMING 50 Text Above Machine */}
      <div className="w-full mb-1 sm:mb-2 shrink-0">
        <SlotHeader />
      </div>

      {/* 3. 3D Main Slot Machine Body (Jackpot section moved to Left Stage, giving reels full height!) */}
      <div
        id="slot-cabinet-3d-chassis"
        className={`relative w-full flex-1 min-h-0 flex flex-col justify-between p-2 sm:p-3 md:p-3.5 rounded-2xl bg-gradient-to-b from-[#2a0803] via-[#140402] to-[#080201] border-[3px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,69,0,0.4),inset_0_2px_4px_rgba(255,200,100,0.4)] ${
          hasWin
            ? 'border-yellow-300 shadow-[0_0_40px_rgba(255,215,0,0.8),0_0_70px_rgba(245,158,11,0.5)] scale-[1.01]'
            : 'border-orange-500'
        }`}
        style={{
          boxShadow:
            '0 25px 60px -10px rgba(0,0,0,0.95), 0 0 35px rgba(255, 69, 0, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -4px 12px rgba(0,0,0,0.9)',
        }}
      >
        {/* Physical 3D Cabinet Top Bevel Highlight */}
        <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-80" />

        {/* Center 3D Cylindrical Reels Window (Full uncompressed vertical space!) */}
        <div
          id="reels-cabinet-housing"
          className="relative w-full flex-1 min-h-0 flex items-stretch my-1 p-1 rounded-xl bg-gradient-to-b from-[#180502]/90 via-[#0a0201]/95 to-[#120301]/90 border border-orange-500/70 shadow-[inset_0_8px_20px_rgba(0,0,0,0.98)] overflow-hidden"
        >
          <SymbolReels
            reels={reels}
            spinningReels={spinningReels}
            winningLines={winningLines}
            hoveredPayline={hoveredPayline}
            winTier={winTier}
            onHoverPayline={onHoverPayline}
            onAllReelsSettled={onAllReelsSettled}
          />
        </div>

        {/* Bottom Multiplier Box (Matching Reference Photo, comfortably docked) */}
        <div className="w-full mt-1.5 shrink-0">
          <MultiplierBox
            currentPrize={prizeNumber}
            isSpinning={prizeSpinning}
            hasWin={hasWin}
          />
        </div>
      </div>
    </div>
  );
};
