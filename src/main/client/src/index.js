import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./components/Pages/Index";
import store  from "./redux/store";
import { Provider } from "react-redux";
import Fallback from "./components/Pages/Fallback";

const Mission = React.lazy(() => import("./components/Pages/Mission"));
const App = React.lazy(() => import("./components/Pages/App"));
const Terms = React.lazy(() => import("./components/Pages/Terms"));
const Privacy = React.lazy(() => import("./components/Pages/Privacy"));
const Accessibility = React.lazy(() => import("./components/Pages/Accessibility"));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>

                    <Route path="/mission" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Mission/>
                        </React.Suspense>
                    }/>

                    <Route path="/terms" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Terms/>
                        </React.Suspense>
                    }/>

                    <Route path="/privacy" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Privacy/>
                        </React.Suspense>
                    }/>

                    <Route path="/accessibility" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <Accessibility/>
                        </React.Suspense>
                    }/>

                    <Route path="/maps" element={
                        <React.Suspense fallback={<Fallback/>}>
                            <App/>
                        </React.Suspense>
                    }/>

                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
