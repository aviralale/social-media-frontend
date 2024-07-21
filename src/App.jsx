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
import PublicRoute from "./auth/PublicRoute";
import { Toaster } from "sonner";
import Home from "./pages/Social/Home";
import CreatePost from "./pages/components/Posts/CreatePost";
import ExplorePage from "./pages/Social/Explore";

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/activate/:uid/:token" element={<AccountActivated />} />
          <Route path="/activate" element={<AccountActivation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route
            path="/username/reset/confirm/:uid/:token"
            element={<ResetUsernameConfirm />}
          />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="vs/:username" element={<Profile />} />
            <Route
              path="vs/:username/posts/:postId"
              element={<IndividualPostPage />}
            />
            <Route
              path="/vs/:username/posts/:postId/likers"
              element={<PostLikers />}
            />
            <Route
              path="posts/:postId/comment/:commentId/likers"
              element={<CommentLikers />}
            />
            <Route
              path="posts/:postId/comment/:commentId/reply/:replyId/likers"
              element={<ReplyLikers />}
            />
            <Route path="vs/:username/followers" element={<Followers />} />
            <Route path="vs/:username/following" element={<Following />} />
            <Route path="create" element={<CreatePost />} />
          </Route>

          {/* 404 route */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <Toaster
        style={{
          minHeight: "4rem",
        }}
      />
    </ThemeProvider>
  );
}
