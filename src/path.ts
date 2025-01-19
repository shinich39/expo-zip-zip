import { Platform } from 'react-native';

export function normalize(sourcePath: string) {
  if (Platform.OS === "android") {
    return sourcePath;
  } else if (Platform.OS === "ios") {
    // Bugfix: Remove file protocol. "file://"
    return sourcePath.replace(/^file:\/\//, "");
  } else {
    throw new Error(`Operating System not supported: ${Platform.OS}`);
  }
}