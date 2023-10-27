import AddIcon from '@mui/icons-material/Add';
import { useState } from "react"
import { NavLink as RRNavLink} from "react-router-dom";
import { Button, Collapse, Nav, NavLink, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { logout } from "../../managers/authManager";
import Canvas from '../menu/Canvas';
import "./navBar.css";
import ProfileButton from './ProfileButton';
import DropdownMenu from './dropdown/DropdownMenu';

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar className='navbar' fixed="true" expand="lg">
                <NavbarBrand style={{color: "white" }} className="mr-auto" tag={RRNavLink} to="/">
                    Indielot
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className='navbar-nav' navbar>
                                <NavItem className='navItem' onClick={() => setOpen(false)}>
                                    <Canvas menu={menu} setMenu={setMenu}/>
                                </NavItem>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink style={{color: "white" }} tag={RRNavLink} to="productions">
                                        Productions
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink style={{color: "white" }} tag={RRNavLink} to={`${loggedInUser.userName}/productions`}>
                                        My Productions
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <div>
                            <NavItem className='navItem' onClick={() => setOpen(false)}>
                                <NavLink onClick={() => setOpen(false)} tag={RRNavLink} to="productions/new">
                                    <a href='#' className='icon-button'>
                                        <AddIcon className='navbar-icon' fontSize='medium'/>
                                    </a>
                                </NavLink>
                            </NavItem>
                        </div>
                        <div>
                            <ProfileButton loggedInUser={loggedInUser}/>
                        </div>
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                                logout().then(() => {
                                    setLoggedInUser(null);
                                    setOpen(false);
                                })
                            }}>
                                Logout
                            </Button>
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    )
}