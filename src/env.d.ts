interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_SOCKET_SERVER: string;
  readonly NG_APP_APIURL:string;
  [key: string]: any;
}
