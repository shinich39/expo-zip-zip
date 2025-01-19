# expo-zip-zip

Compress and uncompress zip in expo.

## Getting Started

### Installation

```console
npm install github:shinich39/expo-zip-zip
```

### Usage

```js
import { compress, uncompress } from 'expo-zip-zip';
import * as dp from 'expo-document-picker';
import * as fs from 'expo-file-system';

const { assets, canceled } = await dp.getDocumentAsync();
const file = assets?.[0];
if (file) {
  // Uncompress Example
  const res = uncompress(file.uri);
  // dirPath: String
  // file://...
  
  // Read extracted files
  const files = await fs.readDirectoryAsync(res);

  // Compress Example
  const res2 = compress(res);
  // zipPath: String
  // file://...
}
```

## References

- [Expo DocumentPicker](https://docs.expo.dev/versions/latest/sdk/document-picker/)
- [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)

## Acknowledgements

- [zip4j](https://github.com/srikanth-lingala/zip4j)
- [ZipArchive](https://github.com/ZipArchive/ZipArchive)