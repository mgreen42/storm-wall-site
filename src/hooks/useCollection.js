import { useEffect, useState, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from 'firebase/firestore'

export const useCollection = (c, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, c)

    const unsubscribe = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
    })
      
    // update state
    setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

     // unsubscribe on unmount
     return () => unsubscribe()

//     if (query) {
//       ref = ref.where(...query)
//     }
//     if (orderBy) {
//       ref = ref.orderBy(...orderBy)
//     }

   }, [c, query, orderBy])

  return { documents, error }
}