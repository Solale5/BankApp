function transferChecking() {
  var text = document.getElementById("text");
  text.innerHTML = "tranfer to:";
  text.classList.toggle("hide");
  text.classList.toggle("show");


  var drop = document.getElementById("Checkingdrop");
  drop.classList.toggle("hide");
  drop.classList.toggle("show");

  var field = document.getElementById("textbox");
  field.classList.toggle("hide");
  field.classList.toggle("show");

  var go = document.getElementById("confirm");
  go.classList.toggle("hide");
  go.classList.toggle("show");

}

//redo so the a whole div gets hidden
// /https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
