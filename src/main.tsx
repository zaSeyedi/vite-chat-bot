import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import BotDetails from './pages/botDetails/botDetailsPage.tsx';
import ChatPage from './pages/chatPage/index.tsx';
import LoginPage from './pages/login/loginPage.tsx';
import BotsListPage from './pages/botsList/botsListPage.tsx';

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

ReactDOM.createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />

)
