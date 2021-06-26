//Offline page handler code (start)
window.addEventListener("offline", (event) => {
    let handler=document.querySelector('.offline');
    let mainPage=document.querySelector('.main-body');
    handler.classList.toggle('hide');
    mainPage.classList.toggle('hide');
});
  
window.addEventListener("online", (event) => {
    let handler=document.querySelector('.offline');
    let mainPage=document.querySelector('.main-body');
    handler.classList.toggle('hide');
    mainPage.classList.toggle('hide');
});
//Offline page handler code (end)

//Variables for handling opening of popup (start)
let start1=document.querySelector(".num1");
let start2=document.querySelector(".num2");
let start3=document.querySelector(".num3");
let start4=document.querySelector(".num4");
let closeForm=document.querySelector(".close");
let planSelected=document.querySelector(".plan-value");
let buttonNumber;
//Variables for handling opening of popup (end)

//Variables for handling alert of submitted data (start)
let username=document.querySelector("#name");
let email=document.querySelector("#email");
let phone=document.querySelector("#phone");
let numLeads=document.querySelector("#num-leads");
let crm=document.querySelector("#crm");
let crmType=document.querySelector("#crm-type");
let agents=document.querySelector("#agents");
let submit=document.querySelector(".submit");
//Variables for handling alert of submitted data (start)

//Set of rules given represented as Object
let decisionObject={'range1':{'type1':[20,69,1380,299,1679],'type2': [40,67,2680,599,3279],'type3':[80,63,5040,799,5839]},
                    'range2':{'type1':[20,79,1580,299,1879],'type2': [40,77,3080,599,3679],'type3':[80,72,5760,799,6559]},
                    'range3':{'type1':[20,99,1980,299,2279],'type2': [40,96,3840,599,4439],'type3':[80,90,7200,799,7999]},
                    'range4':{'type1':[20,109,2180,299,2479],'type2': [40,106,4240,599,4839],'type3':[80,99,7920,799,8719]},
                    'range5':{'type1':[20,129,2580,299,2879],'type2': [40,125,5000,599,5599],'type3':[80,117,9360,799,10159]}}

//Variables for handling range selection on main page (start)
let range1=document.querySelector(".range1");
let range2=document.querySelector(".range2");
let range3=document.querySelector(".range3");
let range4=document.querySelector(".range4");
let range5=document.querySelector(".range5");
let previousSelected;
let currentSelected;
//Variables for handling range selection on main page (start)

//Event Listeners
//Popup openers
start1.addEventListener('click',()=>{popup(start1)});
start2.addEventListener('click',()=>{popup(start2)});
start3.addEventListener('click',()=>{popup(start3)});
start4.addEventListener('click',()=>{popup(start4)});

//Popup close and submit handler
closeForm.addEventListener('click',exitPopup);
submit.addEventListener('click',submitForm);

//Range Selectors
range1.addEventListener('click',()=>{selectRange(range1)});
range2.addEventListener('click',()=>{selectRange(range2)});
range3.addEventListener('click',()=>{selectRange(range3)});
range4.addEventListener('click',()=>{selectRange(range4)});
range5.addEventListener('click',()=>{selectRange(range5)});

function selectRange(rangeObj)
{
    previousSelected.classList.toggle("selected");
    previousSelected=rangeObj;
    currentSelected=rangeObj;
    currentSelected.classList.toggle("selected");
    window.localStorage.setItem("retain", previousSelected.className.split(" ")[0]);
    updateUI(currentSelected);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Function to update the UI when range is selected
function updateUI(currentSelected)
{
    let prices=document.querySelectorAll(".price-value");
    let totals=document.querySelectorAll(".total");
    let range=currentSelected.className.split(" ")[0];
    let updateObj=decisionObject[`${range}`];
    
    for(let i=0;i<3;i++)
    {
        prices[i].innerText=`$${updateObj[`type${i+1}`][1]}`;
        let formattedTotal=numberWithCommas(updateObj[`type${i+1}`][4]);
        totals[i].innerText=`$${formattedTotal}/mo`;
    }

}


function resetValues()
{
    document.querySelector("form").reset();
}

function exitPopup()
{
    resetValues();
    const mainBody=document.querySelector(".main-body");
    const modal=document.querySelector(".modal");
    mainBody.classList.toggle("blur-filter");
    modal.classList.add("hide");
    modal.classList.toggle("pop");
    
    
}

//Function to find the Column of Plans
function columnFinder(buttonNumber)
{
    if (buttonNumber=='num1')
        return 'col1';
    else if (buttonNumber=='num2')
        return 'col2';
    else if (buttonNumber=='num3')
        return 'col3';
    else if (buttonNumber=='num4')
        return 'col4';
}

//Function to handle opening of pop up
function popup(button)
{
    
    const mainBody=document.querySelector(".main-body");
    const modal=document.querySelector(".modal");
    mainBody.classList.toggle("blur-filter");
    modal.classList.remove("hide");
    modal.classList.toggle("pop");
    let classes=button.classList;
    buttonNumber=classes[classes.length-1];
    updateForm(buttonNumber);
}

//Function to update "Plan Selected"
function updateForm(buttonNumber)
{
    let col=columnFinder(buttonNumber);
    if (col=='col1')
        planSelected.innerText="Qualified 20";
    else if(col=='col2')
        planSelected.innerText="Qualified 40";
    else if(col=='col3')
        planSelected.innerText="Qualified 80";
    else
        planSelected.innerText="Enterprise";
}

//Function to return the total fee value
function getTotal(col)
{
    if (col!='col4')
        return document.querySelector(`.total.${col}`).innerText;
    return null;
}

//Function to check the number values
function checker()
{
    if (crm.value<0 || crmType.value<0 || numLeads.value<0 || agents.value<0)
       return false;
    return true;
}

//Function to get the checked Checkboxes in leads
function getLeads()
{
    let listOfLeads=document.querySelectorAll('input[class="leads"]:checked');
    let listOfSelectedLeads=[];
    for(let i=0;i<listOfLeads.length;i++)
    {
        listOfSelectedLeads.push(listOfLeads[i].defaultValue);
    }
    return listOfSelectedLeads;
}

function submitForm()
{
    let col=columnFinder(buttonNumber);
    let total=getTotal(col);
    let leadsVals=getLeads();
    if (checker() == true)
    {
        let message1=`
        Name: ${username.value}
        Email: ${email.value}
        Phone: ${phone.value}
        Number of lead: ${numLeads.value}
        Leads in CRM: ${crm.value}
        CRM Type: ${crmType.value}
        Number of Agents: ${agents.value}
        Lead Sources: ${leadsVals}
        Plan Selected: ${document.querySelector('.plan-value').innerText}
        Total: ${total}`;
        alert(message1);
    }
    else
        alert("Invalid Number!!")
    
    exitPopup();
}

//Function to hadle to oepening of page
function refresh()
{
    let retainedVal=window.localStorage.getItem("retain");
    if (retainedVal==null)
    {
        retainedVal='range3';
    }
    previousSelected =document.querySelector(`.${retainedVal}`);
    previousSelected.classList.toggle('selected');
    updateUI(previousSelected);
}
refresh()
