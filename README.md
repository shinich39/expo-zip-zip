# expo-zip-zip

Build a epub structure with javascript

## Getting Started

Developing...

### Installation

```console
npm install github:shinich39/expo-zip-zip
```

### Usage

```js
const { assets, canceled } = await dp.getDocumentAsync();
const file = assets?.[0];
if (file) {
  // uncompress
  const res = ExpoZipZip.uncompress(file.uri);
  const files = await fs.readDirectoryAsync(res);

  // compress
  const res = ExpoZipZip.compress(res);
}
```

## References

- [Expo DocumentPicker](https://docs.expo.dev/versions/latest/sdk/document-picker/)
- [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)

## Acknowledgements

- [zip4j](https://github.com/srikanth-lingala/zip4j)
- [ZipArchive](https://github.com/ZipArchive/ZipArchive)