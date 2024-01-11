import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import { getAllCursos } from '../services/cursos'; 
import { getDetallesPartida } from '../services/estadisticas'; 
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import { useRouter } from 'next/router';

export default function CoursesListPage() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [estadisticas, setEstadisticas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const cursoId = router.query.cursoId;

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
    setEstadisticas(stats);
    setSelectedEstudiante(userId); 
    onOpen(); 
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
        <Box width={{ base: "120%"}} bg="white" p={5} borderRadius="lg" boxShadow="xl">
          <Text fontSize="xl" fontWeight="bold">{selectedCurso.grado}to basico {selectedCurso.nombre} - Estudiantes</Text>
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
