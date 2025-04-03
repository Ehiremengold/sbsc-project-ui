import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App onTextChange={function (text: string): void {
          throw new Error('Function not implemented.');
        } }  />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App onTextChange={function (text: string): void {
          throw new Error('Function not implemented.');
        } } />
      </BrowserRouter>
    );
    expect(getByText(/Welcome reactapp/gi)).toBeTruthy();
  });
});
