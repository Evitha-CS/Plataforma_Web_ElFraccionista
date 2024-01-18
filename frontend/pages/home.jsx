import { Heading, Box, VStack, Text, Flex } from "@chakra-ui/react";
import HomeLayout from "@/components/HomeLayout";
import AuthRoute from "@/components/AuthRoute";
import React, { useState, useEffect } from 'react';
import { actualizarEstadoJuego } from "@/services/monitoreo"
import { useAuth } from '@/context/AuthContext';
export default function HomePage() {
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
                        Inicio
                    </Heading>
                    <Box p={4}></Box>
                    <Text fontSize="lg">
                        ¡Bienvenidos a "El Fraccionista"!.
                    </Text>
                </VStack>
            </Flex>
        </HomeLayout>
        </AuthRoute>
    );
}