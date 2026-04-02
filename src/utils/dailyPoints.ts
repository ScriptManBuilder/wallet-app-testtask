/**
 * Calculate daily points based on the current day within the current season.
 *
 * Meteorological seasons:
 *   Spring: Mar 1 – May 31
 *   Summer: Jun 1 – Aug 31
 *   Autumn: Sep 1 – Nov 30
 *   Winter: Dec 1 – Feb 28/29
 *
 * Rules:
 *   Day 1 → 2 points
 *   Day 2 → 3 points
 *   Day n (n ≥ 3) → points(n-2) + 0.6 * points(n-1)
 */

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed

  if (month >= 2 && month <= 4) return new Date(year, 2, 1);  // Spring: Mar 1
  if (month >= 5 && month <= 7) return new Date(year, 5, 1);  // Summer: Jun 1
  if (month >= 8 && month <= 10) return new Date(year, 8, 1); // Autumn: Sep 1
  // Winter: Dec 1
  if (month === 11) return new Date(year, 11, 1);
  // Jan or Feb → winter started Dec 1 of previous year
  return new Date(year - 1, 11, 1);
}

function getDayOfSeason(date: Date): number {
  const seasonStart = getSeasonStart(date);
  // Use UTC to avoid DST off-by-one errors
  const startUTC = Date.UTC(seasonStart.getFullYear(), seasonStart.getMonth(), seasonStart.getDate());
  const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((dateUTC - startUTC) / (1000 * 60 * 60 * 24)) + 1;
}

export function calculateDailyPoints(date: Date = new Date()): number {
  const day = getDayOfSeason(date);

  const points: number[] = [];
  for (let i = 1; i <= day; i++) {
    if (i === 1) points.push(2);
    else if (i === 2) points.push(3);
    else points.push(points[i - 3] + 0.6 * points[i - 2]);
  }

  return Math.round(points[day - 1]);
}

export function formatPoints(pts: number): string {
  if (pts >= 1000) {
    return `${Math.round(pts / 1000)}K`;
  }
  return pts.toString();
}
