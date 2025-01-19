import * as ExpoZipZip from 'expo-zip-zip';
import { Button, Platform, Text, View } from 'react-native';
import * as dp from 'expo-document-picker';
import * as fs from 'expo-file-system';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title={`Test`} onPress={async () => {
        const { assets, canceled } = await dp.getDocumentAsync();
        const file = assets?.[0];
        if (file) {
          const res = ExpoZipZip.uncompress(file.uri);
          console.log("#1 uncompress", res);

          const res2 = ExpoZipZip.compress(res);
          console.log("#2 compress", res2);

          const res3 = ExpoZipZip.uncompress(res2);
          console.log("#3 uncompress", res3);

          const files = await fs.readDirectoryAsync(res3);
          console.log("#4 read", files);
        }
      }} />
    </View>
  );
}