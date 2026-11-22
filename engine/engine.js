'use strict';

// Parse the depth and score fields from a UCI "info" line.
// Return null until the engine has produced an actual evaluation.
function parseInfoLine(line) {
  if (typeof line !== 'string' || !line.startsWith('info ')) return null;

  const depthMatch = line.match(/\bdepth\s+(\d+)\b/);
  const cpMatch = line.match(/\bscore\s+cp\s+(-?\d+)\b/);
  const mateMatch = line.match(/\bscore\s+mate\s+(-?\d+)\b/);
  if (!depthMatch || (!cpMatch && !mateMatch)) return null;

  return {
    depth: Number(depthMatch[1]),
    type: cpMatch ? 'cp' : 'mate',
    value: Number((cpMatch || mateMatch)[1]),
  };
}

module.exports = { parseInfoLine };
