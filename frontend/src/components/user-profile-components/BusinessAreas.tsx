/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl, FormLabel, Select,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { IBusinessArea } from 'customTypes/auth';
import { useUser } from 'hooks/useUser';
import {
  FC, useEffect, useState,
} from 'react';

const BusinessAreas: FC = () => {
  const [items, setItems] = useState([]);
  const { user } = useUser();
  const [areaID, setAreaID] = useState<number>(0);
  const [businessAreaList, setBusinessAreaList] = useState<IBusinessArea[]>([]);

  useEffect(() => {
    const id = user?.profile.business_area?.id;
    if (id) {
      httpClient.businessArea.getBusinessAreaById(id)
        .then((response) => {
          setAreaID(response.id);
        });
    }
  });

  useEffect(() => {
    httpClient.businessArea.listBusinessAreas()
      .then((response) => {
        setBusinessAreaList(response);
      });
  }, []);

  return (
    <FormControl id="business-area">
      <FormLabel>Business area</FormLabel>
      <Select
        id="business-area"
      >
        {businessAreaList.map((item) => (
          <option
            key={item.id}
          >
            {item.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default BusinessAreas;
