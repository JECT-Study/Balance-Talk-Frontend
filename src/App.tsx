import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './layout/Header';
import SearchBar from './layout/SearchBar';
import Footer from './layout/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import PostList from './pages/PostListPage/PostListPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const Layout = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="posts" element={<PostList />} />
        <Route path="post/create" element={<CreatePostPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="findPassword" element={<FindPasswordPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default App;
