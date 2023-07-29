"use strict";

const btnList=document.querySelectorAll(".wrapper-btn-list li");

const url="./data.json"

async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
      }
  
      // Assuming the response contains JSON data
      const data = await response.json();
     loadpage(data)
      btnList.forEach(btn=>{
        btn.addEventListener("click",function(){
            btnList.forEach(btn=>btn.classList.remove("text-white"))
            btn.classList.add("text-white")
            document.querySelector(".container-plan").innerHTML=""
             const target=btn.dataset.target;
             createList(data,target)
             
        })
    })
    
      
      return data;
    } catch (error) {
      // Handle any errors that occur during the fetch process
    //   console.error('Error fetching data:', error);
      throw error; // Propagate the error to the calling code if necessary
    }
  }

fetchData(url)



function createList(data,target){
    let html=data.map((data,i)=> `
    <li class="rounded-2">
    <div class="icon li-${i+1}">
      <img src="./images/icon-${data.title.replace(" ","-")}.svg" alt="">
    </div>
    <div class="plan-list">
      <div class="flex">
        <h3>${data.title}</h3>
        <img src="./images/icon-ellipsis.svg" alt="">
      </div>
      <div class="flex-between">
        <h1 class="wrapper-title">${data.timeframes[target].current}hrs </h1>
        <p class="text-grey">Last week ${data.timeframes[target].previous}hrs</p>
      </div>
    </div>
  </li>
    `).join(" ")
document.querySelector(".container-plan").innerHTML=html
}


function loadpage(data){
    btnList[0].classList.add("text-white")
    data.map((data,i)=>{
        console.log(i);
       let html= `
        <li class="rounded-2">
        <div class="icon li-${i+1}">
          <img src="./images/icon-${data.title.replace(" ","-")}.svg" alt="">
        </div>
        <div class="plan-list">
          <div class="flex">
            <h3>${data.title}</h3>
            <img src="./images/icon-ellipsis.svg" alt="">
          </div>
          <div class="flex-between">
            <h1 class="wrapper-title">${data.timeframes.daily.current}hrs </h1>
            <p class="text-grey">Last week ${data.timeframes.daily.previous}hrs</p>
          </div>
        </div>
      </li>`
      document.querySelector(".container-plan").innerHTML+=html;
    })
}