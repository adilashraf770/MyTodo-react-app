import React from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import Home from './Home'
import About from './About'
// Componants
import Header from './componants/Header'
import Footer from './componants/Footer'
import Todos from './Todos'
export default function index() {
    return (
        <>
            <Header />
            <main>
                <Routes >
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='home' element={<Home />} />
                        <Route path='todos' element={<Todos />} />
                        <Route path='about' element={<About />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}
