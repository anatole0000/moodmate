import { Link, useNavigate } from 'react-router-dom';
import API from './api';

const Navbar = ({ user, setUser, darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post('/logout');
    setUser(null);
    navigate('/login');
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">MoodMate</Link>
        <div className="d-flex ms-auto align-items-center">
          <button onClick={toggleDarkMode} className="btn btn-outline-secondary me-3">
            {darkMode ? (
              <i className="bi bi-brightness-high-fill"></i>
            ) : (
              <i className="bi bi-moon-stars-fill"></i>
            )}
          </button>

          {!user ? (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Link>
              <Link className="btn btn-primary" to="/register">
                <i className="bi bi-person-plus"></i> Register
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-success me-2" to="/profile">
                <i className="bi bi-person-circle"></i> Profile
              </Link>
              <Link className="btn btn-outline-info me-2" to="/journal">
                <i className="bi bi-journal-text"></i> Journal
              </Link>
              <Link className="btn btn-outline-warning me-2" to="/dashboard">
                <i className="bi bi-bar-chart-fill"></i> Dashboard
              </Link>
              <Link className="btn btn-outline-secondary me-2" to="/goals">
                <i className="bi bi-check2-square"></i> Goals
              </Link>
              <Link className="btn btn-outline-danger me-2" to="/habits">
                <i className="bi bi-heart-fill"></i> Habits
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
