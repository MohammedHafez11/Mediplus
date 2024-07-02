import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/404/NotFound';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import PortfolioDetails from './pages/portfolio-details/PortfolioDetails';
import { useEffect, useState } from 'react';
import Preloader from './components/preloader/preloader';
import Login from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import AllDepartments from '../src/pages/Dasboard/AllDepartments/all-departments';
import AllProjects from '../src/pages/Dasboard/AllProjects/all-projects';
import AllSliders from '../src/pages/Dasboard/AllSliders/all-sliders';
import AllTreatments from './pages/Dasboard/AllTreatments/all-treatments';
import AllCategories from './pages/Dasboard/AllCategories/all-categories';
import AllDoctors from './pages/Dasboard/AllDoctors/all-doctors';
import AllReservation from './pages/Dasboard/AllReservation/all-reservation';
import AllBlogs from './pages/Dasboard/AllBlogs/all-blogs';
import BlogCategory from './pages/blog-category/BlogCategory';
import RecentBlogsPage from './pages/recent-blogs/RecentBlogsPage';
import Blogs from './pages/blogs/blogs';
import BlogSingle from './pages/blog-single/BlogSingle';
import SearchResults from './components/searchResults/serchResults';

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
           <Route path="*" element={<NotFound />} /> 

          <Route index element={<Home />} />

          <Route path='/login' element={<Login />} />

          <Route path='/AllDepartments' element={<AllDepartments />} />

          <Route path='/AllTreatments' element={<AllTreatments />} />

          <Route path='/AllProjects' element={<AllProjects />} />

          <Route path='/AllCategories' element={<AllCategories />} />

          <Route path='/AllSliders' element={<AllSliders />} />

          <Route path='/AllDoctors' element={<AllDoctors />} />

          <Route path='/AllBlogs' element={<AllBlogs />} />

          <Route path='/AllReservation' element={<AllReservation />} />

          <Route path='/Contact' element={<Contact />} />

          <Route path='/blogs' element={<Blogs />} />

          <Route path='/search-results' element={<SearchResults />} />

          <Route path='/portfolio-details/:projectId' element={<PortfolioDetails />} />

          <Route path='/blog-single/:blogId' element={<BlogSingle />} />
          <Route path='/recent-blogs' element={<RecentBlogsPage />} />
          <Route path='/blog-category/:categoryId' element={<BlogCategory />} />

        </Routes>
        <Toaster />
      </BrowserRouter>


    </>
  )
}

export default App