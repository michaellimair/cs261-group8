import React, { FC, useCallback, useMemo } from 'react';
import {
  Heading,
  Flex,
  Text,
  Box,
  Button,
  VStack,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ITopicProps } from 'customTypes/group';
import useCommonForm from 'hooks/useCommonForm';
import { GroupSessionType, IGroupSession, IGroupSessionCreateDTO } from 'customTypes/group-session';
import ApiError from 'api/error/ApiError';
import { httpClient } from 'api';
import { useTranslation } from 'react-i18next';
import { FormField, FormSelectField } from 'components/Forms';
import FormTextAreaField from 'components/Forms/FormTextareaField';
import FormDateField from 'components/Forms/FormDateField';

const MentorPotentialGroupCard: FC<ITopicProps> = ({
  title,
  count,
  refetch,
}) => {
  const [isShow, setIsShow] = React.useState(false);
  const { t } = useTranslation();
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);
  const {
    register,
    watch,
    setValue,
    onSubmit,
  } = useCommonForm<IGroupSessionCreateDTO, ApiError<any>, IGroupSession>({
    mutationId: 'group_session_create',
    mutationFn: (values) => httpClient.mentorGroupSession.createGroupSession(values),
    onSuccess: () => refetch(),
  });

  const sessionTypeOptions = useMemo(() => [
    {
      label: t('dashboard.group_meetings.tutoring'),
      value: GroupSessionType.TUTORING_SESSION,
    },
    {
      label: t('dashboard.group_meetings.workshop'),
      value: GroupSessionType.WORKSHOP,
    },
  ], [t]);

  return (
    <VStack spacing="0" align="stretch" w="full" display="flex">
      <Flex flex="1" align="center" w="full" p="4" pl="8" pr="8" boxShadow="lg" m="0" borderRadius="lg" borderBottomRadius={isShow ? ('0') : 'lg'} bg="white">
        <VStack>
          <HStack>
            <Box flex="5">
              <Heading>{title}</Heading>
              <Text mt={4}>{t('dashboard.group_meetings.requested_by', { count })}</Text>
            </Box>
            <Box flex="1.5">
              <VStack align="stretch" pl="8">
                <Button type="button" colorScheme="blue" size="lg" onClick={handleClick}>
                  {t('dashboard.group_meetings.run_group')}
                  {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
                </Button>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Flex>
      {isShow && (
        <Flex
          as="form"
          verticalAlign="top"
          align="center"
          p="4"
          onSubmit={onSubmit}
          pl="8"
          pr="8"
          boxShadow="lg"
          m="4"
          borderBottomRadius="lg"
          borderTopRadius="0"
          bg="white"
        >
          <Box flex="1.25">
            <VStack align="left">
              <Heading size="md">{t('dashboard.group_meetings.create_meeting')}</Heading>
              <HStack>
                <FormSelectField
                  options={sessionTypeOptions}
                  register={register}
                  label={t('dashboard.group_meetings.session_type')}
                  name="type"
                />
              </HStack>
              <HStack>
                <FormField
                  register={register}
                  name="event.title"
                  label={t('title')}
                />
              </HStack>
              <HStack>
                <FormDateField
                  setValue={setValue}
                  watch={watch}
                  name="event.start_time"
                  label={t('event.start_time')}
                  showTimeSelect
                />
              </HStack>
              <HStack>
                <FormDateField
                  setValue={setValue}
                  watch={watch}
                  name="event.end_time"
                  label={t('event.end_time')}
                  showTimeSelect
                />
              </HStack>
            </VStack>
          </Box>
          <Spacer flex="0.2" />
          <Box flex="3">
            <VStack align="left">
              <FormTextAreaField
                label={t('description')}
                register={register}
                name="event.description"
              />
            </VStack>
          </Box>
          <Box flex="1">
            <VStack align="stretch" pl="8">
              <Button colorScheme="blue" type="submit" variant="outline">
                {t('create')}
              </Button>
            </VStack>
          </Box>
        </Flex>
      )}
    </VStack>
  );
};

export default MentorPotentialGroupCard;
