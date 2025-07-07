import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { setNavgiate } from "./lib/navigation";
import { ToastContainer } from "react-toastify";
import AppContainer from "./components/AppContainer";
import MainLayout from "./layouts/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage";
import BrowsePage from "./pages/BrowsePage";
import SettingsPage from "./pages/SettingsPage";
import ArtistPage from "./pages/ArtistPage";
import AdminPage from "./pages/AdminPage";
import NotificationsPage from "./pages/NotificationsPage";
import SinglePage from "./pages/SinglePage";
import AlbumPage from "./pages/AlbumPage";

function App() {
  const navgiate = useNavigate();
  setNavgiate(navgiate);
  return (
    <>
      <Routes>
        <Route element={<AppContainer />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/playlist/:slug" element={<PlaylistPage />} />
            <Route path="/artist/:slug" element={<ArtistPage />} />
            <Route path="/single/:slug" element={<SinglePage />} />
            <Route path="/album/:slug" element={<AlbumPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
