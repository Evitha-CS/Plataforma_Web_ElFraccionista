import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, IconButton, Stack, useColorModeValue,
  Icon, Button, Menu, MenuButton, MenuList, MenuItem,
  Avatar, Image
} from "@chakra-ui/react";
import {
  FiHome, FiMenu, FiUser, FiBarChart2, FiBookOpen, FiInfo, FiLogOut, FiActivity
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function HomeLayout({ children }) {
  const [isClient, setIsClient] = useState(false); 
  const { isAuthenticated, loading, logout, user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true); 
  const navBg = useColorModeValue("white", "gray.800");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/");
    }
    setIsClient(true);
  }, [isAuthenticated, loading, router]);

  
  if (!isClient) {
    return null;
  }

  const isUser = user && user.role === 'USER';
  const isUserAdmin = user && user.role === 'ADMIN';
  const isUserProfesor = user && user.role === 'PROFESOR';

  const sidebarWidth = isSidebarOpen ? "300px" : "80px";

  const SidebarContent = props => (
    <Box
      transition="0.3s ease"
      bg={navBg}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={sidebarWidth}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        px="4"
      >
        <IconButton
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          icon={<FiMenu />}
          size="lg"
          variant="ghost"
          aria-label={isSidebarOpen ? "Collapse Menu" : "Expand Menu"}
        />
      </Flex>
      <Stack p="0">
        <SidebarItem icon={FiHome} title="Inicio" href="/home" />
        <SidebarItem icon={FiBookOpen} title="Cursos" href="/cursos" />
       { (isUserAdmin || isUserProfesor) && (
        <SidebarItem icon={FiActivity} title="Monitoreo" href="/monitoreo" />
      )}
        <SidebarItem icon={FiBarChart2} title="Mis Estadísticas" href="/estadisticas" />
         {isUserAdmin && (
        <SidebarItem icon={FiUser} title="Usuarios" href="/usuarios" />
      )}
        <SidebarItem icon={FiInfo} title="Acerca de" href="/about" />
        <Button leftIcon={<FiLogOut />} variant="ghost" justifyContent="start" onClick={() => logout()} display={isSidebarOpen ? "flex" : "none"}>
          Cerrar Sesión
        </Button>
      </Stack>
    </Box>
  );

  
  const SidebarItem = ({ icon, title, href }) => (
    <NextLink href={href} passHref>
      <Flex as="a" align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" _hover={{ bg: 'cyan.400', color: 'white', }}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" display={isSidebarOpen ? "block" : "none"}>
          {title}
        </Text>
      </Flex>
    </NextLink>
  );
  const TopNav = () => {
    return (
      <Flex
        align="center"
        justify="space-between"
        bg={useColorModeValue('purple.500', 'gray.800')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        px={4}
        h="20"
      >
        <Image
          src="/img/GameTitle.png" 
          alt="El Fraccionista"
          height="65%" 
        />
        <Menu>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Icon as={FiUser} w={10} h={10} color="white"/> 
        </MenuButton>
          <MenuList>
            <MenuItem as={NextLink} href="/profile">Perfil</MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={logout}>Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <TopNav />
      <SidebarContent onClose={() => setSidebarOpen(!isSidebarOpen)} />
      <Box ml={sidebarWidth} transition="0.3s ease">
        {children}
      </Box>
    </Box>
  );
}


