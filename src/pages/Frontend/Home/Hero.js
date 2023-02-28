import { AuthContext } from 'context/AuthContext';
import React, { useState, useContext } from 'react'
import { doc, setDoc, serverTimestamp } from "firebase/firestore/lite";
import { firestore } from 'config/Firebase';


const initialState = {
    title: "",
    location: "",
    description: ""
}
export default function Hero() {
    const { authstate } = useContext(AuthContext)
    const { user } = authstate
    // console.log(user)
    const [state, setstate] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = e => {
        setstate(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true)
        console.log(state)

        let { title, location, description } = state;

        title = title.trim();
        location = location.trim();
        description = description.trim();

        if (title.length < 3) {
            // alert("Title should be at least 4 character!")
            return window.notify("Title should be at least 4 character!", "error")

        }
        if (location.length < 3) {
            // alert("Please Type location Correctly", "error")
            // console.error("Please Type location Correctly")
            return window.notify("Please Type location Correctly", "error")

        }
        if (description.length < 3) {
            // alert("Please Type Description Correctly")
            // console.error("Please Type Description Correctly")
            return window.notify("Please Type Description Correctly", "error")

        }

        let formData = { title, location, description }
        formData.dateCreated = serverTimestamp();
        formData.id = window.getRandomId();
        formData.status = "active"
        formData.createdBy = {
            email: user.email,
            uid: user.uid,
        }
        createDocument(formData)
        setstate("")

    }
    const createDocument = async (formData) => {
        console.log(formData)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData);
            window.notify("Todo is Succefully added", "success")
        } catch (err) {
            window.notify("Error is adding in Todo", "error")
        }
        setIsProcessing(false)
    }

    return (
        <div className="py-5 home d-flex justify-content-center align-items-center ">
            <div className="container">
                <div className="row ">
                    <div className="col">
                        <div className="card p-2 p-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col mb-4">
                                        <div className="todo-title">
                                            <h2 className="text-center">Add Todos</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="title">
                                            <input type="text" className='form-control' name='title' placeholder='Title' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <div className="location">
                                            <input type="text" className='form-control' name='location' placeholder='Location' onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-12 mb-3">
                                        <textarea name="description" className='form-control' rows="5" placeholder='Description' onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-12 mb-3">
                                        <div className="addtodo-btn">
                                            <button className="btn btn-danger w-100" disabled={isProcessing} >
                                                {!isProcessing
                                                    ? "Add Todo"
                                                    : <div className="spinner-border spinner-border-sm "></div>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
