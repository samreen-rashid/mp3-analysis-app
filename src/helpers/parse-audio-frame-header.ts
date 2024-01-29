import { bitRates } from '@/utils/bitrates';
import { layers } from '@/utils/layers';
import { sampleRates } from '@/utils/samplerates';
import { samples } from '@/utils/samples';
import { versions } from '@/utils/versions';
import frameSize from './calculate-frame-size';

export default function parseFrameHeader(header: Buffer): Record<string, any> {
  const b1 = header[1];
  const b2 = header[2];

  const versionBits = (b1 & 0x18) >> 3;
  const version = versions[versionBits];
  const simpleVersion = version === '2.5' ? 2 : version;

  const layerBits = (b1 & 0x06) >> 1;
  const layer = layers[layerBits];

  const bitRateKey = 'V' + simpleVersion + 'L' + layer;
  const bitRateIndex = (b2 & 0xf0) >> 4;
  const bitRate = bitRates[bitRateKey][bitRateIndex] || 0;

  const sampleRateIdx = (b2 & 0x0c) >> 2;
  const sampleRate = sampleRates[version][sampleRateIdx] || 0;

  const sample = samples[simpleVersion][layer];

  const paddingBit = (b2 & 0x02) >> 1;

  return {
    bitRate: bitRate,
    sampleRate: sampleRate,
    frameSize: frameSize(sample, layer, bitRate, sampleRate, paddingBit),
    samples: sample,
  };
}
