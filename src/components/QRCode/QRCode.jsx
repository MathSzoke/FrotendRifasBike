import React, { useState, useEffect } from 'react';
import './QRCode.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postApiQrCodeData } from '../../utils/apis/qrCodeGeneratorAPI';
import { regexInputs } from '../../utils/index.ts';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner.jsx';
import { Tooltip } from 'react-tooltip';
import { SuccessfullyPixPaid } from '../SuccessfullyPixPaid/SuccessfullyPixPaid.jsx';

export function StaticPixQRCode({ showModal, handleClose, name, cpf, email, phone, numbers, isPaymentConfirmed, handlePaymentConfirmation })
{
    const [qrCodeImage, setQrCodeImage] = useState('');
    const [codePix, setCodePix] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [txId, setTxId] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    const value = (numbers.length * 10).toFixed(2);//0.01.toFixed(2)//

    const data =
    {
        "value": value,
        "description": `Pix da rifa da bicicleta`,
        "payee":
        {
            "cpf": regexInputs(cpf),
            "name": name
        }
    }

    useEffect(() =>
    {
        async function fetchData()
        {
            if (showModal)
            {
                await postPixData();
            }
        }
        fetchData();
    }, []);

    const postConfirmPaid = async () =>
    {
        setIsLoading(true);

        try
        {
            await postApiQrCodeData("postConfirmPaid", {
                name: name,
                cpf: cpf,
                email: email,
                phone: phone,
                numbers: numbers,
                valuePaid: value
              });
        }
        catch(err)
        {
            console.error(err);
        }
        setIsLoading(false);
    }

    const postPixData = async () =>
    {
        setIsLoading(true);
        try
        {
            console.log(data);
            const response = await postApiQrCodeData("order/pix/billing", data);

            setQrCodeImage(response.imagemQrcode);
            setCodePix(response.qrcode);
            setTxId(response.txId);
        }
        catch(err)
        {
            console.error(err);
        }
        setIsLoading(false);
    };
    
    const handleCopyCode = () =>
    {
        navigator.clipboard.writeText(codePix);
    };
    
    setInterval(async () => {
        if (!txId) return;
        await postCheckPaymentStatus();
    }, 5000);

    const postCheckPaymentStatus = async () =>
    {
        const txIdData = {"txId": txId}

        const response = await postApiQrCodeData("checkPaymentStatus", txIdData);

        if(response === undefined)
        {
            return;
        }

        if(response.status === "CONCLUIDA")
        {
            await postConfirmPaid();
            setIsPaid(true);
            handlePaymentConfirmation();
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose} className={showModal ? '' : 'modal-closed'}>
            <Modal.Header closeButton>
                <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    isLoading ? <LoadingSpinner size={10} /> :
                    <div className="App">
                        <div className='text-center'>
                            <h1 style={{fontSize: '24px', marginBottom: '5px'}}>
                                Utilize PIX para pagar
                            </h1>
                            <small style={{lineHeight: '1', marginBottom: '5px'}}>
                                Este valor de R${numbers.length * 10}.00 é referente á rifa da bicicleta. Leia o QR Code abaixo utilizando o seu banco para realizar a compra imediatamente!
                            </small>
                        </div>
            
                        <div className='text-center' style={{marginTop: '2em', marginBottom: '2em'}}>
                            {<img className='w-50' src={qrCodeImage} alt="QR Code" />}
                        </div>
                        
                        <div className='text-center'>
                            <h1 style={{fontSize: '24px', marginBottom: '1em'}}>
                                Ou copie e cole o código
                            </h1>
                            <small style={{ lineBreak: 'anywhere' }}>
                                {codePix}
                            </small>
                            <div style={{marginTop: '2em'}}>
                                <button className='btn btn-outline-secondary' id='btnCopy' style={{position: 'relative'}} onClick={handleCopyCode}>
                                    <Tooltip anchorSelect="#btnCopy" content={"Copiado!"} place={"right"} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
            </Modal>
            {
                isPaid ? 
                <SuccessfullyPixPaid email={email} />
                :
                ""
            }
        </>
    );
}
