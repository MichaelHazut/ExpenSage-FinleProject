import '../../../../Styles/Expense.css' 

import { useState } from 'react'
import { ExpenseOptions } from './ExpenseOptions'
import Collapse from 'react-bootstrap/Collapse';

export function Expense({ expense }) {
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
                    <ExpenseOptions />
                </div>
            </Collapse>
        </div>
    );
}
