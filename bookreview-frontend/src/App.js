import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { HomePage, BookDetail, SignUpPage, LoginPage, ProfilePage } from './pages';

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/book-detail" element={<BookDetail />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
