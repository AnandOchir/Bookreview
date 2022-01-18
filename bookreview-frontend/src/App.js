import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { HomePage, BookDetail, SignUpPage, LoginPage, AdminPage } from './pages';

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/book-detail" element={<BookDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
