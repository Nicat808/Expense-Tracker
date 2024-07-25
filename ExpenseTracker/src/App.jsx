import { useState } from "react";
import Board from "./Components/Board";
import History from "./Components/History";
import Form from "./Components/Form";
import { getFromLocalStorage } from "./helper";
import "./index.css";

const savedLists = getFromLocalStorage();
const { currentIncome, currentExpense } = savedLists.reduce(
  (acc, item) => {
    const value = parseInt(item.value);
    value > 0 ? (acc.currentIncome += value) : (acc.currentExpense += -value);
    return acc;
  },
  { currentIncome: 0, currentExpense: 0 }
);

function App() {
  const [income, setIncome] = useState(currentIncome);
  const [expense, setExpense] = useState(currentExpense);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [list, setList] = useState(savedLists);
  const [selected, setSelected] = useState(null);

  return (
    <div className="container" onClick={() => setSelected(null)}>
      <Board income={income} expense={expense} />
      <History
        selected={selected}
        setSelected={setSelected}
        list={list}
        setList={setList}
        setIncome={setIncome}
        setExpense={setExpense}
      />
      <Form
        setText={setText}
        text={text}
        setValue={setValue}
        value={value}
        setIncome={setIncome}
        income={income}
        setExpense={setExpense}
        expense={expense}
        setList={setList}
        list={list}
      />
    </div>
  );
}

export default App;
