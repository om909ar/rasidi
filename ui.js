const UI = {

render() {

const data = Storage.load();

const balance = Finance.balance(data);
const today = Finance.todayLimit(data);

document.getElementById("app").innerHTML = `

<div class="header">

<div class="balance-card">

<div class="logo">💰</div>

<h1>رصيدي</h1>

<h2>${balance.toFixed(2)} ريال</h2>

<p>المسموح اليوم <strong>${today}</strong> ريال</p>

</div>

</div>

<div class="cards">

<div class="small-card">

<span>🎯 الهدف</span>

<b>${data.settings.minimumBalance} ريال</b>

</div>

<div class="small-card">

<span>📅 الراتب</span>

<b>${data.settings.salaryDay}</b>

</div>

<div class="small-card">

<span>💳 العمليات</span>

<b>${data.transactions.length}</b>

</div>

</div>

<div class="section">

<h2>⚡ تسجيل سريع</h2>

<div class="quick-grid">

<button onclick="UI.quick('مطاعم')">🍔</button>

<button onclick="UI.quick('بنزين')">⛽</button>

<button onclick="UI.quick('مقاضي')">🛒</button>

<button onclick="UI.quick('قهوة')">☕</button>

<button onclick="UI.quick('صدقة')">❤️</button>

<button onclick="UI.quick('أخرى')">➕</button>

</div>

</div>

<div class="section">

<h2>آخر العمليات</h2>

<div id="transactions"></div>

</div>

<button class="fab" onclick="UI.add()">＋</button>

`;

this.drawTransactions(data);

},

  drawTransactions(data){

let html="";

const list=[...data.transactions].reverse();

if(list.length===0){

html=`<div class="empty">لا توجد عمليات</div>`;

}else{

list.forEach(t=>{

html+=`

<div class="transaction">

<div>

<b>${t.category}</b>

<br>

<small>${t.date||""}</small>

</div>

<div class="${t.type==="income"?"green":"red"}">

${t.type==="income"?"+":"-"} ${t.amount} ريال

</div>

</div>

`;

});

}

document.getElementById("transactions").innerHTML=html;

},

quick(category){

this.currentCategory=category;

document.getElementById("sheetTitle").innerHTML=

category;

document.getElementById("sheetAmount").value="";

document.getElementById("sheet").classList.add("show");

}

let amount=prompt("كم المبلغ؟");

if(!amount)return;

amount=parseFloat(amount);

if(isNaN(amount))return;

if(category==="أخرى"){

const name=prompt("اكتب اسم العملية");

if(name) category=name;

}

const data=Storage.load();

data.transactions.push({

type:"expense",

category,

amount,

date:new Date().toLocaleDateString("ar-SA")

});

Storage.save(data);

this.render();

},

add(){

this.quick("أخرى");

}

};
