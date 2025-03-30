import { createBrowserRouter } from 'react-router';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { Layout } from './components/layout';
import { Detail } from './pages/detail';


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/detail/:id',
        element: <Detail />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])

export { router }