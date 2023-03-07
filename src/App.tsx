import { Suspense, lazy } from 'react';
const LazyComp = lazy(() => import('./LazyComponent'));

const App = () => {
    return (
        <div className="app">
            <h1>Hello fast refresh with typescript!!!!</h1>
            <Suspense fallback={<h2>loading...</h2>}>
                <LazyComp />
            </Suspense>
        </div>
    );
};

export default App;