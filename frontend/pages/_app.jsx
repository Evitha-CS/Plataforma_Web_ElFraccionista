import { ChakraProvider } from "@chakra-ui/react";
import Fonts from '../styles/fonts'
import theme from '../styles/theme'
import '../public/GuessTheNumber.css'; 

import { AuthProvider } from "../context/AuthContext";


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}
