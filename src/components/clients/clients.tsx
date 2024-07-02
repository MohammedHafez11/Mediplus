import client1 from '/public/images/client1.png'
import client2 from '/public/images/client2.png'
import client3 from '/public/images/client3.png'
import client4 from '/public/images/client4.png'
import client5 from '/public/images/client5.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Clients = () => {
    return (
        <>
            <div className="clients overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="owl-carousel clients-slider">
                                <Swiper
                                    spaceBetween={30}
                                  
                                    autoplay={{
                                        delay: 1500,
                                        disableOnInteraction: false,
                                    }}
                                    slidesPerView={4}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="single-clients">
                                            <img src={client1} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>

                                        <div className="single-clients">
                                            <img src={client2} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>

                                        <div className="single-clients">
                                            <img src={client3} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-clients">
                                            <img src={client4} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-clients">
                                            <img src={client5} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="single-clients">
                                            <img src={client1} alt="#" />
                                        </div>
                                    </SwiperSlide>
                                
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clients