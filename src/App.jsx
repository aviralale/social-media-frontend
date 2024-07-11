import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { ThemeProvider } from "./pages/components/ThemeProvider";
import Register from "./pages/Auth/Register";
import "./App.css";
import { Login } from "./pages/Auth/Login";
import PageNotFound from "./pages/Misc/404";
import AccountActivation from "./pages/Auth/AccountActivation";
import AccountActivated from "./pages/Auth/AccountActivated";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
import ForgotUsername from "./pages/Auth/ForgotUsername";
import ResetUsernameConfirm from "./pages/Auth/ResetUsernameConfirm";
import IndividualPostPage from "./pages/Social/IndividualPostPage";
import Profile from "./pages/user/Profile";
import PostLikers from "./pages/components/Posts/Likers/Post/PostLikers";
import CommentLikers from "./pages/components/Posts/Likers/Comment/CommentLikers";
import ReplyLikers from "./pages/components/Posts/Likers/Comment/Reply/ReplyLikers";
import Followers from "./pages/Social/Followers";
import Following from "./pages/Social/Following";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  return (
    <ThemeProvider>
        <Layout>
      <Routes>

          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate/:uid/:token" element={<AccountActivation />} />
          <Route path="/activation-success" element={<AccountActivated />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route path="/username/reset/confirm/:uid/:token" element={<ResetUsernameConfirm />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/post/:postId" element={<IndividualPostPage />} />
            <Route path="/post/:postId/likers" element={<PostLikers />} />
            <Route path="/post/:postId/comment/:commentId/likers" element={<CommentLikers />} />
            <Route path="/post/:postId/comment/:commentId/reply/:replyId/likers" element={<ReplyLikers />} />
            <Route path="/:username/followers" element={<Followers />} />
            <Route path="/:username/following" element={<Following />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Layout>
    </ThemeProvider>
  );
}