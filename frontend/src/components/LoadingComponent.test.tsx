import { Spinner } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { FC } from 'react';
import { useQuery } from 'react-query';
import LoadingComponent from './LoadingComponent';

jest.mock('react-query');

const DummyComponent: FC = () => <div>hello</div>;

describe('pages/feedback/[id]', () => {
  const noDataText = 'nodata';
  it('returns spinner when loading', () => {
    const result = render(
      <LoadingComponent isLoading noDataText={noDataText} hasData={false}>
        <DummyComponent />
      </LoadingComponent>,
    );
    const expected = render(<Spinner />);

    expect(result.container.innerHTML).toBe(expected.container.innerHTML);
  });

  it('returns no container text when there is no data', () => {
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
    }));
    const result = render(
      <LoadingComponent isLoading={false} noDataText={noDataText} hasData={false}>
        <DummyComponent />
      </LoadingComponent>,
    );

    expect(result.queryAllByText(noDataText)).not.toHaveLength(0);
  });

  it('returns children as usual when not loading and data exists', () => {
    const result = render(
      <LoadingComponent isLoading={false} noDataText={noDataText} hasData>
        <DummyComponent />
      </LoadingComponent>,
    );
    const expected = render(<DummyComponent />);

    expect(result.container.innerHTML).toEqual(expected.container.innerHTML);
  });
});
