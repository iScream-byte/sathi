// root-check.util.ts
declare var RootDetection: any;

export const checkIfRooted = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof RootDetection === 'undefined') {
      console.warn('RootDetection plugin not available');
      resolve(false);
      return;
    }

    RootDetection.isDeviceRooted(
      (result: boolean) => resolve(result),
      (err: any) => {
        console.error('Root check failed', err);
        resolve(false);
      }
    );
  });
};
