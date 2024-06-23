import { Ambulance } from 'lucide-react';
import { ArrowBigRight } from 'lucide-react';
import { Pill } from 'lucide-react';
import { Clock } from 'lucide-react';



const Cards = () => {
  return (
    <>
    <section className="schedule">
        <div className="container">
          <div className="schedule-inner">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="single-schedule first">
                  <div className="inner">
                    <div className="icon">
                    <Ambulance color='white' />
                    </div>
                    <div className="single-content">
                      <span>Lorem Amet</span>
                      <h4>Emergency Cases</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit. Vivamus
                        et erat in lacus convallis sodales.
                      </p>
                      <a href="#" style={{display: "flex", alignItems: "center"}}>LEARN MORE<ArrowBigRight /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-12 ">
                <div className="single-schedule last">
                  <div className="inner">
                    <div className="icon">
                    <Clock color='white' />
                    </div>
                    <div className="single-content">
                      <span>Donec luctus</span>
                      <h4>Opening Hours</h4>
                      <ul className="time-sidual">
                        <li className="day">
                          Monday - Friday <span>8.00-20.00</span>
                        </li>
                        <li className="day">Saturday <span>9.00-18.30</span></li>
                        <li className="day">
                          Monday - Thursday <span>9.00-15.00</span>
                        </li>
                      </ul>
                      <a href="#" style={{display: "flex", alignItems: "center"}}>LEARN MORE<ArrowBigRight /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="single-schedule middle">
                  <div className="inner">
                    <div className="icon">
                    <Pill color='white' />
                    </div>
                    <div className="single-content">
                      <span>Fusce Porttitor</span>
                      <h4>Doctors Timetable</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit. Vivamus
                        et erat in lacus convallis sodales.
                      </p>
                      <a href="#" style={{display: "flex", alignItems: "center"}}>LEARN MORE<ArrowBigRight /></a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards