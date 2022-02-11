import { act, render, RenderResult } from '@testing-library/react';
import FormField from './FormField';

interface ISampleForm {
  field: string;
}

describe('components/FormField', () => {
  const fieldName: keyof ISampleForm = 'field';
  const autoComplete = 'email';
  const type: React.HTMLInputTypeAttribute = 'email';
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let registerFn: jest.Mock;

  beforeEach(() => {
    registerFn = jest.fn();
    result = render(
      <FormField<ISampleForm>
        name={fieldName}
        type={type}
        autoComplete={autoComplete}
        register={registerFn}
      />,
    );
  });

  afterEach(() => {
    registerFn.mockReset();
    result.unmount();
  });

  it('renders correctly with the right set of attributes', async () => {
    const inputFormControl = result.queryByTestId(`${fieldName}-formcontrol`)!;
    expect(inputFormControl).not.toBeNull();
    expect(inputFormControl).toMatchSnapshot();

    const inputLabelField = inputFormControl.querySelector('label')!;
    expect(inputLabelField).toBeTruthy();
    expect(inputLabelField.innerHTML).toEqual(fieldName);

    const inputField = inputFormControl.querySelector('input')!;
    expect(inputField).toBeTruthy();
    expect(inputField.id).toEqual(fieldName);
    expect(inputField.getAttribute('autoComplete')).toEqual(autoComplete);
    expect(inputField.type).toEqual(type);
  });

  it('invokes the register function to register the form field for non-required fields', async () => {
    expect(registerFn).toHaveBeenCalledTimes(1);
    expect(registerFn).toHaveBeenCalledWith(fieldName, {
      required: undefined,
    });
  });

  it('invokes the register function to register the form field for required fields', async () => {
    result.unmount();
    registerFn.mockReset();
    result = render(
      <FormField<ISampleForm>
        name={fieldName}
        type={type}
        autoComplete={autoComplete}
        register={registerFn}
        required
      />,
    );

    expect(registerFn).toHaveBeenCalledTimes(1);
    expect(registerFn).toHaveBeenCalledWith(fieldName, {
      required: 'no_blank',
    });
  });

  it('displays the field error when there is an error', async () => {
    const errorText = 'This is a sample error text.';

    result.unmount();
    registerFn.mockReset();
    result = render(
      <FormField<ISampleForm>
        name={fieldName}
        type="password"
        autoComplete="given-name"
        register={registerFn}
        error={errorText}
      />,
    );

    const errorInField = await result.findByText(errorText);
    expect(errorInField).toBeTruthy();
  });

  it('displays a functional password toggle when the field type is password', () => {
    result.unmount();
    result = render(
      <FormField<ISampleForm>
        name={fieldName}
        type="password"
        autoComplete="given-name"
        register={jest.fn()}
      />,
    );

    const showPasswordToggle = result.queryByTestId('show-password-toggle')!;
    expect(showPasswordToggle).not.toBeNull();

    // Password will be hidden by default
    const showPassButton = result.queryByTestId('show-password-button')!;
    expect(showPassButton).not.toBeNull();

    const inputField = result.queryByTestId(fieldName)!;
    expect(inputField.getAttribute('type')).toBe('password');

    // Show password
    act(() => {
      showPassButton.click();
    });
    let passwordOffIcon: HTMLElement | null;
    let passwordOnIcon: HTMLElement | null;

    const passwordHiddenId = 'password-hidden';
    const passwordShownId = 'password-shown';
    passwordOffIcon = result.queryByTestId(passwordHiddenId);
    expect(passwordOffIcon).toBeNull();
    passwordOnIcon = result.queryByTestId(passwordShownId);
    expect(passwordOnIcon).not.toBeEmptyDOMElement();
    expect(inputField.getAttribute('type')).toBe('text');

    // Hide password again
    act(() => {
      showPassButton.click();
    });

    passwordOffIcon = result.queryByTestId(passwordHiddenId);
    expect(passwordOffIcon).not.toBeEmptyDOMElement();
    passwordOnIcon = result.queryByTestId(passwordShownId);
    expect(passwordOnIcon).toBeNull();
    expect(inputField.getAttribute('type')).toBe('password');
  });
});
