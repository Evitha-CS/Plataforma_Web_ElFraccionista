import React, { useState, useEffect } from 'react';
import { useToast, Heading, chakra } from "@chakra-ui/react";
import DataTable, { createTheme } from 'react-data-table-component'
import HomeLayout from '@/components/HomeLayout';
import {Flex} from '@chakra-ui/react';
import { getAllUsers, getUsersByRole } from "@/services/usuarios";
import AuthRoute from "@/components/AuthRoute";
import { updateRole } from "@/services/usuarios";
import { actualizarEstadoJuego } from "@/services/monitoreo"
import { useAuth } from '@/context/AuthContext';

function UserTable() {
    const toast = useToast();
    const [users, setUsers] = useState([]);
    const [roles, setRole] = useState([]);
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
    useEffect(() => {
        // Obtener todos los usuarios
        getAllUsers()
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((error) => {
                toast({
                    title: "Error al obtener los usuarios. Inténtelo más tarde.",
                    status: "error",
                    isClosable: true,
                });
            });

 
        getUsersByRole("ADMIN")
            .then((data) => {
                setRole(data);
            })
            .catch((error) => {
                toast({
                    title: "Error al obtener los usuarios por rol. Inténtelo más tarde.",
                    status: "error",
                    isClosable: true,
                });
            });
    }, []);

    createTheme('custom', {
        text: { primary: '#EAEAEA', secondary: '#2aa198' },
        background: { default: '#002b36' },
        context: { background: 'yellow', text: '#FFFFFF' },
        divider: { default: '#073642' },
        action: { button: 'rgba(0,0,0,.54)', hover: 'rgba(0,0,0,.08)', disabled: 'rgba(0,0,0,.12)' },
    }, 'dark');

    const columns = [

        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
        },
        {
            name: 'Rol',
            selector: 'role',
        },
       
    ];

    return (
        <AuthRoute>
        <HomeLayout>
            <Flex direction="column" align="center" p={5}>
            <Flex flexWrap="wrap" justifyContent="center" alignItems="center" marginInline="200px">
                <Heading textAlign="center" m={4} color="#000000">
                    Usuarios
                </Heading>
                <DataTable
                    columns={columns}
                    data={users}
                    theme='custom'

                />
            </Flex>
            </Flex>
        </HomeLayout>
        </AuthRoute>
    );
}

export default UserTable;