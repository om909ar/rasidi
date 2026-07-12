const Finance={

balance(data){

let total=0;

data.transactions.forEach(t=>{

if(t.type==="income"){

total+=t.amount;

}else{

total-=t.amount;

}

});

return total;

},

todayLimit(data){

const now=new Date();

const today=now.getDate();

const salaryDay=data.settings.salaryDay;

let remain;

if(today<=salaryDay){

remain=salaryDay-today+1;

}else{

remain=(30-today)+salaryDay+1;

}

const balance=this.balance(data);

const target=data.settings.minimumBalance;

return Math.max(

0,

((balance-target)/remain)

).toFixed(2);

}

};
