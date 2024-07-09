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

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          {/* AUTH */}
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate" element={<AccountActivation />} />
          <Route path="/activated" element={<AccountActivated />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route
            path="/reset-password-confirm"
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/reset-username-confirm"
            element={<ResetUsernameConfirm />}
          />
          {/* USER */}
          <Route path="/:username" element={<Profile />} />
          {/* SOCIAL */}
          <Route
            path="/:username/posts/:postid"
            element={<IndividualPostPage />}
          />
          <Route
            path="/:username/posts/:postid/likers"
            element={<PostLikers />}
          />
          <Route
            path="/posts/:postid/comments/:username/:commentid/likers"
            element={<CommentLikers />}
          />
          <Route
            path="/comments/:commentid/replies/:username/:replyid/likers"
            element={<ReplyLikers />}
          />
          <Route path="/:username/followers" element={<Followers />} />
          <Route path="/:username/following" element={<Following />} />
          {/* 404 */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
