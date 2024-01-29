import { Service } from 'typedi';
import parseFrameHeader from '@/helpers/parse-audio-frame-header';
import skipId3MetaTags from '@/helpers/skip-id3-metatags';

@Service()
export class FileService {
  public async calculateFrames(fileBuffer: Buffer): Promise<any> {
    let duration = 0;
    let offset = 0;
    let info;
    let frameCount = 0;

    const buffer = Buffer.alloc(100);
    const bytesRead = fileBuffer.copy(buffer, 0, 0, 100);

    if (bytesRead < 100) {
      return { frameCount };
    }

    offset = skipId3MetaTags(buffer);

    while (offset < fileBuffer.length) {
      const bytesRead = fileBuffer.copy(buffer, 0, offset, offset + 10);

      if (bytesRead < 10) {
        return { frameCount };
      }

      if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
        info = parseFrameHeader(buffer);
        if (info.frameSize && info.samples) {
          frameCount += 1;
          offset += info.frameSize;
          duration += info.samples / info.sampleRate;
        } else {
          offset++;
        }
      } else {
        offset++;
      }
    }

    return { frameCount };
  }
}
