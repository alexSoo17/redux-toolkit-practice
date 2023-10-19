import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./countSlice";
import "./style.css";
import { useState } from "react";
const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <>
      <h1>Counter: {count}</h1>
      <div className="btn-group">
        <button className="btn" onClick={() => dispatch(increment())}>
          +
        </button>
        <button className="btn" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div className="text-container">
        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <div className="btn-group">
          <button
            className="text-btn"
            onClick={() => dispatch(incrementByAmount(addValue))}
          >
            add amount{" "}
          </button>
          <button className="text-btn" onClick={resetAll}>
            reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
