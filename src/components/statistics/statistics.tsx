import funImg from '/public/images/fun-bg.jpg'
import { Home } from 'lucide-react';
import { User } from 'lucide-react';
import { Smile } from 'lucide-react';
import { Table } from 'lucide-react';

import '/public/css/icofont.css'
import '/public/css/font-awesome.min.css'


const Statistics = () => {
  return (
    <>
    <div id="fun-facts" className="fun-facts section overlay" style={{backgroundImage: `url(${funImg})`}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
              <i><Home/></i>
                <div className="content">
                  <span className="counter">3468</span>
                  <p>Hospital Rooms</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i><User/></i>
                <div className="content">
                  <span className="counter">557</span>
                  <p>Specialist Doctors</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i><Smile/></i>
                <div className="content">
                  <span className="counter">4379</span>
                  <p>Happy Patients</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i><Table/></i>
                <div className="content">
                  <span className="counter">32</span>
                  <p>Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics