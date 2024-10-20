var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var siteContainer;

if(localStorage.getItem('allData')==null){
  siteContainer=[]
}
else{
  siteContainer = JSON.parse(localStorage.getItem('allData'))
  displaySiteData()
}
var contain ;
function submitSite(){
  contain =siteContain
  var siteContain={
    name:siteName.value,
    url:siteUrl.value,
  }
  
  siteContainer.push(siteContain)
  localStorage.setItem('allData' , JSON.stringify(siteContainer))
  displaySiteData()
  clearForm()
  
  console.log(siteContainer);
  
}

var submitBtn = document.querySelector('#myBtn')
submitBtn.addEventListener('click', function(){
  submitSite()
  
})

function clearForm(){
  siteName.value=null
  siteUrl.value=null
}

function displaySiteData(){
  var cartona = ''
  for(var i =0 ; i<siteContainer.length ; i++){
    cartona+=`     <tr>
      <td class="text-center"><span>${[i]}</span></td>
      <td class="text-center"><span>${siteContainer[i].name}</span></td>
      <td class="text-center"><a  class="px-3 btn bg-success fw-medium text-white" href="${siteContainer[i].url}" target="blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
      <td class="text-center"><button onclick="deleteData(${[i]})" class="btn btn-danger px-4">delete</button></td>
    </tr> 
`

  }
  document.getElementById('t-body').innerHTML=cartona
}

function deleteData(index){
  siteContainer.splice('index' , '1')
  localStorage.setItem('allData' , JSON.stringify(siteContainer))
  displaySiteData()

}


function validateAllInputs(elem){

  var regex={
    siteName:/^[a-zA-Z]{3,8}$/,
    siteUrl:/^(https:\/\/)(www\.)[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/
  }
  
 if( regex[elem.id].test(elem.value)==true){
  elem.classList.add('is-valid')
  elem.classList.remove('is-invalid')
 }
 else{
  elem.classList.add('is-invalid')
  elem.classList.remove('is-valid')
  
 }
  
}

function checkValues(){
  if(siteName.value==null || siteUrl.value==null){
  
    alert('please fill inputs')
    siteContainer.pop(contain)
  }
  else{
    submitSite()
  }
  
}



