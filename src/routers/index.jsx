import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import Detail from "../views/DetailPage";
import BaseLayout from "../views/BaseLayout";

const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },

      {
        path: "/detail/:id",
        element: <Detail url={url} />,
      },
    ],
  },
]);

export default router;
