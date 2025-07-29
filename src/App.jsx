import { useEffect, useState } from "react";



const Card=({name,flag,abbr})=>{
  return(
    <div
    style={{
      border:"1px solid black",
      borderRadius:"4px",
      height:"200px",
      width:"200px",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      gap:"20px"
    }}
    >
        <img src={flag} alt={abbr} style={{width:"70px", height:"70px"}}/>
        <h3 style={{textAlign:"center"}}>{name}</h3>
    </div>
  )
}

const API=" https://xcountries-backend.azurewebsites.net/all";


const App = () => {
  const temp=[1,2,3,4,5,6,7,8,9]
  const [data,setData]=useState([])
  useEffect(()=>{
      fetch(API)
      .then((res)=>res.json())
      .then((res)=>setData(res))
      .catch(err=>console.error("Error fetching data: ",err))
  },[])
  return (
    <div
    style={{
      display:"flex",
      gap:"40px",
      flexWrap:"wrap",
      justifyContent:"center"
    }}
    >
      {data.map(({name,flag,abbr})=><Card name={name} flag={flag} abbr={abbr} key={Math.random()}/>)}
    </div>
  )
}

export default App