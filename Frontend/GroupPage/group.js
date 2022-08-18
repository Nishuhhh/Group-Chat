

const token = localStorage.getItem('token')
console.log(token);
const btn =  document.querySelector('#btn')

btn.addEventListener("click" ,() =>{
    nav.classList.toggle("active");
    btn.classList.toggle("active")

})

const grouplist = document.querySelector('#items')

document.addEventListener('DOMContentLoaded' ,(e) =>{
    e.preventDefault();
    axios.get('http://localhost:3000/getgroups' , {headers:{"Authorization" : token}})
    .then(res =>{
        console.log(res.data)
  

    let groups = res.data.groups ;

    for(let i=0 ; i<groups.length ; i++)
    {
        let li = document.createElement('li');
        li.innerHTML=`<a href ="../chatPage/chat.html?grpId=${groups[i].id}">
        ${groups[i].groupname}
        </a>
        <p id='created'> Created : ${groups[i].createdAt.slice(0,10)}</p>`
        grouplist.appendChild(li) ;
    }

})

})


const createGrpBtn=  document.querySelector('.submit-btn')
const grpName = document.querySelector('#group')

createGrpBtn.addEventListener('click', (e)=>{   
    e.preventDefault()
    if(grpName.value == ''){
        grpName.placeholder = 'Please enter group name'
        grpName.classList.add('empty')
    }
    else{
        
        axios.post('http://localhost:3000/creategroup',{
            groupname:grpName.value
         },{
             headers:{"Authorization":token}
         }).then(ress=>{
             console.log(ress)
         })
    }
})


const logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener("click" , (e) =>{
  localStorage.clear();
  window.location.replace('../LoginPage/login.html')

})