import React, { useState, useEffect } from 'react';
import { Stack, Stat, StatLabel, StatNumber, StatGroup,Heading,
  Box, Flex, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import { getAllCursos } from '../services/cursos'; 
import { getDetallesPartida } from '../services/estadisticas'; 
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import { useRouter } from 'next/router';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { actualizarEstadoJuego } from "@/services/monitoreo";
import { useAuth } from '@/context/AuthContext';
export default function CoursesListPage() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [estadisticas, setEstadisticas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const cursoId = router.query.cursoId;
  const [estadisticasGeneralesCurso, setEstadisticasGeneralesCurso] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (estudiantes.length > 0) {
      calcularEstadisticasGenerales();
    }
  }, [estudiantes]);
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
  const calcularEstadisticasGenerales = async () => {
    let totalPartidas = 0;
    let totalVictorias = 0;
    let totalErrores = 0;
    let totalMovimientos = 0;
    let victoriasPorEstudiante = {};
    let derrotasPorEstudiante = {};

    estudiantes.forEach(estudiante => {
      victoriasPorEstudiante[estudiante.id] = 0;
      derrotasPorEstudiante[estudiante.id] = 0;
    });

    for (let estudiante of estudiantes) {
      try {
        const partidasEstudiante = await getDetallesPartida(estudiante.id);
        partidasEstudiante.forEach(partida => {
          totalPartidas++;
          if (partida.ganador) {
            totalVictorias++;
            victoriasPorEstudiante[estudiante.id] = (victoriasPorEstudiante[estudiante.id] || 0) + 1;
          } else {
            derrotasPorEstudiante[estudiante.id] = (derrotasPorEstudiante[estudiante.id] || 0) + 1;
          }
          totalErrores += partida.errores;
          totalMovimientos += partida.movimientos;
        });
      } catch (error) {
        console.error('Error al obtener estadísticas del estudiante:', error);
      }
    }

    // Calcula los promedios
    let promedioErrores = totalErrores / totalPartidas;
    let promedioMovimientos = totalMovimientos / totalPartidas;


    let maxVictorias = 0, maxDerrotas = 0;
  let estudianteMaxVictorias = null, estudianteMaxDerrotas = null;

  estudiantes.forEach(estudiante => {
    if (victoriasPorEstudiante[estudiante.id] > maxVictorias) {
      maxVictorias = victoriasPorEstudiante[estudiante.id];
      estudianteMaxVictorias = estudiante.nombre;
    }
    if (derrotasPorEstudiante[estudiante.id] > maxDerrotas) {
      maxDerrotas = derrotasPorEstudiante[estudiante.id];
      estudianteMaxDerrotas = estudiante.nombre;
    }
  });
    setEstadisticasGeneralesCurso({
      totalPartidas,
      totalVictorias,
      totalErrores,
      totalMovimientos,
      promedioErrores,
      promedioMovimientos,
      estudianteConMasVictorias: estudianteMaxVictorias,
    estudianteConMasDerrotas: estudianteMaxDerrotas,
    });
  };

  useEffect(() => {
    const fetchCursos = async () => {
      const data = await getAllCursos();
      const cursoSeleccionado = data.find(curso => curso.id.toString() === cursoId);
      setSelectedCurso(cursoSeleccionado);
      setEstudiantes(cursoSeleccionado?.usuarios || []);
    };
  
    if (cursoId) {
      fetchCursos();
    }
  }, [cursoId]);

  const handleSelectCurso = (curso) => {
    setSelectedCurso(curso);
    setEstudiantes(curso.usuarios); 
  };

  const handleVerEstadisticas = async (userId) => {
    const stats = await getDetallesPartida(userId);
    console.log(stats);
    setEstadisticas(stats);
    setSelectedEstudiante(userId); 
    onOpen(); 
  };
  const calcularPorcentajeVictorias = () => {
    if (!estadisticasGeneralesCurso || estadisticasGeneralesCurso.totalPartidas === 0) {
      return 0;
    }
    return (estadisticasGeneralesCurso.totalVictorias / estadisticasGeneralesCurso.totalPartidas) * 100;
  };

  return (
    <AuthRoute>
    <HomeLayout>
    <Flex direction="column" align="center" p={5}>
    <Box>
      <Flex flexDirection="column" alignItems="center">
        {cursos.map((curso) => (
          <Box key={curso.id} p={5} shadow="md" borderWidth="1px">
            <Text fontWeight="bold">{curso.grado}to Basico '{curso.nombre}'</Text>
            <Button onClick={() => handleSelectCurso(curso)}>Ver Estudiantes</Button>
          </Box>
        ))}
      </Flex>
      {selectedCurso && (
  <Box justify="center" width={{ base: "100%" }} bg="white" p={5} borderRadius="lg" boxShadow="xl">
    {estadisticasGeneralesCurso && (
      <>
        <Heading mb={6} color="blue.400">Estadísticas Generales del Curso</Heading>
        <Flex justify="center" align="center" mb={10}>
          <CircularProgress value={calcularPorcentajeVictorias()} color="blue.400" size="150px" thickness="10px">
            <CircularProgressLabel>
              {`${estadisticasGeneralesCurso.totalVictorias}/${estadisticasGeneralesCurso.totalPartidas}`}
            </CircularProgressLabel>
          </CircularProgress>
          <Flex direction="column" ml={4}>
            <Text>Total de Partidas Jugadas: {estadisticasGeneralesCurso.totalPartidas}</Text>
            <Text>Total de Victorias: {estadisticasGeneralesCurso.totalVictorias}</Text>
            <Text>Total de Errores: {estadisticasGeneralesCurso.totalErrores}</Text>
            <Text>Total de Movimientos: {estadisticasGeneralesCurso.totalMovimientos}</Text>
          </Flex> 
        </Flex>
        <StatGroup p={4}>
               <Stat bg="green.100" p={4} borderRadius="md" ml={2}>
                  <StatLabel>Estudiante con mas Victorias:</StatLabel>
                  <StatLabel>{estadisticasGeneralesCurso.estudianteConMasVictorias}</StatLabel>
                </Stat>
                <Stat bg="red.100" p={4} borderRadius="md" ml={2}>
                  <StatLabel>Estudiante con mas Derrotas: </StatLabel>
                  <StatLabel>{estadisticasGeneralesCurso.estudianteConMasDerrotas }</StatLabel>
                </Stat>
                
        </StatGroup >
        <StatGroup p={4}>
        <Stat bg="cyan.100" p={4} borderRadius="md" ml={2}>
                  <StatLabel>Prom.Errores:</StatLabel>
                  <StatLabel>{estadisticasGeneralesCurso.promedioErrores?.toFixed(2)}</StatLabel>
                </Stat>
                <Stat bg="cyan.100" p={4} borderRadius="md" ml={2}>
                  <StatLabel>Prom.Movimientos:</StatLabel>
                  <StatLabel>{estadisticasGeneralesCurso.promedioMovimientos?.toFixed(2)}</StatLabel>
                </Stat>  
        </StatGroup>
      </>
    )}

    <Heading mt="4" size="md" color="purple.700" mb={4}>Lista de Estudiantes - {selectedCurso.grado}to {selectedCurso.nombre}  </Heading>
    <Table>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Email</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {estudiantes.map((estudiante) => (
          <Tr key={estudiante.id}>
            <Td>{estudiante.nombre}</Td>
            <Td>{estudiante.email}</Td>
            <Td>
              <Button bg={"red.300"} onClick={() => handleVerEstadisticas(estudiante.id)}>
                Estadísticas
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)}

<Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Estadísticas de Partidas del Estudiante</ModalHeader>
    <ModalCloseButton />
    <ModalBody overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ganador</Th>
            <Th>Duración</Th>
            <Th>Errores</Th>
            <Th>Movimientos</Th>
        
          </Tr>
        </Thead>
        <Tbody>
          {estadisticas.map((partida) => (
            <Tr key={partida.partidaId}>
              <Td>{partida.ganador ? 'Si' : 'No'}</Td>
              <Td>{partida.tiempoDuracion}</Td>
              <Td>{partida.errores}</Td>
              <Td>{partida.movimientos}</Td>
              
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ModalBody>
  </ModalContent>
</Modal>
    </Box>
    </Flex>
    </HomeLayout>
    </AuthRoute>
  );
}
