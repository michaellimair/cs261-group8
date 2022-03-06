import { FC } from 'react';

import {
  MemoryRouter, Route, Routes,
} from 'react-router-dom';

export const tick = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const QueryRouterWrapper: FC = ({ children }) => (
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path="*" element={children} />
    </Routes>
  </MemoryRouter>
);
