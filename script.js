
function login(){
    const userName = document.getElementById("Username").value;
    const password = document.getElementById("password").value;

    if(userName=="admin" && password=="admin123")
    {
       window.location.href = "home.html";
    }
    else
    {
        alert("Invalid Username or Password")
    }
}

//Toggling

function toggleStyle(activeId){
    const btnIDs = ['All-filter-btn','open-filter-btn','closed-filter-btn']
   btnIDs.forEach(id =>{
    const btn = document.getElementById(id);
    if(id===activeId){
        
        
        btn.classList.add('bg-indigo-700','text-white');
        btn.classList.remove('bg-gray-200','text-black');
    }
    else{
        btn.classList.remove('bg-indigo-700','text-white');
        btn.classList.add('bg-gray-200','text-black');
    }
   });
}

//loadAll issue
const loadIssues=()=>{
    const issuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(issuesUrl)
    .then((res)=>res.json())
    .then((json)=>displayIssues(json.data))
};
const updateIssuesCount = (issues)=>{
    const countCard = document.querySelector(".card-header h2")
    countCard.textContent = `${issues.length} Issues`;
}
const displayIssues = (issues)=>{
    const issuesContainer = document.getElementById("card-container")
    issuesContainer.innerHTML="";

    issues.forEach(issue=>{
        const card = document.createElement("div");

        //priority color
        
        let priorityColor = "";
        if(issue.priority === "high"){
            priorityColor = "bg-red-200 text-red-600"
        }
        else if(issue.priority==="medium"){
            priorityColor = "bg-yellow-200 text-yellow-700"
        }
        else{
            priorityColor = "bg-gray-200 text-gray-700"
        }

        let statusIcon = "";

        if(issue.status==="open"){
            statusIcon = "assets/Open-Status.png"
        }
        else{
            statusIcon = "assets/Closed- Status .png"
        }

          let borderTop = "";
            if(issue.status ==="open"){
                borderTop = " border-t-4 border-green-600 shadow"
            }
            else{
                borderTop = " border-t-4 border-purple-600 shadow"
            }
            
        let labelHtml = "";
        issue.labels.forEach(label=>{
            if(label==="bug")
            {
                labelHtml+=`<button class="rounded-full w-16 h-7 bg-red-200 text-red-600 border border-red-500 flex justify-center items-center gap-1"><i class="fa-solid fa-bug"></i>Bug</button>`;
            }
            if(label==="documentation"){
                 labelHtml+=`<button class="rounded-full w-38 h-7 bg-blue-200 text-blue-600 border border-blue-500 flex justify-center items-center gap-1"><i class="fa-solid fa-align-right h"></i>Documentation</button>`;
            }
            if(label==="good first issue")
            {
                 labelHtml+=`<button class="rounded-full w-40 h-7 bg-orange-200 text-orange-600 border border-orange-500 flex justify-center items-center gap-1"><i class="fa-solid fa-plane-circle-exclamation"></i>Good First Issue</button>`;
            }
            if(label==="help wanted"){
                labelHtml+=` <button class="text-yellow-700 bg-yellow-100 border border-yellow-600 flex justify-center items-center rounded-full px-2 gap-1"><i class="fa-solid fa-helicopter-symbol"></i>Help Wanted</button>`;
            }
            if(label==="enhancement"){
                labelHtml+=`<button class = "text-green-700 bg-green-100 border border-green-600 flex items-center rounded-full px-2 gap-1"><img class="w-5 h-5" src="assets/Sparkle.png" alt="">Enhancement</button>`;
            }
        });
        const date = new Date(issue.createdAt).toLocaleDateString();


        //---------
        card.innerHTML = `<div class="each-card rounded shadow-sm  py-3 px-3 space-y-2 ${borderTop}">
      <div class="card-title flex justify-between">
        <img src="${statusIcon}">
        <button class="rounded-3xl w-20 text-[16px] font-medium ${priorityColor}">${issue.priority.toUpperCase()}</button>
      </div>
      <h2 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h2>
      <p class="text-[12px] text-[#64748B]">${issue.description}</p>
      <div class="Btn flex gap-4 flex-wrap">
        ${labelHtml}
      </div>
      <div class="text-gray-300 py-2">
        <hr>
      </div>
      <div class="text-gray-400 text-[12px]">

        <p>#${issue.id} by ${issue.author}</p>
        <p>${date}</p>
      </div>
    </div>`;
    card.addEventListener("click",()=>{
        showIssueDetails(issue)
    })
    issuesContainer.appendChild(card)
});
updateIssuesCount(issues);
manageSpinner(false)
};
loadIssues()

