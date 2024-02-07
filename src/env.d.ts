interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_SOCKET_SERVER: string;
  [key: string]: any;
}
