import {
  Alert,
  Box,
  Input,
  Button,
  Heading,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Stack,
  Select,
  Text,
  Checkbox,
  extendTheme,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerRegiones, obtenerComunasPorRegion } from '@/services/regiones.js';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, register, login } = useAuth();

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    regionKey: "",
    ciudad: "",
    telefono: "",
    error: false,
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    // Cargar regiones al montar el componente
    const cargarRegiones = async () => {
      try {
        const data = await obtenerRegiones();
        setRegiones(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargarRegiones();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'regionKey') {
      setUser({ ...user, regionKey: value });
      try {
        const dataComunas = await obtenerComunasPorRegion(value);
        setComunas(dataComunas);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Encuentra la región seleccionada en el array de regiones
    const regionSeleccionada = regiones.find(region => region.id.toString() === user.regionKey);
  const comunaSeleccionada = comunas.find(comuna => comuna.nombre === user.ciudad);
  
    // Verificar si los campos opcionales están en blanco y asignar valores predeterminados
    const userData = {
      email: user.email,
      nombre: `${user.firstName} ${user.lastName}`,
      password: user.password,
      regionId: regionSeleccionada ? regionSeleccionada.id : null, // Convertir regionKey a regionId
      ciudadId: comunaSeleccionada ? comunaSeleccionada.id : null, // Convertir el nombre de la ciudad a ciudadId
      telefono: user.telefono,
    };
  
    try {
      await register(userData);
      await login(user.email, user.password);
      router.push("/home");
    } catch (error) {
      setUser({ ...user, error: true });
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);


  return (
    <Box
      fontFamily="'Press Start 2P', sans-serif"
      bgGradient="linear(to-b, #D800A6, #621CAD)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      p={4}
    >
      <Box
        borderRadius= "20px"
        border="2px solid black"
        maxWidth={1000}
        width="100%"
        height="auto"
        bg="#ffffff"
        p={4}
      >
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          bg="#ffffff"
        >
          <Box
            width="90%"
            sx={{ "@media screen and (max-width: 775px)": { width: "100%" } }}
            p={4}
          >
            <Heading textAlign="center" mb={4} color="#000000">
              Registro usuario
            </Heading>

            {user.error && (
              <Alert 
              my={4} 
              status="error" 
              textColor={"red"} 
              borderRadius="lg"
              fontSize={12}
              textAlign="center"
              justifyContent="center"
              >
                Error en el registro.<br />Verifica tus datos e intenta de nuevo.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box
                bg="#f6f2f2"
                borderRadius={"md"}
                borderColor="#000000"
                borderWidth="1px"
              >
                <FormControl pt={4} color="#000000" pb={4} p={4}>
                  <FormLabel
                    fontWeight={"bold"}
                    fontSize={14}

                  >
                    Información Usuario
                  </FormLabel>
                  <hr />
                  <Stack
                    direction="row"
                    alignItems="center"
                    mt={2}
                    spacing="20px"
                  >
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Nombre(s)</FormLabel>

                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Nombre"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                        value={user.firstName}
                        onChange={handleChange}
                      />
                    </Stack>{" "}
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Apellido(s)</FormLabel>

                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Apellidos"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                        value={user.lastName}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    mt={2}
                    spacing="20px"
                  >
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Contraseña</FormLabel>

                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="*********"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                        value={user.password}
                        onChange={handleChange}
                      />
                    </Stack>{" "}
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Repetir contraseña</FormLabel>

                      <Input
                        type="password"
                        placeholder="*********"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                      />
                    </Stack>
                  </Stack>
                </FormControl>
              </Box>
              <Box
                bg="#f6f2f2"
                mt={4}
                borderRadius={"md"}
                borderColor="#000000"
                borderWidth="1px"
              >
                <FormControl pt={4} color="#000000" pb={4} p={4}>
                  <FormLabel fontWeight={"bold"} fontSize={14}>
                    Datos de contacto
                  </FormLabel>
                  <hr />
                  <Stack
                    direction="row"
                    alignItems="center"
                    mt={2}
                    spacing="20px"
                  >
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Correo</FormLabel>

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                        value={user.email}
                        onChange={handleChange}
                      />
                    </Stack>{" "}
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Teléfono(*)</FormLabel>

                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="+56987654321"
                        mt={4}
                        fontSize={12}
                        borderColor="gray.400"
                        borderWidth="1px"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "gray.600",
                        }}
                        value={user.telefono}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    mt={2}
                    spacing="20px"
                  >
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Región</FormLabel>

                       <Select
      id="regionKey"
      name="regionKey"
      mt={4}
      fontSize={12}
      value={user.regionKey}
      onChange={handleChange}
    >
      <option value="">Selecciona Región</option>
      {regiones.map((region) => (
        <option key={region.id} value={region.id}>
          {region.nombre}
        </option>
      ))}
    </Select>
                    </Stack>{" "}
                    <Stack
                      direction="column"
                      alignItems="left"
                      spacing="-4px"
                      width="100%"
                    >
                      <FormLabel fontSize={12}>Comuna(*)</FormLabel>

                      <Select
      id="ciudad"
      name="ciudad"
      mt={4}
      fontSize={12}
      value={user.ciudad}
      onChange={(e) => setUser({ ...user, ciudad: e.target.value })}
    >
      <option value="">Selecciona Comuna</option>
      {comunas.map((comuna) => (
        <option key={comuna.id} value={comuna.nombre}>
          {comuna.nombre}
        </option>
      ))}
    </Select>
                    </Stack>
                  </Stack>
                </FormControl>
              </Box>

              <Stack alignItems="center" display="flex">
                <Button
                  type="submit"
                  fontSize={12}
                  mb={2}
                  mt={5}
                  bg="#F7D51D"
                  color="black"
                  alignItems="center"
                  width="30%"
                  _hover={{
                    fontSize: "14",
                    bg: "#F2C409",
                  }}
                >
                  Registrar
                </Button>
                <Box textAlign="center">
                  <Text
                    color="#000000"
                    fontWeight="semibold"
                    fontSize={10}
                  >
                    Ya tienes una cuenta?{" "}
                    <Link color="#dd6644" fontWeight={"semibold"} href="/">
                      Ingresa ahora!
                    </Link>
                  </Text>
                </Box>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}