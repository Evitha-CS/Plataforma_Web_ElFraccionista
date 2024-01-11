import React, { useState, useEffect } from 'react';
import HomeLayout from "@/components/HomeLayout";
import { createCurso, getAllCursos, deleteCurso, addUserToCurso, getCursosByUserId } from '../services/cursos';
import { getUsersByRole } from '../services/usuarios';
import { useAuth } from "@/context/AuthContext";
import AuthRoute from "@/components/AuthRoute";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Heading, Flex, Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure,
  Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Select
} from '@chakra-ui/react';

export default function CoursesPage() {
  const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
  const { user, isAuthenticated } = useAuth();
  const [newCurso, setNewCurso] = useState({ nombre: '', grado: 0 });
  const [cursos, setCursos] = useState([]);
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [courseToDelete, setCourseToDelete] = useState(null);
  const { isOpen: isDetailsModalOpen, onOpen: onOpenDetailsModal, onClose: onCloseDetailsModal } = useDisclosure();
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [newStudent, setNewStudent] = useState({ userId: '' });
  const [listaDeEstudiantesDisponibles, setListaDeEstudiantesDisponibles] = useState([]);

  const router = useRouter();
  
  const loadEstudiantesDisponibles = async () => {
    try {
      const estudiantes = await getUsersByRole('USER');
      const cursosConEstudiantes = await getAllCursos();
      const estudiantesInscritos = new Set();
      cursosConEstudiantes.forEach(curso => {
        curso.usuarios.forEach(usuario => {
          estudiantesInscritos.add(usuario.id);
        });
      });

      const estudiantesDisponibles = estudiantes.filter(estudiante => !estudiantesInscritos.has(estudiante.id));
      setListaDeEstudiantesDisponibles(estudiantesDisponibles);
    } catch (error) {
      console.error('Error al obtener la lista de estudiantes disponibles:', error);
    }
  };

  useEffect(() => {
    loadEstudiantesDisponibles();
  }, [cursos]);

  const loadCursos = async () => {
    try {
      let cursosData = [];
  
      if (user.role === 'USER') {
        const userCursos = await getCursosByUserId(user.id); 
        cursosData = userCursos;
      } else {
        
        cursosData = await getAllCursos();
      }
  
      setCursos(cursosData);
    } catch (error) {
      console.error('Error al obtener la lista de cursos:', error);
    }
  };

  const esAdminOProfesor = user && (user.role === 'ADMIN' || user.role === 'PROFESOR');

  const handleAgregarEstudiante = async () => {
    if (!esAdminOProfesor) {
      alert('Acceso no autorizado');
      return;
    }
    if (!newStudent.userId) {
      alert('Por favor, selecciona un estudiante.');
      return;
    }

    try {
      await addUserToCurso(selectedCurso.id, { userId: newStudent.userId });
      loadCursos();
      onCloseDetailsModal();
    } catch (error) {

      console.error('Error al agregar estudiante al curso:', error);
    }
  };

  const handleCreateCurso = async () => {
    if (!esAdminOProfesor) {
      alert('Acceso no autorizado');
      return;
    }

    if (!newCurso.nombre || !newCurso.grado) {
      alert('Por favor, selecciona un grado y un nombre de curso.');
      return;
    }
    try {
      const response = await createCurso(newCurso);
      setNewCurso({ nombre: '', grado: '' });
      loadCursos();
    } catch (error) {
      alert("Curso ya creado", error);
    }
  };

  const handleDeleteCurso = async (cursoId) => {
    if (!esAdminOProfesor) {
      alert('Acceso no autorizado');
      return;
    }

    try {
      await deleteCurso(cursoId);
      loadCursos();
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };

  const openDeleteModal = (curso) => {
    setCourseToDelete(curso);
    onOpenDeleteModal();
  };

  const closeDeleteModal = () => {
    setCourseToDelete(null);
    onCloseDeleteModal();
  };

  useEffect(() => {
    loadCursos();
  }, []);

  const handleIngresarClick = (cursoId) => {
    router.push({
      pathname: '/videogame',
      query: { cursoId }, 
    });
  };

  return (
    <AuthRoute>
    <HomeLayout>
      <Heading as="h1" size="xl" textAlign="initial" mb={20} ml={4} pl={60} mt={20}>
        Cursos:
      </Heading>
      {cursos.length > 0 ? (
          <Flex flexDirection="column" alignItems="center" mb={8} gap={4}>
          {cursos.map((curso) => (
            <Box
              key={curso.id}
              borderWidth="1px"
              p={6}
              rounded="xl"
              width={["50%"]}
              textAlign="left"
              bg="#dcdcdc"
              position="relative"
              boxShadow="0 4px 8px rgba(0, 0, 0, 1)"
              transition="box-shadow 0.3s ease"
              _hover={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 1)",
              }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                position="absolute"
                top={2}
                left={2}
              >
                {curso.grado}to Básico "{curso.nombre}"
              </Text>
              {esAdminOProfesor && (
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  colorScheme="red"
                  onClick={() => openDeleteModal(curso)}
                  zIndex="1"
                  border="none"
                  bg="red"
                  cursor="pointer"
                >
                  X
                </Button>
              )}

              <Text fontSize="s" mt="6">
                Alumnos: {curso.usuarios.length}
              </Text>

              <Button
                onClick={() => {
                  setSelectedCurso(curso);
                  onOpenDetailsModal();
                }}
                colorScheme="yellow"
                size="sm"
                mt={4}
              >
                Ver detalles
              </Button>

                <Box></Box>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  mt={4}
                  onClick={() => handleIngresarClick(curso.id)}
                >
                  Ingresar
              </Button>
            </Box>
          ))}
        </Flex>
        ) : (
          <Text textAlign="center" mt={10}>
            No estás agregado a ningún curso. Avísale a tu profesor.
          </Text>
        )}
        {esAdminOProfesor && (
          <Flex justifyContent="center">
            <Button onClick={onOpenCreateModal} colorScheme="teal" mt={4}>
              Crear Curso
            </Button>
          </Flex>
        )}

        <Modal isOpen={isCreateModalOpen} onClose={onCloseCreateModal}>
          <ModalOverlay />
          <ModalContent maxW="800px">
            <ModalHeader>Crear Nuevo Curso</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mt={4}>
                <FormLabel>Nombre del curso</FormLabel>
                <Select
                  value={newCurso.grado}
                  onChange={(e) => setNewCurso({ ...newCurso, grado: parseInt(e.target.value) })}
                >
                  <option >-</option>
                  <option value="5">5to básico</option>
                  <option value="6">6to básico</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Letra</FormLabel>
                <Select
                  value={newCurso.nombre}
                  onChange={(e) => setNewCurso({ ...newCurso, nombre: e.target.value })}
                >
                  <option >-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Select>
              </FormControl>
              <Button onClick={handleCreateCurso} colorScheme="teal" mt={4} onClose={onCloseCreateModal}>
                Crear Curso
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalOverlay />
          <ModalContent maxW="400px">
            <ModalHeader>Confirmar eliminación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>¿Estás seguro de que deseas eliminar el curso "{courseToDelete?.nombre}"?</Text>
            </ModalBody>
            <Flex justify="flex-end" p={2}>
              <Button colorScheme="red" onClick={() => { handleDeleteCurso(courseToDelete?.id); closeDeleteModal(); }}>
                Sí, eliminar
              </Button>
              <Button ml={2} onClick={closeDeleteModal}>
                Cancelar
              </Button>
            </Flex>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDetailsModalOpen} onClose={onCloseDetailsModal}>
          <ModalOverlay />
          <ModalContent maxW="800px">
            <ModalHeader>Detalles del Curso</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedCurso && (
                <>
                  <Text fontSize="l" mb="4">Lista de estudiantes en el curso</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nombre</Th>
                        <Th>Correo Electrónico</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedCurso.usuarios.map((usuario) => (
                        <Tr key={usuario.id}>
                          <Td>{usuario.nombre}</Td>
                          <Td>{usuario.email}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  {esAdminOProfesor && (
                  <>
                  <Text fontSize="l" mb="4">Agregar estudiante al curso</Text>
                  <FormControl mt={4}>
                    <FormLabel>Estudiante</FormLabel>
                    <Select
                      value={newStudent.userId}
                      onChange={(e) => setNewStudent({ ...newStudent, userId: e.target.value })}
                    >
                      <option value="">- Seleccione un estudiante -</option>
                      {listaDeEstudiantesDisponibles.map((estudiante) => (
                      <option key={estudiante.id} value={estudiante.id}>
                        {estudiante.nombre}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Button onClick={handleAgregarEstudiante} colorScheme="teal" mt={4}>
                    Agregar Estudiante
                  </Button>
                  </>
                )}
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </HomeLayout>
    </AuthRoute>
  );
}
