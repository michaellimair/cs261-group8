import { FC } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

const CustomDatePicker: FC<ReactDatePickerProps> = (props) => (
  <DatePicker {...props} />
);

export default CustomDatePicker;
