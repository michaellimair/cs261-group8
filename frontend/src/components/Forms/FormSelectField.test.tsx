import { render, RenderResult } from '@testing-library/react';
import FormSelectField from './FormSelectField';

interface ISampleForm {
  field: string;
}

describe('components/FormSelectField', () => {
  const fieldName: keyof ISampleForm = 'field';
  const autoComplete = 'email';
  const label = 'customlabel';
  const placeholder = 'testplaceholder';
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let registerFn: jest.Mock;

  beforeEach(() => {
    registerFn = jest.fn();
    result = render(
      <FormSelectField<ISampleForm>
        name={fieldName}
        autoComplete={autoComplete}
        register={registerFn}
        label={label}
        placeholder={placeholder}
        options={[
          {
            label: 'test',
            value: 'test',
          },
          {
            label: 'new',
            value: 'new',
          },
        ]}
      />,
    );
  });

  afterEach(() => {
    registerFn.mockReset();
    result.unmount();
  });

  it('renders correctly with the right set of attributes', async () => {
    const selectFormControl = result.queryByTestId(`${fieldName}-formcontrol`)!;
    expect(selectFormControl).not.toBeNull();
    expect(selectFormControl).toMatchSnapshot();

    const inputLabelField = selectFormControl.querySelector('label')!;
    expect(inputLabelField).toBeTruthy();
    expect(inputLabelField.innerHTML).toEqual(label);

    const selectField = selectFormControl.querySelector('select')!;
    expect(selectField).toBeTruthy();
    expect(selectField.id).toEqual(fieldName);
    expect(selectField.getAttribute('autoComplete')).toEqual(autoComplete);
    expect(selectField).toMatchSnapshot();
  });
});
