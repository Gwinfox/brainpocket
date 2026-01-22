import "./App.css";
import Header from "./ui/header/Header";
import Navbar from "./ui/navbar/Navbar";
import Profile from "./ui/profile/Profile";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="content">
        <Profile />
      </div>
    </div>
  );
}

export default App;
