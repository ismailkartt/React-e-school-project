import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./dashboard-navigation.scss"

const DashboardNavigation = () => {
    const { menu } = useSelector(state => state.auth);

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100">
            {/* İçerik alanı */}
            <div className="content-area text-center">
                <h1 className="display-4 mb-5">Dashboard</h1>
                <div className="menu-links">
                    {menu.map((item, index) => (
                        <div key={index} className="mb-3"> {/* Alt boşluk */}
                            <Link to={item.link} className="nav-link text-primary px-4 py-2 rounded">
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default DashboardNavigation;
