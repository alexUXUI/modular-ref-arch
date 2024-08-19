
    export type RemoteKeys = 'plugin/accuris-plugin';
    type PackageType<T> = T extends 'plugin/accuris-plugin' ? typeof import('plugin/accuris-plugin') :any;