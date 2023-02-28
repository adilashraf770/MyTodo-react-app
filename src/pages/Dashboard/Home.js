import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='p-5'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Home of Dashboard </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="home-page text-center">
                            <Link to='/home' className='btn btn-success'>Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
