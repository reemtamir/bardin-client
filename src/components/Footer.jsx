import { useAuth } from '../hooks/useAuth';

const Footer = () => {
  const { isDark } = useAuth();
  return (
    <>
      <div style={{ marginTop: ' 2rem' }} className="footer">
        <a href="https://www.linkedin.com/" target="_blank">
          {isDark ? (
            <img
              className="img"
              src="\images\linkdin-dark.jpg"
              alt="linkedin-logo"
            />
          ) : (
            <img
              className="img"
              src="\images\linkedin-white.png"
              alt="linkedin-logo"
            />
          )}
        </a>
        <a href="https://github.com/reemtamir" target="_blank">
          {isDark ? (
            <img
              className="img"
              src="\images\github-dark.png"
              alt="github-logo"
            />
          ) : (
            <img
              className="img"
              src="\images\github-white.png"
              alt="github-logo"
            />
          )}
        </a>
      </div>
      <p className="copyright">
        <span>&copy;</span> {new Date().getFullYear()} Re'em Tamir
      </p>
    </>
  );
};

export default Footer;
