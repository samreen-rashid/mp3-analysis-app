import roundDuration from './round-duration';

export default function estimateAudioDuration(bitRate: number, offset: number, fileSize: number): number {
  const bitsPerByte = 8;
  const kilo = 1000;

  const kbps = (bitRate * kilo) / bitsPerByte;
  const dataSize = fileSize - offset;

  return roundDuration(dataSize / kbps);
}
