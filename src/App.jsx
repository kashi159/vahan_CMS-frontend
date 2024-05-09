import EntityList from "../components/EntityList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEntityForm from "../components/AddEntityForm";
import EditEntityForm from "../components/EditEntityForm";
import Header from "../components/Header";
import AddEntriesForm from "../components/AddEntriesForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<EntityList />} />
        <Route path="/add-entity" element={<AddEntityForm />} />
        <Route path="/edit-entity/:name/:id" element={<EditEntityForm />} />
        <Route path="/add-entry" element={<AddEntriesForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
