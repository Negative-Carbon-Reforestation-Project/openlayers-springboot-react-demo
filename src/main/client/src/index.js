import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./components/Pages/Index";
import Mission from "./components/Pages/Mission";
import Terms from "./components/Pages/Terms";
import Privacy from "./components/Pages/Privacy";
import store  from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/mission" element={<Mission/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/privacy" element={<Privacy/>}/>
                    <Route path="/maps" element={<App/>}/>
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
