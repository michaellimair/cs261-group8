import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlternateAuthAction from './AlternateAuthAction';

describe('components/AlternateAuthAction', () => {
  it('renders properly with properties displayed', () => {
    const linkText = 'linkText';
    const question = 'Do you want to go to register page?';
    const to = '/register';
    const linkTestId = 'linkTestId';

    const result = render(
      <BrowserRouter>
        <AlternateAuthAction
          linkText={linkText}
          linkTestId={linkTestId}
          question={question}
          to={to}
        />
      </BrowserRouter>,
    );

    expect(result).toMatchSnapshot();

    expect(result.queryAllByText(question)).not.toHaveLength(0);
    expect(result.queryAllByText(linkText)).not.toHaveLength(0);
  });
});
