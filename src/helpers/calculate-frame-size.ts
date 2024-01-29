export default function frameSize(samples: number, layer: string, bitRate: number, sampleRate: number, paddingBit: number): number {
  if (layer == '1') {
    return ((samples * bitRate * 125) / sampleRate + paddingBit * 4) | 0;
  } else {
    return ((samples * bitRate * 125) / sampleRate + paddingBit) | 0;
  }
}
