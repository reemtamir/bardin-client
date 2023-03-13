import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const AdminNavBar = () => {
  const { admin, setIsAdmin } = useAuth();
  console.log('admin nav', admin);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light w-80">
        <div className="container-fluid">
          <img
            style={{ width: '7rem', height: '3.5rem' }}
            src="https://logos.flamingtext.com/City-Logos/Bardin-Water-Logo.png"
            alt="logo"
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav me-auto  ">
              <li
                onClick={() => {
                  setIsAdmin((admin) => !admin);
                }}
                className="nav-item ms-2"
              >
                <Link to={'/'} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto ">
              {!admin && (
                <>
                  <li className="nav-item ms-2">
                    <Link
                      to={'/sign-up-admin'}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Sign Up Admin
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      to={'/sign-in-admin'}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Sign In Admin
                    </Link>
                  </li>
                </>
              )}
              {admin && (
                <li className="nav-item ">
                  <Link
                    to={'/log-out'}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavBar;
