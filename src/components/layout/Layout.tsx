import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ParticleField from "../visual/ParticleField";

export default function Layout() {
  return (
    <div className="app-shell">
      {/* Cosmos background — fixed behind everything, decorative, reduced-motion aware. */}
      <ParticleField />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
