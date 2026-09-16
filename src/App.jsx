import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

const Home = () => <h1 className="text-4xl font-bold">Good Evening</h1>;
const Search = () => <h1 className="text-4xl font-bold">Search</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;