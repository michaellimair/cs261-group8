import 'global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import 'i18n';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { UserContextProvider } from 'context/UserContext';
import { queryClient } from 'libs/query-client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <CSSReset />
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
