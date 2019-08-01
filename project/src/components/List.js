import React from 'react'
import Item from './Item';
import {MdDelete} from 'react-icons/md'

const List = ({expenses}) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense)=>{  //for every "expense" in the expenses array
                    return <Item key={expense.id} expense={expense}/> //create an Item with the expense info for each expense
                })}
            </ul>
            {expenses.length > 0 && <button className="btn">
                clear expenses
                <MdDelete className="btn-icon"/>
            </button>}
        </>
        
    )
}

export default List
