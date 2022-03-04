/* eslint-disable react/jsx-no-useless-fragment */
import { Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface ILoadingComponentProps {
  isLoading: boolean;
  noDataText: string;
  hasData: boolean;
}

const LoadingComponent: FC<ILoadingComponentProps> = ({
  isLoading,
  hasData,
  noDataText,
  children,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!hasData) {
    return <Text>{noDataText}</Text>;
  }

  return <>{children}</>;
};

export default LoadingComponent;
