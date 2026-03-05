import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dialogs from "./ui/dialogs/Dialogs";
import Header from "./ui/header/Header";
import Navbar from "./ui/navbar/Navbar";
import ProfilePage from "./ui/profilePage/ProfilePage";
import News from "./ui/news/News";
import Music from "./ui/music/Music";
import Settings from "./ui/settings/Settings";
import Users from "./ui/users/Users";
import Login from "./ui/login/Login";
import { useUserInit } from "./bll/Hooks/useUserInit";
import WithAuthRedirect from "./bll/HOCs/withAuthRedirect";
import { Friends } from "./ui/friends/Friends";

function App() {
  const { isAuth, userData, loginError, handleLogin, logout, setFriends } = useUserInit();
  return (
    <div className="app-wrapper">
      <Header isAuth={isAuth} logout={logout} />
      {userData && <Navbar userData={userData} />}
      <div className="content">
        {userData && (
          <Routes>
            <Route
              path="/profile"
              element={<WithAuthRedirect isAuth={isAuth} component={<ProfilePage userData={userData} />} />}
            />
            <Route
              path="/dialogs/*"
              element={<WithAuthRedirect isAuth={isAuth} component={<Dialogs userData={userData} />} />}
            />
            <Route
              path="/news"
              element={<WithAuthRedirect isAuth={isAuth} component={<News userData={userData} />} />}
            />
            <Route path="/music" element={<WithAuthRedirect isAuth={isAuth} component={<Music />} />} />
            <Route path="/settings" element={<WithAuthRedirect isAuth={isAuth} component={<Settings />} />} />
            <Route
              path="/users"
              element={
                <WithAuthRedirect isAuth={isAuth} component={<Users userData={userData} setFriends={setFriends} />} />
              }
            />
            <Route
              path="/friends"
              element={
                <WithAuthRedirect isAuth={isAuth} component={<Friends userData={userData} setFriends={setFriends} />} />
              }
            />
            <Route path="/login" element={<Login isAuth={isAuth} handleLogin={handleLogin} error={loginError} />} />
            <Route
              path="/"
              element={<WithAuthRedirect isAuth={isAuth} component={<ProfilePage userData={userData} />} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
