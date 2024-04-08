import React, { useState, useEffect } from 'react';
import './IntroductionScreen.css'
import Button from 'react-bootstrap/Button';

export function IntroductionScreen()
{
  const [currentScene, setCurrentScene] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const sceneComponents = [<Scene1 />, <Scene2 />, <Scene3 buttonId={"btnInfo"} sectionId={"wrapper"} />, <Scene4 buttonId={"btnEvent"} sectionId={"EventFinishRifa"} />, <Scene5 buttonId={"btnSelect"} />];

  useEffect(() => 
  {
    window.scroll(0, 0);
  }, []);

  const nextScene = () =>
  {
    clearStyles(currentScene);
    setCurrentScene(currentScene + 1);
  };

  const prevScene = () =>
  {
    clearStyles(currentScene);
    setCurrentScene(currentScene - 1);
  };

  const skipIntro = () =>
  {
    clearStyles(currentScene);
    setIsVisible(false);
    localStorage.setItem('firstVisit', false);
  };

  let sceneComponent;

  const clearStyles = (sceneNumber) =>
  {
    const prevSceneIndex = sceneNumber - 1;
    if (prevSceneIndex >= 0 && prevSceneIndex < sceneComponents.length)
    {
      const prevButtonId = sceneComponents[prevSceneIndex].props.buttonId;
      const prevSectionId = sceneComponents[prevSceneIndex].props.sectionId;

      if (prevButtonId)
      {
        const buttonElement = document.getElementById(prevButtonId);
        buttonElement && buttonElement.removeAttribute("style");
      }

      if (prevSectionId)
      {
        const sectionElement = document.getElementById(prevSectionId);
        sectionElement && sectionElement.removeAttribute("style");
      }
    }
  };

  currentScene >= 1 && currentScene <= sceneComponents.length ? sceneComponent = sceneComponents[currentScene - 1] : sceneComponent = <Scene1 />; // Fallback para a primeira cena se o índice estiver fora dos limites

  if (!isVisible)
  {
    document.body.style.overflow = "";
    return null; // Retorna null para não renderizar o componente
  }
  else
  {
    document.body.style.overflow = "hidden";
  }

  return (
    <section className="introductionScreen flex-column" id="IntroductionScreen">
      <div className='d-flex flex-column align-items-center content-description-intro'>
        {sceneComponent}
        <hr className='w-100' style={{color: "var(--bs-border-color)"}} />
        <div className="arrowButtons">
          {currentScene > 1 && <button onClick={prevScene} className="arrowButton unselect">←</button>}
          {currentScene < sceneComponents.length && <button onClick={nextScene} className="arrowButton unselect">→</button>}
        </div>
      </div>
      <div className="jumpIntro">
        <button onClick={skipIntro} className="btn btn-secondary">{currentScene === sceneComponents.length ? "Fechar introdução" : "Pular introdução"}</button>
      </div>
    </section>
  );
}

const visibleContent =
{
  pointerEvents: "none",
  zIndex: 9999999,
  position: "relative"
}

const visibleSection =
{
  zIndex: 9999999
}

const elementHidden =
{
  visibility: "hidden"
}

const windowWidth = window.innerWidth - 100;

function Scene1()
{
  return (
    <div className="content">
      <h1 className='unselect mb-5'>Bem-vindo ao JoyFox Rifas</h1>
      <p className='unselect'>Clique nas setas abaixo para saber mais sobre o que você pode fazer aqui.</p>
    </div>
  );
}

function Scene2()
{
  return (
    <div className="content">
      <h1 className='unselect mb-5'>O produto está sendo rifado com 500 números.</h1>
      <p className='unselect'>Cada número comprado por outro concorrente ficará com o número disabilitado, <br />
      para evitar duplicidade de compras desses números.</p>
      <br />
      <p className='unselect'>Cada número valerá 10 reais, já imaginou conseguir uma bicicleta por apenas 10 reais?</p>
    </div>
  );
}

