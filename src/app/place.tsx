import { useEffect, useState } from "react";

export default function UsersClient(){
    const [users, setUsers]= useState([])
    const [loading,setLoading]= useState(true)
    const [error,setError]= useState("")
    useEffect(
        ()=>{
            async function fetchUser(){
                try{
                    const response=await fetch(
                        ''
                    )
                    if(!response.ok) throw new Error("Failed to fetch users")
                    const data= await response.json()
                    setUsers(data)
                }catch(error){
                    if(error instanceof Error){
                        setError(error.message)
                    }else{
                        setError("An unknown error occured")
                    }
                }finally{
                    setLoading(false)
                }
            }

            fetchUser()
        },[]
    )
}