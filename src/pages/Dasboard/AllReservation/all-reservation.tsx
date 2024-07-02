import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header } from 'rsuite';
import { fetchReservations, deleteReservation } from '../../../redux/reservationSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import SidebarAdmin from '../sidebarAdmin/sidebarAdmin';
import toast, { Toaster } from 'react-hot-toast';
import '../AllDepartments/AllDepartments.css';
import '../global.css';
import { parseISO, isValid, format  } from 'date-fns';

const AllReservation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { reservations, status } = useSelector((state: RootState) => state.reservation);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReservations());
        }
    }, [dispatch, status]);

    const formatDate = (isoDateString:any) => {
		if (!isoDateString || !isValid(parseISO(isoDateString))) {
		  return ''; // Return empty string if isoDateString is empty or invalid
		}
		const dateObj = parseISO(isoDateString);
		return format(dateObj, 'yyyy-MM-dd'); // Format date as desired
	  };


    const handleDelete = (id: number) => {
        dispatch(deleteReservation(id))
            .unwrap()
            .then(() => {
                toast.success('Reservation deleted successfully');
            })
            .catch((err) => {
                toast.error(err.message || 'Failed to delete reservation');
            });
    };

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <SidebarAdmin />
                <div className="table-container" style={{ overflowX: 'auto', marginLeft: '30px', width: '70%', padding: '20px' }}>
                    <Toaster />
                    <Header style={{ marginBottom: '20px' }}>
                        <h5 style={{ marginTop: '20px', marginBottom: '20px' }}>All Reservations</h5>
                    </Header>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={reservation.id}>
                                    <td>{index + 1}</td>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.description}</td>
                                    <td>{formatDate(reservation.date)}</td>
                                    <td>
                                        <button onClick={() => handleDelete(reservation.id)} className="bin-button">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 39 7"
                                                className="bin-top"
                                            >
                                                <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                                <line
                                                    stroke-width="3"
                                                    stroke="white"
                                                    y2="1.5"
                                                    x2="26.0357"
                                                    y1="1.5"
                                                    x1="12"
                                                ></line>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 33 39"
                                                className="bin-bottom"
                                            >
                                                <mask fill="white" id="path-1-inside-1_8_19">
                                                    <path
                                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                    ></path>
                                                </mask>
                                                <path
                                                    mask="url(#path-1-inside-1_8_19)"
                                                    fill="white"
                                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                ></path>
                                                <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                                <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 89 80"
                                                className="garbage"
                                            >
                                                <path
                                                    fill="white"
                                                    d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default AllReservation;