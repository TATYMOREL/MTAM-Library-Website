const LoginForm = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const newPassword = document.getElementById("newPassword");
var isVisiblePassword = false;

newPassword.addEventListener("click", () => {
  isVisiblePassword = !isVisiblePassword;
  if (isVisiblePassword) {
    newPassword.setAttribute("class", "fa fa-eye icon");
    password.setAttribute("type", "text");
  } else {
    newPassword.setAttribute("class", "fa fa-eye-slash icon");
    password.setAttribute("type", "password");
  }
});

LoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { user, session, error } = _supabase.auth.signIn({
    email: email.value,
    password: password.value,
  }).then(res=>{
    if(res.error!=null){
      document.getElementById('errormsg').innerHTML = res.error.message;
    }
  })
});

// Removed redundant form submit event listener and message container logic

// const session = _supabase.auth.session();
// console.log(session);

_supabase.auth.onAuthStateChange((event, session) => {
  // if (event == 'SIGNED_IN') console.log('SIGNED_IN', session);
  document.getElementById('errormsg').innerHTML = "Logged In";
  location.reload();
})

const user = _supabase.auth.user();
if(user){
  window.location.replace("/Login_page/dashboard.html");
}
