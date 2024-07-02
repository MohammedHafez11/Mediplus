import React from 'react';
import { Sidebar, Sidenav, Navbar, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import logo from '/public/images/logo.png';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GridIcon from '@rsuite/icons/Grid';

type NavToggleProps = {
  expand: boolean;
  onChange: () => void;
};

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const SidebarAdmin: React.FC = () => {
  const [expand, setExpand] = React.useState(true);
  return (
    <Sidebar
      style={{ display: 'flex', flexDirection: 'column' }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        <div style={headerStyles}>
          <img src={logo} alt="" />
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle" style={{ marginTop: '30px' }}>
        <Sidenav.Body>
          <Nav>
            <Nav.Menu
              eventKey="1"
              trigger="hover"
              title="Departments"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="1-1">
                <Link to="/AllDepartments">All Departments</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="2"
              trigger="hover"
              title="Projects"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="2-2">
                <Link to="/AllProjects">All Projects</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="3"
              trigger="hover"
              title="Sliders"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="3-3">
                <Link to="/AllSliders">All Sliders</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="4"
              trigger="hover"
              title="Treatments"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="4-4">
                <Link to="/AllTreatments">All Treatments</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="5"
              trigger="hover"
              title="Categories"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="5-5">
                <Link to="/AllCategories">All Categories</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="6"
              trigger="hover"
              title="Doctors"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="6-6">
                <Link to="/AllDoctors">All Doctors</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="7"
              trigger="hover"
              title="Reservation"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="7-7">
                <Link to="/AllReservation">All Reservation</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav>
            <Nav.Menu
              eventKey="8"
              trigger="hover"
              title="Blogs"
              icon={<GridIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="8-8">
                <Link to="/AllBlogs">All Blogs</Link>
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
    </Sidebar>
  );
};

export default SidebarAdmin;