import { VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';

const MyCalendarView: FC = () => {
  const [value, onChange] = useState<Date>(new Date());

  return (
    <div>
      <VStack
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
        position="sticky"
        top={0}
      >
        <Calendar onChange={onChange} value={value} />
        <div>
          hello there
        </div>
      </VStack>
    </div>
  );
};

export default MyCalendarView;
