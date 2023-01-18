import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Page1 from './views/Page1';
import Page2 from "./views/Page2";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root />}>
            <Route index element={<Page1 />} />
            <Route path="/page2" element={<Page2/>} />
        </Route>
    )
);

const App = () =>  <RouterProvider router={router} />;
       
 
export default App;