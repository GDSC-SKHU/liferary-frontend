import GlobalStyle from "styles/GlobalStyle";
import Seo from "@/components/Seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // Component와 pageProps의 타입은 AppProps다
  return (
    <>
      <GlobalStyle />
      <Seo />
      <Component {...pageProps} />{" "}
      {/* pageProps의 배열을 전부 가져오겠다(깊은 복사) */}
    </>
  );
}
