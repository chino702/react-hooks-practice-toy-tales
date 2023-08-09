import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
//import ToyCard from "./ToyCard";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetchToys();
  }, []);

  async function fetchToys() {
    try {
      const response = await fetch("http://localhost:3001/toys");
      const data = await response.json();
      setToys(data);
    } catch (error) {
      console.error("Error fetching toys:", error);
    }
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  function handleUpdateLikes(toyId, newLikes) {
    setToys((prevToys) =>
      prevToys.map((toy) =>
        toy.id === toyId ? { ...toy, likes: newLikes } : toy
      )
    );
  }

  function handleDeleteToy(toyId) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== toyId));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateLikes={handleUpdateLikes}
      />
    </>
  );
}

export default App;