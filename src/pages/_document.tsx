import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        { /* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>Weather App</title>
      </Head>
      <body className='w-screen h-screen bg-[var(--bg-primary)] text-[var(--txt-primary)] font-sans'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
