

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollUpBtn").style.display = "block";
  } else {
    document.getElementById("scrollUpBtn").style.display = "none";
  }
};
document.getElementById("scrollUpBtn").onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

























