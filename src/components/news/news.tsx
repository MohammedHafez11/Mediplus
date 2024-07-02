import section from '/public/images/section-img.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { fetchBlogs } from '../../redux/blogSlice';
import { parseISO, isValid, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Blog } from '../../redux/blogSlice'; // Import the Blog interface

const News = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const blogStatus = useSelector((state: RootState) => state.blog.status);

  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  const formatDate = (isoDateString: any) => {
    if (!isoDateString || !isValid(parseISO(isoDateString))) {
      return ''; // Return empty string if isoDateString is empty or invalid
    }
    const dateObj = parseISO(isoDateString);
    return format(dateObj, 'yyyy-MM-dd'); // Format date as desired
  };

  // Selector logic moved here
  const selectLastThreeBlogs = (blogs: Blog[]): Blog[] => {
    return blogs
      .slice() // Create a shallow copy of the array
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()) // Use non-null assertion
      .slice(0, 3);
  };

  const lastThreeBlogs = selectLastThreeBlogs(blogs);

  return (
    <>
      <section className="blog section" id="blog">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2>Keep up with Our Most Recent Medical News.</h2>
                  <img src={section} alt="#" />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                    aliquet. pretiumts
                  </p>
                </div>
              </div>
            </div>

            {lastThreeBlogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 col-12">
                <div className="single-news">
                  <div className="news-head" >
                    {blog.imageUrls && blog.imageUrls.length > 0 ? (
                      <img src={blog.imageUrls[0]} alt={blog.title} />
                    ) : (
                      <div>no image available</div> // Provide a default image path
                    )}
                  </div>
                  <div className="news-body">
                    <div className="news-content">
                      <div className="date">{formatDate(blog.date)}</div>
                      <h2>
                      <Link to={`/blog-single/${blog.id}`}>{blog.title}</Link>
                      </h2>
                      <p className="text">{blog.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;