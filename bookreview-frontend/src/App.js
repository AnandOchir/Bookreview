import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { HomePage, BookDetail, SignUpPage, LoginPage } from './pages';
import './styles/main.scss'

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/book-detail" element={<BookDetail />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
