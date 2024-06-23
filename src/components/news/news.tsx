import section from '/public/images/section-img.png'
import blog1 from '/public/images/blog1.jpg'
import blog2 from '/public/images/blog2.jpg'
import blog3 from '/public/images/blog3.jpg'


const News = () => {
  return (
    <>
    <section className="blog section" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Keep up with Our Most Recent Medical News.</h2>
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
              <div className="single-news">
                <div className="news-head">
                  <img src={blog1} alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">22 Aug, 2020</div>
                    <h2>
                      <a href="blog-single.html"
                      >We have annnocuced our new product.</a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt sed do incididunt sed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="news-head">
                  <img src={blog2} alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">15 Jul, 2020</div>
                    <h2>
                      <a href="blog-single.html"
                      >Top five way for solving teeth problems.</a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt sed do incididunt sed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="news-head">
                  <img src={blog3} alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">05 Jan, 2020</div>
                    <h2>
                      <a href="blog-single.html"
                      >We provide highly business soliutions.</a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt sed do incididunt sed.
                    </p>
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

export default News