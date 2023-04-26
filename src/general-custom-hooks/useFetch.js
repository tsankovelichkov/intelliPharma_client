import { useEffect, useState } from "react"

export function useFetch(url){
    let [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)

   useEffect(()=>{
    (
        async function(){
            try{
                const response = await fetch(url)
                setData(await response.json())
            }catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        }
    )()
   },[url])

   return { data, error, loading }

}