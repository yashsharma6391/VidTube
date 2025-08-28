import { useState } from "react";
import "./Description.css";

const DescriptionBox = ({ text = "" }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => setShowMore((prev) => !prev);

  return (
    <div className="description-box">
      <div className={`description-text ${showMore ? "" : "collapsed"}`}>
        {text}
      </div>
      {text.length > 150 && (
        <button onClick={toggleText} className="toggle-btn">
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
