import React, { useState, useEffect } from 'react';
import './Numbers.css';
import { FilterNumbersInput } from '../FilterNumbersInput/FilterNumbersInput';
import { RandomNumberBtn } from '../RandomNumberBtn/RandomNumberBtn';
import { UnselectAllNumbersBtn } from '../UnselectAllNumbersBtn/UnselectAllNumbersBtn';
import { LoadingSpinner } from './../LoadingSpinner/LoadingSpinner';
import { useSelectedNumbers } from '../SelectedNumbersProvider/SelectedNumbersProvider';
import { getNumbersApiData } from '../../utils/apis/callApi';

export function Numbers({isLoading, setIsLoading})
{
    const { selectedNumbers, setSelectedNumbers } = useSelectedNumbers();
    const [filterValue, setFilterValue] = useState('');
    const [numberPaid, setNumberPaid] = useState(false);
    const numbersArray = Array.from(Array(500).keys()).map(num => num + 1);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await getNumbersApiData("getNumbersSelectedPaid");
                const numbers = response.map(item => item.numbers).flat();
                setNumberPaid(numbers);
            }
            catch (err)
            {
                if(err.status === 404)
                {
                    return;
                }
            }
        };
    
        fetchData();
    }, []);

    const handleFilterChange = (value) =>
    {
        setFilterValue(value);
    };

    const filteredNumbers = numbersArray.filter(number => number.toString().includes(filterValue));

    const handleClick = (number) =>
    {
        if (filteredNumbers.includes(number))
        {
            setSelectedNumbers(prevSelectedNumbers =>
                {
                if (prevSelectedNumbers.includes(number))
                {
                    return prevSelectedNumbers.filter(num => num !== number);
                }
                else
                {
                    return [...prevSelectedNumbers, number];
                }
            });
        }
    };

    const [randomlySelectedNumbers, setRandomlySelectedNumbers] = useState([]);

    const selectRandomNumber = () =>
    {
        let randomNum;
        do
        {
            const randomIndex = Math.floor(Math.random() * filteredNumbers.length);
            randomNum = filteredNumbers[randomIndex];
        }
        while (selectedNumbers.includes(randomNum) || randomlySelectedNumbers.includes(randomNum) || (Array.isArray(numberPaid) && numberPaid.includes(randomNum)));
    
        setRandomlySelectedNumbers([...randomlySelectedNumbers, randomNum]);
        setSelectedNumbers([...selectedNumbers, randomNum]);
    };

    const unSelectAllNumbers = () =>
    {
        setSelectedNumbers([]);
    };

    return (
        <section className="numbers section" id="Numbers">
            <div className="configs mb-4 container">
                <div className="filterNumbers ml-auto mr-auto m-2">
                    <FilterNumbersInput onFilterChange={handleFilterChange} />
                </div>
                <div className="randomNumber ml-auto mr-auto m-2">
                    <RandomNumberBtn onClick={selectRandomNumber} />
                </div>
                <div className="unselectAllNumbers mr-auto m-2">
                    <UnselectAllNumbersBtn onClick={unSelectAllNumbers} />
                </div>
            </div>
            <div className="container contentNumbers">
                {
                    isLoading ? <LoadingSpinner /> :
                    filteredNumbers === undefined ? [] : filteredNumbers.map(number => {
                        const isPaid = Array.isArray(numberPaid) && numberPaid.includes(number);
                        return (
                            <div
                                key={number}
                                className={`card selectNumber ${selectedNumbers.includes(number) || isPaid ? 'selected' : ''} ${isPaid ? 'disabled' : ''}`}
                                onClick={() => handleClick(number)}
                            >
                                {number}
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}
