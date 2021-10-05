import React, { useState, useEffect } from "react";
import './App.css';
import NewForm from './components/NewForm.js'

function App() {
  const [plants, setPlants] = useState([]);

  const getPlants = async () => {
    try {
      const plants = await fetch("http://localhost:9000/plants/");
      const parsedPlants = await plants.json();
      setPlants(parsedPlants);
    } catch (err) {
      console.log(err);
    }
  };

  //new plant creation function
  const newPlant = async (data) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const createdPlant = await fetch(
        "http://localhost:9000/plants/",
        config
      );
      const parsedPlant = await createdPlant.json();
      setPlants([...plants, parsedPlant]);
      console.log(parsedPlant);
    } catch (err) {
      console.log(err);
    }
  };

  //delete plant destroy function
  const deletePlant = async (id) =>{
    try{
      const deletedPlant = await fetch("http://localhost:9000/plants/" + id, {
        method: 'DELETE'
      })
      const parsedPlant = await deletedPlant.json()
      const updatedPlants = plants.filter(plant => plant._id !== parsedPlant._id)
      setPlants(updatedPlants)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => getPlants(), []);

  return (
    <div className="App">
      <h1>Holidays! Celebrate!</h1>
      <NewForm addPlant={newPlant}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>species</th>
            <th>age</th>
            <th>description</th>
            <th>image</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          {plants &&
            plants.map((plant) => (
              <tr>
                <td>{plant._id}</td>
                <td>{plant.name}</td>
                <td>{plant.species}</td>
                <td>{plant.age}</td>
                <td>{plant.description}</td>
                <td>{plant.image}</td>
                <td>
                  <ul>
                    {plant.tags && plant.tags.map((tag) => <li>{tag}</li>)}
                  </ul>
                </td>
                <td onClick={() => deletePlant(plant._id)}>X</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
