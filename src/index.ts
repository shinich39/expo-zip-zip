import { NativeModule, requireNativeModule } from 'expo';
import { addProtocol, normalize } from './path';

export type ExpoZipZipModuleEvents = {};

export declare class ExpoZipZipModule extends NativeModule<ExpoZipZipModuleEvents> {
  compress(sourcePath: string): string;
  uncompress(sourcePath: string): string;
}

// This call loads the native module object from the JSI.
export const ExpoZipZip = requireNativeModule<ExpoZipZipModule>('ExpoZipZip');

// Export native methods
export function compress(sourcePath: string) {
  return addProtocol(ExpoZipZip.compress(normalize(sourcePath)));
}

export function uncompress(sourcePath: string) {
  return addProtocol(ExpoZipZip.uncompress(normalize(sourcePath)))
}