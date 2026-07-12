// =========================
// رصيدي - النسخة الأولى
// =========================

let balance = Number(localStorage.getItem("balance")) || 2043.12;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const balanceText = document.getElementById("balance");
const list = document.getElementById("list");

const modal = document.getElementById("modal");

const addButton = document.getElementById("addButton");
const closeModal = document.getElementById("closeModal");
const saveExpense = document.getElementById("saveExpense");

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const clearBtn = document.getElementById("clearBtn");

const goal = 800;

//===========================

render();

//===========================

addButton.onclick = () => {

modal.style.display="flex";

};

closeModal.onclick = ()=>{

modal.style.display="none";

};

//===========================

saveExpense.onclick=()=>{

const name=expenseName.value.trim();

const amount=Number(expenseAmount.value);

const category=expenseCategory.value;

if(name==="" || amount<=0){

alert("أدخل البيانات");

return;

}

const expense={

id:Date.now(),

name,

amount,

category

};

expenses.unshift(expense);

balance-=amount;

saveData();

expenseName.value="";

expenseAmount.value="";

modal.style.display="none";

render();

};

//===========================

clearBtn.onclick=()=>{

if(confirm("حذف جميع العمليات؟")){

expenses=[];

saveData();

render();

}

};

//===========================

function saveData(){

localStorage.setItem("balance",balance);

localStorage.setItem("expenses",JSON.stringify(expenses));

}

//===========================

function render(){

balanceText.innerHTML=

balance.toFixed(2)+" ريال";

list.innerHTML="";

if(expenses.length===0){

list.innerHTML="<p class='empty'>لا توجد عمليات</p>";

}

expenses.forEach(item=>{

const div=document.createElement("div");

div.className="item";

div.innerHTML=`

<div>

<div class="item-name">

${item.name}

</div>

<div class="item-category">

${item.category}

</div>

</div>

<div class="item-amount">

-${item.amount} ريال

</div>

`;

list.appendChild(div);

});

calculateDays();

}

//===========================

function calculateDays(){

const today=new Date();

const salaryDay=27;

let nextSalary=new Date(

today.getFullYear(),

today.getMonth(),

salaryDay

);

if(today.getDate()>salaryDay){

nextSalary=new Date(

today.getFullYear(),

today.getMonth()+1,

salaryDay

);

}

const diff=

Math.ceil(

(nextSalary-today)

/(1000*60*60*24)

);

document.getElementById("daysLeft").innerHTML=

diff+" يوم";

const daily=

Math.max(

0,

(balance-goal)/diff

);

document.getElementById("dailyLimit").innerHTML=

daily.toFixed(0)+" ريال";

}
