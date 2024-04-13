import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './select.css'

function DropdownButtons(user) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [userId, setUserId] =  useState(null);

  useEffect(() => {
    if (user.user) {
      setUserId(user.user.uid);
    } else {
      setUserId(null);
    }
  }, [user]);

  const options = [
    { value: 'create-worksheet', label: 'Create Worksheet', link: '/worksheet/edit/new' },
    { value: 'create-course', label: 'Create Course', link: '/course/edit/new' }, // Corrected link based on label
    { value: 'create-question-set', label: 'Create Question Set', link: '/flashcards/edit/new' }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="create-content-select">
      <div onClick={toggleDropdown} className={`top-button ${isOpen ? 'open' : ''}`}>
        <span>Create </span>
        <i className="fas fa-plus"></i>
      </div>
      {isOpen && (
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
          {options.map((option) => (
            userId ? (
              <Link
                to={option.link}
                key={option.value}
                className="link"
              >
                {option.label}
              </Link>
              ) : (
              <Link 
                to="/login"
                key={option.value}
                className="link"
              >
                {option.label}
              </Link>
            )

          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButtons;
