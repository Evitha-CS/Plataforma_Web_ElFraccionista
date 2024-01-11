import { useState, useEffect } from "react";
import {
  Heading,
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import { updateUser } from "@/services/usuarios";
import { useAuth } from "@/context/AuthContext";
import { obtenerRegiones, obtenerComunasPorRegion } from '@/services/regiones.js';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({
    newRegion: "",
    newCity: "",
    newPhone: "",
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cargarRegiones = async () => {
      try {
        const dataRegiones = await obtenerRegiones();
        setRegiones(dataRegiones);
      } catch (error) {
        console.error(error);
      }
    };
    cargarRegiones();
  }, []);

  const openModal = async () => {
    setIsModalOpen(true);
    setFormData({
      newRegion: user.regionId || "",
      newCity: user.ciudadId || "",
      newPhone: user.telefono || "",
    });

    // Cargar comunas para la región del usuario
    if (user.regionId) {
      try {
        const dataComunas = await obtenerComunasPorRegion(user.regionId);
        setComunas(dataComunas);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "newRegion") {
      const regionSeleccionada = regiones.find(region => region.id.toString() === value);
      setFormData({ ...formData, newRegion: value });

      if (regionSeleccionada) {
        try {
          const dataComunas = await obtenerComunasPorRegion(regionSeleccionada.id);
          setComunas(dataComunas);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      regionId: parseInt(formData.newRegion),
      ciudadId: parseInt(formData.newCity),
      telefono: formData.newPhone,
    };

    try {
      await updateUser(user.id, updatedData);
      await refreshUser();
      setIsModalOpen(false);
      toast({
        title: "Datos actualizados",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      toast({
        title: "Error al actualizar datos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthRoute>
      <HomeLayout>
        <VStack spacing={4} align="center">
          <Box
            my={10}
            p={6}
            borderRadius="md"
            boxShadow="lg"
            bg="gray.200"
            width="70%"
          >
            <Heading as="h2" size="lg" marginBottom={4}>
              Datos del Usuario
            </Heading>
            <VStack spacing={2} align="left">
              <Text>
                <strong>Nombre:</strong> {user?.nombre}
              </Text>
              <Text>
                <strong>Email:</strong> {user?.email}
              </Text>
              <Text>
                <strong>Región:</strong> {user?.region}
              </Text>
              <Text>
                <strong>Ciudad:</strong> {user?.ciudad}
              </Text>
              <Text>
                <strong>Teléfono:</strong> {user?.telefono}
              </Text>
            </VStack>
            <Button mt={4} colorScheme="blue" onClick={() => setIsModalOpen(true)}>
              Actualizar Datos
            </Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Actualizar Datos</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      <Text>Región</Text>
                      <Select
                        placeholder="Selecciona Región"
                        name="newRegion"
                        value={formData.newRegion}
                        onChange={handleChange}
                      >
                        {regiones.map(region => (
                          <option key={region.id} value={region.id}>
                            {region.nombre}
                          </option>
                        ))}
                      </Select>
                      <Text>Ciudad</Text>
                      <Select
                        placeholder="Selecciona Ciudad"
                        name="newCity"
                        value={formData.newCity}
                        onChange={handleChange}
                      >
                        {comunas.map(comuna => (
                          <option key={comuna.id} value={comuna.id}>
                            {comuna.nombre}
                          </option>
                        ))}
                      </Select>
                      <Text>Teléfono</Text>
                      <Input
                        type="text"
                        name="newPhone"
                        placeholder="Nuevo teléfono"
                        value={formData.newPhone}
                        onChange={handleChange}
                      />
                    </VStack>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Actualizar
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </VStack>
      </HomeLayout>
    </AuthRoute>
  );
}
