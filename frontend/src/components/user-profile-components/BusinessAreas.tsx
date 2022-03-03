import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FC } from 'react';

const BusinessAreas: FC = () => (
  <FormControl id="business-area">
    <FormLabel>Business area</FormLabel>
    <Select id="business-area" placeholder="Investment Banking">
      <option>Corporate Banking</option>
      <option>Private Banking (Wealth Management)</option>
      <option>Technology</option>
      <option>Finance</option>
      <option>Group Audit</option>
      <option>Asset Management</option>
    </Select>
  </FormControl>
);

export default BusinessAreas;
