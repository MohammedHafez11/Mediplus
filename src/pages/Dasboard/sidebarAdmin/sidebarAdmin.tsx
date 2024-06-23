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
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
    </Sidebar>
  );
};

export default SidebarAdmin;