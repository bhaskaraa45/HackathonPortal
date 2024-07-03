import '../app/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SuperTokensProvider } from '@/app/components/supertokensProvider';
import CustomHead from '@/app/components/customHead';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import customTheme from '@/theme/theme';

function MyApp({ Component, pageProps }: AppProps) {

  // const customTheme = extendTheme({
  //   config: {
  //     initialColorMode: 'dark',
  //     useSystemColorMode: false,
  //   },
  //   styles: {
  //     global: {
  //       'html, body': {
  //         backgroundColor: '#06081A',
  //       },
  //     },
  //   },
  //   fonts: {
  //     heading: `'Montserrat', sans-serif`,
  //     body: `'Montserrat', sans-serif`,
  //   },
  // });

  return (
    <>
      <SuperTokensProvider>
        <ChakraProvider theme={customTheme}>
          <Head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            <title>{'Hackathon | E-Cell IIT Hyderabad - NPCI'}</title>
            <meta name="description" content={'Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get chance to win exciting prizes.'} />
            <meta name="keywords" content={'Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest'} />
            <meta name="author" content='Web Team E-Cell' />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </SuperTokensProvider>
    </>
  );
}

export default MyApp;
