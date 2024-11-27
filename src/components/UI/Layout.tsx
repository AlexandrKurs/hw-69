import {PropsWithChildren} from "react";
import NavBar from '../NavBar/NavBar.tsx';


const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container mt-4">
        {children}
      </main>
    </>
  );
};

export default Layout;