import { HomeIcon, ShoppingCartIcon, TruckIcon, UserGroupIcon, ChatBubbleBottomCenterIcon, UserIcon, CogIcon, PowerIcon} from "@heroicons/react/24/outline";

export const routes = [
  {
    path: "/", // the url
    icon: <HomeIcon />, 
    name: "Dashboard", 
  },
  {
    path: "/orders",
    icon: <ShoppingCartIcon />,
    name: "Orders",
  },
  {
    icon: <TruckIcon />,
    name: "Products",
    routes: [
      {
        path: "/all-products",
        name: "All Products",
      },
      {
        path: "/add-product",
        name: "Add Product",
      },
    ],
  },
  {
    path: "/customers",
    icon: <UserGroupIcon />,
    name: "Customers",
  },
  {
    path: "/chats",
    icon: <ChatBubbleBottomCenterIcon />,
    name: "Chats",
  },
  {
    path: "/manage-profile",
    icon: <UserIcon />,
    name: "Profile",
  },
  {
    path: "/settings",
    icon: <CogIcon />,
    name: "Settings",
  },
  {
    path: "/logout",
    icon: <PowerIcon />,
    name: "Logout",
  },
];