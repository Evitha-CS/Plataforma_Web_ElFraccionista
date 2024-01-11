import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Heading,
  useColorModeValue,
  Flex,
  Image,
  Link,
  FormControl,
  FormLabel,
  Form,
  Stack,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Switch } from "@chakra-ui/react";

function LoginForm() {
  const bgEminence = useColorModeValue("myColor.Eminence", "myColor.Eminence");
  const bgSnow = useColorModeValue("myColor.Snow", "myColor.Snow");
  return (
    <Box
      fontFamily="'Press Start 2P', sans-serif"
      bgGradient="linear(to-b, #D800A6, #621CAD)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Box
        borderRadius="md"
        maxWidth={900}
        width="100%"
        height="auto"
        bg="#f6f2f2"
      >
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
          <Box
            width="50%"
            sx={{ "@media screen and (max-width: 775px)": { width: "100%" } }}
            p={4}
          >
            <Heading textAlign="center" fontSize={20} mb={4} color="#000000" fontFamily="'Press Start 2P', sans-serif">
              Recuperar Contraseña
            </Heading>
            <hr />
            <Stack alignItems="center" spacing={8}>
              <FormControl
                mt={4}
                color="#000000"
                width={"80%"}
                alignContent="center"
              >
                <FormLabel fontSize={12}>Correo Electrónico</FormLabel>
                <Input
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  mb={2}
                  fontSize={12}
                  borderColor="gray.400"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{
                    borderColor: "gray.600",
                  }}
                />
                <FormLabel fontWeight={"normal"} fontSize={10}>
                  * Ingrese correo electronico asociado a la cuenta que desea
                  recuperar
                </FormLabel>
              </FormControl>
              <Button
                mb={5}
                fontSize={12}
                bg="#F7D51D"
                color="black"
                width="50%"
                _hover={{
                  fontSize: "14",
                  bg: "#F2C409",
                }}
              >
                Recuperar
              </Button>
            </Stack>
            <Box textAlign="center" mt={4} fontSize={12}>
              <Link color="#5d3c81" fontWeight={"bold"}>
                Ingresa ahora
              </Link>
              <Text
                color="#000000"
                fontWeight="semibold"
              >
                ¿Aun no tienes cuenta? <Link color="#5d3c81"><br />Registrate!</Link>
              </Text>
            </Box>
          </Box>
          <Box
            width="50%"
            sx={{ "@media screen and (max-width: 775px)": { display: "none" } }}
          >
            <Image width="100%" src="#"></Image>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider>
      <LoginForm />
    </ChakraProvider>
  );
}

export default App;
