import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="mb-4 text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="mb-4 text-3xl font-heading font-bold">Page Not Found</h2>
          <p className="mb-8 text-xl text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
