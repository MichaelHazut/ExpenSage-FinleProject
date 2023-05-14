import '../../../../Styles/Expense.css' 

import { useState } from 'react'
import { ExpenseDropDown } from './ExpenseDropDown'
import Collapse from 'react-bootstrap/Collapse';

export function Expense({ expense , splicer}) {
    const { title, price, date, currency, category } = expense;
    const [optionVisability, setOptionVisability] = useState(false);
    const showOptions = () => setOptionVisability(!optionVisability)

    return (
        <div className="Expense">
            <div className="grid-container" onClick={showOptions}>
                <div className="category break-text">{category}</div>
                <div className="title break-text">{title}</div>
                <div className="price break-text">{currency}{price}</div>
                <div className="date break-text">{date}</div>
            </div>
            <Collapse in={optionVisability}>
                <div>
                    <ExpenseDropDown expense={expense} splicer={splicer}/>
                </div>
            </Collapse>
        </div>
    );
}
