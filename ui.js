const UI = {

currentCategory: null,

render() {

const data = Storage.load();

const balance = Finance.balance(data);

const today = Finance.todayLimit(data);

document.getElementById("app").innerHTML = `

<div class="balance-card">

<div class="balance-title">
💰 رصيدي
</div>

<div class="balance-value">
${balance.toFixed(2)}
</div>

<div class="balance-currency">
ريال سعودي
</div>

</div>

<div class="stats">

<div class="stat">

<div class="icon">💵</div>

<div class="title">
المسموح اليوم
</div>

<div class="value">
${today}
</div>

</div>

<div class="stat">

<div class="icon">🎯</div>

<div class="title">
الهدف
</div>

<div class="value">
${data.settings.minimumBalance}
</div>

</div>

<div class="stat">

<div class="icon">📅</div>

<div class="title">
يوم الراتب
</div>

<div class="value">
${data.settings.salaryDay}
</div>

</div>

</div>

<div class="section">

<h2>

⚡ تسجيل سريع

</h2>

</div>

<div class="quick-grid">

<button class="quick-btn" onclick="UI.quick('مطاعم')">🍔</button>

<button class="quick-btn" onclick="UI.quick('بنزين')">⛽</button>

<button class="quick-btn" onclick="UI.quick('سيارة')">🚗</button>

<button class="quick-btn" onclick="UI.quick('مترو')">🚇</button>

<button class="quick-btn" onclick="UI.quick('بقالة')">🛒</button>

<button class="quick-btn" onclick="UI.quick('صدقة')">❤️</button>

<button class="quick-btn" onclick="UI.quick('أخرى')">➕</button>

</div>

<div class="section">

<h2>

📌 الالتزامات

</h2>

</div>

<div id="fixedExpenses"></div>

<div class="section">

<h2>

🕒 آخر العمليات

</h2>

</div>

<div id="transactions"

class="transaction-list">

</div>

<div class="fab"

onclick="UI.quick('أخرى')">

+

</div>

`;

this.drawTransactions(data);

this.drawFixedExpenses(data);

},

drawTransactions(data){

const container=document.getElementById("transactions");

if(!container) return;

let html="";

const list=[...data.transactions].reverse();

if(list.length===0){

html=`
<div class="card">

لا توجد عمليات

</div>
`;

}else{

list.forEach(item=>{

html+=`

<div class="transaction">

<div>

<div class="transaction-name">

${item.category}

</div>

<div class="transaction-date">

${item.date||""}

</div>

</div>

<div class="transaction-price ${item.type==="income"?"income":""}">

${item.type==="income"?"+":"-"}

${item.amount}

</div>

</div>

`;

});

}

container.innerHTML=html;

},

drawFixedExpenses(data){

const el=document.getElementById("fixedExpenses");

if(!el) return;

let html="";

if(!data.fixedExpenses || data.fixedExpenses.length===0){

html=`

<div class="card">

لا توجد التزامات

</div>

`;

}else{

data.fixedExpenses.forEach((item,index)=>{

html+=`

<div class="transaction">

<div>

<div class="transaction-name">

${item.name}

</div>

<div class="transaction-date">

التزام شهري

</div>

</div>

<div>

<div class="transaction-price">

${item.amount}

</div>

<button onclick="UI.payFixed(${index})">

✔

</button>

</div>

</div>

`;

});

}

el.innerHTML=html;

},

quick(category){

this.currentCategory=category;

document.getElementById("sheet").classList.add("show");

document.getElementById("sheetTitle").innerHTML=category;

document.getElementById("sheetAmount").value="";

},

  payFixed(index){

const data=Storage.load();

const item=data.fixedExpenses[index];

data.transactions.push({

type:"expense",

category:item.name,

amount:item.amount,

date:new Date().toLocaleDateString("ar-SA")

});

Storage.save(data);

this.render();

},

closeSheet(){

document

.getElementById("sheet")

.classList.remove("show");

},

save(){

const amount=parseFloat(

document.getElementById("sheetAmount").value

);

if(isNaN(amount)||amount<=0){

return;

}

const data=Storage.load();

let category=this.currentCategory;

if(category==="أخرى"){

const custom=prompt("اسم العملية");

if(custom) category=custom;

}

data.transactions.push({

type:"expense",

category,

amount,

date:new Date().toLocaleDateString("ar-SA")

});

Storage.save(data);

this.closeSheet();

this.render();

},

add(){

this.quick("أخرى");

}

};
