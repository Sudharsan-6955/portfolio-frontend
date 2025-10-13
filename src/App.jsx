import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Footer from './components/Footer.jsx';
import Contact from './sections/Contact.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute.jsx';

import { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const ThemeContext = createContext();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin-login"
            element={<AdminLogin onLogin={() => setIsAdmin(true)} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App
