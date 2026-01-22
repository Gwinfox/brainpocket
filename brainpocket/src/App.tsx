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

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
