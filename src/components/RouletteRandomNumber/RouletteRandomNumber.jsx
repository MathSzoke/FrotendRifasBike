import React, { useRef } from 'react';
import './RouletteRandomNumber.css';
import { getNumbersApiData } from '../../utils/apis/callApi';

export function RouletteRandomNumber()
{
  const spinners = useRef([]);
  return (
    <section className="rouletteRandomNumber">
      <div>
        <div className={`spinner-container`}>
          {/* <Spinner
            ref={(ref) => { spinners.current[0] = ref; }}
            timer="3000"
            identifier="0"
          /> */}
          <Spinner
            ref={(ref) => { spinners.current[1] = ref; }}
            timer="2500"
            identifier="1"
          />
          <Spinner
            ref={(ref) => { spinners.current[2] = ref; }}
            timer="2000"
            identifier="2"
          />
          <Spinner
            ref={(ref) => { spinners.current[3] = ref; }}
            timer="1200"
            identifier="3"
          />
          <div className="gradient-fade"></div>
        </div>
      </div>
    </section>
  );
}

const getRandomNumber = async () =>
{
  let { numberDrawn } = '';
  try
  {
    const response = await getNumbersApiData("randomNumber");
    numberDrawn = response.numberDrawn;
  }
  catch(err)
  {
    numberDrawn = 0
  }
  return numberDrawn;
}

class Spinner extends React.Component
{
  constructor(props)
  {
    super(props);
    this.timer = null;
    this.state =
    {
      currentValue: 0,
      timeRemaining: this.props.timer, // Initialize timeRemaining with timer value
    };
    this.speed = 1;
  }
  
  moveNumbers()
  {
    const randomNumber = Math.floor(Math.random() * 10);
    this.setState((prevState) => ({
      currentValue: (prevState.currentValue + randomNumber) % 10
    }));
  }

  tick()
  {
    if (this.state.timeRemaining <= 0)
    {
      clearInterval(this.timer);
      const { identifier } = this.props;
      (async () => {
        let numberDrawn = await getRandomNumber();

        let digits = numberDrawn.toString().split('');
    
        switch(identifier) {
          case "0":
            this.setState({
              currentValue: `${digits.length < 4 ? "-" : digits[0]}`
            });
            break;
          case "1":
            this.setState({
              currentValue: `${digits.length < 3 ? "-" : digits[digits.length === 3 ? 0 : 1]}`
            });
            break;
          case "2":
            this.setState({
              currentValue: `${digits.length < 2 ? "-" : digits[digits.length === 2 ? 0 : 1]}`
            });
            break;
          case "3":
            this.setState({
              currentValue: `${numberDrawn === 0 ? '-' : digits[digits.length - 1]}`
            });
            break;
          default:
            break;
        }
      })();
    }
    else
    {
      this.setState((prevState) => ({
        timeRemaining: prevState.timeRemaining - 100,
      }));
      this.moveNumbers();
    }
  }

  reset()
  {
    if (this.timer)
    {
      clearInterval(this.timer);
    }

    this.setState({
      currentValue: 0,
      timeRemaining: this.props.timer, // Reset timeRemaining with timer value
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  componentDidMount()
  {
    this.reset();
  }

  componentWillUnmount()
  {
    if (this.timer)
    {
      clearInterval(this.timer);
    }
  }

  render()
  {
    return <div className="numbersSorted">{this.state.currentValue}</div>;
  }
}
