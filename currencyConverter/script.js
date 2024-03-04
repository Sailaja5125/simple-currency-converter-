let droplist = document.getElementById("select_country");
let droplist2 = document.getElementById("get_country");
let convert_btn = document.querySelector(".btn");
let msg = document.querySelector(".entered_amount");
// countries list
let option1 ;
for(currcode in countryList){
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (droplist.name === "from" && currcode === "USD") {
        newoption.selected = "selected";
      }
    droplist.append(newoption);
}
droplist.addEventListener("change",()=>{
    updateoption1();
});
// got the options values
function updateoption1(){
     option1 = droplist.value;
    // console.log(option1);
    return option1;
}

function updateoption2(){
    let option2 = droplist2.value;
    // console.log(option2);
    return option2;
}
//  dropdown2
for(currcode in countryList){
    let newoption1 = document.createElement("option");
    newoption1.innerText = currcode;
    newoption1.value = currcode;
    if(droplist2.name === "to" &&  currcode === "INR"){
        newoption1.selected = "selected"
    }
    droplist2.append(newoption1);
}
droplist2.addEventListener("change",()=>{
    updateoption2();
});



//  update the exchange rate
async function get_exchange_rate(){
    let amount = document.getElementById("enter_amount");
    let amount_value = amount.value;
    if(amount_value === ""|| amount_value === -1){
        amount_value = 1;
    }    
// access api
let from_currency = updateoption1()
let to_currency = updateoption2()

    let url = `https://open.er-api.com/v6/latest/${from_currency}` // GET CURRENCY 
    let promise =await fetch(url);
    let resolve = await promise.json();
    let to_value =resolve.rates[`${to_currency}`]; 
    let finalvalue = amount_value * to_value 
    msg.innerText = `${amount_value} ${from_currency} = ${parseFloat(finalvalue).toFixed(2)} ${to_currency}`
}
    
// add event lsitener to the button to perform the tasks
convert_btn.addEventListener("click",(evt)=>{
    evt.preventDefault();    
    get_exchange_rate();
});

// window load event listener
window.addEventListener("load", () => {
    get_exchange_rate();
  });
