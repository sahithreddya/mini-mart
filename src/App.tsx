// import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductListPage from "./pages/ProductPage/ProductListPage";
import ProductDetailsPage from "./pages/ProductPage/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/404/NotFoundPage";
import { Toaster } from "sonner";
import { Button } from "./components/ui/button";
import { ShoppingCart } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <Routes>
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
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex gap-4 justify-end p-4">
      <Button variant="outline" onClick={() => navigate("/cart")}>
        <ShoppingCart /> Cart
      </Button>
    </nav>
  );
}
