import React, { useEffect } from 'react';
import './SuccessfullyPixPaid.css'
import { deleteApiData } from '../../utils/apis/callApi';

export function SuccessfullyPixPaid({email})
{
  const handleReloadPage = () =>
  {
    window.location.reload();
  }

  useEffect(() =>
  {
    async function fetchData()
    {
      try
      {
        await deleteApiData("deleteInfos/", email);
      }
      catch (err)
      {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
      <section className="successfullyPixPaid" id="SuccessfullyPixPaid">
        <div className="closeSection">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleReloadPage}></button>
        </div>
        <div className="h-100 w-100 d-flex justify-content-center align-items-center flex-column">
          <div className="circle">
              <div className="checkmark unselect">&#10003;</div>
          </div>
          <div className='contentPaid'>
            Pagamento realizado com sucesso!
          </div>
          <div className="descriptionPaid">
            Os seus números foram registrados com sucesso.
          </div>
        </div>
      </section>
  );
}