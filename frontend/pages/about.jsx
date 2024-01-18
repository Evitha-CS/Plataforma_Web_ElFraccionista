import { Heading, Box, VStack, Text, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import { actualizarEstadoJuego } from "@/services/monitoreo"
import { useAuth } from "@/context/AuthContext";

export default function AboutPage() {
    const { user } = useAuth();

  
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

    return (
        <AuthRoute>
        <HomeLayout>
            <Flex flexWrap="wrap" justifyContent="center" alignItems="center" marginTop="100px" marginInline="200px">
                <VStack sparcing={4}>
                    <Heading as="h1" size="xl">
                        Acerca de Nosotros
                    </Heading>
                    <Box p={4}></Box>
                    <Text fontSize="lg">
                        ¡Bienvenidos a "El Fraccionista"! Somos un proyecto educativo sin
                        fines de lucro comprometido con la mejora de la educación en Chile.
                    </Text>
                    <Box p={4}></Box>
                    <Text>
                        Nuestro proyecto se enfoca en mejorar el aprendizaje de los alumnos de
                        quinto y sexto básico mediante un videojuego de navegador, capaz de
                        enseñar fracciones de una forma más atractiva y divertida.
                    </Text>
                    <Box p={4}></Box>
                    <Text>
                        Queremos demostrar que la tecnología puede ser una herramienta efectiva
                        para mejorar el aprendizaje de los estudiantes y transformar la forma en
                        que los alumnos aprenden fracciones. Porque creemos que, a través de la
                        innovación y la tecnología, podemos mejorar la educación y el futuro de
                        nuestros estudiantes.
                    </Text>
                </VStack>
            </Flex>
        </HomeLayout>
        </AuthRoute>
    );
}