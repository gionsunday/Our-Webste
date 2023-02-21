$(function() {
    const plsDetails =  document.querySelector('#error')
    const thankyou =  document.querySelector('#thankyou')
$("#btn").mouseenter(function(){
const nameT = document.querySelector('#name');
const btnT = document.querySelector('#btn');
const email = document.querySelector('#email').value
const password = document.querySelector('#password').value;

 let name = nameT.value
  if(name == "" || email == "" || password == ""){
    let position = $('#btn').position();
    var left = position.left;
    var top = position.top;
    console.log(left, top)
    btnT.classList.add('btn')
    btnT.classList.add('btn-danger')
    plsDetails.style.display = 'block'
    thankyou.style.display = 'none'
    plsDetails.style.display = 'block'
    if(left <= 100 && top == 10){
        btnT.style.left = "65%"
        
    }
    else if(left == 10 && top ==10){
        btnT.style.left = "65%"
    }
    else if(left >= 100 && top ==10){
        btnT.style.left = "0%"
    }
  }
  else{
    btnT.style.left = "25%"
    btnT.classList.remove('btn-danger')
    btnT.classList.add('btn')
    btnT.classList.add('btn-success')
    plsDetails.style.display = 'none'
    thankyou.style.display = 'block'
  }
  
})
$('#btn').mouseleave(function(){})
})