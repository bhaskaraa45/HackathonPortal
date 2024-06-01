import '../app/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SuperTokensProvider } from '@/app/components/supertokensProvider';
import CustomHead from '@/app/components/customHead';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <SuperTokensProvider>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
          <title>{'Hackathon | E-Cell IIT Hyderabad - NPCI'}</title>
          <meta name="description" content={'Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get change to get Placement/Internship offer from NPCI.'} />
          <meta name="keywords" content={'Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest'} />
          <meta name="author" content='Web Team E-Cell' />
        </Head>
        <Component {...pageProps} />
      </SuperTokensProvider>
    </>
  );
}

export default MyApp;
