import section from '/public/images/section-img.png'
import { Scissors } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { BriefcaseMedical } from 'lucide-react';

const Pricing = () => {
  return (
    <>
    <section className="pricing-table section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>We Provide You The Best Treatment In Resonable Price</h2>
                <img src={section} alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                  aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i><Scissors size={40} /></i>
                  </div>
                  <h4 className="title">Plastic Suggery</h4>
                  <div className="price">
                    <p className="amount">$199<span>/ Per Visit</span></p>
                  </div>
                </div>
                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur sollicitudin
                    fentum
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Nullam interdum enim
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Donec ultricies metus
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Pellentesque eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">Book Now</a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i><BriefcaseMedical size={40} /></i>
                  </div>
                  <h4 className="title">Teeth Whitening</h4>
                  <div className="price">
                    <p className="amount">$299<span>/ Per Visit</span></p>
                  </div>
                </div>
                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur sollicitudin
                    fentum
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Nullam interdum enim
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Donec ultricies metus
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Pellentesque eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">Book Now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i><HeartPulse size={40} /></i>
                  </div>
                  <h4 className="title">Heart Suggery</h4>
                  <div className="price">
                    <p className="amount">$399<span>/ Per Visit</span></p>
                  </div>
                </div>
                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur sollicitudin
                    fentum
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Nullam interdum enim
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Donec ultricies metus
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Pellentesque eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">Book Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing