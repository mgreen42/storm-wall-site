import Avatar from '../../components/Avatar'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ProjectSummary({ project }) {
    const { user } = useAuthContext()
    const [newUpdate, setNewUpdate] = useState()
    const navigate = useNavigate()

    // delete document 
    const handleClick = (e) => {
        deleteDoc(doc(db, 'projects', project.id))
        navigate('/')
    }

    return (
        <div>
            <div className='project-summary'>
                <h2 className='page-title'>{project.name}</h2>
                <p>By {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>The project is assigned to:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map((user) => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div> 
                    ))}
                </div>
            </div>
            {/* <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Add new comment:</span>
                <textarea
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
            </label>
            <button className="btn">Add Comment</button>
        </form> */}
            {project.createdBy.id === user.uid &&(
                <button className='btn' onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    )
}
