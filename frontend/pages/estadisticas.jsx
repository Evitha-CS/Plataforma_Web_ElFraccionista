import React, { useState, useEffect } from 'react';
import { actualizarEstadoJuego } from "@/services/monitoreo"
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
  Flex,
  Text,
  CircularProgressLabel,
  useDisclosure
} from "@chakra-ui/react";
import { getUsuarioEstadisticas, getDetallesPartida } from '@/services/estadisticas';
import { useAuth } from '@/context/AuthContext';
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";

const EstadisticasCombinadasUsuario = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.id) {
        try {
          const userData = await getUsuarioEstadisticas(user.id);
          setEstadisticas(userData);
  
          const partidaData = await getDetallesPartida(user.id);
          setPartidas(Array.isArray(partidaData) ? partidaData : []);
        } catch (error) {
          console.error('Error al obtener estadísticas:', error);
        }
      }
    };
  
    fetchStats();
  }, [user]);
  useEffect(() => {
    if (user) {
      actualizarEstadoJuego(user.id, false);
    }
    return () => {
      if (user) {
        actualizarEstadoJuego(user.id, false);
      }
    };
  }, [user]);


  const totalPartidas = estadisticas?.partidasJugadas || 0;
  const partidasGanadas = estadisticas?.victorias || 0;
  const progressValue = totalPartidas > 0 ? (partidasGanadas / totalPartidas) * 100 : 0;

  if (!estadisticas) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress isIndeterminate color="blue.300" />
      </Box>
    );
  }

  return (
    <HomeLayout>
      <AuthRoute>
        <Flex direction="column" align="center" p={5}>
          <Box width={{ base: "100%", md: "80%", lg: "60%" }} bg="white" p={5} borderRadius="lg" boxShadow="xl">
            <Heading mb={6} color="blue.400">Estadísticas </Heading>
            <Flex justify="center" align="center" mb={10}>
              <CircularProgress value={progressValue} color="blue.400" size="150px" thickness="10px">
                <CircularProgressLabel  >{`${partidasGanadas}/${totalPartidas}`}</CircularProgressLabel>
              </CircularProgress>
              <Flex direction="column" mt={4}>
                <Text>Partidas Jugadas: {estadisticas?.partidasJugadas}</Text>
                <Text>Victorias: {estadisticas?.victorias}</Text>
                <Text>Derrotas: {estadisticas?.derrotas}</Text>
              </Flex>

            </Flex>
            <Heading mb={4}>Estadísticas por Partida</Heading>
      {partidas.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Partida</Th>
              <Th>Tiempo</Th>
              <Th>Errores</Th>
              <Th>Movimientos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {partidas.map(partida => (
              <Tr key={partida.partidaId}>
                <Td>{partida.ganador ? 'Ganada' : 'Perdida'}</Td>
                <Td>{partida.tiempoDuracion}</Td>
                <Td>{partida.errores}</Td>
                <Td>{partida.movimientos}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
            ) : (
              <Text>No se encontraron partidas.</Text>
            )}
          </Box>
        </Flex>
      </AuthRoute>
    </HomeLayout>
  );
};

export default EstadisticasCombinadasUsuario;
