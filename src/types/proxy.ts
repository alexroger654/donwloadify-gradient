export interface Proxy {
    _id?: string;
    host: string;
    port: number;
    type: "http" | "https" | "socks4" | "socks5";
    username?: string;
    password?: string;
    active: boolean;
    lastChecked?: string;
    isWorking?: boolean;
    responseTime?: number;
    country?: string;
    city?: string;
  }
  