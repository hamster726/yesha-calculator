import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core';
import {faBackspace} from '@fortawesome/free-solid-svg-icons'
import {faPercent} from '@fortawesome/free-solid-svg-icons'
import {faDivide} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {faMinus} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faEquals} from '@fortawesome/free-solid-svg-icons'

const Calculator = () => {

    const [equation, setEquation] = useState('');
    const [displayEquation, setDisplayEquation] = useState('');
    const [preCalcValue, setPreCalcValue] = useState('');
    const [bracketOpened, toggleBracket] = useState(false);
    const [eventsAdded, toogleEvents] = useState(false);

    const addValue = (value) => {
        setEquation(equation.concat(value));
    }

    const addMathOperator = (value) => {
        let result;

        switch (equation.charAt(equation.length - 1)) {
            case ('/'):
            case ('*'):
            case ('+'):
            case ('-'):
            case ('%'):
            case('.'):
                result = equation.slice(0, equation.length - 1);
                result = result.concat(value);
                setEquation(result);
                break;
            default: {
                setEquation(equation.concat(value));
            }

        }
    }

    const removeLastValue = () => {
        setEquation(equation.slice(0, equation.length - 1));
    }

    const clearValue = () => {
        setEquation('');
    }

    const calcPercent = () => {
        let percent = [];
        let value = equation.split('');

        value.pop(); //deleting %

        let lasNumIndex;
        for (let i = value.length; i >= 0; i--) {
            switch (value[i]) {
                case ('/'):
                case ('*'):
                case ('+'):
                case ('-'):
                case ('%'):
                case ('('):
                case (')'):
                    lasNumIndex = i;
                    i = -1;
                    break;
                default: {
                    percent.unshift(equation.charAt(i));
                }
            }
        }
        const beforePercent = value.join('').slice(0, lasNumIndex)
        const sumBeforePercent = calculate(equation);

        percent = percent.join('');
        const result = '' + beforePercent + value[lasNumIndex] + eval(sumBeforePercent + '/100*' + percent).toFixed(3).replace(/\.?0*$/g, '');
        setEquation(result);
    }

    const addBracket = () => {

        const lastValue = equation.charAt(equation.length - 1);

        if (bracketOpened) {
            if (!isNaN(parseInt(lastValue))) { //is last char is a number
                addValue(')');
                toggleBracket(false);
            } else {
                addValue('(');
            }
        } else {
            if (lastValue === ')') {
                addValue(')');
            } else {
                addValue('(');
                toggleBracket(true);
            }
        }
    }

    const calculate = (calcValue = equation) => {

        if (calcValue === '1+') {
            setEquation('Never Settle');
            return;
        }

        try {
            setEquation(eval(calcValue).toFixed(2).replace(/\.?0*$/g, ''));

        } catch (e) {
            setEquation('incorrect value');
        }
    }

    // How to add event listener to keys?
    // document.addEventListener('keydown', (e) => {
    //     switch (e.key) {
    //         case('0'):
    //             addValue(e.key);
    //             console.log('РАЗ')
    //             break;
    //         default:
    //             return;
    //     }
    // });


    return (
        <div className="calculator">
            <form className="calculator__display">
                <input type="text" className="calculator__main-calc" placeholder="0" value={equation} readOnly/>
                {/*<div className="calculator__preliminary-calc">{preCalcValue}</div>*/}
            </form>
            <div className="calculator__buttons">
                <button className="calculator__button" onClick={() => clearValue()}>AC</button>
                <button className="calculator__button" onClick={() => removeLastValue()}><FontAwesomeIcon
                    icon={faBackspace}/></button>
                <button className="calculator__button" onClick={() => {
                    calcPercent(equation);
                }}><FontAwesomeIcon icon={faPercent}/>
                </button>
                <button className="calculator__button" onClick={() => addMathOperator('/')}><FontAwesomeIcon
                    icon={faDivide}/>
                </button>
                <button className="calculator__button" onClick={() => addValue(7)}>7</button>
                <button className="calculator__button" onClick={() => addValue(8)}>8</button>
                <button className="calculator__button" onClick={() => addValue(9)}>9</button>
                <button className="calculator__button" onClick={() => addMathOperator('*')}><FontAwesomeIcon
                    icon={faTimes}/>
                </button>
                <button className="calculator__button" onClick={() => addValue(4)}>4</button>
                <button className="calculator__button" onClick={() => addValue(5)}>5</button>
                <button className="calculator__button" onClick={() => addValue(6)}>6</button>
                <button className="calculator__button" onClick={() => addMathOperator('-')}><FontAwesomeIcon
                    icon={faMinus}/>
                </button>
                <button className="calculator__button" onClick={() => addValue(1)}>1</button>
                <button className="calculator__button" onClick={() => addValue(2)}>2</button>
                <button className="calculator__button" onClick={() => addValue(3)}>3</button>
                <button className="calculator__button" onClick={() => addMathOperator('+')}><FontAwesomeIcon
                    icon={faPlus}/></button>
                <button className="calculator__button" onClick={() => addMathOperator('.')}>.</button>
                <button className="calculator__button" onClick={() => addMathOperator('0')}>0</button>
                <button className="calculator__button" onClick={() => addBracket()}>(&nbsp;)</button>
                <button className="calculator__button" onClick={() => calculate()}><FontAwesomeIcon icon={faEquals}/>
                </button>
            </div>
        </div>
    )
}

export default Calculator;
