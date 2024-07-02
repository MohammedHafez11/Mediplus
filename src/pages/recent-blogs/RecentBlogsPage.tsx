import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/commentSlice';
import { AppDispatch } from '../../redux/store';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import { parseISO, isValid, format } from 'date-fns';
import toast from 'react-hot-toast';

interface Blog {
    id: number;
    title: string;
    date: string;
    content: string;
    imageUrls: string[];
    commentsCount: number;
    facebookUrl: string;
    linkedinUrl: string;
    comments: Comment[];
}

interface Comment {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    details: string;
    date: string;
}

const RecentBlogPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Specify null type for error state
    const [commentData, setCommentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        details: '',
        blogId: 0, // Initialize blogId as 0 (or any default number)
        date: new Date().toISOString(),
    });

    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                const response = await fetch('https://mediplus.runasp.net/Blog/GetRecent');
                if (!response.ok) {
                    throw new Error('Failed to fetch recent blogs');
                }
                const data = await response.json();
                setRecentBlogs(data); // Assuming data is an array of recent blogs
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchRecentBlogs();
    }, []);

    if (loading) {
        return <p>Loading recent blogs...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const formatDate = (isoDateString: string | undefined) => {
        if (!isoDateString || !isValid(parseISO(isoDateString))) {
            return ''; // Return empty string if isoDateString is empty or invalid
        }
        const dateObj = parseISO(isoDateString);
        return format(dateObj, 'yyyy-MM-dd'); // Format date as desired
    };

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
                    blogId: 0, // Reset to initial value, assuming it's number type
                    date: new Date().toISOString(),
                });
            })
            .catch(() => {
                toast.error('Failed to submit comment.');
            });
    };

    return (
        <>
            <Header />
            <div className="breadcrumbs overlay">
                <div className="container">
                    <div className="bread-inner">
                        <div className="row">
                            <div className="col-12">
                                <h2>Recent Blogs</h2>
                                <ul className="bread-list">
                                    <li><a href="/">Home</a></li>
                                    <li><i className="icofont-simple-right"></i></li>
                                    <li className="active">Recent Blogs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="news-single section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg col-12">
                            <div className="col-12">
                                <div className='row'>
                                    {recentBlogs.map((blog) => (
                                        <div key={blog.id} className="col-12">
                                            <div className="single-main">
                                                <h1 className="news-title">{blog.title}</h1>
                                                <div className="meta">
                                                    <div className="meta-left">
                                                        <span className="date"><i className="fa fa-clock-o"></i>{formatDate(blog.date)}</span>
                                                    </div>
                                                    <div className="meta-right">
                                                        <span className="comments"><i className="fa fa-comments"></i>{blog.commentsCount} Comments</span>
                                                    </div>
                                                </div>
                                                <div className="news-text">
                                                    <p>{blog.content}</p>
                                                    <div className="image-gallery">
                                                        <div className="row">
                                                            {blog.imageUrls?.map((imageUrl, index) => (
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
                                                            {blog.comments.map((comment) => (
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

export default RecentBlogPage;