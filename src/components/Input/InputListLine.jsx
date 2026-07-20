import { useState, useRef } from "react";
import { maskText } from "../../utils/maskText.js";

export default InputListLine = ({ isDisable, handleLetter, list }) => {
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const value = maskText(e.target.value).toLowerCase();
    handleLetter(value, index);

    if (value && index < list.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="input-area">
      {list.map((item, i) => (
        <input
          type="text"
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          className={`input-cell ${item.status}`}
          disabled={isDisable}
          value={item.letter}
          maxLength="1"
          onChange={(e) => handleInputChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};
