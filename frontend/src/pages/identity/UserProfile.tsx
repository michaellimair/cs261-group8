/* eslint-disable @typescript-eslint/no-unused-vars */
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
  List,
  Select,
} from '@chakra-ui/react';

import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  FC, useCallback, useEffect, useState,
} from 'react';
import BusinessAreas from 'components/user-profile-components/BusinessAreas';
import { useTranslation } from 'react-i18next';
import { useUser } from 'hooks/useUser';
import {
  ILoginResult, IUser, IUserProfile, JobTitle,
} from 'customTypes/auth';
import { httpClient } from 'api';

const UserProfile: FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [skillItems, setSkillItems] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [flag, setFlag] = useState<string>('');
  const [businessLabel, setBusinessLabel] = useState('');

  const onSubmitHandler = () => {
  };

  useEffect(() => {
    const countryCode = user?.profile.country;
    if (countryCode) {
      httpClient.country.getCountryByCode(countryCode)
        .then((response) => {
          setCountry(response.name);
          setFlag(response.flag);
        });
    }
  }, [user?.profile.country]);

  useEffect(() => {
    const skillList = user?.profile.skills;
    if (skillList) {
      setSkillItems(skillList);
    }
  }, [user?.profile.skills]);

  useEffect(() => {
    const title = user?.profile.title;
    if (title) {
      setSeniority(title);
    }
  }, [user?.profile.title]);

  return (
    <FormControl id="frm-profile" onSubmit={onSubmitHandler}>
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
                      Country:
                      {country}
                    </Heading>
                    <Heading size="xs">
                      Timezone:
                      {user?.profile.timezone}
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
              value={user?.username}
              readOnly
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={user?.email}
              readOnly
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <BusinessAreas />
          <FormLabel>Skills</FormLabel>
          <UnorderedList m="20px" spacing={3} id="skills">
            {skillItems.map((skill) => <ListItem>{skill}</ListItem>)}
          </UnorderedList>
          <FormControl id="seniority">
            <FormLabel>Seniority</FormLabel>
            <Select
              _placeholder={{ color: 'gray.500' }}
            >
              {Object.keys(JobTitle).map((key) => (
                <option>{key}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="years-of-experience">
            <FormLabel>Years of experience</FormLabel>
            <Input
              placeholder="years of experience"
              value={user?.profile.years_experience?.toString()}
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
              type="submit"
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
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </FormControl>

  );
};

export default UserProfile;
