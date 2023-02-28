import { AuthContext } from 'context/AuthContext';
import React, { useState, useContext, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { doc, deleteDoc, collection, getDocs, setDoc, serverTimestamp, query, where } from "firebase/firestore/lite";
import { firestore } from 'config/Firebase';



// const initialState = {
//     title: "",
//     location: "",
//     description: ""
// }
export default function Todos() {
    const { authstate } = useContext(AuthContext)
    const { user } = authstate
    // console.log(user)

    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [todo, setTodo] = useState({});
    const [isProcessingDelete, setIsProcessingDelete] = useState(false);
    // const [state, setstate] = useState(initialState);

    const handleChange = e => {
        setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const fetchDocument = async () => {
        setIsLoading(true)
        let array = [];

        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));


        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            // const id = doc.id;
            // console.log(doc)
            // doc.data() is never undefined for query doc snapshots
            // console.log(id, " => ", data);
            array.push(data)
        });
        setDocuments(array)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchDocument();
    }, [])

    const handleDelete = async (todo) => {
        setIsProcessingDelete(true)
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));

            window.notify("Successfully Deleted Todos", "success")
            let newDocument = documents.filter((doc) => {
                return doc.id !== todo.id
            })
            setDocuments(newDocument)

        }
        catch (error) {
            window.notify("Something went wrong", "error")
        }

        setIsProcessingDelete(false)
    }

    const handleUpdate = async () => {
        // console.log(todo)
        let formData = { ...todo }
        formData.dateCreated = formData.dateCreated;
        formData.dateModified = serverTimestamp()
        formData.ModifiedBy = {
            email: user.email,
            uid: user.uid
        }

        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            window.notify("Todo is Succefully Updated", "success")

            let newDocument = documents.map((doc) => {
                if (doc.id === todo.id)
                    return todo
                return doc
            })
            setDocuments(newDocument)
            // setDocuments(docs => ([...docs, formData]))
            console.log(formData)
        } catch (err) {
            console.error(err)
            window.notify("Error Updateing Todo", "error")
        }
    }
    return (
        <>
            <div className="py-5 home d-flex justify-content-center align-items-center todo">
                <div className="container">
                    <div className="row">
                        <div className="col mb-2">
                            <div className="todo-title">
                                <h2 className="text-center">Show Todos</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col">
                            <div className="card p-2 p-md-4">
                                {
                                    !isLoading ?
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th>S.No</Th>
                                                    <Th>Title</Th>
                                                    <Th>Location</Th>
                                                    <Th>Description</Th>
                                                    <Th>Status</Th>
                                                    <Th>Action</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {documents.map((todo, index) => {
                                                    return <Tr key={index}>
                                                        <Td>{index + 1}</Td>
                                                        <Td>{todo.title}</Td>
                                                        <Td>{todo.location}</Td>
                                                        <Td>{todo.description}</Td>
                                                        <Td>{todo.status}</Td>
                                                        <Td>
                                                            <button className="btn btn-success btn-sm m-1" data-bs-toggle="modal" data-bs-target="#edit" onClick={() => { setTodo(todo) }}>
                                                                Edit
                                                            </button>


                                                            <button className="btn btn-danger btn-sm" onClick={() => { handleDelete(todo) }} disabled={isProcessingDelete}>
                                                                {!isProcessingDelete ? "Delete" : <div className="text-center "> <div className="spinner-border spinner-border-sm "></div> </div>}
                                                            </button>
                                                        </Td>
                                                    </Tr>
                                                })}
                                            </Tbody>
                                        </Table>
                                        : <div className="text-center "><div className="spinner-grow "></div></div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Modal  */}
            <div className="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* <div className="row">
                                <div className="col mb-4">
                                    <div className="todo-title">
                                        <h2 className="text-center">Add Todos</h2>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <div className="title">
                                        <input type="text" className='form-control' name='title' value={todo.title} placeholder='Title' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <div className="location">
                                        <input type="text" className='form-control' name='location' value={todo.location} placeholder='Location' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12 col-md-12 ">
                                    <textarea name="description" value={todo.description} className='form-control' rows="5" placeholder='Description' onChange={handleChange}></textarea>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12  ">
                                    <select name="status" value={todo.status} className="form-control" onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
