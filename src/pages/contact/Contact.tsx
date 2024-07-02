import Footer from '../../components/footer/footer'
import Header from '../../components/header/Header'



const Contact = () => {
  return (
    <>
    <Header/>
		<div className="breadcrumbs overlay">
			<div className="container">
				<div className="bread-inner">
					<div className="row">
						<div className="col-12">
							<h2>Contact Us</h2>
							<ul className="bread-list">
								<li><a href="index.html">Home</a></li>
								<li><i className="icofont-simple-right"></i></li>
								<li className="active">Contact Us</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
				
		<section className="contact-us section">
			<div className="container">
				<div className="inner">
					<div className="row"> 
						<div className="col-lg-6">
							<div className="contact-us-left">
								<div id="myMap"></div>
							</div>
						</div>
						
					</div>
				</div>
				<div className="contact-info">
					<div className="row">
						<div className="col-lg-4 col-12 ">
							<div className="single-info">
								
								<div className="content">
									<h3>+(000) 1234 56789</h3>
									<p>info@company.com</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-12 ">
							<div className="single-info">
								
								<div className="content">
									<h3>2 St Brigade Road</h3>
									<p>Cairo , Egypt</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-12 ">
							<div className="single-info">
							
								<div className="content">
									<h3>Sat - Thu: 8am - 5pm</h3>
									<p>Friday Closed</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<Footer/>
		</>
  )
}

export default Contact