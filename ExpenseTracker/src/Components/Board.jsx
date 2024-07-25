import React, { Fragment } from "react";

const Board = ({income,expense}) => {
  return (
    <div className="board">
      <h2 id="title">Expense Tracker</h2>
      <div className="total-balance">
        <p>your balance</p>
        ${income - expense}
      </div>
      <div className="income-expense">
        <div className="income">
          <p>
            income
            <span className="in-ex-arrows">
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
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            </span>
          </p>
          ${income.toFixed(2)}
        </div>
        <div className="line"></div>
        <div className="expense">
          <p>
            expense
            <span className="in-ex-arrows">
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
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </span>
          </p>
          ${expense.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Board;
