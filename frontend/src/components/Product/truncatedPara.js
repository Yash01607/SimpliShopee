import React, { useState } from "react";

const ReadMoreParagraph = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const ALLOWED_TEXT_LENGTH = 300;

  return (
    <div>
      <p style={{ textAlign: "justify" }} className="read-more-paragraph text-muted">
        {isExpanded ? text : text?.slice(0, ALLOWED_TEXT_LENGTH)}
        {!isExpanded && text?.length > ALLOWED_TEXT_LENGTH && (
          <>
            {text?.length > 4 && (
              <span role="button" onClick={toggleReadMore}>
                {isExpanded ? "...less" : "..."}
              </span>
            )}
          </>
        )}
      </p>
    </div>
  );
};

export default ReadMoreParagraph;
