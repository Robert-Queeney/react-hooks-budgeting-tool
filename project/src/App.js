import React,{useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form'
import Alert from './components/Alert'
import List from './components/List'
import uuid from 'uuid/v4'  //imported package that generates ids

// const initialExpenses = [
//   {id: uuid(), charge:"mortgage", amount: 2100},
//   {id: uuid(), charge:"car payment", amount: 400},
//   {id: uuid(), charge:"daycare", amount: 3100}
// ]

const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')): []

function App() {
  // ********** State Values **********
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState(''); //when you call useState you pass in inital value here is ''
    //single amount
  const [amount, setAmount] = useState(''); 
  // alert
  const [alert, setAlert] = useState({show:false});
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // ********** useEffect **********
  useEffect(()=> {
    console.log('we called useEffect');
    localStorage.setItem('expenses', JSON.stringify(expenses))
  },[expenses]) //this will  call useEffect when the expenses object changes

  // ********** Functionality **********
  const handleCharge = e => {  //changing state value when user types in charge
    setCharge(e.target.value)
  }

  const handleAmount = e => {  //changing state value when user types in Amount
    setAmount(e.target.value)
  }

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text}) // this will make it actually display
    setTimeout(()=>{
      setAlert({show:false}) // this will take the alert down after 7 seconds
    },7000)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(charge !== '' && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item,charge,amount} : item  //if the id matches, uses spread operator to add the new charge and amount edits, if not, return same item
        })
        setExpenses(tempExpenses) // this changes the value shown on the page
        setEdit(false) // this changes the fucntionality back to submit
        handleAlert({type:'success', text:'item edited'})
      } else {
        const singleExpense = {id:uuid(),charge, amount}
        setExpenses([...expenses, singleExpense]) // ...expenses grabs everything in there previously, [] sets this as an array b/c singleExpense is an object 
        handleAlert({type:'success', text: "Item added"})
      }
      setCharge('');
      setAmount('');
    } else {
      // handle alert call
      handleAlert({type:'danger', text: `charge can't be empty value and amount of value has to be greater than 0`})
    }
    console.log(charge, amount)
  }

  //clear all items
  const clearItems = () => {
    setExpenses([]); // simply make setExpenses functions set to empty array
    handleAlert({type:'danger', text:'all items deleted'})
  }
  // handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id); //filters out the one that matches the ID
    setExpenses(tempExpenses) // sets the list to the temp list that is missing deleted one
    handleAlert({type:'danger', text: "item deleted"})
  }
  // handle edit
  const handleEdit  = (id) => {
    let expense = expenses.find(item => item.id === id)
    let {charge, amount} = expense; //destructuring to get these values
    setCharge(charge);
    setAmount(amount);
    setEdit(true); //this sets the value to true and changes the button text
    setId(id); //sets the same Id to the edited info
    console.log(expense)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <Form 
          charge={charge} 
          amount={amount} 
          handleAmount={handleAmount} 
          handleCharge={handleCharge} 
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          clearItems={clearItems}
        />
      </main>
      <h1 className="total">Total Spending : <span className="total">
        $ {expenses.reduce((accumulator, current)=>{
            return accumulator += parseInt(current.amount)
          },0)}
        </span>
      </h1>

    </>
  );
}

export default App;
