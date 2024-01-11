
import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  Flex,
  Image,
  Link,
  FormControl,
  FormLabel,
  Stack,
  Text,useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated, login } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "", // Nuevo campo para el mensaje específico
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: false,
      errorMessage: "", // Limpiar el mensaje de error al cambiar los campos
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(user.email, user.password);
      router.push("/home");
      toast({
        title: "Logueado Correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setUser({
        email: "",
        password: "",
        error: true,
        errorMessage: error.message,
      });
      onOpen(); // Abre el modal de error
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const reloadPage = () => {
    router.reload();
    onClose(); // Cierra el modal después de recargar la página
  };

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
        maxWidth={900}
        width="100%"
        height="auto"
        bg="#f6f2f2"
        borderRadius="20px 20px 20px 20px"
      >
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          border="2px solid black"
          borderRadius="20px 20px 20px 20px"
        >
          <Box
            width="50%"
            sx={{ "@media screen and (max-width: 775px)": { display: "none" } }}
          >
            <Image borderRadius="17px 0px 0px 17px" width="100%" src="/login.png"></Image>
          </Box>
          <Box
            width="50%"
            sx={{ "@media screen and (max-width: 775px)": { width: "100%" } }}
            p={4}
          >
            <Heading textAlign="center" fontSize={25} mb={4} color="#000000">
              Iniciar sesión
            </Heading>

            <form onSubmit={handleSubmit}>
              <Text
                fontSize={10}
                color="#000000"
                textAlign="center"
                m={8}
                fontWeight="semibold"
              >
                ¿Aun no tienes cuenta?{" "}
                <Link color="#dd6644" href="/registro">
                  Registrate!
                </Link>
              </Text>
              <FormControl mt={4} color="#000000">
                <FormLabel fontSize={12}>Correo Electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  fontSize={12}
                  placeholder="usuario@ejemplo.com"
                  mb={4}
                  borderColor="gray.400"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{
                    borderColor: "gray.600",
                  }}
                  onChange={handleChange}
                  value={user.email}
                />
                <FormLabel fontSize={12}>Contraseña</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  fontSize={12}
                  placeholder="Contraseña"
                  mb={4}
                  borderColor="gray.400"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{
                    borderColor: "gray.600",
                  }}
                  onChange={handleChange}
                  value={user.password}
                />
                <Stack display="flex" pl={1} pb={2}>
                  <Flex direction="row" align="center">
                    <Switch id="recuerdame-id" />
                    <FormLabel fontSize={9} htmlFor="recuerdame-id" mt="1" ml="2">
                      Recordarme
                    </FormLabel>
                  </Flex>
                </Stack>
              </FormControl>
              {user.error && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  <AlertDescription>
                    {user.errorMessage || 'Por favor, verifica tus credenciales e inténtalo de nuevo.'}
                  </AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                fontSize={12}
                mb={5}
                bg="#F7D51D"
                color="black"
                width="100%"
                _hover={{
                  fontSize: "14",
                  bg: "#F2C409",
                }}
              >
                Iniciar sesión
              </Button>
            </form>

            

            <Box textAlign="center" mt={5}>
              <Link fontSize={10} color="#dd6644" href="/recuperar">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
