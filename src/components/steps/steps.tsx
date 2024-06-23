import sectionImg from '/public/images/section-img.png'
import { Ambulance } from 'lucide-react';
import { Pill } from 'lucide-react';
import { Stethoscope } from 'lucide-react';


const Steps = () => {
  return (
    <>
    <section className="Feautes section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>We Are Always Ready to Help You & Your Family</h2>
                <img src={sectionImg} alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                  aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="single-features">
                <div className="signle-icon">
                <Ambulance size={50} />
                </div>
                <h3>Emergency Help</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="single-features">
                <div className="signle-icon">
                <Pill size={50} />
                </div>
                <h3>Enriched Pharmacy</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="single-features last">
                <div className="signle-icon">
                <Stethoscope size={50} />
                </div>
                <h3>Medical Treatment</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Steps