import { useSelector } from "react-redux";
import Footer from "../../components/footer/footer"
import Header from "../../components/header/Header"
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { fetchProjectById } from '../../redux/projectSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch } from "react-redux";
import { parseISO, isValid, format  } from 'date-fns';

const PortfolioDetails = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { status, error } = useSelector((state: RootState) => state.project); // Assuming your slice is named 'project'

	useEffect(() => {
		dispatch(fetchProjectById(Number(projectId))); // Dispatch fetchProjectById action on component mount
	}, [dispatch, projectId]);

	const project = useSelector((state: RootState) =>
		state.project.projects.find(proj => proj.id === Number(projectId))
	);

	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'failed') return <p>{error}</p>;
	if (!project) return null; // Handle case where project is null or undefined

	const formatDate = (isoDateString:any) => {
		if (!isoDateString || !isValid(parseISO(isoDateString))) {
		  return ''; // Return empty string if isoDateString is empty or invalid
		}
		const dateObj = parseISO(isoDateString);
		return format(dateObj, 'yyyy-MM-dd'); // Format date as desired
	  };
	return (
		<>
			<Header />
			<div className="breadcrumbs overlay">
				<div className="container">
					<div className="bread-inner">
						<div className="row">
							<div className="col-12">
								<h2>Projects Details</h2>
								<ul className="bread-list">
									<li><a href="index.html">Home</a></li>
									<li><i className="icofont-simple-right"></i></li>
									<li className="active">Projects Details</li>
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
										<img src={`https://mediplus.runasp.net${project.imageUrl}`} style={{width: "100", backgroundSize: "cover"}} alt="#" />
									</div>
								</div>
								<div className="date">
									<ul>
										<li><span>Date :</span> {formatDate(project.date)}</li>
									</ul>
								</div>
								<div className="body-text">
									<h3>{project.title}</h3>
									<p>{project.content}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>

	)
}

export default PortfolioDetails