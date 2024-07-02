import section from '/public/images/section-img.png'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchTreatments } from '../../redux/treatmentSlice';
import { useEffect } from 'react';

const Pricing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const treatments = useSelector((state: RootState) => state.treatment.treatments);
  const status = useSelector((state: RootState) => state.treatment.status);
  const error = useSelector((state: RootState) => state.treatment.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTreatments());
    }
  }, [dispatch, status]);
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
            {status === 'loading' && <p>Loading treatments...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && treatments.map((treatment) => (
              <div key={treatment.id} className="col-lg-4 col-md-12 col-12">
                <div className="single-table">
                  <div className="table-head">
                    <div className="icon">
                      <i> <img src={treatment.icon} alt={treatment.title} width={100} /></i>
                    </div>
                    <h4 className="title">{treatment.title}</h4>
                    <div className="price">
                      <p className="amount">${treatment.price}<span>/ Per Visit</span></p>
                    </div>
                  </div>
                  {/* Additional details or actions related to treatment can be added here */}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default Pricing