import React, { useState, useEffect } from "react";
import landingPage from "./LandingPage";
const generateItemList = (num) => {
  const itemList = [];
  var i;
  for (i = 0; i < num; i++) {
    itemList.push({ id: i, name: `Item #${i}`, value: 1 });
    // console.log(i);
  }
  return itemList;
};

const defaultNum = 3;

const App = () => {
  // useEffect(() => {
  //   document.body.style.backgroundColor = "#1791FF";
  // }, []);
  return landingPage();
};

export default App;
