import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListPost from "./pages/ListPost";
import CreatePost from "./pages/CreatePost";
import Public from "./routes/Public";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route index element={<Home />}></Route>
          <Route path="/list" element={<ListPost />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
