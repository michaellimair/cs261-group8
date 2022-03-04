import { render, RenderResult } from '@testing-library/react';
import FormTextareaField from './FormTextareaField';

interface ISampleForm {
  field: string;
}

describe('components/FormTextareaField', () => {
  const fieldName: keyof ISampleForm = 'field';
  const autoComplete = 'email';
  const label = 'customlabel';
  const placeholder = 'testplaceholder';
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let registerFn: jest.Mock;

  beforeEach(() => {
    registerFn = jest.fn();
    result = render(
      <FormTextareaField<ISampleForm>
        name={fieldName}
        autoComplete={autoComplete}
        register={registerFn}
        label={label}
        placeholder={placeholder}
      />,
    );
  });

  afterEach(() => {
    registerFn.mockReset();
    result.unmount();
  });

  it('renders correctly with the right set of attributes', async () => {
    const textareaFormControl = result.queryByTestId(`${fieldName}-formcontrol`)!;
    expect(textareaFormControl).not.toBeNull();
    expect(textareaFormControl).toMatchSnapshot();

    const inputLabelField = textareaFormControl.querySelector('label')!;
    expect(inputLabelField).toBeTruthy();
    expect(inputLabelField.innerHTML).toEqual(label);

    const selectField = textareaFormControl.querySelector('textarea')!;
    expect(selectField).toBeTruthy();
    expect(selectField.id).toEqual(fieldName);
    expect(selectField.getAttribute('autoComplete')).toEqual(autoComplete);
    expect(selectField).toMatchSnapshot();
  });
});
