import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./user-menu.scss";
import { removeFromLocalStorage } from "../../helpers/functions/encrypted-store";
import { swalConfirm } from "../../helpers/functions/swal";
import {logout} from "../../store/slices/auth-slice"

const UserMenu = () => {
    const { isUserLogin, user, menu } = useSelector((state) => state.auth);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleClose = () => setShowMenu(false);
    const handleOpen = () => setShowMenu(true);
  
    const handleMenuClick = (link) => {
      navigate(link);
      handleClose();
    };
  
    const handleLogout = async () => {
        const resp = await swalConfirm("Are you sure logout?",""); 
        if(!resp.isConfirmed) return;
  
        dispatch(logout());
        removeFromLocalStorage("token");
        setShowMenu(false);
        navigate("/");
     }
  

    return (
      <>
        <div className="user-menu">
          {isUserLogin && (
            <>
              <Button variant="primary" size="sm" onClick={handleOpen}>
                {user ? user.name : "Menu"}
              </Button>
  
              <Offcanvas show={showMenu} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="flex-column">
                    <Nav.Link onClick={() => handleMenuClick("/dashboard")}>
                      Dashboard
                    </Nav.Link>
                    {menu.map((item) => (
                      <Nav.Link
                        key={item.title}
                        onClick={() => handleMenuClick(item.link)}
                      >
                        {item.title}
                      </Nav.Link>
                    ))}
                     <Nav.Link onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          )}
        </div>
      </>
    );
  };

  export default UserMenu;