import React, { FC } from 'react';

interface ICreateSelectProps {
  options: string[];
}

const CreateSelect: FC<ICreateSelectProps> = ({ options }) => (
  <>
    {options.map((option: string) => (
      <option value={option}>{option}</option>
    ))}
  </>
);
export default CreateSelect;
