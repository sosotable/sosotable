import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";
import * as React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d58dfb00f33ea42bd863ce021bbe2abf&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
