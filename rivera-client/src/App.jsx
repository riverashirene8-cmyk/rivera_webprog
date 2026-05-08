import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// LAYOUT
import Layout from './components/Layout';

// PAGES
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [

      // HOME
      {
        path: '',
        element: <HomePage />,
      },

      // ABOUT
      {
        path: 'about',
        element: <AboutPage />,
      },

      // ARTICLE LIST
      {
        path: 'articles',
        element: <ArticleListPage />,
      },

      // SINGLE ARTICLE
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },

      // NOT FOUND
      {
        path: '*',
        element: <NotFoundPage />,
      },

    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;