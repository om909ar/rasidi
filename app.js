const Storage={

key:"rasidi",

load(){

const data=localStorage.getItem(this.key);

if(!data){

return null;

}

return JSON.parse(data);

},

save(data){

localStorage.setItem(

this.key,

JSON.stringify(data)

);

},

clear(){

localStorage.removeItem(this.key);

}

};
