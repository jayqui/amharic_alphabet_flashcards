import * as ScreenOrientation from 'expo-screen-orientation';

export async function unlockForcedOrientation() {
  await ScreenOrientation.unlockAsync();
}
export async function forceOrientationPortraitUp() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}
export async function forceOrientationLandscape() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}
