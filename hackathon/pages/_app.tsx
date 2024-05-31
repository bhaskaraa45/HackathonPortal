import '../app/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SuperTokensProvider } from '@/app/components/supertokensProvider';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <SuperTokensProvider>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />

      </SuperTokensProvider>
    </>
  );
}

export default MyApp;
