import NavBar from './NavBar';
const Layout = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
