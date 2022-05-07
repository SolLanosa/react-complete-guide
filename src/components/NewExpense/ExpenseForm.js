import React, { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  /*Mas de un Estado para un solo componente */
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  /*Para guardar una variable: cada vez que hay un cambio (un onChange) ==> con esto state is stored */
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  /* Alternativa pero con un solo estado:
    const [userInput, setUserInput] = useState({
        enteredTitle:"",
        enteredAmount:"",
        enteredDate:"",
    })

    const titleChangeHandler = (e) => {
        setUserInput({
            ..userInput, 
            enteredTitle(e.target.value)
        });
    };

    const amountChangeHandler = (e) => {
        setUserInput({
            ..userInput, 
            enteredAmount(e.target.value)
        });
    };

    const DateChangeHandler = (e) => {
        setUserInput({
            ..userInput, 
            enteredDate(e.target.value)
        });
    };
    
  //Problema con la 2da alternativa: 
  //dependemos del previous state, tenemos q copiar las otras values para no perderlas


  // Para que React garantice que el pedido del estado que te devuelva la funcion
  // es siempre el ultimo y manteniendo los demas estados updateados
  // If your state update depends on the previous state, use this function form:

   const [userInput, setUserInput] = useState({
            enteredTitle:"",
            enteredAmount:"",
            enteredDate:"",
        });

        const titleChangeHandler = (e) => {
            setUserInput((prevState) => {
                return {...prevState, enteredTitle:e.target.value}
            })
        }

          const dateChangeHandler = (e) => {
            setUserInput((prevState) => {
                return {...prevState, enteredDate:e.target.value}
            })
        }

         const amountChangeHandler = (e) => {
            setUserInput((prevState) => {
                return {...prevState, enteredAmount:e.target.value}
            })
        }
*/

  const submitHandler = (e) => {
    e.preventDefault();

    //con esto mandamos toda la datita en un objeto con el titulo ingresado, el amount ingresado y la fecha ingresada
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);

    //Esto es para cuando submiteas la info dsp se limpia todo y se vuelve a string vacio.
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="">Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={enteredTitle}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="">Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
