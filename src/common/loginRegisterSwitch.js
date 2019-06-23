export const switchLoginRegistration = (type)=>{
    if(type === "login"){
        document.getElementById("loginBottomIcon").style.display = "block";
        document.getElementById("signUpBottomIcon").style.display = "none";
        document.getElementById("signUp").style.color = "rgba(33, 42, 57, 0.5)";
        document.getElementById("login").style.color = "black";
    }else{
        document.getElementById("loginBottomIcon").style.display = "none";
        document.getElementById("signUpBottomIcon").style.display = "block";
        document.getElementById("login").style.color = "rgba(33, 42, 57, 0.5)";
        document.getElementById("signUp").style.color = "black";
    }
}