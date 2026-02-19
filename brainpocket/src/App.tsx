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
import { useUserInit } from "./bll/Hooks/useUserInit";
import WithAuthRedirect from "./bll/HOCs/withAuthRedirect";


function App() {
  const {isAuth, userData, handleLogin} = useUserInit();
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/profile" element={<WithAuthRedirect isAuth={isAuth} component={<Profile />}/>} />
          <Route path="/dialogs" element={<WithAuthRedirect isAuth={isAuth} component={<Dialogs />}/>} />
          <Route path="/news" element={<WithAuthRedirect isAuth={isAuth} component={<News />}/>} />
          <Route path="/music" element={<WithAuthRedirect isAuth={isAuth} component={<Music />}/>} />
          <Route path="/settings" element={<WithAuthRedirect isAuth={isAuth} component={<Settings />}/>} />
          <Route path="/users" element={<WithAuthRedirect isAuth={isAuth} component={<Users />}/>} />
          <Route path="/login" element={<Login isAuth={isAuth} handleLogin={handleLogin} />} />
          <Route path="/" element={<WithAuthRedirect isAuth={isAuth} component={<Profile />}/>} />
        </Routes>
      </div>
    </div>
  );
}



export default App;