function Scene3({ buttonId, sectionId })
{
  const [buttonPosition, setButtonPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() =>
  {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement)
    {
      const buttonRect = buttonElement.getBoundingClientRect();
      setButtonPosition({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
      });

      const sectionElement = document.getElementById(sectionId);

      const sectionStyle =
      {
        ...visibleSection,
        position: "relative"
      };

      const btnStyle =
      {
        ...visibleContent,
        color: "white"
      };

      Object.assign(sectionElement.style, sectionStyle);

      Object.assign(buttonElement.style, btnStyle);
    }
  }, [buttonId, sectionId]);

  const arrowStyle =
  {
    position: "absolute",
    top: `${buttonPosition.y}px`,
    left: `${buttonPosition.x}px`,
    width: '120px',
  };

  return (
    <div className="content">
      <h1 className='unselect mb-5'>Introdução do botão de informações</h1>
      <p className="unselect">Para acessar esse botão, basta clicar nele.</p>
      <div className="arrowContent d-flex align-items-center flex-column" style={arrowStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-left svgArrowPointer" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0z"/>
        </svg>

        <p className='p-content-arrow unselect' style={{ maxWidth: windowWidth, width: "max-content", fontSize: "x-large", placeSelf: "start"}}>Este botão abre uma janela contendo as informações relevantes da rifa e contatos.</p>
      </div>
    </div>
  );
}

function Scene4({ buttonId, sectionId })
{
  const [buttonPosition, setButtonPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() =>
  {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement)
    {
      const buttonRect = buttonElement.getBoundingClientRect();
      setButtonPosition({
        x: buttonRect.right + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
      });

      const timerElement = document.getElementById("timerElement");

      Object.assign(timerElement.style, elementHidden);

      const sectionElement = document.getElementById(sectionId);

      Object.assign(sectionElement.style, visibleSection);

      Object.assign(buttonElement.style, visibleContent);
    }
  }, [buttonId, sectionId]);

  const arrowStyle =
  {
    position: "absolute",
    top: `${buttonPosition.y}px`,
    right: `${window.innerWidth - buttonPosition.x + 110}px`,
    width: '120px',
  };

  return (
    <div className="content">
      <h1 className='unselect mb-5'>Introdução do botão do sorteio</h1>
      <p className="unselect">Para acessar esse botão, basta clicar nele.</p>
      <p>O sorteio do número acontecerá no dia 13 de abril ás 20h da noite.</p>
      <div className="arrowContent arrowContent-4 d-flex align-items-center flex-column" style={arrowStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right svgArrowPointer svgArrowPointer-4" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
        </svg>

        <p className='p-content-arrow p-scene-4-arrow unselect' style={{ maxWidth: "50vw", width: "max-content", fontSize: "x-large"}}>Este botão exibirá o tempo restante para o sorteio acontecer.</p>
      </div>
    </div>
  );
}

function Scene5()
{
  return (
    <div className="content">
      <h1 className='unselect mb-5'>Introdução do botão de confirmar as informações</h1>
      <p className="unselect">No campo de CPF onde está com um placeholder de "xxx.xxx.xxx-xx", é necessário passar o seu CPF real, caso contrário, retornará erro.</p>
      <p className="unselect">O CPF é requisitado para que não haja maneiras de burlar o sistema de pagamento em pix.</p>
      <p className="unselect">O email e telefone é requisitado para entrar em contato caso você ganhe a bicicleta!</p>
      <p className="unselect">Para seguir acessando esse botão, será necessário preencher todos os campos e escolher ao menos 1 número.</p>

      <hr />

      <div className="arrowContent arrowContent-5 d-flex align-items-center flex-column">
        <Button variant="primary" style={{pointerEvents: "none"}}>Selecionar</Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right svgArrowPointer svgArrowPointer-5" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
        </svg>

        <p className='unselect' style={{ width: "100%"}}>Este botão exibirá o tempo restante para o sorteio acontecer.</p>
      </div>
    </div>
  );
}
