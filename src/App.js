import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'



 function App(props) {
  const [display, setDisplay] = useState([])
  // console.log(display)

  useEffect(() => {
    setDisplay(props.user)
    return () => {
      console.log("clean up")
    }
  }, [props.user])

  // console.log(props.user)
  let dataTable=props.user

  let handleChangeFunction = (e) => {
    let value = e.target.value
    if (value === "progress") {

      setDisplay(dataTable.filter((element) => { return element.status === "In Progress" }))
    } else if (value === "completed") {
      setDisplay(dataTable.filter((element) => { return element.status === "Completed" }))
    } else if(value==="all_status"){ setDisplay(dataTable) }
  }
  return (
    
    <div className="App container text-center" >

   
      <h1 className="m-3"> Kaaylabs  </h1>

      <div>
        <table className="table table-striped border border-secondary">
          <thead>
            <tr>
              <th scope="col">Project ID</th>
              <th scope="col">Project Code</th>
              <th scope="col">description</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">
                <select onChange={handleChangeFunction} className="form-select" aria-label="Default select example">
                  <option  value="all_status">All Status</option>
                  <option value="progress">Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {display.map((element, index) => {
              return <tr key={index}>
                <td >{element.project_id}</td>
                <td>{element.project_code}</td>
                <td>{element.description}</td>
                <td>{element.start_date}</td>
                <td>{element.end_date}</td>
                <td>{element.status}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      {/* </Provider> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
  numOfCake:state.numOfCake,
  loading:state.loading,
  user:state.users,
  error:state.error
  } 
}

const mapDispatchToProps =(dispatch)=> {
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

