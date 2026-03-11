let nameGroup = `Integration & QA`;
// функция динамическая
window.helloQA = function() {  
  hello();
  bye();
}
// обычная функция
// init
function hello(){
    console.log(`${nameGroup} ready ✅`);
}

function bye(){
    console.log("QA ВСЕ!");
}

