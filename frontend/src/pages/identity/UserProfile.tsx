import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

import {
  FC, useState,
} from 'react';
import BusinessAreas from 'components/user-profile-components/BusinessAreas';
import { useUser } from 'hooks/useUser';
import {
  IUserProfile, IUserProfileDTO, JobTitle,
} from 'customTypes/auth';
import { httpClient } from 'api';
import { useQuery } from 'react-query';
import useCommonForm from 'hooks/useCommonForm';
import ApiError from 'api/error/ApiError';
import { useNavigate } from 'react-router-dom';

const fetchCountry = (countryCode:string) => httpClient.country.getCountryByCode(countryCode);

const UserProfile: FC = () => {
  const { user } = useUser();
  const [businessID, setBusinessID] = useState<number>(user?.profile.business_area?.id!);
  const countryCode:string = user?.profile.country!;
  const skillList:string[] = user?.profile.skills!;
  const seniority:JobTitle = user?.profile.title!;

  const { data } = useQuery('country', () => fetchCountry(countryCode));

  const navigate = useNavigate();

  const {
    onSubmit,
  } = useCommonForm<IUserProfileDTO, ApiError<any>, IUserProfile>({
    defaultValues: {
      business_area_id: businessID!,
      avatar: null!,
      completed: user?.profile.completed!,
      pronoun: user?.profile.pronoun!,
      years_experience: user?.profile.years_experience,
      title: user?.profile.title,
      country: user?.profile.country,
      timezone: user?.profile.timezone,
      skills: user?.profile.skills,
    },
    mutationFn: () => httpClient.profile.updateProfile(
      businessID!,
      null!,
    ),
    mutationId: ['profile', user?.id!, 'update'],
    onSuccess: () => {
      navigate('/profile');
    },
  });

  return (
    <form id="frm-profile" onSubmit={onSubmit}>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="white"
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg="white"
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            My Profile
          </Heading>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" />
            </Center>
            <Stack m="20px" spacing={6} direction="row">
              <Center>
                <Avatar src="https://thumbs.dreamstime.com/z/globe-grid-vector-icon-isolated-white-background-181317661.jpg" />
                <Stack m="20px" spacing={2} direction="column">
                  <Heading size="xs">
                    Country:
                    {data?.name}
                  </Heading>
                  <Heading size="xs">
                    Timezone:
                    {user?.profile.timezone}
                  </Heading>
                </Stack>
              </Center>
            </Stack>
          </Stack>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            value={user?.username}
            readOnly
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />

          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={user?.email}
            readOnly
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />

          <BusinessAreas idChangeHandler={setBusinessID} />

          <FormLabel>Skills</FormLabel>
          <UnorderedList m="20px" spacing={3} id="skills">
            {skillList.map((skill) => <ListItem>{skill}</ListItem>)}
          </UnorderedList>

          <FormLabel>Seniority</FormLabel>
          <Input
            defaultValue={seniority}
            readOnly
          />

          <FormLabel>Years of experience</FormLabel>
          <Input
            placeholder="years of experience"
            value={user?.profile.years_experience?.toString()}
            readOnly
            _placeholder={{ color: 'gray.500' }}
          />

          <Stack spacing={6} direction={['column', 'row']}>
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
    </form>

  );
};

export default UserProfile;
