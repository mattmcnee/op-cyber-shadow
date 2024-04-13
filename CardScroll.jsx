import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cardImg from '/src/assets/smooth.png';

const CardScroll = ({ title, data, type, user, nullUser }) => {
  const scrollContainerRef = useRef(null);
  const [isLeftEnd, setIsLeftEnd] = useState(true);
  const [isRightEnd, setIsRightEnd] = useState(false);
  const [currentUser, setCurrentUser] = useState(nullUser);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      // setCurrentUserId(user.uid);
      // setCurrentUsername(user.username);
    } else {
      setCurrentUser(nullUser);
      // navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      setIsLeftEnd(scrollContainer.scrollLeft < 12);
      setIsRightEnd(scrollContainer.scrollLeft + scrollContainer.clientWidth > scrollContainer.scrollWidth - 12);
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.clientWidth;
    scrollContainer.scrollBy({ left: -(containerWidth + 14), behavior: 'smooth' });
  };

  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.clientWidth;
    scrollContainer.scrollBy({ left: (containerWidth + 14), behavior: 'smooth' });
  };

  const parseData = (data) => {
    if (!data) {
      return [];
    }
    return Object.entries(data).map(([key, sheet]) => {
      if (type === "sheet" && sheet.type !== "card" || sheet.type === "sheet"){
        return {
          link: `/worksheet/${key}`,
          title: sheet.title,
          key: key,
          user: sheet.user,
          type: "Worksheet",
          username: sheet.username
        };    
      } else {
        return {
          link: `/flashcards/${key}`,
          title: sheet.title,
          key: key,
          user: sheet.user,
          type: "Flashcards",
          username: sheet.username
        };  
      }
    });
  };

  const cards = useMemo(() => parseData(data), [data]);

  const navigate = useNavigate();
  const editButtonClicked = (e, destination) => {
    e.stopPropagation();
    navigate(destination);
  };

  return (
    <div className="scroll-box">
      <div className={`scroll-button ${isLeftEnd ? 'end' : ''}`} id="scroll-left" onClick={scrollLeft}>
        <div className="scroll-icon">
          <i className="fas fa-chevron-left"></i>
        </div>
      </div>
      <div id="scroll-container" className="scroll-menu" ref={scrollContainerRef}>
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <Link 
              to={card.link}
              className="card-body"
            >
                {/*<div className="card-img" style={{backgroundImage: cardImg}}></div>*/}
                {/*<img src="https://drive.google.com/thumbnail?id=14hz3ySPn-zBd4Tu3NtY1F05LSGdFfWvp&sz=w1000"/>*/}
                <div className="card-title">{card.title}</div>
                <div className="card-type">{card.type}</div>
            </Link>
            {currentUser.uid !== null && card.user === currentUser.uid  && (
              <div className="card-bottom">
                <Link 
                  className="card-user"
                  to={`/profile/${card.user}`}
                >
                  {card.username}
                </Link>
                <Link 
                  to={(card.type === "Worksheet" ? `/worksheet/edit/${card.key}` : `/flashcards/edit/${card.key}`)}
                >
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`scroll-button ${isRightEnd ? 'end' : ''}`} id="scroll-right" onClick={scrollRight}>
        <div className="scroll-icon">
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default CardScroll;
