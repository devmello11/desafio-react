import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    domains: [
      'www.iol.pt',
      'goonadgroup.com'
      
    ]
  }
};

export default nextConfig;
