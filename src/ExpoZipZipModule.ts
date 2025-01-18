import { NativeModule, requireNativeModule } from 'expo';

import { ExpoZipZipModuleEvents } from './ExpoZipZip.types';

declare class ExpoZipZipModule extends NativeModule<ExpoZipZipModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoZipZipModule>('ExpoZipZip');
