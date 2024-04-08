import React from 'react';
import './CpfInput.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { cpfAutoFormat } from '../../utils/index.ts';

function CpfInput({ value, setValue })
{
  const onChange = (e) =>
  {
    const targetValue = cpfAutoFormat(e.target.value);
    setValue(targetValue);
  };
  
  return (
    <InputGroup>
        <InputGroup.Text id="basic-addon1">
          <span className='unselect'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet" viewBox="0 0 16 16">
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1"/>
            </svg>
          </span>
        </InputGroup.Text>
        <Form.Control
            type="text"
            placeholder="CPF: xxx.xxx.xxx-xx"
            aria-label="CpfInput"
            aria-describedby="basic-addon1"
            value={value}
            onChange={onChange}
            maxLength={14}
            required
        />
    </InputGroup>
  );
}

export default CpfInput;