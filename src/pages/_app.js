import "../styles/globals.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={true} />
      <Container maxW="container.xl">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
