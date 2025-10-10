import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <header className="flex flex-row items-center gap-4 md:gap-6 lg:gap-8 row-start-2 max-w-7xl w-full absolute top-0 p-4 px-20">
          <img src={"/logo.png"} alt="Logo" className="xl:h-20 xl:w-20 lg:w-16 lg:h-16 md:h-12 md:w-12 h-10 w-10"/>
          <h1 className="text-lg xl:text-3xl lg:text-2xl font-bold items-center text-amber-400">Offroad Champion Leaderboard</h1>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
