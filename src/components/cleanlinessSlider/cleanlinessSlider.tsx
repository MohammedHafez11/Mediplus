import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import section from '/public/images/section-img.png';
import { fetchProjects } from '../../redux/projectSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';

const CleanlinessSlider = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { projects, status, error } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  return (
    <section className="portfolio section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>We Maintain Cleanliness Rules Inside Our Hospital</h2>
              <img src={section} alt="#" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                aliquet. pretiumts
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="owl-carousel portfolio-slider">
              {status === 'loading' && <p>Loading...</p>}
              {status === 'failed' && <p>{error}</p>}
              {status === 'succeeded' && (
                <Swiper slidesPerView={4} spaceBetween={30} loop={true} modules={[Pagination]} className="mySwiper">
                  {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                      {/* Wrap each image in a Link to PortfolioDetails with the project ID */}
                      <Link to={`/portfolio-details/${project.id}`}>
                        <div className="single-pf">
                          <img src={`https://mediplus.runasp.net${project.imageUrl}`} alt={project.title} />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanlinessSlider;