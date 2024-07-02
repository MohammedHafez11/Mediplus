import '../../../public/css/style.css';
import '../../../public/css/bootstrap.min.css';
import '../../../public/css/normalize.css';
import '../../../public/css/responsive.css';
import { useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categorySlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogsByCategoryId } from '../../redux/blogSlice';



const GetAllCategories = () => {
    const dispatch = useDispatch<AppDispatch>();

    const categories = useSelector((state: RootState) => state.category.categories);
    const categoryStatus = useSelector((state: RootState) => state.category.status);
    const categoryError = useSelector((state: RootState) => state.category.error);

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [categoryStatus, dispatch]);

    if (categoryStatus === 'loading') {
        return <p>Loading categories...</p>;
    }

    if (categoryStatus === 'failed') {
        return <p>{categoryError}</p>;
    }

    const handleCategoryClick = (categoryId: number) => {
        dispatch(fetchBlogsByCategoryId(categoryId))
       
    };


    return (
        <div className="single-widget category">
            <h3 className="title">Blog Categories</h3>

            {categoryStatus === 'succeeded' && (
                <ul className="category-list"> 
                    {categories.map((category) => (
                        <li key={category.id}>
                        <Link to={`/blog-category/${category.id}`} onClick={() => handleCategoryClick(category.id)}>
                            
                        {category.name}
                        
                        </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default GetAllCategories