import React, { useState, useEffect } from 'react';
import { useDisclosure, Box, Button, Flex, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import { actualizarEstadoJuego } from "@/services/monitoreo"
import { getAllCursos } from "@/services/cursos";
import { getCursoMonitoreo } from '@/services/monitoreo';
import { useAuth } from '@/context/AuthContext';
import { getDetallesPartida } from '../services/estadisticas';

export default function Monitoreo() {
    const [cursos, setCursos] = useState([]);
    const [datosMonitoreo, setDatosMonitoreo] = useState({});
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [estadisticasUsuario, setEstadisticasUsuario] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();
    const [salasDesplegadas, setSalasDesplegadas] = useState({});
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

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

    const recargarPagina = () => {
        window.location.reload();
    };
    const openSecondModal = () => {
        setIsSecondModalOpen(true);
    };

    const closeSecondModal = () => {
        setIsSecondModalOpen(false);
    };

    useEffect(() => {
        const cargarCursosYMonitoreo = async () => {
            try {
                const cursosData = await getAllCursos();
                const monitoreoData = {};

                for (const curso of cursosData) {
                    try {
                        const monitoreo = await getCursoMonitoreo(curso.id);
                        monitoreoData[curso.id] = monitoreo;
                    } catch (error) {
                        console.error(`Error al obtener monitoreo para curso ${curso.id}:`, error);
                    }
                }

                setCursos(cursosData);
                setDatosMonitoreo(monitoreoData);
            } catch (error) {
                console.error('Error al cargar cursos:', error);
            }
        };

        cargarCursosYMonitoreo();
    }, []);

    const onCloseModal = () => {
        setCursoSeleccionado(null);
        onClose();
    };
    const toggleSalaDesplegada = (salaId) => {
        setSalasDesplegadas(prevState => ({
            ...prevState,
            [salaId]: !prevState[salaId]
        }));
    };
    const mostrarEstadisticas = async (userId) => {
        try {
            const estadisticas = await getDetallesPartida(userId);
            console.log(estadisticas); // Asume que esta función obtiene las estadísticas
            setEstadisticasUsuario(estadisticas);
            onOpen(); // Abre el primer modal

            // Abre el segundo modal y pasa los datos relevantes
            openSecondModal();
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            // Manejo de errores aquí
        }
    };

    return (
        <AuthRoute>
            <HomeLayout>
                <Heading as="h1" size="xl" textAlign="initial" mb={20} ml={4} pl={60} mt={20}>
                    Monitoreo de Cursos
                </Heading>
                <Flex flexDirection="column" alignItems="center" mb={8} gap={4}>
                    {cursos.map((curso) => (
                        <Box
                            key={curso.id}
                            borderWidth="1px"
                            p={6}
                            rounded="xl"
                            width="50%"
                            textAlign="left"
                            bg="#dcdcdc"
                            position="relative"
                            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                            _hover={{
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Text fontSize="xl" fontWeight="bold" position="absolute" top={2} left={2}>
                                {curso.grado}to Básico "{curso.nombre}"
                            </Text>
                            <Text fontSize="sm" mt="6">
                                Alumnos conectados: {datosMonitoreo[curso.id]?.usuariosConectados || 0}
                            </Text>
                            <Text fontSize="sm" mt="6">
                                Salas activas: {datosMonitoreo[curso.id]?.detallesSalas.length || 0}
                            </Text>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                mt={4}
                                onClick={() => {
                                    setCursoSeleccionado(datosMonitoreo[curso.id]);
                                    onOpen();
                                }}
                            >
                                Monitorear Curso
                            </Button>
                        </Box>
                    ))}
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Button
                        colorScheme="teal"
                        onClick={recargarPagina}
                        mt={4}
                    >
                        Refrescar
                    </Button>
                </Flex>
                <Modal isOpen={isOpen} onClose={onCloseModal}>
                    <ModalOverlay />
                    <ModalContent maxW="1200px">
                        <ModalHeader>Detalles del Curso: {cursoSeleccionado?.nombreCurso}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Heading size="md">Salas Activas</Heading>
                            {cursoSeleccionado?.detallesSalas.map((sala, index) => (
                                <Box key={index} p={4} borderWidth="1px" rounded="md" my={2}>
                                    <Button onClick={() => toggleSalaDesplegada(sala.id)}>
                                        Sala {index + 1}
                                    </Button>
                                    {salasDesplegadas[sala.id] && (
                                        <Box overflowX="auto">
                                            <Table variant="simple">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Usuario</Th>
                                                        <Th>Email</Th>
                                                        <Th>Curso</Th>
                                                        <Th>Acciones</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>{sala.usuario1.nombre}</Td>
                                                        <Td>{sala.usuario1.email}</Td>
                                                        <Td>
                                                            <Button onClick={() => {
                                                                console.log("sala.usuario1Id:", sala.usuario1Id);
                                                                mostrarEstadisticas(sala.usuario1Id);
                                                            }}>
                                                                Ver Estadísticas
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>{sala.usuario2.nombre}</Td>
                                                        <Td>{sala.usuario2.email}</Td>
                                                        <Td>
                                                            <Button onClick={() => {
                                                                console.log("sala.usuario2Id:", sala.usuario2Id);
                                                                mostrarEstadisticas(sala.usuario2Id);
                                                            }}>
                                                                Ver Estadísticas
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Segundo Modal */}
                <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal} isCentered size="2xl">
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
                                    {estadisticasUsuario ? (
                                        estadisticasUsuario.map((partida) => (
                                            <Tr key={partida.partidaId}>
                                                <Td>{partida.ganador ? 'Si' : 'No'}</Td>
                                                <Td>{partida.tiempoDuracion}</Td>
                                                <Td>{partida.errores}</Td>
                                                <Td>{partida.movimientos}</Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={4}>No hay estadísticas disponibles.</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </HomeLayout>
        </AuthRoute>
    );
}
