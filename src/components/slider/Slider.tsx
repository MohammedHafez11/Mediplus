import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliders } from '../../redux/sliderSlice'; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from 'swiper/modules';
import { RootState, AppDispatch } from '../../redux/store';
import 'swiper/css/navigation';

const Slider: React.FC = () => {
  
  const sliders  = useSelector((state: RootState) => state.slider.sliders); 

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

 
  

  return (
    <section className="slider">
      <div className="hero-slider">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {sliders.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div className="single-slider" style={{ backgroundImage: `url(${slider.imageUrl})` }}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="text">
                        <h1>
                          {slider.title}
                        </h1>
                        <p>
                          {slider.content}
                        </p>
                        <div className="button">
                          {/* Your button logic here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;