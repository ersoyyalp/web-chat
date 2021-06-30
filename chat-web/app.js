function init(){
var firebaseConfig = { // fırebase den alınmış kod
        apiKey: "AIzaSyBEU1fqe7PZVqZ-SCjmwwrf239iAhSMhQY",
        authDomain: "mychatprogram-a494d.firebaseapp.com",
        projectId: "mychatprogram-a494d",
        storageBucket: "mychatprogram-a494d.appspot.com",
        messagingSenderId: "1031230061960",
        appId: "1:1031230061960:web:85126a1c2104edc2a4ce3d"
  };
  firebase.initializeApp(firebaseConfig);
  ref = firebase.database().ref("messages");


    firebase.database().ref("messages").on("child_added",(snapshot)=>{
        var html='';
        if(snapshot.val().sender==myName){
            html +='<li class="message mine">';
            html +='<p class="text">'+snapshot.val().message +'</p>';
            html +='<span class="date">'+ tarihCevir(snapshot.val().time)+'</span>';
            html +='</li>';
        }else{
            html +='<li class="message">';
            html +='<p class="text">'+snapshot.val().message +'</p>';
            html +='<span class="date">'+ tarihCevir(snapshot.val().time)+'</span>';
            html +='<span class="sender">'+snapshot.val().sender+'</span>';
            html +='</li>';
        }
        messages.innerHTML += html;
        messages.scroll({behavior:"smooth",top:9999999999999999});
        
    });
}
function tarihCevir(stamp){
    var dt = new Date(stamp);
    var s = "0" + dt.getHours();
    var d = "0" + dt.getMinutes();
    var format = s.substr(-2) + ":"+d.substr(-2);
    return format;

}




function sohbeteBasla(){
    myName=nameInput.value;
    if(myName.length>0){
        console.log(myName);
        login.classList.add("hidden");
        init();
    }

}
function mesajGonder(){
    var msg = document.getElementById("myInput").value;
    if(msg.length>0){
        ref.push().set({
            sender: myName,
            message: msg,
            time:firebase.database.ServerValue.TIMESTAMP  
          });//veri tabanına veri koy */
    }
    document.getElementById("myInput").value="";
   
}
var login = document.querySelector(".login")
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages")
messages.innerHTML="";
var myName= "";
var ref;
