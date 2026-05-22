import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import BookListPage from "../../pages/BookListPage";
import BookDetailPage from "../../pages/BookDetailPage";
import MyLoansPage from "../../pages/MyLoansPage";
import ProfilePage from "../../pages/ProfilePage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import UserLayout from "../../components/layout/UserLayout";
import AdminLayout from "../../components/layout/AdminLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<UserLayout />}>
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
