import { StarIcon } from '@chakra-ui/icons';
import {
  VStack,
  Button,
  Textarea,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const MenteeFeedbackBox: FC = () => {
  const { t } = useTranslation();

  return (
    <VStack align="center" alignItems="stretch" pl="8" spacing="4">
      <Textarea
        placeholder={t('write_feedback_here')}
        resize="none"
        size="sm"
        height="140px"
      />
      <Box pb="4">
        <Slider aria-label="meeting-rating" defaultValue={3} min={1} max={5} step={1}>
          <SliderMark value={1} mt="2.5" ml="-1" fontSize="sm">
            1
          </SliderMark>
          <SliderMark value={2} mt="2.5" ml="-1" fontSize="sm">
            2
          </SliderMark>
          <SliderMark value={3} mt="2.5" ml="-1" fontSize="sm">
            3
          </SliderMark>
          <SliderMark value={4} mt="2.5" ml="-1" fontSize="sm">
            4
          </SliderMark>
          <SliderMark value={5} mt="2.5" ml="-1" fontSize="sm">
            5
          </SliderMark>
          <SliderTrack bg="blue.100">
            <SliderFilledTrack bg="blue.500" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="blue.600" as={StarIcon} />
          </SliderThumb>
        </Slider>
      </Box>
      <Button colorScheme="blue">
        {t('submit_feedback')}
      </Button>
    </VStack>
  );
};

export default MenteeFeedbackBox;
