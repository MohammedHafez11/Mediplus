import React, { useEffect, useState } from 'react';
import { Container, Header, Modal, Form } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchTreatments, fetchTreatmentById, deleteTreatment, updateTreatment, createTreatment } from '../../../redux/treatmentSlice';
import '../AllDepartments/AllDepartments.css';
import SidebarAdmin from '../sidebarAdmin/sidebarAdmin';
import '../global.css'
import { unwrapResult } from '@reduxjs/toolkit';

interface Treatment {
    id: number;
    title: string;
    icon: string;
    price: number;
    file: File | null;
}

const AllTreatments: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const treatments = useSelector((state: RootState) => state.treatment.treatments);
    const [viewTreatment, setViewTreatment] = useState<Treatment | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [newTreatmentTitle, setNewTreatmentTitle] = useState('');
    const [newTreatmentFile, setNewTreatmentFile] = useState<File | null>(null);
    const [titleError, setTitleError] = useState('');
    const [fileError, setFileError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [newTreatmentPrice, setNewTreatmentPrice] = useState<number | null>(null);
    const [priceError, setPriceError] = useState('');
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [currentTreatmentId, setCurrentTreatmentId] = useState('');
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateTitleError, setUpdateTitleError] = useState('');

    useEffect(() => {
        dispatch(fetchTreatments());
    }, [dispatch]);

    const handleOpenViewModal = async (treatmentId: number) => {
        try {
            const actionResult = await dispatch(fetchTreatmentById(treatmentId));
            const result = unwrapResult(actionResult); // Unwrap the action result

            // Check if the request was fulfilled and the payload exists
            if ('id' in result) {
                setViewTreatment(result);
                setShowViewModal(true);
            } else {
                console.error('Failed to fetch project details');
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };
    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setViewTreatment(null);
    };
    const handleCreateTreatment = async () => {
        if (!newTreatmentTitle.trim()) {
            setTitleError('Treatment title cannot be empty');
            return;
        } else {
            setTitleError('');
        }
        if (!newTreatmentFile) {
            setFileError('Treatment file cannot be empty');
            return;
        } else {
            setFileError('');
        }
        if (!newTreatmentPrice) { // Validate price
            setPriceError('Treatment price cannot be empty');
            return;
        } else {
            setPriceError('');
        }
        const formData = new FormData();
        formData.append('title', newTreatmentTitle);
        formData.append('price', newTreatmentPrice.toString()); // Append price to FormData
        formData.append('file', newTreatmentFile);
        await dispatch(createTreatment(formData));
        handleCloseCreateModal();
        dispatch(fetchTreatments());

        setNewTreatmentTitle('');
        setNewTreatmentPrice(null); // Reset price state
        setNewFile(null);
        setShowCreateModal(false);
    };
    const resetForm = () => {
        setNewTreatmentTitle('');
        setNewTreatmentFile(null);
        setNewTreatmentPrice(null); // Reset price state
        setTitleError('');
        setFileError('');
        setPriceError(''); // Reset price error
    };
    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        resetForm();
    };
    const handleTitleChange = (value: string) => {
        setNewTreatmentTitle(value);
        setTitleError('');
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseFloat(event.target.value);
        setNewTreatmentPrice(price);
        setPriceError('');
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTreatmentFile(event.target.files?.[0] || null);
    };
    const handleOpenDeleteConfirmModal = (projectId: number) => {
        setDeleteId(projectId);
        setDeleteConfirmModal(true);
    };
    const handleCloseDeleteConfirmModal = () => {
        setDeleteId(null);
        setDeleteConfirmModal(false);
    };
    const handleDeleteProject = async () => {
        if (deleteId !== null) {
            await dispatch(deleteTreatment(deleteId));
            handleCloseDeleteConfirmModal();
            dispatch(fetchTreatments());
        }
        setNewTreatmentTitle('');
        setNewTreatmentPrice(null);
        setNewTreatmentFile(null);
        setNewFile(null);
        setDeleteConfirmModal(false);
    };
    
    const handleUpdateTreatment = async () => {
        const formData = new FormData();
        formData.append('id', currentTreatmentId);
        formData.append('title', newTreatmentTitle);
        formData.append('price', newTreatmentPrice?.toString() || '');
        
        if (newFile) {
            formData.append('file', newFile);
        } else if (existingImageUrl) {
            formData.append('icon', existingImageUrl);
        }
        dispatch(updateTreatment(formData));
        setNewTreatmentTitle('');
        setNewTreatmentPrice(null);
        setExistingImageUrl('');
        setNewFile(null);
        setShowUpdateModal(false); // Close the update modal
    };
    const handleOpenEditModal = (treatment: Treatment) => {
        setCurrentTreatmentId(treatment.id.toString());
        setNewTreatmentTitle(treatment.title);
        setNewTreatmentPrice(treatment.price);
        setExistingImageUrl(treatment.icon);
        setNewFile(null);
        setShowUpdateModal(true);
    };
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        resetForm();
    };
    const handleUpdateTitleChange = (value: string) => {
        setNewTreatmentTitle(value);
        setUpdateTitleError('');
    };
    const handleUpdatePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewTreatmentPrice(value === '' ? null : parseFloat(value));
    };
    const handleUpdateFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setNewFile(file);
    };

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <SidebarAdmin />
                <div className="table-container" style={{ overflowX: "auto", marginLeft: "30px", width: "70%", padding: "20px" }}>
                    <Header style={{ marginBottom: "20px" }}>
                        <h5 style={{ marginTop: '20px', marginBottom: '20px' }}>All Treatments</h5>
                        <button onClick={handleOpenCreateModal} className="button-add">
                            <span className="button-add-decor"></span>
                            <div className="button-add-content">
                                <div className="button-add__icon">
                                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
                                        <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                                        <mask id="icon-payments-cat_svg__a" fill="#fff">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z"></path>
                                        </mask>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
                                        <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
                                        <path d="M25 15v20m-10-10h20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <defs>
                                            <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#fff" stop-opacity="0.71"></stop>
                                                <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="button-add__text">Create Treatment</span>
                            </div>
                        </button>

                    </Header>
                    <table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatments.map((treatment, index) => (
                                <tr key={treatment.id}>
                                    <td>{index + 1}</td>
                                    <td>{treatment.id}</td>
                                    <td>{treatment.title}</td>
                                    <td>{treatment.price}</td>
                                    <td>
                                        {treatment.hasOwnProperty('icon') && treatment.icon && (
                                            <img src={`${treatment.icon}`} alt="Project Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        )}
                                    </td>
                                    <td style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button onClick={() => handleOpenEditModal(treatment)} className="editBtn">
                                            <svg height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                                ></path>
                                            </svg>
                                        </button>
                                        <button onClick={() => handleOpenDeleteConfirmModal(treatment.id)} className="bin-button">
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
                                        <button onClick={() => handleOpenViewModal(treatment.id)} className="button-view">
                                            <span>
                                                <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
            {/* View Treatment Modal */}
            <Modal open={showViewModal} onClose={handleCloseViewModal}>
                <Modal.Header>
                    <Modal.Title>View Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewTreatment ? (
                        <div>
                            <p style={{ padding: "10px", border: "2px solid #34c3ff", marginBottom: "5px" }}>
                                <strong>ID :</strong> {viewTreatment.id}
                            </p>
                            <p style={{ padding: "10px", border: "2px solid #34c3ff", marginBottom: "5px" }}>
                                <strong>Title :</strong> {viewTreatment.title}
                            </p>
                            <p style={{ padding: "10px", border: "2px solid #34c3ff", marginBottom: "5px" }}>
                                <strong>Price:</strong> {viewTreatment.price}
                            </p>

                            <p style={{ padding: "10px", border: "2px solid #34c3ff", marginBottom: "5px" }}>
                                {viewTreatment.icon && (
                                    <img src={`https://mediplus.runasp.net${viewTreatment.icon}`} alt="Project Image" style={{ maxWidth: '100px', height: 'auto' }} />
                                )}
                            </p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
            </Modal>
            {/* Create Treatment Modal */}
            <Modal open={showCreateModal} onClose={handleCloseCreateModal}>
                <Modal.Header>
                    <Modal.Title>Create Treatment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid>
                        <Form.Group>
                            <Form.ControlLabel>Title</Form.ControlLabel>
                            <Form.Control
                                name="title"
                                value={newTreatmentTitle}
                                onChange={(value) => handleTitleChange(value)}
                                className="input-global"
                            />
                            {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>Price</Form.ControlLabel>
                            <input type="number" name="price" className="input-global" onChange={handlePriceChange} />

                            {priceError && <p style={{ color: 'red' }}>{priceError}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.ControlLabel>File</Form.ControlLabel>
                            <input className="input-global" accept="image/*" type="file" onChange={handleFileChange} />
                            {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCreateTreatment} className="button-add" style={{ marginRight: "10px" }}>
                        <span className="button-add-decor"></span>
                        <div className="button-add-content">
                            <div className="button-add__icon">
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
                                    <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                                    <mask id="icon-payments-cat_svg__a" fill="#fff">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z"></path>
                                    </mask>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
                                    <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
                                    <path d="M25 15v20m-10-10h20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <defs>
                                        <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fff" stop-opacity="0.71"></stop>
                                            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="button-add__text">Create Treatment</span>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
            
            {/* Delete Tretment Confirmation Modal */}
            <Modal open={deleteConfirmModal} onClose={handleCloseDeleteConfirmModal}>
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Treatment?</Modal.Body>
                <Modal.Footer>
                    <button onClick={handleDeleteProject} className="button-add" style={{ marginRight: "10px" }}>
                        <span className="button-add-decor"></span>
                        <div className="button-add-content">
                            <div className="button-add__icon">
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
                                    <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                                    <mask id="icon-payments-cat_svg__a" fill="#fff">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z"></path>
                                    </mask>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
                                    <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
                                    <path d="M25 15v20m-10-10h20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <defs>
                                        <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fff" stop-opacity="0.71"></stop>
                                            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="button-add__text">Confirm</span>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
            {/* Update Project Modal */}
            <Modal open={showUpdateModal} onClose={handleCloseUpdateModal}>
                <Modal.Header>
                    <Modal.Title>Edit Treatment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid>
                        <Form.Group>
                            <Form.ControlLabel>Title</Form.ControlLabel>
                            <Form.Control
                                name="title"
                                value={newTreatmentTitle}
                                onChange={(value) => handleUpdateTitleChange(value)}
                                className="input-global"
                            />
                            {updateTitleError && <p style={{ color: 'red' }}>{updateTitleError}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>Price</Form.ControlLabel>
                            <input
                                type="number"
                                value={newTreatmentPrice ?? ''}
                                onChange={(value) => handleUpdatePriceChange(value)}
                                className="input-global"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>File</Form.ControlLabel>
                            <input className="input-global" type="file" accept="image/*" onChange={handleUpdateFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleUpdateTreatment} className="button-add" style={{ marginRight: "10px" }}>
                        <span className="button-add-decor"></span>
                        <div className="button-add-content">
                            <div className="button-add__icon">
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
                                    <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                                    <mask id="icon-payments-cat_svg__a" fill="#fff">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z"></path>
                                    </mask>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
                                    <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
                                    <path d="M25 15v20m-10-10h20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <defs>
                                        <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fff" stop-opacity="0.71"></stop>
                                            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="button-add__text">Update Treatment</span>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AllTreatments