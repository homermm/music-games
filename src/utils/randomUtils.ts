export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

export function getConsecutiveLines(lines: string[], count: number = 2): string[] {
  if (lines.length < count) return lines;
  
  const startIndex = Math.floor(Math.random() * (lines.length - count + 1));
  return lines.slice(startIndex, startIndex + count);
}
