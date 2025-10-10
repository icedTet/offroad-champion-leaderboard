import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HamburgerMenu } from "../components/HamburgerMenu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HamburgerMenu />
      <Component {...pageProps} />
    </>
  );
}
