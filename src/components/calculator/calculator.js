import React, {useState} from 'react';
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

    const addValue = (value) => {
        setEquation(equation.concat(value));
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
        const sumBeforePercent = eval(value.join('').slice(0, lasNumIndex));

        percent = percent.join('');
        console.log(sumBeforePercent);
        const result = '' + sumBeforePercent + value[lasNumIndex] + sumBeforePercent + '/100*' + percent;
        setEquation(result);
    }

    const addBracket = () => {

        const lastValue = equation.charAt(equation.length-1);

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

    const calculate = () => {
        setEquation(eval(equation) + '');
    }


    return (
        <div className="calculator">
            <div className="calculator__display">
                <div className="calculator__main-calc">{equation === '' ? '0' : equation}</div>
                <div className="calculator__preliminary-calc">{preCalcValue}</div>
            </div>
            <div className="calculator__buttons">
                <div className="calculator__button" onClick={() => clearValue()}>AC</div>
                <div className="calculator__button" onClick={() => removeLastValue()}><FontAwesomeIcon
                    icon={faBackspace}/></div>
                <div className="calculator__button" onClick={() => {
                    addValue('%');
                    calcPercent(equation);
                }}><FontAwesomeIcon icon={faPercent}/>
                </div>
                <div className="calculator__button" onClick={() => addValue('/')}><FontAwesomeIcon icon={faDivide}/>
                </div>
                <div className="calculator__button" onClick={() => addValue(7)}>7</div>
                <div className="calculator__button" onClick={() => addValue(8)}>8</div>
                <div className="calculator__button" onClick={() => addValue(9)}>9</div>
                <div className="calculator__button" onClick={() => addValue('*')}><FontAwesomeIcon icon={faTimes}/>
                </div>
                <div className="calculator__button" onClick={() => addValue(4)}>4</div>
                <div className="calculator__button" onClick={() => addValue(5)}>5</div>
                <div className="calculator__button" onClick={() => addValue(6)}>6</div>
                <div className="calculator__button" onClick={() => addValue('-')}><FontAwesomeIcon icon={faMinus}/>
                </div>
                <div className="calculator__button" onClick={() => addValue(1)}>1</div>
                <div className="calculator__button" onClick={() => addValue(2)}>2</div>
                <div className="calculator__button" onClick={() => addValue(3)}>3</div>
                <div className="calculator__button" onClick={() => addValue('+')}><FontAwesomeIcon icon={faPlus}/></div>
                <div className="calculator__button" onClick={() => addValue('.')}>.</div>
                <div className="calculator__button" onClick={() => addValue('0')}>0</div>
                <div className="calculator__button" onClick={() => addBracket()}>(&nbsp;)</div>
                <div className="calculator__button" onClick={() => calculate()}><FontAwesomeIcon icon={faEquals}/></div>
            </div>
        </div>
    )
}

export default Calculator;