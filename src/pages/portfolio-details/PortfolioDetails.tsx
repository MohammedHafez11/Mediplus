import Footer from "../../components/footer/footer"
import Header from "../../components/header/Header"



const PortfolioDetails = () => {
  return (
    <>
	<Header/>
		<div className="breadcrumbs overlay">
			<div className="container">
				<div className="bread-inner">
					<div className="row">
						<div className="col-12">
							<h2>Portfolio Details</h2>
							<ul className="bread-list">
								<li><a href="index.html">Home</a></li>
								<li><i className="icofont-simple-right"></i></li>
								<li className="active">Portfolio Details</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<section className="pf-details section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="inner-content">
							<div className="image-slider">
								<div className="pf-details-slider">
									<img src="img/call-bg.jpg" alt="#"/>
									<img src="img/call-bg.jpg" alt="#"/>
									<img src="img/call-bg.jpg" alt="#"/>
								</div>
							</div>
							<div className="date">
								<ul>
									<li><span>Category :</span> Heart Surgery</li>
									<li><span>Date :</span> April 20, 2019</li>
									<li><span>Client :</span> Suke Agency</li>
									<li><span>Ags :</span> Typo</li>
								</ul>
							</div>
							<div className="body-text">
								<h3>Here is the name of this project here</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor a ti incididunt ut labore et dolore to in magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna aliqua uis nostrud.Lorem ipsum dolor sit amet, in a in to in a consectetur.ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna in a aliqua uis nostrud.Lorem ipsum dolor sit amet, in aed do eiusmod</p>
								<p>ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna to in aliqua uis nostrud.Lorem ipsum dolor sit amet, in aed do eiusmod.ncididunt ut labore et dolore magna aliqua. </p>
								<p>ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna a aliqua uis nostrud.Lorem ipsum dolor sit amet, in aed do eiusmod.ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna aliqua uis nostrud.Lorem ipsum dolor sit amet, in aed do eiusmod. dolor sit amet, in aed do eiusmod.ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis to the in nostrud.abore et dolore magna aliqua uis nostrud.</p>
								<div className="share">
									<h4>Share Now -</h4>
									<ul>
										<li><a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
										<li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
										<li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
									</ul>
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

export default PortfolioDetails