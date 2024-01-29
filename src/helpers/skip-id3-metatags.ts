export default function skipId3MetaTags(buffer: Buffer): number {
  let id3v2Flags: number;
  let z0: number, z1: number, z2: number, z3: number;
  let tagSize: number, footerSize: number;

  if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) {
    id3v2Flags = buffer[5];
    footerSize = id3v2Flags & 0x10 ? 10 : 0;

    z0 = buffer[6];
    z1 = buffer[7];
    z2 = buffer[8];
    z3 = buffer[9];

    // Check if synchronization bits are set to zero
    if ((z0 & 0x80) === 0 && (z1 & 0x80) === 0 && (z2 & 0x80) === 0 && (z3 & 0x80) === 0) {
      tagSize = (z0 & 0x7f) * 2097152 + (z1 & 0x7f) * 16384 + (z2 & 0x7f) * 128 + (z3 & 0x7f);
      return 10 + tagSize + footerSize;
    }
  }

  return 0;
}
