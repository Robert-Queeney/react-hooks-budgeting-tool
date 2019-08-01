import React from 'react'
import {MdEdit, MdDelete} from 'react-icons/md'

const Item = ({ expense }) => { //passing in {expense} as a destructured prop
const {id, charge, amount} = expense
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button className="edit-btn" aria-label="edit-btn"><MdEdit /></button>
                <button className="clear-btn" aria-label="delete-btn"><MdDelete /></button>
            </div>
        </li>
    )
}

export default Item
