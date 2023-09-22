var namecourse =document.getElementById("namecourse");
var categorycourse =document.getElementById("categorycourse");
var pricecourse =document.getElementById("pricecourse");
var decscourse =document.getElementById("decscourse");
var btn=document.getElementById("click");
var data=document.getElementById("data");
var namealert=document.getElementById("namealert");

var currentindex;
var courses;
if(localStorage.getItem("courseslist")==null){
    courses=[];
}
else{
courses=JSON.parse(localStorage.getItem("courseslist"));
display();
}
btn.onclick=function (){
    if(btn.innerHTML=="Submit")
    add();
    else{
        updatecourse();
        btn.innerHTML="Submit";
    }
    display();
    clear();
 

}
function add(){
    var course={
        name:namecourse.value,
        category:categorycourse.value,
        pricec:pricecourse.value,
        dec:decscourse.value
    };
    courses.push(course);
    localStorage.setItem("courseslist",JSON.stringify(courses));
}
function display(){
    var result="";
    for(var i=0;i<courses.length;i++){
      result+=` <tr>
      <th >${i}</th>
      <td>${courses[i].name}</td>
      <td>${courses[i].category}</td>
      <td>${courses[i].pricec}</td>
      <td>${courses[i].desc}</td>
      <td><button onclick=getcoursedata(${i}) class="btn btn-outline-primary">update</button>
      <button onclick=deletecourse(${i}) class="btn btn-outline-danger ">delete</button></td>
    </tr>`
    }
   data.innerHTML=result;
}
function clear(){
    namecourse.value=" ";
    categorycourse.value=" ";
    pricecourse.value=" ";
    decscourse.value=" ";
}
function deletecourse(index){

    
courses.splice(index,1);
localStorage.setItem("courseslist",JSON.stringify(courses));
display();
}
deletbtn.onclick = function(){
localStorage.removeItem("courseslist");
courses=[];
data.innerHTML ="";
}
function search(e){
    console.log(e);
    var result="";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(e.value.toLowerCase())){   
      result+=` <tr>
      <th >${i}</th>
      <td>${courses[i].name}</td>
      <td>${courses[i].category}</td>
      <td>${courses[i].pricec}</td>
      <td>${courses[i].desc}</td>
      <td><button onclick=updatecourse(${i}) class="btn btn-outline-primary">update</button>
      <button onclick=deletecourse(${i}) class="btn btn-outline-danger ">delete</button></td>
    </tr>`;
    }
}
   data.innerHTML=result;

}
function getcoursedata(index){
    var update=courses[index];
    namecourse.value=update.name;
    categorycourse.value=update.category;
    pricecourse.value=update.pricec;
    decscourse.value=update.dec;
    btn.innerHTML="updatecourse";
    currentindex=index;
}
function updatecourse(){
    var course={
        name:namecourse.value,
        category:categorycourse.value,
        pricec:pricecourse.value,
        dec:decscourse.value
    };
     courses[currentindex].name=course.name;
     courses[currentindex].category=course.category;
     courses[currentindex].pricec=course.pricec;
     courses[currentindex].name.desc=course.desc;
     localStorage.setItem("courseslist",JSON.stringify(courses));

    
}
 
namecourse.onkeyup=function(){
    var regex=/^[A-Z][a-z]{2,8}$/;
    if(regex.test(namecourse.value)){
        btn.removeAttribute("disabled");
        namecourse.classList.add('is-valid');
        namecourse.classList.remove('is-invalid');
       namealert.classList.add('d-none');
    }
    else{
        btn.setAttribute("disabled","disabled");
        namecourse.classList.replace('is-valid','is-invalid');
        namealert.classList.add('d-block');
        namealert.classList.remove('d-none');
    }
}