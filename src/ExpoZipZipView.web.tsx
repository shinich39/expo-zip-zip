import * as React from 'react';

import { ExpoZipZipViewProps } from './ExpoZipZip.types';

export default function ExpoZipZipView(props: ExpoZipZipViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
