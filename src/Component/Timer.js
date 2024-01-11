// Timer.js
import React, { useState, useEffect } from 'react';
import { auth } from '../config';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setMinutes(5); // Reset timer for 5 minutes
            setSeconds(0);
            setIsActive(false);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('email');
      window.location.href = '/login';
    });
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgImage="url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        textAlign="center"
        p={20}
        boxShadow="2xl"
        borderRadius="md"
        bg={formBackground}
        width={{ base: '100%', md: '60%', lg: '40%' }}
      >
        <Heading as="h3" mb={4}>
          Timer
        </Heading>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Text>
        <Button colorScheme="teal" variant={'outline'} onClick={toggleTimer} mr={2}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button colorScheme="orange" variant={'outline'} onClick={resetTimer} mr={2}>
          Reset
        </Button>
        <Button colorScheme="blue" variant={'outline'} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Timer;
