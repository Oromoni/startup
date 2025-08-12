import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images:{
dangerouslyAllowSVG:true,
remotePatterns:[
{protocol:"https",
hostname:"*"}]
},
typescript:{ignoreBuildErrors:true},
  experimental: {
   
    after: true,
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
