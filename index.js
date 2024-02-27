const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dromdown select");

 

  for (let select of dropdowns) {
    for (const code in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = code;
      newOption.value = code;
      if (select.name === "from" && code === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && code === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
});
const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newScr = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newScr;
};

const btn = document.querySelector("form button");
btn.addEventListener("click",async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amountVal = "1";
  }

  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let responce=await fetch(URL);
  let data=await responce.json();
  let rate=data[toCurr.value.toLowerCase()];
  console.log(data);
  let finalamt=amountVal*rate;
  const msg = document.querySelector(".msg");
  msg.innerText=`${amountVal}${fromCurr.value}=${finalamt}${toCurr.value}`
});
