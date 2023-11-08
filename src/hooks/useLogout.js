import { useEffect, useState } from 'react'
import { projectAuth, db } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
        //set status to offline
        const uid = user.uid
        await db.collection('users').doc(uid).update({ online: false })

        // sign the user out
        await signOut(projectAuth)
        
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })

        // update state
        if (!isCancelled) {
            setIsPending(false)
            setError(null)
        } 
        } 
        catch(err) {
        if (!isCancelled) {
            setError(err.message)
            setIsPending(false)
        }
        }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}