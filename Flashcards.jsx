import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import Nav from '/src/Nav';
import './worksheet.css';
import FlipCard from './FlipCard';

const Flashcards = ({ setTitle, user, database, nullUser }) => {
  const [worksheetData, setWorksheetData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flipRotation, setFlipRotation] = useState(0); // State to track if the card is flipped
  let { id } = useParams();

  useEffect(() => {
    setTitle("Game Worksheet");
    
    const worksheetRef = ref(database, `/cards/${id}`);

    get(worksheetRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const firebaseData = snapshot.val();
          setWorksheetData(firebaseData.data);
          setTitle(firebaseData.title ? firebaseData.title : "Worksheet");
        } else {
          console.log('No data available');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error getting data:', error);
        setLoading(false);
      });
  }, [setTitle, database, id]);

  const handleFlip = (direction) => {
    var rot = direction === 'prev' ? 30 : -30;
    setFlipRotation(rot); // Immediately set isFlipped to true to start the flip animation

    // Use setTimeout to set isFlipped back to false after 0.2 seconds (200 milliseconds)
    setTimeout(() => {
      setFlipRotation(0);
    }, 100); // 0.2 seconds = 200 milliseconds

    // Adjust currentCardIndex based on the direction ('prev' or 'next')
    setCurrentCardIndex(prevIndex => 
      direction === 'prev' ? Math.max(prevIndex - 1, 0) : Math.min(prevIndex + 1, worksheetData.length - 1)
    );
  };


  if (loading) {
    return (
      <div className="home-page">
        <Nav title={"New Worksheet"} user={user} nullUser={nullUser}/>
        <div className="worksheet-container">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-page">
      <Nav title={"Flashcards"} user={user} nullUser={nullUser}/>
      <div className="worksheet-container">
        {worksheetData.length > 0 && (
          <div>
            <FlipCard 
              flipRotation={flipRotation}
              frontText={worksheetData[currentCardIndex].question || worksheetData[currentCardIndex].term} 
              backText={worksheetData[currentCardIndex].answer || worksheetData[currentCardIndex].description}
            />
            <div className="card-navigation">
              <button onClick={() => handleFlip('prev')} disabled={currentCardIndex === 0}>Prev</button>
              <button onClick={() => handleFlip('next')} disabled={currentCardIndex === worksheetData.length - 1}>Next</button>
            </div>
          </div>
        )}
      <button>Play as game</button>
      </div>
    </div>
  );
}

export default Flashcards;
