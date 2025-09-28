import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import ProductsAll from "../pages/ProductsAll";
import AddProduct from "../pages/AddProduct";
import SingleProduct from "../pages/SingleProduct";
import Customers from "../pages/Customers";
import Chats from "../pages/Chats";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Error from "../pages/Error";

export const routes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/orders",
    component: <Orders />,
  },
  {
    path: "/all-products",
    component: <ProductsAll />,
  },
  {
    path: "/add-product",
    component: <AddProduct />,
  },
  {
    path: "/product/:id",
    component: <SingleProduct />,
  },
  {
    path: "/customers",
    component: <Customers />,
  },
  {
    path: "/chats",
    component: <Chats />,
  },
  {
    path: "/manage-profile",
    component: <Profile />,
  },
  {
    path: "/settings",
    component: <Settings />,
  },
  {
    path: "/404",
    component: <Error />,
  },
];
