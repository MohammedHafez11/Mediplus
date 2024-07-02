import section from '/public/images/section-img.png'
import { Pill } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Ear } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Syringe } from 'lucide-react';



const Offers = () => {
  return (
    <>
    <section className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>We Offer Different Services To Improve Your Health</h2>
                <img src={section} alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                  aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Pill size={40} /></i>
                <h4><a href="service-details.html">General Treatment</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Syringe size={40} /></i>
                <h4><a href="service-details.html">Teeth Whitening</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Heart size={40} /></i>
                <h4><a href="service-details.html">Heart Surgery</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Ear size={40} /></i>
                <h4><a href="service-details.html">Ear Treatment</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Eye size={40} /></i>
                <h4><a href="service-details.html">Vision Problems</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i><Syringe size={40} /></i>
                <h4><a href="service-details.html">Blood Transfusion</a></h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Offers