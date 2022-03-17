import { StarIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { IRatingEntryDTO } from 'customTypes/rating';
import { FC, useCallback, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface IRatingStars {
  watch: UseFormWatch<IRatingEntryDTO>;
  setValue: UseFormSetValue<IRatingEntryDTO>;
}

const RatingStars: FC<IRatingStars> = ({
  watch,
  setValue,
}) => {
  const ratingValue = watch('rating_value');
  const [hovered, setHovered] = useState<number | null>(null);

  const setRatingValue = useCallback((index: number) => () => setValue('rating_value', index + 1), [setValue]);

  const getColor = useCallback((index: number) => () => {
    if (hovered !== null && index <= hovered) {
      return 'teal.300';
    }
    if (index < ratingValue) {
      return 'teal.500';
    }
    return 'gray.200';
  }, [hovered, ratingValue]);

  return (
    <Box mb={4}>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon
            mr={2}
            width="10"
            height="10"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            onClick={setRatingValue(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            color={getColor(i)()}
            cursor="pointer"
          />
        ))}
    </Box>
  );
};

export default RatingStars;
