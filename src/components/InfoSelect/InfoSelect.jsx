import React, { useState, useEffect } from 'react';
import './InfoSelect.css'
import Button from 'react-bootstrap/Button';
import PhoneNumber from '../PhoneNumber/PhoneNumber';
import { SwitchTheme } from './../SwitchTheme/SwitchTheme';
import { EmailInput } from './../EmailInput/EmailInput';
import { NameInput } from './../NameInput/NameInput';
import { StaticPixQRCode } from '../QRCode/QRCode';
import { Numbers } from '../Numbers/Numbers';
import { useSelectedNumbers } from '../SelectedNumbersProvider/SelectedNumbersProvider';

import { getApiData, postApiData, deleteApiData } from '../../utils/apis/callApi';
import {DangerToast} from './../DangerToast/DangerToast';
import CpfInput from './../CpfInput/CpfInput';
import { SuccessfullyPixPaid } from './../SuccessfullyPixPaid/SuccessfullyPixPaid';

export function InfoSelect()
{
  const [nameValue, setNameValue] = useState("");
  const [cpfValue, setCpfValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHeader, setErrorHeader] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { selectedNumbers } = useSelectedNumbers();
  
  useEffect(() =>
  {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 5000); // Tempo em milissegundos para ocultar a notificação (5 segundos neste exemplo)
    }

    return () => clearTimeout(timer);
  }, [showToast]);

  const handlePostNumbersInfo = async () => 
  {
    if (!nameValue || !cpfValue || !emailValue || !phoneValue)
    {
      setErrorMessage("Todos os campos devem ser preenchidos.");
      setErrorHeader("Error");
      setShowToast(true);
      return;
    }

    if(selectedNumbers.length === 0)
    {
      setErrorMessage("A lista de números selecionados não pode estar vazia.");
      setErrorHeader("Selecione pelo menos 1 número.");
      setShowToast(true);
      return;
    }

    try
    {
      await postApiData('postInfos', {
        name: nameValue,
        cpf: cpfValue,
        email: emailValue,
        phone: phoneValue,
        numbers: selectedNumbers
      });

      await getNumbersInfo();
    }
    catch(err)
    {
      console.error("Something is wrong in insert to database data.");
      setErrorMessage(err.message || "Erro ao inserir dados no banco de dados.");
      setErrorHeader("Error");
      setShowToast(true);
    }
  }

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [numbers, setNumbers] = useState([]);
  
  const getNumbersInfo = async () =>
  {
    setIsLoading(true);
    if (!nameValue || !emailValue || !phoneValue)
    {
      setErrorMessage("Todos os campos devem ser preenchidos.");
      setErrorHeader("Error");
      setShowToast(true);
      return;
    }

    if(selectedNumbers.length === 0)
    {
      setErrorMessage("A lista de números selecionados não pode estar vazia.");
      setErrorHeader("Selecione pelo menos 1 número.");
      setShowToast(true);
      return;
    }

    try
    {
      const response = await getApiData('getNumbersSelected/', emailValue);
      const { name, cpf, email, phone, numbers } = response;
      setName(name);
      setCpf(cpf);
      setEmail(email);
      setPhone(phone);
      setNumbers(numbers);
      
      setShowModal(true);
    }
    catch (err)
    {
      console.error(err);
      setErrorMessage(err.message || "Erro ao buscar dados no banco de dados.");
      setErrorHeader("Error");
      setShowToast(true);
    }
    setIsLoading(false);
  }

  const handlePhoneChange = (value) =>
  {
    setPhoneValue(value);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleTheme = () => { document.body.dataset.bsTheme = document.body.dataset.bsTheme === "light" ? "dark" : "light"; };
  const handleClose = async () => 
  {
    setIsLoading(true);
    try
    {
        await deleteApiData("deleteInfos/", email);
    }
    catch(err)
    {
        console.error(err);
    }
    setIsLoading(false);
    setShowModal(false);
  }

  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const handlePaymentConfirmation = () =>
  {
    setIsPaymentConfirmed(true);
  };

  return (
    <>
      <section className="infoselect section" id="InfoSelect">
        <div className="container contentInputs">
          <div className='inputs'>
            <NameInput setValue={setNameValue} />
          </div>
          <div className='inputs'>
            <CpfInput value={cpfValue} setValue={setCpfValue} />
          </div>
          <div className='inputs'>
            <EmailInput setValue={setEmailValue} />
          </div>
          <div className='inputs'>
            <PhoneNumber value={phoneValue} setValue={handlePhoneChange} />
          </div>

          <div className="selectButton">
            <Button as="a" variant="primary" id='btnSelect' onClick={handlePostNumbersInfo}>Selecionar</Button>
          </div>
        </div>

        <SwitchTheme onClick={toggleTheme}/>
        {showModal && <StaticPixQRCode showModal={showModal} handleClose={handleClose} name={name} cpf={cpf} email={email} phone={phone} numbers={numbers} isPaymentConfirmed={isPaymentConfirmed} setIsPaymentConfirmed={setIsPaymentConfirmed} handlePaymentConfirmation={handlePaymentConfirmation} />}
      </section>
      
      <Numbers isLoading={isLoading} setIsLoading={setIsLoading} />
      {showToast && <DangerToast header={errorHeader} message={errorMessage} />}
      {
                isPaymentConfirmed ? 
                <SuccessfullyPixPaid email={email} />
                :
                ""
            }
    </>
  );
}
