import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand">
            <img
              style={{ width: '7rem', height: '3.5rem' }}
              src="https://logos.flamingtext.com/City-Logos/Bardin-Logo.png"
              alt="logo"
            />
          </Link>
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
              <li className="nav-item ms-2">
                <Link to={'/'} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item ">
                <Link
                  to={'sign-in'}
                  className="nav-link active"
                  aria-current="page"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
