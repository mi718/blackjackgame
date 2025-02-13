import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Blackjack from "./pages/blackjack";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Blackjack}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <div className="fixed top-4 right-4">
                    <ThemeToggle />
                </div>
                <QueryClientProvider client={queryClient}>
                    <Router />
                    <Toaster />
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}


export default App;
