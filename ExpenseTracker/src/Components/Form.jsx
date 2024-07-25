import React from "react";
import { saveToLocalStorage } from "../helper";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const errorMessage = (errorText) => toast.error(`${errorText} !`);
const successMessage = (successText)=> toast.success(`${successText} !`)

const Form = ({
  setText,
  setValue,
  value,
  setIncome,
  setExpense,
  income,
  expense,
  text,
  setList,
  list
}) => {
  return (
    <div className="form">
      <Toaster
        toastOptions={{
          success: {
            style: {
              fontSize:"20px",
              background: "green",
              color:"white"
            },
          },
          error: {
            style: {
              fontSize: "20px",
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <h2>Add new transaction</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim().length === 0) {
            errorMessage("Please fill text");
            return;
          }
          if (value.trim().length === 0) {
            errorMessage("Please fill amount");
            return;
          }
          if (isNaN(+value.trim())) {
            errorMessage("Please enter valid number");
            return;
          }
          value > 0
            ? setIncome(income + +value)
            : setExpense(expense + (0 - +value));
          setValue("");
          setText("");
          const listElement = {
            id: uuidv4(),
            text,
            value,
          };
          setList([...list, listElement]);
          saveToLocalStorage([...list, listElement]);
          successMessage("Transaction added")
        }}
      >
        <p>Text</p>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="textInput"
          type="text"
          placeholder="Enter text..."
        />
        <p>Amount</p>
        (negative-expense,positive-income)
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="amountInput"
          type="text"
          placeholder="Enter amount..."
        />
        <button className="addBtn">Add transaction</button>
      </form>
    </div>
  );
};

export default Form;
