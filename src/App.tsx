import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { Toaster } from "sonner";
import { Button } from "./components/ui/button";
import { Loader, ShoppingCart, User } from "lucide-react";
import {
  CartPage,
  LoginPage,
  NotFoundPage,
  ProductListPage,
  ProfilePage,
} from "./pages";
import AuthProvider, { useAuth } from "./Context/AuthProvider";
import { lazy, Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./components/ui/card";
import { Modal } from "./components/ui/modal";
import { getUserProfile } from "./APIs";

const ProductDetailsPage = lazy(
  () => import("./pages/ProductPage/ProductDetails/ProductDetailsPage")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RedirectAuthRoute />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="products">
                  <Route index element={<ProductListPage />} />
                  <Route
                    path=":id"
                    element={
                      <Suspense fallback={<ProductDetailsLoader />}>
                        <ProductDetailsPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route path="cart" element={<CartPage />} />
                <Route path="profile" element={<ProfilePage />} />
                {/* </Route> */}
              </Route>
              {/* </Route> */}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <AppPortal />
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;

const ProtectedRoute = () => {
  const auth = useAuth();
  console.log(
    "inside protected route. Auth token exists: ",
    auth?.token ? "true" : "false"
  );

  if (auth.token) {
    console.log("prefetching profile");

    queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: getUserProfile,
    });
  }

  return (
    <>
      {auth.token ? (
        <>
          <NavBar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

const RedirectAuthRoute = () => {
  const auth = useAuth();
  console.log(
    "inside root route. Auth token exist status: ",
    auth?.token ? "true" : "false"
  );

  return auth.token ? <Navigate to="/products" /> : <Navigate to="/login" />;
};

function NavBar() {
  const navigate = useNavigate();
  const fetchCount = useIsFetching();
  const auth = useAuth();

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    console.log("isCartModalOpen", isCartModalOpen);
  }, [isCartModalOpen]);
  const cart = useQuery({ queryKey: ["cart"], queryFn: () => [] });
  // console.log("navbar cart", cart);

  // const cartQuanity =
  //   !cart.isPending &&
  //   cart.data &&
  //   cart?.data?.reduce((total: number, item) => total + item?.quantity, 0);

  return (
    <nav className="flex gap-4 justify-between p-4 sticky top-0 bg-(--background) border-b-1 border-b-(--border)">
      <p className="text-2xl font-bold text-center">Mini Mart</p>
      <div className="w-0.5 border-r-1 border-(--border)"></div>
      <Button variant="outline" onClick={() => navigate("/profile")}>
        <User />
        Profile
      </Button>

      <Button onClick={() => navigate("/products")}>Products</Button>
      <div className="flex flex-1 justify-center gap-4">
        {fetchCount > 0 && (
          <div className="h-8 flex justify-center items-center gap-1">
            <Loader size={"16px"} color="grey" className="animate-spin" />
            <p className="text-sm font-semibold text-center text-(--muted-foreground)">
              Fetching
            </p>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          setIsCartModalOpen(!isCartModalOpen);
        }}
      >
        <ShoppingCart /> Cart
        {/* {!cart.isPending && cart.data && ` (${cartQuanity})`} */}
        {isCartModalOpen && (
          <Modal
            title="Cart"
            children={<div>your cart items</div>}
            isOpen={isCartModalOpen}
            onClose={() => {
              console.log("close modal");
              setIsCartModalOpen(false);
            }}
            footer={<div>this is the cart footer</div>}
          />
        )}
      </Button>
      <Button
        onClick={() => {
          auth.logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </nav>
  );
}

const AppPortal = () => {
  return <div id="app-portal"></div>;
};

const ProductDetailsLoader = () => {
  console.log("ProductDetailsLoader is rendering");

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">Product ID</h1>
      <div className="flex flex-col gap-8">
        <Card className="flex flex-row w-[80%] justify-center mx-auto">
          <CardContent className="flex flex-col gap-8">
            <CardTitle className="text-xl text-center text-gray-500">
              Loading...
            </CardTitle>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
