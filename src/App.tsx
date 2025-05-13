// import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { Button } from "./components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import {
  CartPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductDetailsPage,
  ProductListPage,
  ProfilePage,
} from "./pages";
import AuthProvider, { useAuth } from "./Context/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />

              <Route path="products">
                <Route index element={<ProductListPage />} />
                <Route path=":id" element={<ProductDetailsPage />} />
              </Route>

              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;

function NavBar() {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.token) return null;

  return (
    <nav className="flex gap-4 justify-end p-4">
      <Button variant="outline" onClick={() => navigate("/profile")}>
        <User />
        Profile
      </Button>
      <Button onClick={() => navigate("/products")}>Products</Button>
      <div className="flex-1"></div>
      <Button variant="outline" onClick={() => navigate("/cart")}>
        <ShoppingCart /> Cart
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
