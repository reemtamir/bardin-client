import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const { user } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light w-80">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand">
            <img
              style={{ width: '7rem', height: '3.5rem' }}
              src="https://logos.flamingtext.com/City-Logos/Bardin-Water-Logo.png"
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
              {user && (
                <li className="nav-item ">
                  <Link
                    to={`/chat-room/${user._id}`}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Main room
                  </Link>
                </li>
              )}
              {user?.favorites.length ? (
                <li className="nav-item ">
                  <Link
                    to={`/favorites`}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Favorites
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav ms-auto ">
              {!user && (
                <li className="nav-item ">
                  <Link
                    to={'sign-in'}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Sign In
                  </Link>
                </li>
              )}

              {user && (
                <li className="nav-item ">
                  <Link
                    to={'log-out'}
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
export default NavBar;
