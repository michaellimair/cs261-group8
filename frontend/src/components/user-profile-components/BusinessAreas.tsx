import {
  FormControl, FormLabel, Select,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { useUser } from 'hooks/useUser';
import { FC } from 'react';
import { useQuery } from 'react-query';

const fetchBusinessAreas = () => httpClient.businessArea.listBusinessAreas();

interface Props {
  idChangeHandler: any
}

const BusinessAreas: FC<Props> = ({ idChangeHandler }) => {
  const { user } = useUser();
  const userBusinessAreaLabel = user?.profile.business_area?.label;

  const onChangeHandler = (event:any) => {
    idChangeHandler(event.target.value);
  };

  const { data, status } = useQuery('businessAreaList', fetchBusinessAreas);

  if (status === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <FormControl id="business-area">
      <FormLabel>{`Business area: ${userBusinessAreaLabel}`}</FormLabel>
      <Select
        id="business-area"
        defaultValue={userBusinessAreaLabel}
        onChange={onChangeHandler}
      >
        {data?.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default BusinessAreas;
