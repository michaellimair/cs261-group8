import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { useQuery } from 'react-query';
import ContainerBox from 'components/ContainerBox';
import RouterLink from 'components/RouterLink';
import LoadingComponent from 'components/LoadingComponent';
import useCountryByCode from 'hooks/useCountryByCode';
import useTimezoneByName from 'hooks/useTimezoneByName';
import RateMentor from 'components/RateMentor';
import { IMatchStatus } from 'customTypes/matching';
import MatchStatusIcon from 'components/MatchStatusIcon';

const MyMentorPage: FC = () => {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
  } = useQuery(
    ['my-mentor', 'view'],
    () => httpClient.menteeMyMentor.getMyMentor(),
  );
  const country = useCountryByCode(data?.mentor?.profile?.country!);
  const timezone = useTimezoneByName(data?.mentor?.profile?.timezone!);
  const jobTitle = t(`job_title.${data?.mentor?.profile?.title}`);
  const businessArea = data?.mentor?.profile?.business_area?.label;

  return (
    <Stack>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        {t('dashboard.my_mentor.title')}
      </Heading>
      <ContainerBox>
        <LoadingComponent hasData={!!data} isLoading={isLoading} noDataText={t('dashboard.my_mentor.no_mentor')}>
          <HStack mb={6} textAlign="center" spacing={6}>
            <Avatar size="xl" name={data?.mentor?.full_name} src={data?.mentor?.profile?.avatar ?? undefined} />
            <VStack alignItems="flex-start">
              <Heading as="h2" mr={2} fontWeight="bold" size="lg" textAlign="center">{data?.mentor?.full_name}</Heading>
              <Text mt={2} fontSize="md" fontWeight="bold" textAlign="center" whiteSpace="pre-wrap">
                {`${jobTitle}, ${businessArea}`}
              </Text>
            </VStack>
          </HStack>
          <VStack
            mt={2}
            mb={4}
            direction={{ base: 'column', md: 'row' }}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap" align="center">
              {t('country')}
            </Text>
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              {country?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap">
              {t('timezone')}
            </Text>
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              {timezone?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap">
              {t('years_experience')}
            </Text>
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              {data?.mentor?.profile?.years_experience}
            </Text>
            <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap">
              {t('skills')}
            </Text>
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              {data?.mentor?.profile?.skills?.join(', ')}
            </Text>
            <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap">
              {t('match_status.title')}
            </Text>
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              <MatchStatusIcon status={data?.status!} />
            </Text>
          </VStack>
          {data?.status === IMatchStatus.ACCEPTED && (
          <>
            <Divider />
            <RateMentor
              mentor_id={data?.mentor_id!}
              disabled={false}
            />
          </>
          )}
        </LoadingComponent>
        {!data && !isLoading && (
        <Button mt={4} as={RouterLink} to="../mentor-recommendations" colorScheme="green">
          {t('find_me_a_mentor')}
        </Button>
        )}
      </ContainerBox>
    </Stack>
  );
};

export default MyMentorPage;
