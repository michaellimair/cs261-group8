import {
  Button, Center, Flex, Heading, Stack,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import { FormField } from 'components/Forms';
import { IUser, IUserUpdateDTO } from 'customTypes/auth';
import useCommonForm from 'hooks/useCommonForm';
import { useUser } from 'hooks/useUser';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const UserChangePassword: FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { register, onSubmit } = useCommonForm<IUserUpdateDTO, ApiError<any>, IUser>({
    mutationFn: async (values) => httpClient.auth.update(values),
    mutationId: ['password', user?.id!, 'update'],
    onSuccess: () => {
      navigate('../profile');
    },
  });
  return (
    <form onSubmit={onSubmit}>
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
          <Center>
            <Heading size="md">Change your password here</Heading>
          </Center>
          <FormField<IUserUpdateDTO>
            name="password"
            register={register}
          />
          <FormField<IUserUpdateDTO>
            name="verify_password"
            register={register}
          />
          <Heading size="sm">{}</Heading>
          <Button type="submit" colorScheme="blue">Confirm new password</Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default UserChangePassword;
