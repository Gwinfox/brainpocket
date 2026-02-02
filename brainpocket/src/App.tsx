import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dialogs from "./ui/dialogs/Dialogs";
import Header from "./ui/header/Header";
import Navbar from "./ui/navbar/Navbar";
import Profile from "./ui/profile/Profile";
import News from "./ui/news/News";
import Music from "./ui/music/Music";
import Settings from "./ui/settings/Settings";
import Users from "./ui/users/Users";
import Login from "./ui/login/Login";
import { useState } from "react";

export type UserData = {
  data: {
    userId: number;
    email: string;
    login: string;
    friends: Array<number>;
    avatar: string;
  };
  messages: Array<string>;
  resultCode: number;
};

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserData>(null);
  const handleLogin = (data: UserData):void => {
    if (data.resultCode === 0) {
      setUserData(data);
      setIsAuth(true);
    }
  };
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/profile" element={<Profile isAuth={isAuth} />} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login isAuth={isAuth} handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
