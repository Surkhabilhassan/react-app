
import {Data} from "./EmpoyeData"
import { useState, useEffect } from "react"



function App() {
  const [data, setData ] = useState([""])
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")
  const [age, setAge] = useState(0)

  const [id, setid] = useState(0)
   
  const [update, setUpdate] = useState(false)
  console.log(update);

  useEffect(() =>{
    setData(Data)
    console.log(Data)
  },[]);

  const handleEdit =(id) => {
    alert(id);
    setUpdate(true)
    const dt = data.filter(intem => intem.id === id);
    if(dt!== undefined) {
      setUpdate(true);
      setid(id)
      setFirstname(dt[0].firstName);
      setLastname(dt[0].lastName);
      setAge(dt[0].age)
    }
  }

  const handleDelete =(id) => {
    alert(id);
    if(id > 0) {
      if(window.confirm("are you sure to delete this record?")) {
        const dt = data.filter(intem =>  intem.id !== id);
        setData(dt);
      }
    }
  }
   
  const handleSave =(e) => {
    let error='';
    if(firstName === '')
      error += 'first name is requierd'
    if(lastName === '')
      error += 'last name is requierd'
    if(age <=  0)
      error +='age is requierd'
    if(error === '') {
      alert("Record save");
      e.preventDefault();

      const dt =[...data];

      const newObject = {
        id:data.length+1,
        firstName:firstName,
        lastName:lastName,
        age:age
        
      }
    
      dt.push(newObject)
      setData(dt)
    }
    else{
      alert(`Error:${error}`);
    }
  }
   

  const handleClear =() => {
    alert("Record clear");
    setAge(0)
    setFirstname("");
    setLastname("");
    setAge('')
    setUpdate(false)
  }

   const handleUpdate = () => {
    const index = data.map((intem) => {
      return intem.id
    }).indexOf(id);
    const dt =[...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear()
   }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: "center", marginTop: "15px", marginBottom: "20px" }}>
    <div>
<label>First Name
    <input  type="text" placeholder='Enter your first name' onChange={(e) => setFirstname(e.target.value)} value={firstName}/>
  
 </label>
  </div>

  <div>
  <label>Lasr Name
    <input  type="text"  placeholder='Enter your last name' onChange={(e) => setLastname(e.target.value)} value={lastName} />
  
  </label>
    </div>

    <div>

   <label>Age
    <input  type="text" placeholder='Enter your Age' onChange={(e) => setAge(e.target.value)} value={age}/>
  
  
   </label>
   </div>

   <div>
    {
      !update ?
      <button className=" btn btn-primary" onClick={(e) => handleSave(e)} >Save</button> :
      <button className="btn btn-primary"  onClick={() => handleUpdate()}>update</button>
    }
      <button className="btn btn-danger" onClick={() => handleClear()}>clear</button>
   </div>

</div>
    <table className="table">
    <thead>
          <tr>
            <td>sr.no</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          
          {
            data.map((item, index) => {
              return (
                <tr key={index +1 }>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit </button> &nbsp;
                    <button className="btn btn-danger " onClick={() => handleDelete(item.id)}>Delete</button>

                  </td>

                </tr>
              )

            })
          }
        </tbody>


    </table>
</div>



    


  )
}

export default App
