import React,{useState} from 'react';
import './App.css';
import Form from './components/Form'
import Alert from './components/Alert'
import List from './components/List'
import uuid from 'uuid/v4'  //imported package that generates ids

const initialExpenses = [
  {id: uuid(), charge:"mortgage", amount: 2100},
  {id: uuid(), charge:"car payment", amount: 400},
  {id: uuid(), charge:"daycare", amount: 3100}
]

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
      const singleExpense = {id:uuid(),charge, amount}
      setExpenses([...expenses, singleExpense]) // ...expenses grabs everything in there previously, [] sets this as an array b/c singleExpense is an object 
      handleAlert({type:'success', text: "Item added"})
      setCharge('');
      setAmount('');
    } else {
      // handle alert call
      handleAlert({type:'danger', text: `charge can't be empty value and amount of value has to be greater than 0`})
    }
    console.log(charge, amount)
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
        />
        <List expenses={expenses}/>
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
