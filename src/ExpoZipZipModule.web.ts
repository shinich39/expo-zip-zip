import { registerWebModule, NativeModule } from 'expo';

import { ExpoZipZipModuleEvents } from './ExpoZipZip.types';

class ExpoZipZipModule extends NativeModule<ExpoZipZipModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoZipZipModule);
