import section from '/public/images/section-img.png'
import pf1 from '/public/images/pf1.jpg'
import pf2 from '/public/images/pf2.jpg'
import pf3 from '/public/images/pf3.jpg'
import pf4 from '/public/images/pf4.jpg'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const CleanlinessSlider = () => {
    return (
        <>
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
                                <Swiper slidesPerView={4} spaceBetween={30} loop={true} modules={[Pagination]} className="mySwiper">
                                    <SwiperSlide>
                                        <div className="single-pf">
                                            <img src={pf1} alt="#" />
                                            <a href="portfolio-details.html" className="btn">View Details</a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-pf">
                                            <img src={pf2} alt="#" />
                                            <a href="portfolio-details.html" className="btn">View Details</a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-pf">
                                            <img src={pf3} alt="#" />
                                            <a href="portfolio-details.html" className="btn">View Details</a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-pf">
                                            <img src={pf4} alt="#" />
                                            <a href="portfolio-details.html" className="btn">View Details</a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-pf">
                                            <img src={pf4} alt="#" />
                                            <a href="portfolio-details.html" className="btn">View Details</a>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CleanlinessSlider