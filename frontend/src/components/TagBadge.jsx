import React, { useState } from "react";
const TagBadge = ({ isSelected, tagName }) => {
  //const [isSelected, setIsSelected] = useState(isSelected)
  var classN = "rounded-full px-4 py-1 text-white text-sm font-medium ";
  classN = classN + (isSelected ? "bg-indigo-500" : "bg-indigo-400");
  return <div className={classN}>{tagName}</div>;
};

export default TagBadge;
