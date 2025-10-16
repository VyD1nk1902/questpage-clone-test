export const getXpByLevel = (level: number) => {
  if (level <= 1) return 0;
  if (level <= 9) return 200 + 0.5 * (level - 2) * 200;
  if (level <= 19) return 200 + 0.75 * (level - 2) * 200;
  if (level <= 49) return 200 + 1 * (level - 2) * 200;
  return 200 + 1.5 * (level - 2) * 200;
};

export const getNextLevel = (
  currentLevel: number,
  currentXp: number,
  earnXp: number
) => {
  let level = currentLevel;
  let xp = currentXp + earnXp;

  while (getXpByLevel(level + 1) <= xp) {
    xp -= getXpByLevel(level + 1);
    level++;
  }

  return [level, xp];
};

export const getTotalXPByLevel = (level: number): number => {
  if (level <= 1) return getXpByLevel(1);

  const xp = getXpByLevel(level);
  return xp + getTotalXPByLevel(level - 1);
};
