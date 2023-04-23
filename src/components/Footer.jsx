const Footer = () => {
  return (
    <>
      <div style={{ marginTop: ' 2rem' }} className="footer">
        <a href="https://www.linkedin.com/" target="_blank">
          <img
            className="img"
            src="\images\linkedin-logo.png"
            alt="linkedin-logo"
          />
        </a>
        <a href="https://github.com/reemtamir" target="_blank">
          <img
            className="img"
            src="\images\github-sign.png"
            alt="github-logo"
          />
        </a>
      </div>
      <p className="copyright">
        <span>&copy;</span> {new Date().getFullYear()} Re'em Tamir
      </p>
    </>
  );
};

export default Footer;
