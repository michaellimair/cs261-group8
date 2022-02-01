import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.tsx', () => {
  it('initializes the React app properly', async () => {
    // Source: https://joaoforja.com/blog/how-to-test-a-rect-app-indexjs/
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Requires index.tsx so that react-dom render method is called
    // eslint-disable-next-line
    require('./index');

    // Asserts render was called with <App />
    // and HTML element with id = root
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
