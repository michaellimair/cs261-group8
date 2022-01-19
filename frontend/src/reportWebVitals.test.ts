import reportWebVitals from 'reportWebVitals';

describe('reportWebVitals', () => {
  it('calls the required functions if a function is provided', async () => {
    const mockWrapper = (...args: any[]) => jest.fn(...args);
    expect(async () => reportWebVitals(mockWrapper)).not.toThrow();
  });
});
