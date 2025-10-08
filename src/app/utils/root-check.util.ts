// import { Injectable } from '@angular/core';
// import JailbreakRootDetection from '@meedika/capacitor-jailbreak-root-detection';

// @Injectable({
//   providedIn: 'root'
// })
// export class RootDetectionService {

//   async isDeviceRooted(): Promise<boolean> {
//     try {
//       // Await the Promise to get JailbreakRootResult
//       const result = await JailbreakRootDetection.isJailbrokenOrRooted();
//       console.log('Root detection result:', result);

//       // The 'result' property is boolean (true if rooted/jailbroken)
//       return result.result;
//     } catch (err) {
//       console.error('RootDetection error:', err);
//       return false; // fallback for browser/emulator
//     }
//   }
// }
