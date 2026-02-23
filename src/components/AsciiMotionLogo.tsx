import React, { useEffect, useRef, useState, useCallback } from 'react';

type CellData = {
  x: number;
  y: number;
  char: string;
  color: string;
  bgColor?: string;
};

type Frame = {
  duration: number;
  cells: CellData[];
};

type AsciiMotionLogoProps = {
  /** Trigger animation on mouse enter */
  onMouseEnter?: () => void;
  /** Click handler for navigation */
  onClick?: () => void;
  /** Height in pixels (default: 32) */
  height?: number;
};

// Animation data will be embedded here from the exported component
const frames: Frame[] = [
  {
    "duration": 67,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 2,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 3,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 2,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#ffffff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#ffffff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#ffffff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#ffffff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#ffffff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#ffffff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 3,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#ffffff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 2,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 3,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#ffffff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#ffffff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#ffffff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#ffffff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#ffffff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 1,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 2,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 3,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#ffffff"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#ffffff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#ffffff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#ffffff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#ffffff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#ffffff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      }
    ]
  },
  {
    "duration": 67,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 1,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 2,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 3,
        "y": 0,
        "char": "-",
        "color": "#aa57f7"
      },
      {
        "x": 4,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 5,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 6,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 9,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 10,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 11,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 12,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 14,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 15,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 16,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 17,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 18,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 19,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 20,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 21,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 22,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 23,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 24,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 25,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 26,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 27,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 32,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 33,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 36,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 37,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 39,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 40,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 41,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 42,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 43,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 44,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 45,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 46,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 47,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 48,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 49,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 50,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 51,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 53,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 54,
        "y": 0,
        "char": "▄",
        "color": "#aa57f7"
      },
      {
        "x": 55,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 57,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 58,
        "y": 0,
        "char": "▖",
        "color": "#aa57f7"
      },
      {
        "x": 61,
        "y": 0,
        "char": "▗",
        "color": "#aa57f7"
      },
      {
        "x": 62,
        "y": 0,
        "char": "▖",
        "color": "#ffffff"
      },
      {
        "x": 1,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 2,
        "y": 1,
        "char": "-",
        "color": "#b570ff"
      },
      {
        "x": 3,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 4,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 6,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 7,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 8,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 9,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 13,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 14,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 20,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 25,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 32,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 33,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 34,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 35,
        "y": 1,
        "char": "▞",
        "color": "#b570ff"
      },
      {
        "x": 36,
        "y": 1,
        "char": "▜",
        "color": "#b570ff"
      },
      {
        "x": 37,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 38,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 39,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 41,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 42,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 44,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 49,
        "y": 1,
        "char": "█",
        "color": "#b570ff"
      },
      {
        "x": 52,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 53,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 55,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 56,
        "y": 1,
        "char": "▌",
        "color": "#b570ff"
      },
      {
        "x": 57,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 58,
        "y": 1,
        "char": "▛",
        "color": "#b570ff"
      },
      {
        "x": 59,
        "y": 1,
        "char": "▚",
        "color": "#b570ff"
      },
      {
        "x": 60,
        "y": 1,
        "char": "▖",
        "color": "#b570ff"
      },
      {
        "x": 61,
        "y": 1,
        "char": "▐",
        "color": "#b570ff"
      },
      {
        "x": 62,
        "y": 1,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 2,
        "y": 2,
        "char": "-",
        "color": "#c691ff"
      },
      {
        "x": 3,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 4,
        "y": 2,
        "char": "▛",
        "color": "#c691ff"
      },
      {
        "x": 5,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 6,
        "y": 2,
        "char": "▜",
        "color": "#c691ff"
      },
      {
        "x": 7,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 9,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 10,
        "y": 2,
        "char": "▀",
        "color": "#c691ff"
      },
      {
        "x": 11,
        "y": 2,
        "char": "▚",
        "color": "#c691ff"
      },
      {
        "x": 12,
        "y": 2,
        "char": "▖",
        "color": "#c691ff"
      },
      {
        "x": 13,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 14,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 20,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 25,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 32,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 33,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 36,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 37,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 38,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 39,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 41,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 42,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 44,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 49,
        "y": 2,
        "char": "█",
        "color": "#c691ff"
      },
      {
        "x": 52,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 53,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 55,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 56,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 57,
        "y": 2,
        "char": "▐",
        "color": "#c691ff"
      },
      {
        "x": 58,
        "y": 2,
        "char": "▌",
        "color": "#c691ff"
      },
      {
        "x": 60,
        "y": 2,
        "char": "▝",
        "color": "#c691ff"
      },
      {
        "x": 61,
        "y": 2,
        "char": "▜",
        "color": "#ffffff"
      },
      {
        "x": 62,
        "y": 2,
        "char": "▌",
        "color": "#ffffff"
      },
      {
        "x": 2,
        "y": 3,
        "char": "-",
        "color": "#d9b5ff"
      },
      {
        "x": 3,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 4,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 6,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 7,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 8,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 9,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 10,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 11,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 12,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 13,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 14,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 15,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 16,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 17,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 18,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 19,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 20,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 21,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 22,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 23,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 24,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 25,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 26,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 27,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 32,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 33,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 36,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 37,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 38,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 39,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 40,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 41,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 42,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 44,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 47,
        "y": 3,
        "char": "▗",
        "color": "#d9b5ff"
      },
      {
        "x": 48,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 49,
        "y": 3,
        "char": "█",
        "color": "#d9b5ff"
      },
      {
        "x": 50,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 51,
        "y": 3,
        "char": "▖",
        "color": "#d9b5ff"
      },
      {
        "x": 52,
        "y": 3,
        "char": "▝",
        "color": "#d9b5ff"
      },
      {
        "x": 53,
        "y": 3,
        "char": "▚",
        "color": "#d9b5ff"
      },
      {
        "x": 54,
        "y": 3,
        "char": "▄",
        "color": "#d9b5ff"
      },
      {
        "x": 55,
        "y": 3,
        "char": "▞",
        "color": "#d9b5ff"
      },
      {
        "x": 56,
        "y": 3,
        "char": "▘",
        "color": "#d9b5ff"
      },
      {
        "x": 57,
        "y": 3,
        "char": "▐",
        "color": "#d9b5ff"
      },
      {
        "x": 58,
        "y": 3,
        "char": "▌",
        "color": "#d9b5ff"
      },
      {
        "x": 61,
        "y": 3,
        "char": "▐",
        "color": "#ffffff"
      },
      {
        "x": 62,
        "y": 3,
        "char": "▌",
        "color": "#ffffff"
      }
    ]
  }
];

