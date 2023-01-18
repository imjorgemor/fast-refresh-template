import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="app">
            <div>
                <h1>Hello fast refresh with typescript!!!!!!</h1>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;