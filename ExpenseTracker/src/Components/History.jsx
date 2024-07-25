import React, { useState } from "react";
import classNames from "classnames";
import { saveToLocalStorage } from "../helper";
import toast, { Toaster } from "react-hot-toast";

const successMessage = (successText)=> toast.success(`${successText} !`)


const History = ({
  list,
  setList,
  setIncome,
  setExpense,
  selected,
  setSelected,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedListValue, setUpdatedListValue] = useState("");

  function filteredList() {
    return list.filter((item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };
  const deleteListByID = (id) => {
    const newList = list.filter((listElement) => id !== listElement.id);
    setList(newList);
    saveToLocalStorage(newList);
    const { newIncome, newExpense } = newList.reduce(
      (acc, item) => {
        const value = parseInt(item.value);
        value > 0 ? (acc.newIncome += value) : (acc.newExpense += -value);
        return acc;
      },
      { newIncome: 0, newExpense: 0 }
    );
    setIncome(newIncome);
    setExpense(newExpense);
    successMessage("Transaction deleted")
  };
  const updateListById = (id, text) => {
    const newList = list.map((item) =>
      id === item.id ? { ...item, text: text } : item
    );
    setList(newList);
    saveToLocalStorage(newList);
    successMessage("Transaction updated")
  };

  return (
    <div className="history" onClick={() => setSelected(null)}>
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
      <h2>
        History
        <button
          className={classNames("search-icon", { "icon-white": showInput })}
          onClick={() => setShowInput(!showInput)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search..."
          className={classNames("search-input", { visible: showInput })}
        />
      </h2>
      <ul>
        {filteredList(list).map((transaction) => (
          <li
            key={transaction.id}
            id={transaction.id}
            className="transaction-text"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(transaction.id);
            }}
          >
            {transaction.value > 0 ? (
              <div className="positiveApproved"></div>
            ) : (
              <div className="negativeApproved"></div>
            )}
            <button
              onClick={() => deleteListByID(transaction.id)}
              className="delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {selected === transaction.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateListById(transaction.id, updatedListValue);
                  setSelected(null);
                }}
              >
                <input
                  className="update-item"
                  placeholder="Update name..."
                  onChange={(e) => setUpdatedListValue(e.target.value)}
                  value={updatedListValue}
                />
              </form>
            ) : (
              transaction.text
            )}
            {
              <p className="amount">
                {transaction.value > 0
                  ? `+${transaction.value}`
                  : transaction.value}
              </p>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
