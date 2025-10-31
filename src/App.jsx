import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Experts from './pages/Experts';
import ExpertDetail from './pages/ExpertDetail';
import Curriculum from './pages/Curriculum';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Membership from './pages/Membership';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Blog from './pages/Blog';
import WriteArticle from './pages/WriteArticle';
import Admin from './pages/Admin';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/experts/:id" element={<ExpertDetail />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/write" element={<WriteArticle />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
