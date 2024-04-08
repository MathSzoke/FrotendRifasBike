import React, {useState} from 'react';
import './FilterNumbersInput.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export function FilterNumbersInput({ onFilterChange })
{
    // Estado para armazenar o valor do filtro
    const [filterValue, setFilterValue] = useState('');

    // Função para lidar com a mudança no campo de filtro
    const handleFilterChange = (event) =>
    {
      const value = event.target.value;
      setFilterValue(value);
      onFilterChange(value); 
    };
    
    return (
      <InputGroup>
          <InputGroup.Text id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
              </svg>
          </InputGroup.Text>
          <Form.Control
              placeholder="Filtrar números"
              aria-label="FilterNumbers"
              aria-describedby="basic-addon1"
              value={filterValue}
              onChange={handleFilterChange}
          />
      </InputGroup>
    );
}