import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDoctors } from '../../redux/doctorSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state: RootState) => state.doctor.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <>
      <section className="schedule">
        <div className="container">
          <div className="schedule-inner" >
            <Swiper                 
             modules={[ Navigation]}
             className="mySwiper"
          
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id} className='col-lg-3 col-md-12 col-12' >
                    <div className="single-schedule last">
                      <div className="inner">
                       
                        <div className="single-content">
                          <span>Dr. {doctor.name}</span>
                          <h4>{doctor.description}</h4>
                          <ul className="time-sidual">
                            <li className="day">
                              {doctor.openingHours}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
               
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cards;