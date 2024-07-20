import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const TruncateText = ({ className, text, limit = 100 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated ? text.slice(0, limit) : text;

  return (
    <div className={`flex items-baseline ${className}`}>
      <p>
        {truncatedText}
        {isTruncated && text.length > limit ? "..." : ""}
      </p>
      {text.length > limit && (
        <Button onClick={toggleTruncate} variant="link">
          {isTruncated ? "See More" : "See Less"}
        </Button>
      )}
    </div>
  );
};

export default TruncateText;
