import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoZipZipViewProps } from './ExpoZipZip.types';

const NativeView: React.ComponentType<ExpoZipZipViewProps> =
  requireNativeView('ExpoZipZip');

export default function ExpoZipZipView(props: ExpoZipZipViewProps) {
  return <NativeView {...props} />;
}
