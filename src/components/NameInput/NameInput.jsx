import React from 'react';
import './NameInput.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export function NameInput({ setValue })
{
    return (
      <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <span className='unselect'>@</span>
          </InputGroup.Text>
          <Form.Control
              type="text"
              placeholder="Digite seu nome aqui."
              aria-label="NameInput"
              aria-describedby="basic-addon1"
              maxLength={255}
              required
              onChange={(e) => setValue(e.target.value)}
          />
      </InputGroup>
    );
}