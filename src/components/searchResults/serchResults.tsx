import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { searchBlogs } from '../../redux/blogSlice';
import { format, parseISO, isValid } from 'date-fns';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import { createComment } from '../../redux/commentSlice';
import toast from 'react-hot-toast';

const SearchResults = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchResults = useSelector((state: RootState) => state.blog.blogs);
    const [commentData, setCommentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        details: '',
        blogId: 0,
        date: new Date().toISOString(),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent, blogId: number) => {
        e.preventDefault();
        if (!commentData.firstName || !commentData.lastName || !commentData.email || !commentData.details) {
            toast.error('All fields are required.');
            return;
        }
        // Dispatch the createComment action
        dispatch(createComment({ ...commentData, blogId }))
            .then(() => {
                toast.success('Comment submitted successfully!');
                // Reset form
                setCommentData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    details: '',
                    blogId: 0,
                    date: new Date().toISOString(),
                });
            })
            .catch(() => {
                toast.error('Failed to submit comment.');
            });
    };

    useEffect(() => {
        if (query.trim() !== '') {
            dispatch(searchBlogs(query))
                .then(() => setLoading(false))
                .catch(() => {
                    setError('Failed to fetch search results');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [dispatch, query]);

    const formatDate = (isoDateString: string) => {
        if (!isoDateString || !isValid(parseISO(isoDateString))) {
            return ''; // Return empty string if isoDateString is empty or invalid
        }
        const dateObj = parseISO(isoDateString);
        return format(dateObj, 'yyyy-MM-dd'); // Format date as desired
    };

    if (loading) {
        return <p>Loading search results...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Header />
            <div className="breadcrumbs overlay">
                <div className="container">
                    <div className="bread-inner">
                        <div className="row">
                            <div className="col-12">
                                <h2>Search Results</h2>
                                <ul className="bread-list">
                                    <li><a href="/">Home</a></li>
                                    <li><i className="icofont-simple-right"></i></li>
                                    <li className="active">Search</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="news-single section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="col-12">
                                <div className='row'>
                                    {searchResults.map((blog) => (
                                        <div key={blog.id} className='result-item'>
                                            <div className="single-main">
                                                <h1 className="news-title">{blog.title}</h1>
                                                <div className="meta">
                                                    <div className="meta-left">
                                                        <span className="date">
                                                            <i className="fa fa-clock-o"></i>
                                                            {blog.date ? formatDate(blog.date) : 'Unknown Date'}
                                                        </span>
                                                    </div>
                                                    <div className="meta-right">
                                                        <span className="comments"><i className="fa fa-comments"></i>{blog.commentsCount} Comments</span>
                                                    </div>
                                                </div>
                                                <div className="news-text">
                                                    <p>{blog.content}</p>
                                                    <div className="image-gallery">
                                                        <div className="row">
                                                            {blog.imageUrls?.map((imageUrl: string, index: number) => (
                                                                <div key={index} className="col-lg-6 col-md-6 col-12">
                                                                    <div className="single-image">
                                                                        <img src={imageUrl} style={{ width: "100%", display: "block" }} alt={`Image ${index + 1}`} />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="blog-bottom">
                                                    <ul className="social-share">
                                                        <li className="facebook"><a href={blog.facebookUrl}><i className="fa fa-facebook"></i><span>Facebook</span></a></li>
                                                        <li className="linkedin"><a href={blog.linkedinUrl}><i className="fa fa-linkedin"></i></a></li>
                                                    </ul>
                                                </div>

                                                <div className="col-12">
                                                    <div className="blog-comments">
                                                        <h2>All Comments</h2>
                                                        <div className="comments-body">

                                                            {blog.comments.map((comment: { id: number, firstName: string, lastName: string, email: string, date: string, details: string }) => (

                                                                <div className="single-comments" key={comment.id}>
                                                                    <div className="main">
                                                                        <div className="body">
                                                                            <h4>{comment.firstName} {comment.lastName}</h4>
                                                                            <div className="comment-meta">
                                                                                <span className="meta"><i className="fa fa-calendar"></i>{formatDate(comment.date)}</span>

                                                                            </div>
                                                                            <p>{comment.email}</p>
                                                                            <p>{comment.details}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="comments-form">
                                                        <h2>Leave Comments</h2>
                                                        <form onSubmit={(e) => handleSubmit(e, blog.id)}>
                                                            <div className="row">
                                                                <input type="hidden" name="blogId" value={blog.id} />
                                                                <div className="col-lg-4 col-md-4 col-12">
                                                                    <div className="form-group">
                                                                        <i className="fa fa-user"></i>
                                                                        <input type="text" name="firstName" placeholder="First name" value={commentData.firstName} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 col-12">
                                                                    <div className="form-group">
                                                                        <i className="fa fa-envelope"></i>
                                                                        <input type="text" name="lastName" placeholder="Last name" value={commentData.lastName} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 col-12">
                                                                    <div className="form-group">
                                                                        <i className="fa fa-envelope"></i>
                                                                        <input type="email" name="email" placeholder="Your Email" value={commentData.email} onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group message">
                                                                        <i className="fa fa-pencil"></i>
                                                                        <textarea name="details" rows={7} placeholder="Type Your Message Here" value={commentData.details} onChange={handleInputChange}></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group button">
                                                                        <button type="submit" className="btn primary"><i className="fa fa-send"></i>Submit Comment</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SearchResults;