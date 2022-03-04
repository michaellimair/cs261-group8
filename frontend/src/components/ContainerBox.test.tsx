import { render } from '@testing-library/react';
import ContainerBox from './ContainerBox';

describe('components/ContainerBox', () => {
  it('renders properly', () => {
    const result = render(
      <ContainerBox>hello</ContainerBox>,
    );

    expect(result.queryByText('hello')).toBeTruthy();
    expect(result).toMatchSnapshot();
  });
});
