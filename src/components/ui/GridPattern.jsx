import React from 'react';
import { cn } from '../../lib/utils';

// Simple GridPattern component inspired by shadcn.io grid-pattern
// - `squares` is an array of [x, y] positions to render larger squares
// - `className` allows positioning + mask styles

const GridPattern = ({ squares = [], className = '' }) => {
  // base cell size and grid dimensions
  const cell = 16; // px per grid cell; scaled via viewBox
  const cols = 36;
  const rows = 24;

  // Render small dots for the grid
  const dots = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dots.push(<rect key={`dot-${x}-${y}`} x={x * cell} y={y * cell} width={2} height={2} rx={1} fill="currentColor" opacity={0.06} />);
    }
  }

  // Render larger square blocks from `squares` prop
  const blocks = squares.map(([sx, sy], i) => (
    <rect key={`blk-${i}`} x={sx * cell} y={sy * cell} width={cell * 4} height={cell * 4} rx={8} fill="currentColor" opacity={0.08} />
  ));

  // Calculate viewBox size
  const width = cols * cell;
  const height = rows * cell;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 w-full h-full text-[#FF9933]', className)}
      aria-hidden
    >
      <g>
        {dots}
        {blocks}
      </g>
    </svg>
  );
};

export default GridPattern;
