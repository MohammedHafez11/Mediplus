import '/public/css/style.css'
import '/public/css/bootstrap.min.css'
import '/public/css/normalize.css'
import '/public/css/responsive.css'
import Header from '../../components/header/Header'
import Slider from '../../components/slider/Slider'
import Cards from '../../components/cardsOnSlider/cards'
import Steps from '../../components/steps/steps'
import Statistics from '../../components/statistics/statistics'
import Services from '../../components/services/services'
import Emergency from '../../components/emergency/emergency'
import CleanlinessSlider from '../../components/cleanlinessSlider/cleanlinessSlider'
import Offers from '../../components/offers/offers'
import Footer from '../../components/footer/footer'
import Pricing from '../../components/pricing/pricing'
import News from '../../components/news/news'
import Clients from '../../components/clients/clients'
import Newsletter from '../../components/newsletter/newsletter'
import Appointments from '../../components/appointments/appointments'

function Home() {
 
  return (
    <>

          <Header />
          <Slider/>
          <Cards />
          <Steps />
          <Statistics />
          <Services />
          <Emergency />
          <CleanlinessSlider />
          <Offers />
          <Pricing />
          <News />
          <Clients />
          <Appointments />
          <Newsletter />
          <Footer />
   
    </>
  )
}

export default Home