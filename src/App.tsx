
import './App.css'
import BotDetails from './pages/botDetails/botDetailsPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import ChatPage from './pages/chatPage/index.tsx';
import LoginPage from './pages/login/loginPage.tsx';
import BotsListPage from './pages/botsList/botsListPage.tsx';
import Test from './pages/test/test.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bots",
    element: <BotsListPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Test />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bots/:botSlug",
    element: <BotDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bots/:botSlug/chat",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },

]);

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/test" element={<Test/>} />
    //     {/* <Navigate to="/" /> */}
    //   </Routes>
    // </Router>

  <RouterProvider router={router} />
  );
};

export default App
