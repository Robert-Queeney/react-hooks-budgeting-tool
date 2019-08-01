import React from 'react'
import Item from './Item';
import {MdDelete} from 'react-icons/md'

const List = ({ expenses, handleEdit, handleDelete, clearItems }) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense)=>{  //for every "expense" in the expenses array
                    return <Item key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} /> //create an Item with the expense info for each expense
                })}
            </ul>
            {expenses.length > 0 && <button className="btn"onClick={clearItems}>
                clear expenses
                <MdDelete className="btn-icon"/>
            </button>}
        </>
        
    )
}

export default List
