import React, { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config';
import { Img } from '@chakra-ui/react';
import Timer from './Timer';

import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTimer, setShowTimer] = useState(false);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
      localStorage.setItem('email', data.user.email);
      setShowTimer(true);
    });
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('email');
    if (userFromLocalStorage) {
      setUser({ email: userFromLocalStorage });
      setShowTimer(true);
    }
  }, []);

  if (showTimer) {
    return <Timer user={user} />;
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bgImage="url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')"  bgSize="cover"
    bgPosition="center">
      <Flex flexDirection="column" bg={formBackground} gap="5px" p={20} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="xyz@gmail.com"
          type="email"
          variant="flushed"
          mb={6}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="flushed"
          mb={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {user ? (
          <Timer user={user} />
        ) : (
          <>
            <Button colorScheme="teal" variant={'outline'} mb={8} ml="25%" width="50%">
              Log In
            </Button>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark_mode" mb="0">
                Enable Dark Mode?
              </FormLabel>
              <Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} />
            </FormControl>
            <Button onClick={handleClick} variant={'outline'}>
              <Flex alignItems="flex-start">
                <Img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google Logo"
                  width="34px"
                  height="90%"
                  borderRadius="5px 0 0 5px"
                  backgroundColor="transparent"
                />
              </Flex>
              <Text
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                w="180px"
                h="100%"
                pl="3"
              >
                Sign in with Google
              </Text>
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Login;
