import React from 'react';
import PropTypes from 'prop-types';
import {
  chakra,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const LoginForm = ({ onSubmit, ...props }) => (
  <chakra.form
    bg="white"
    py={6}
    px={5}
    onSubmit={(event) => {
      event.preventDefault();
      const elementsArray = [...event.target.elements];
      const formData = elementsArray.reduce((acc, elem) => {
        if (elem.id) {
          acc[elem.id] = elem.value;
        }

        return acc;
      }, {});

      onSubmit(formData);
    }}
    {...props}
  >
    <Stack spacing="6">
      <FormControl id="email" colorScheme="brand">
        <FormLabel>Email address</FormLabel>
        <Input
          focusBorderColor="brand.500"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          focusBorderColor="brand.500"
          name="password"
          type="password"
          required
        />
      </FormControl>
      <Button type="submit" variant="submit" size="lg" fontSize="md">
        Sign in
      </Button>
    </Stack>
  </chakra.form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export const LoginScreen = ({ onLogIn }) => (
  <Flex height="100vh" alignItems="center">
    <Box width="full" maxW="md" mx="auto" border="1px" borderColor="gray.200">
      <Box as="header" bg="brand.200" py={6} px={5}>
        <Heading as="h1" fontSize="lg" lineHeight="8" color="brand.500">
          Taskbox
        </Heading>
        <Text color="gray.600" fontSize="sm" lineHeight={5}>
          Sign in to your account
        </Text>
      </Box>
      <LoginForm onSubmit={onLogIn} />
    </Box>
  </Flex>
);

LoginScreen.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
