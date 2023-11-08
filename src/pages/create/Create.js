import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { db, timestamp } from '../../firebase/config'
import { collection, setDoc } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

// styles
import './Create.css'

// category array
const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
    const navigate = useNavigate()
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    // updates potential user assignment from Firestore
    useEffect(() => {
        if(documents) {
            const options = documents.map(user => {
                return {value: user, label: user.displayName}
            })
            setUsers(options)
        }
    }, [documents])

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        // error: no category selected
        if(!category) {
            setFormError('Please select a project category')
            return
        }
        // error: no assigned users
        if(assignedUsers.length < 1) {
            setFormError('Please assign the project to at least one user')
            return
        }

        // create user object for Project
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        // get assigned users info
        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await setDoc(collection(db, 'projects'), project)
            navigate('/')
    } // end handle submission

    // return Create page
    return (
        <div className="create-form">
        <h2 className="page-title">Create a New Project</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Project name</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value = {name}
                />
            </label>
            <label>
                <span>Project details</span>
                <textarea
                    required
                    type="text"
                    onChange={(e) => setDetails(e.target.value)}
                    value = {details}
                />
            </label>
            <label>
                <span>Set due date:</span>
                <input
                    required
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value = {dueDate}
                />
            </label>
            <label>Project category:</label>
            <Select 
                onChange={(option) => setCategory(option)}
                options={categories}
            />
            <label>Assign to:</label>
            <Select 
                onChange={(option) => setAssignedUsers(option)}
                options={users}
                isMulti
            />
            <button className="btn form-btn">Submit</button>
            {formError && <p className="error">{formError}</p>}
        </form>
        </div>
    ) // end Create page
}
