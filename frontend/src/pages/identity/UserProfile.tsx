import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

import { SmallCloseIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import BusinessAreas from 'components/user-profile-components/BusinessAreas';

const UserProfile: FC = () => (
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Stack
      spacing={4}
      w="full"
      maxW="md"
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      boxShadow="lg"
      p={6}
      my={12}
    >
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        My Profile
      </Heading>
      <FormControl id="userName">
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar size="xl">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Stack m="20px" spacing={6} direction="row">
            <Center>
              <Avatar src="https://thumbs.dreamstime.com/z/globe-grid-vector-icon-isolated-white-background-181317661.jpg" />
              <Stack m="20px" spacing={2} direction="column">
                <Heading size="xs">
                  Location:
                </Heading>
                <Heading size="xs">
                  Timezone:
                </Heading>
              </Stack>
            </Center>
          </Stack>
        </Stack>
      </FormControl>
      <FormControl id="userName">
        <FormLabel>User name</FormLabel>
        <Input
          placeholder="UserName"
          readOnly
          _placeholder={{ color: 'gray.500' }}
          type="text"
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="your-email@example.com"
          readOnly
          _placeholder={{ color: 'gray.500' }}
          type="email"
        />
      </FormControl>
      <BusinessAreas />
      <FormLabel>Areas of interest</FormLabel>
      <UnorderedList m="20px" spacing={3} id="areas-of-interest">
        <ListItem>First interest</ListItem>
        <ListItem>Second interest</ListItem>
        <ListItem>Third interest</ListItem>
        <ListItem>Fourth interest</ListItem>
      </UnorderedList>
      <FormControl id="seniority">
        <FormLabel>Seniority</FormLabel>
        <Input
          placeholder="seniority"
          readOnly
          _placeholder={{ color: 'gray.500' }}
        />
      </FormControl>
      <FormControl id="years-of-experience">
        <FormLabel>Years of experience</FormLabel>
        <Input
          placeholder="years of experience"
          readOnly
          _placeholder={{ color: 'gray.500' }}
        />
      </FormControl>
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          bg="red.400"
          color="white"
          w="full"
          _hover={{
            bg: 'red.500',
          }}
        >
          Cancel
        </Button>
        <Button
          bg="blue.400"
          color="white"
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
);

export default UserProfile;
