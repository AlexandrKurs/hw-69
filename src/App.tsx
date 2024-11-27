import {Route, Routes} from "react-router-dom";
import Layout from './components/UI/Layout.tsx';
import Videos from './containers/Videos.tsx';



const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={    <Videos/>} />
                    <Route path="/shows/:id" element={    <Videos/>} />
                </Routes>
            </Layout>
        </>
    )
};

export default App