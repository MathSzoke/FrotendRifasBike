import React from 'react';
import './Navbar.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { InfoRifaBtn } from './../InfoRifaBtn/InfoRifaBtn';
import { useSelectedNumbers } from '../SelectedNumbersProvider/SelectedNumbersProvider';

export function Navbar()
{
  const { selectedNumbers, handleClick } = useSelectedNumbers();

  return (
    <div id="wrapper" className="toggled-2">
      <div id="sidebar-wrapper" className='d-flex align-items-center flex-column justify-content-center' style={{paddingTop: "5%"}}>
        <div className="position-fixed infoRifa">
            <InfoRifaBtn />
        </div>
        <div className='justify-content-center d-flex align-items-center h-50 contentNumbersSelected'>
          <div className='h-100'>
            {
              selectedNumbers === undefined || [] ? "" : 
              <p>Números selecionados</p>
            }
            <div className='listNumbers'>
              {selectedNumbers.map(x => (
                <ButtonToolbar key={x} className="mb-3" aria-label="Toolbar with Button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button variant="secondary" className='unselect' onClick={() => handleClick(x)}>{x}</Button>{' '}
                    </ButtonGroup>
                </ButtonToolbar>   
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}