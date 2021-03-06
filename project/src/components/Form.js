import React from 'react'
import {MdSend} from 'react-icons/md'

const Form = ({
    charge, 
    amount, 
    handleCharge, 
    handleAmount, 
    handleSubmit, 
    edit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">charge</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="charge" 
                        name="charge"
                        placeholder="e.g. rent"
                        value={charge} //setting value to statle value coming from app
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="amount" 
                        name="amount"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit?"edit":"Submit"}  {/* if edit is clicked changes button text to edit */}
                <MdSend className="btn-icon"/>
            </button>
           
        </form>
    )
}

export default Form
