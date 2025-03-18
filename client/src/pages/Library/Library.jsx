import { useEffect } from "react";
import { useSearchParams } from "react-router";
import Navbar from "../../components/Navbar";
import Sections from "./Sections";
import Footer from "../../components/Footer";
import "./library.css";

function Library() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("section")) {
      setSearchParams({ section: "bookings" });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="library">
      <Navbar isAuthenticated={true} />
      <div className="container">
        <section className="library__hero">
          <Sections />
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Library;
