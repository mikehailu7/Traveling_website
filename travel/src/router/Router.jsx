import {createBrowserRouter} from "react-router-dom";
import  Main from "../ui/Main.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
]);

export default router