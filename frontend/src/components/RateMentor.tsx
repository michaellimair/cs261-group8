import {
  Button, FormControl, FormLabel, Heading, Text,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import { IApiBadRequestErrorData } from 'customTypes/api';
import { IRatingEntry, IRatingEntryDTO } from 'customTypes/rating';
import useCommonForm from 'hooks/useCommonForm';
import { pick } from 'lodash';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import FormTextAreaField from './Forms/FormTextareaField';
import RatingStars from './RatingStars';

interface IRateMentorProps {
  mentor_id: number;
  disabled: boolean;
}

const RateMentor: FC<IRateMentorProps> = ({
  mentor_id,
  disabled,
}) => {
  const { t } = useTranslation();
  const {
    data: currentRating,
    isFetching: isGettingCurrentRating,
  } = useQuery(
    ['my-mentor', 'rating'],
    () => httpClient.menteeMyMentor.getMyRating(),
  );
  const {
    isLoading,
    isSuccess,
    reset,
    onSubmit,
    register,
    setValue,
    watch,
  } = useCommonForm<
  IRatingEntryDTO,
  ApiError<IApiBadRequestErrorData<IRatingEntry>>,
  IRatingEntry>({
    mutationId: `my-mentor-rate-${mentor_id}`,
    defaultValues: {
      description: null,
    },
    mutationFn: (values: IRatingEntryDTO) => httpClient.menteeMyMentor.rateMentor(values),
  });

  useEffect(() => {
    if (!currentRating) {
      return;
    }
    reset(pick(currentRating, ['rating_value', 'description']));
  }, [currentRating, reset]);

  return (
    <>
      <Heading as="h3" mt={4} fontWeight="bold" size="md" textAlign="center">
        {t('rate_mentor.title')}
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>{t('rate_mentor.rating')}</FormLabel>
          <RatingStars
            watch={watch}
            setValue={setValue}
          />
        </FormControl>
        <FormTextAreaField
          register={register}
          name="description"
          disabled={disabled}
          label={t('rate_mentor.add_comments')}
        />
        <Button
          disabled={isLoading || disabled || isGettingCurrentRating}
          colorScheme="blue"
          type="submit"
          mt={4}
        >
          {t('rate_mentor.submit')}
        </Button>
      </form>
      {isSuccess && (
        <Text mt={4}>{t('rate_mentor.success')}</Text>
      )}
    </>
  );
};

export default RateMentor;
