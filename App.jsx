import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import OpenAI from 'openai';

// missing content

const App = ({ onTitleString }) => {
  const nullUser = {"username": null, "uid": null, "email": null, "uom": null, "pro": null}
  const [currentUser, setCurrentUser] = useState(nullUser);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, `/users/${user.uid}`);
        get(userRef)
          .then((snapshot) => {

            // missing content

          });
      } else {
        setCurrentUser(nullUser);
      }
    });

    return () => unsubscribe();
  }, []);

  
  // missing content


  const updateTitleString = (data) => {
    onTitleString(data);
  };

  return (
    <>
    <Router>
      <Routes>

        {/* missing content */}

      </Routes>
    </Router>
    </>
  );
};

export default App
