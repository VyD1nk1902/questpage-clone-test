import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Suspense, useEffect } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center bg-background">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