//filter issues

const loadOpenIssues = () => {
 manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{
        const openIssues = data.data.filter(issue=>issue.status === "open");
        displayIssues(openIssues);
    });
};

const loadClosedIssues = ()=>{
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then(data=>{
        const closedIssues = data.data.filter(issue=>issue.status==="closed");
        displayIssues(closedIssues);
    });
};

const manageSpinner=(Status)=>{
    if(Status==true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("card-container").classList.add("hidden")
    }
    else{
        document.getElementById("card-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

document.getElementById("btn-search").addEventListener("click",()=>{
const input = document.getElementById("input-search");
const searchValue = input.value.trim().toLowerCase();

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((data)=>{
    const allIssues = data.data;
    const filterIssues = allIssues.filter((issue)=>
    issue.title.toLowerCase().includes(searchValue))
    displayIssues(filterIssues)
})
});

const showIssueDetails = (issue)=>{

      let priorityColor = "";
        if(issue.priority === "high"){
            priorityColor = "bg-red-200 text-red-600"
        }
        else if(issue.priority==="medium"){
            priorityColor = "bg-yellow-200 text-yellow-700"
        }
        else{
            priorityColor = "bg-gray-200 text-gray-700"
        }

        let statusIcon = "";

        if(issue.status==="open"){
            statusIcon = "assets/Open-Status.png"
        }
        else{
            statusIcon = "assets/Closed- Status .png"
        }
     let labelHtml = "";
        issue.labels.forEach(label=>{
            if(label==="bug")
            {
                labelHtml+=`<button class="rounded-full w-16 h-7 bg-red-200 text-red-600 border border-red-500 flex justify-center items-center gap-1"><i class="fa-solid fa-bug"></i>Bug</button>`;
            }
            if(label==="documentation"){
                 labelHtml+=`<button class="rounded-full w-38 h-7 bg-blue-200 text-blue-600 border border-blue-500 flex justify-center items-center gap-1"><i class="fa-solid fa-align-right h"></i>Documentation</button>`;
            }
            if(label==="good first issue")
            {
                 labelHtml+=`<button class="rounded-full w-40 h-7 bg-orange-200 text-orange-600 border border-orange-500 flex justify-center items-center gap-1"><i class="fa-solid fa-plane-circle-exclamation"></i>Good First Issue</button>`;
            }
            if(label==="help wanted"){
                labelHtml+=` <button class="text-yellow-700 bg-yellow-100 border border-yellow-600 flex justify-center items-center rounded-full px-2 gap-1"><i class="fa-solid fa-helicopter-symbol"></i>Help Wanted</button>`;
            }
            if(label==="enhancement"){
                labelHtml+=`<button class = "text-green-700 bg-green-100 border border-green-600 flex items-center rounded-full px-2 gap-1"><img class="w-5 h-5" src="assets/Sparkle.png" alt="">Enhancement</button>`;
            }
        });
 const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `<section class="space-y-5 py-4 px-3 rounded-lg   mx-auto ">
    <h2 class="font-bold text-2xl text-[#1F2937]">${issue.title}</h2>
    <div class="List flex gap-1">
      <button class="${issue.priorityColor} bg-green-500 rounded-2xl px-3 py-1">${issue.status}</button>
        <p class=" flex gap-1 items-center  text-gray-400"><img src="assets/Ellipse 5.png" alt="">Opened by ${issue.author}</p>

        <p class=" flex gap-1 items-center  text-gray-400"><img src="assets/Ellipse 5.png" alt="">${new Date(issue.createdAt).toLocaleDateString()}</p>
      
    </div>
    <div class="debug flex gap-2">
     ${labelHtml}
    </div>
    <p class="text-gray-400">${issue.description}</p>

    <div class="asign flex justify-between bg-slate-100 rounded mx-auto py-2 px-4">

     <div class="Assignee">
      <h2 class="text-[#64748B]">Assignee:</h2>
      <h2 class="font-semibold text-[#1F2937]">${issue.author}</h2>
     </div>

     <div class="priority">
      <p class="text-[#64748B]">Priority</p>
      <button class="rounded-full w-16 h-7 ${issue.priorityColor}">${issue.priority.toUpperCase()}</button>
     </div>
    </div>
    
  </section>`;
  document.getElementById("my_modal_5").showModal();
};