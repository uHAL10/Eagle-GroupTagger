import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Tagging from './pages/Tagging.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tags/:groupId" element={<Tagging />} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
