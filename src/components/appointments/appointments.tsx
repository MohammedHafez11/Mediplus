import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../redux/departmentSlice';
import { fetchDoctors } from '../../redux/doctorSlice';
import { createReservation, resetReservationStatus } from '../../redux/reservationSlice'; // import reset action
import section from '/public/images/section-img.png';
import contactImg from '/public/images/contact-img.png';
import { RootState, AppDispatch } from '../../redux/store';
import toast, { Toaster } from 'react-hot-toast';

const Appointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, status: departmentsStatus } = useSelector((state: RootState) => state.department);
  const { doctors, status: doctorsStatus } = useSelector((state: RootState) => state.doctor);
  const reservationStatus = useSelector((state: RootState) => state.reservation.status);
  const reservationError = useSelector((state: RootState) => state.reservation.error);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departmentId: '',
    doctorId: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    if (departmentsStatus === 'idle') {
      dispatch(fetchDepartments());
    }
    if (doctorsStatus === 'idle') {
      dispatch(fetchDoctors());
    }
  }, [dispatch, departmentsStatus, doctorsStatus]);

  useEffect(() => {
    if (reservationStatus === 'succeeded') {
      toast.success('Reservation successfully created!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        departmentId: '',
        doctorId: '',
        description: '',
        date: ''
      });
      dispatch(resetReservationStatus()); // reset the status after showing the toast
    } else if (reservationStatus === 'failed') {
      toast.error(reservationError || 'Failed to create reservation. Please try again.');
      dispatch(resetReservationStatus()); // reset the status after showing the toast
    }
  }, [reservationStatus, reservationError, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, departmentId, doctorId, description, date } = formData;
    if (!name || !email || !phone || !departmentId || !doctorId || !description || !date) {
      toast.error('Please fill in all required fields.');
      return;
    }
    dispatch(createReservation({ name, email, phone, departmentId: Number(departmentId), doctorId: Number(doctorId), description, date }));
  };

  return (
    <section className="appointment" id="appointment">
      <div className="container">
        <Toaster />
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>We Are Always Ready to Help You. Book An Appointment</h2>
              <img src={section} alt="#" />
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <input style={{ textTransform: "none" }} name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <input style={{ textTransform: "none" }} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <input style={{ textTransform: "none" }} name="phone" type="number" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <select name="departmentId" className="nice-select form-control" style={{ height: "50px" }} value={formData.departmentId} onChange={handleChange}>
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="form-group">
                    <select name="doctorId" className="nice-select form-control wide" style={{ height: "60px" }} value={formData.doctorId} onChange={handleChange}>
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>Dr. {doctor.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="form-group">
                    <textarea style={{ textTransform: "none" }} name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="form-group">
                    <input style={{ textTransform: "none" }} type='date' name="date" placeholder="Date" value={formData.date} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-lg-5 col-md-4 col-12">
                  <div className="form-group">
                    <div className="button">
                      <button type="submit" className="btn">Book An Appointment</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-8 col-12">
                  <p>( We will confirm by a Text Message )</p>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="appointment-image">
              <img src={contactImg} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointments;