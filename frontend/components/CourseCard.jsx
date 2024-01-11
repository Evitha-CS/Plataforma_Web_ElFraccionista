import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';


const CourseCard = ({ title, description, buttonText, onClick, sendName }) => {

  const estiloTexto = {
    fontFamily: 'Montserrat, sans-serif', 
    fontSize: '20px', 
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      m={4}
      boxShadow="md"
      maxW="550px" minW="300px"
      bg="#D9D9D9"
    >
      <Heading textAlign="center" size="md" mb={2}>
        {title}
      </Heading>
      <Box m={6}>
        <Text style={estiloTexto} fontSize="sm" mt={4} mb={6}>
          {description}
        </Text>
      </Box>

      <Flex justify="center">
        {sendName ? (
          <Button
            bg="#F7D51D"
            onClick={sendName}
            _hover={{
              fontSize: "18",
              bg: "#F2C409",
            }}>
            Ingresar
          </Button>
        ) : (
          <Button
            bg="#F7D51D"
            onClick={onClick}
            _hover={{
              fontSize: "18",
              bg: "#F2C409",
            }}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default CourseCard;