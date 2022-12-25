import { useEffect, useState } from "react";
import "./App.css";

const apiInterval = 1000;

export default function App() {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("fetchData");
      const res = await fetch(
        "https://api.binance.com/api/v3/depth?symbol=ETHUSDT",
        {
          method: "GET",
          cache: "no-cache"
        }
      );
      const { bids, asks } = await res.json();
      setBids(bids);
      setAsks(asks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    const interval = setInterval(() => {
      fetchData();
    }, apiInterval);

    fetchData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="orderBookApp">
      <h1 className="title">Order Book</h1>
      <div className="dataControls">
        <div className="buttons">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M4 4h7v7H4V4z" fill="#f3364e"></path>
              <path d="M4 13h7v7H4v-7z" fill="#09a96a"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M4 4h7v16H4V4z" fill="#09a96a"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M4 4h7v16H4V4z" fill="#f3364e"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        <div className="ddl">
          <select>
            <option>0.01</option>
            <option>0.1</option>
            <option>1</option>
            <option>10</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
      <table className="orderBookTable">
        <thead>
          <tr>
            <th align="left">Price(USDT)</th>
            <th align="right">Size(ETH)</th>
            <th align="right">Sum(ETH)</th>
          </tr>
        </thead>
        <tbody>
          {bids.length > 0 ? (
            bids.slice(0, 8).map(([price, size]) => (
              <tr key={price}>
                <td className="redText">{Number(price).toFixed(3)}</td>
                <td>{Number(size).toFixed(3)}</td>
                <td>{Number(price / size).toFixed(3)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="emptyRow">
                {loading ? "Loading..." : "No Bids Data Found"}
              </td>
            </tr>
          )}
        </tbody>
        <tbody>
          <tr>
            <td colSpan="3" className="midRow">
              Current Mark Price Here...
            </td>
          </tr>
          {asks.length > 0 ? (
            asks.slice(0, 8).map(([price, size]) => (
              <tr key={price}>
                <td className="greenText">{Number(price).toFixed(3)}</td>
                <td>{Number(size).toFixed(3)}</td>
                <td>{Number(price / size).toFixed(3)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="emptyRow">
                {loading ? "Loading..." : "No Asks Data Found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
