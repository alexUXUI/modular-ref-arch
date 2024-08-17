
    export type RemoteKeys = 'federation_provider/plugin';
    type PackageType<T> = T extends 'federation_provider/plugin' ? typeof import('federation_provider/plugin') :any;