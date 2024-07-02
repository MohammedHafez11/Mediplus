import img from '/public/images/section-img.png'
import blog from '/public/images/video-bg.jpg'


const Services = () => {
  return (
    <>
    <section className="why-choose section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>We Offer Different Services To Improve Your Health</h2>
                <img src={img} alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
                  aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="choose-left">
                <h3>Who We Are</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas pharetra antege vel est lobortis, a commodo magna
                  rhoncus. In quis nisi non emet quam pharetra commodo.
                </p>
                <p>
                  className aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right"></i>Maecenas vitae luctus
                        nibh.
                      </li>
                      <li><i className="fa fa-caret-right"></i>Duis massa massa.</li>
                      <li>
                        <i className="fa fa-caret-right"></i>Aliquam feugiat interdum.
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right"></i>Maecenas vitae luctus
                        nibh.
                      </li>
                      <li><i className="fa fa-caret-right"></i>Duis massa massa.</li>
                      <li>
                        <i className="fa fa-caret-right"></i>Aliquam feugiat interdum.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12" style={{backgroundImage: `url(${blog})`, backgroundSize: "cover"}}>
              <div className="choose-right">
                <div className="video-image">
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1"></div>
                      <div className="waves wave-2"></div>
                      <div className="waves wave-3"></div>
                    </div>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=RFVXy6CRVR4"
                    className="video video-popup mfp-iframe"
                  ><i className="fa fa-play"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services