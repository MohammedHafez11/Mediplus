import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/404/NotFound';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import PortfolioDetails from './pages/portfolio-details/PortfolioDetails';
import BlogSingle from './pages/blog-single/BlogSingle';
import { useEffect, useState } from 'react';
import Preloader from './components/preloader/preloader';
import Login from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import AllDepartments from '../src/pages/Dasboard/AllDepartments/all-departments';
import AllProjects from '../src/pages/Dasboard/AllProjects/all-projects';
import AllSliders from '../src/pages/Dasboard/AllSliders/all-sliders';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />

          <Route index element={<Home />} />

          <Route path='/login' element={<Login />} />

          

          <Route path='/AllDepartments' element={<AllDepartments />} />

          <Route path='/AllProjects' element={<AllProjects />} />

          <Route path='/AllSliders' element={<AllSliders />} />

          <Route path='/Contact' element={<Contact />} />

          <Route path='/portfolio-details' element={<PortfolioDetails />} />

          <Route path='/blog-single' element={<BlogSingle />} />
        </Routes>
        <Toaster />
      </BrowserRouter>


    </>
  )
}

export default App