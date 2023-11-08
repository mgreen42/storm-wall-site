import { useEffect } from "react"
import { db } from "../firebase/config"
import { useState } from "react"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //realtime data for document
    useEffect(() => {
        const ref = db.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            } else {
                setError('no such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { error, document }
}