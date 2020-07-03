import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function useEventListener(eventType, handler) {
  const handleRef = useRef(handler);

  useEffect(() => {
    handleRef.current = handler;
  });

  //Runs once
  useEffect(() => {
    function internalHandler(e) {
      return handleRef.current(e);
    }

    document.addEventListener(eventType, internalHandler);

    return () => document.removeEventListener(eventType, internalHandler);
  }, [eventType]);
}

function UseEventListenerPage() {
  const [count, setCount] = useState(0);

  useEventListener("click", () => {
    console.log("clicked somewhere", count);
  });

  return (
    <div>
      <h1>useEventListener</h1>
      <button onClick={() => setCount((c) => c + 1)}>Hello ({count})</button>
    </div>
  );
}

export default UseEventListenerPage;