const metadata = {
  width: 63,
  height: 4,
  frameCount: frames.length,
};

export const AsciiMotionLogo: React.FC<AsciiMotionLogoProps> = ({ 
  onMouseEnter, 
  onClick,
  height = 32 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const currentFrameIndexRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // Calculate scaling to fit target height while maintaining aspect ratio
  // Original export uses CELL_WIDTH = 10.8, CELL_HEIGHT = 18 (aspect ratio ~0.6)
  const cellHeight = height / metadata.height;
  const cellWidth = cellHeight * 0.5; // Maintain monospace aspect ratio
  const canvasWidth = metadata.width * cellWidth;
  const canvasHeight = height;
  const fontSize = cellHeight; // Font size matches cell height

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas (accounting for DPI scaling)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set up rendering context with proper font stack
    // Safari Canvas bug: adding 'monospace' fallback causes SF Mono to be ignored
    ctx.font = `${fontSize}px 'SF Mono', 'Cascadia Code', Consolas, 'Courier New'`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    // Draw cells
    const frame = frames[frameIndex];
    if (!frame) return;

    frame.cells.forEach((cell) => {
      const x = cell.x * cellWidth;
      const y = cell.y * cellHeight;

      // Draw background if specified
      if (cell.bgColor) {
        ctx.fillStyle = cell.bgColor;
        ctx.fillRect(x, y, cellWidth, cellHeight);
      }

      // Draw character
      ctx.fillStyle = cell.color;
      ctx.fillText(cell.char, x, y);
    });
  }, [cellWidth, cellHeight, fontSize, canvasWidth, canvasHeight]);

  const playAnimation = useCallback(() => {
    if (frames.length === 0) return;

    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;
      const currentFrame = frames[currentFrameIndexRef.current];

      if (elapsed >= currentFrame.duration) {
        currentFrameIndexRef.current++;
        
        // Stop at end of animation
        if (currentFrameIndexRef.current >= frames.length) {
          currentFrameIndexRef.current = 0;
          setIsPlaying(false);
          drawFrame(0); // Draw first frame
          return;
        }

        drawFrame(currentFrameIndexRef.current);
        lastFrameTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    setIsPlaying(true);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  const handleMouseEnter = useCallback(() => {
    if (!isPlaying) {
      currentFrameIndexRef.current = 0;
      lastFrameTimeRef.current = 0;
      playAnimation();
    }
    onMouseEnter?.();
  }, [isPlaying, playAnimation, onMouseEnter]);

  // Draw initial frame on mount and setup high-DPI canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup high-DPI canvas for crisp rendering
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * devicePixelRatio;
    canvas.height = canvasHeight * devicePixelRatio;
    
    // Set CSS size to maintain visual dimensions
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    // Scale context to account for device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio);

    drawFrame(0);
  }, [drawFrame, canvasWidth, canvasHeight]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      aria-label="ASCII Motion logo"
      style={{
        imageRendering: 'auto',
        display: 'block',
        transform: 'translateY(-3px)', // Nudge up to compensate for half-block characters
      }}
    />
  );
};

export default AsciiMotionLogo;
