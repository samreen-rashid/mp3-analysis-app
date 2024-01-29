export default function roundDuration(duration: number): number {
  const millisecondsPrecision = 1000;
  return Math.round(duration * millisecondsPrecision) / millisecondsPrecision;
}
