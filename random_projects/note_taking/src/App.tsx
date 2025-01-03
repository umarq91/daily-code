import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";
import Dashboard from "./pages/Dashboard";
import EditPage from "./pages/EditPage";
import NotePage from "./pages/SingleNote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/new" element={<NewNote/>} />
        <Route path="/:title">
          <Route index element={<NotePage/>} />
          <Route path="edit" element={<EditPage/>} />
        </Route>
        <Route path="/*" element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
