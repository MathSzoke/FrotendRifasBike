import React, { Component } from 'react';
import { InfoSelect } from './InfoSelect/InfoSelect';
import { Navbar } from './Navbar/Navbar';
import { SelectedNumbersProvider } from './SelectedNumbersProvider/SelectedNumbersProvider';
import { EventFinishRifa } from './EventFinishRifa/EventFinishRifa';
import { IntroductionScreen } from './IntroductionScreen/IntroductionScreen';

export class Layout extends Component
{
    static displayName = Layout.name;

    render()
    {
        const { firstVisit } = this.props;

        return (
            <>
                {firstVisit && <IntroductionScreen />}
                <div className="upSiteTop" id="divButtonUp">
                    <button className="btnUp" onClick={() => window.scroll(0, 0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-up-circle-fill mediaQuery" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                        </svg>
                    </button>
                </div>
                <EventFinishRifa />
                <SelectedNumbersProvider>
                    <Navbar />
                    <div>
                        <InfoSelect />
                    </div>
                </SelectedNumbersProvider>
                <div className="downSiteTop" id="divButtonDown">
                    <button className="btnDown" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-up-circle-fill mediaQuery" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                        </svg>
                    </button>
                </div>
            </>
        );
    }
}