import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import BotDetails from './pages/botDetails/botDetailsPage.tsx';
import ChatPage from './pages/chatPage/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bot/:botSlug",
    element: <BotDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bot/:botSlug/chat",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />

)
