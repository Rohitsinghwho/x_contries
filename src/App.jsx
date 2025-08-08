import { useEffect, useState } from "react";



const Card=({name,flag,abbr})=>{
  return(
    <div
    className="countryCard"
    >
        <img src={flag} alt={name} style={{width:"70px", height:"70px"}}/>
        <h3 style={{textAlign:"center"}}>{name}</h3>
    </div>
  )
}

const API="https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";


const App = () => {
  const [allContries,setAllCountries]=useState([]);
  const [filteredCountries,setFilteredCountries]=useState([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
      fetch(API)
      .then((res)=>res.json())
      .then((res)=>{
        setAllCountries(res)
        setFilteredCountries(res);
    })
      .catch(err=>console.error("Error fetching data: ",err))
  },[]);

  const handleChange=(e)=>{
   const value=e.target.value;
   setSearch(value)
    setLoading(true);
    try {
      setFilteredCountries(
        allContries.filter(item=>item.common.toLowerCase().includes(value.toLowerCase()))
      )
      
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <input type="text" placeholder="Search for countries" name="search" value={search} onChange={(handleChange)} style={{width:"60%",padding:"10px"}}/>
      </div>
    <div
    style={{
      display:"flex",
      gap:"40px",
      flexWrap:"wrap",
      justifyContent:"center"
    }}
    >
      {loading?(
        <h1>Loading...</h1>
      ):filteredCountries.length===0?(
        <h1>No contries found...</h1>
      ):(
        filteredCountries.map(({common,png})=><Card name={common} flag={png}  key={Math.random()}/>)
      )}
    </div>
    </div>
  )
}

export default App