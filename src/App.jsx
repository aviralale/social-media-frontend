import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { ThemeProvider } from "./pages/components/ThemeProvider";
import { PostProvider } from "@/context/PostContext";
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
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Search from "./pages/Social/Search";
import ChatPage from "./pages/Chat/ChatPage";
import Notifications from "./pages/Social/Notifications";

export default function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <ThemeProvider>
        <PostProvider>
          <Layout setProgress={setProgress}>
            <LoadingBar
              color="white"
              progress={progress}
              height="4px"
              onLoaderFinished={() => setProgress(0)}
            />
            <Routes>
              {/* Public routes */}
              <Route element={<PublicRoute />}>
                <Route
                  path="/register"
                  element={<Register setProgress={setProgress} />}
                />
                <Route
                  path="/login"
                  element={<Login setProgress={setProgress} />}
                />
              </Route>
              <Route
                path="/activate/:uid/:token"
                element={<AccountActivated setProgress={setProgress} />}
              />
              <Route
                path="/activate"
                element={<AccountActivation setProgress={setProgress} />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword setProgress={setProgress} />}
              />
              <Route
                path="/password-reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm setProgress={setProgress} />}
              />
              <Route
                path="/forgot-username"
                element={<ForgotUsername setProgress={setProgress} />}
              />
              <Route
                path="/username-reset/confirm/:uid/:token"
                element={<ResetUsernameConfirm setProgress={setProgress} />}
              />

              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home setProgress={setProgress} />} />
                <Route
                  path="/explore"
                  element={<ExplorePage setProgress={setProgress} />}
                />
                <Route
                  path="/search"
                  element={<Search setProgress={setProgress} />}
                />
                <Route
                  path="vs/:username"
                  element={<Profile setProgress={setProgress} />}
                />
                <Route
                  path="vs/:username/posts/:postId"
                  element={<IndividualPostPage setProgress={setProgress} />}
                />
                <Route
                  path="vs/:username/posts/:postId/likers"
                  element={<PostLikers setProgress={setProgress} />}
                />
                <Route
                  path="post/:postId/comment/:commentId/likers"
                  element={<CommentLikers setProgress={setProgress} />}
                />
                <Route
                  path="comment/:commentId/reply/:replyId/likers"
                  element={<ReplyLikers setProgress={setProgress} />}
                />
                <Route
                  path="vs/:username/followers"
                  element={<Followers setProgress={setProgress} />}
                />
                <Route
                  path="vs/:username/following"
                  element={<Following setProgress={setProgress} />}
                />
                <Route
                  path="create"
                  element={<CreatePost setProgress={setProgress} />}
                />

                <Route path="/notifications" element={<Notifications />} />

                <Route path="/inbox" element={<ChatPage />} />
                <Route path="/inbox/:chatId" element={<ChatPage />} />
              </Route>

              {/* 404 route */}
              <Route
                path="/*"
                element={<PageNotFound setProgress={setProgress} />}
              />
            </Routes>
          </Layout>
        </PostProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
