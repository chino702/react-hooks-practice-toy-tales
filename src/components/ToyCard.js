import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateLikes }) {
  const handleLikeClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: toy.likes + 1 }),
      });

      if (response.ok) {
        const updatedToy = await response.json();
        onUpdateLikes(updatedToy.id, updatedToy.likes);
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDonateClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/toys/${toy.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDeleteToy(toy.id);
      } else {
        console.error("Failed to delete toy");
      }
    } catch (error) {
      console.error("Error deleting toy:", error);
    }
  };

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonateClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;