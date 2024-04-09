import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './EventFinishRifa.css';
import { RouletteRandomNumber } from './../RouletteRandomNumber/RouletteRandomNumber';

export function EventFinishRifa()
{
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleComponent, setIsVisibleComponent] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  const toggleVisibility = () =>
  {
    setIsVisible(!isVisible);
  }

  const calculateTimeRemaining = () =>
  {
      const eventDate = new Date("2024-05-01T20:00:00");
      const now = new Date();

      const difference = eventDate - now;
      if (difference <= 0)
      {
        document.body.style.overflow = "hidden";
        setIsVisibleComponent(true);
      }
      else
      {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}D ${hours}H ${minutes}m ${seconds}s`);
      }
  }

  useEffect(() =>
  {
    calculateTimeRemaining();
    const timer = setInterval(() =>
    {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className={`event-finish-rifa ${isVisible ? 'visible' : 'hidden'}`} id="EventFinishRifa">
          <div className='h-100 w-100 d-flex justify-content-center align-items-center flex-column' id='timerElement'>
            <h5>O sorteio irá acontecer em:</h5>
            <div className='timerEvent unselect'>
                {timeRemaining}
            </div>
          </div>
          <div className='div-event-btn' style={{ float: "right", marginRight: "10em" }}>
              <Button as="a" variant="primary" className='btnOpenEventComponent' id='btnEvent' onClick={toggleVisibility}>
                {
                  isVisible ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                    </svg>
                }
              </Button>
          </div>
      </section>

      {isVisibleComponent && <RouletteRandomNumber />}
    </>
  );
}
