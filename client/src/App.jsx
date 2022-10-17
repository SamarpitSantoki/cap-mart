import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1500} position={"top-right"} />
      <Router />
    </BrowserRouter>
  );
}

export default App;
