inLightMode = true; //We will start in light mode

storedValue = localStorage.getItem("theme");

if (storedValue !== null) {
  //there is theme data saved
  inLightMode = (storedValue==="true"); // the localstorage stores the item as a string so we are testing if it is true or false now.
} // if there is no data if the user was in light or dark mode [storedValue===null], then we will just keep: inLightMode = true;


document.addEventListener("DOMContentLoaded", function() {
  if (inLightMode) {
    document.styleSheets[1].disabled = true;
  } else {
    document.styleSheets[0].disabled = true;
  }

  toggleViewModes.innerHTML = "Switch to "+((inLightMode)?"Dark-Mode":"Light-Mode")
  toggleViewModes = document.getElementById("toggleViewModes")
  toggleViewModes.onclick = function() {
    // user clicked on the button,
    if (inLightMode) {
      document.styleSheets[0].disabled = true //disabling light mode
      document.styleSheets[1].disabled = false //keeping dark mode on
    } else {
      document.styleSheets[0].disabled = false //keeping light mode on
      document.styleSheets[1].disabled = true //disabling dark mode
    }
    inLightMode = !inLightMode; // we now have switched modes
    toggleViewModes.innerHTML = "Switch to "+((inLightMode)?"Dark-Mode":"Light-Mode") //we draw/update on the DOM loaded and when the user clicked
    localStorage.setItem("theme",inLightMode); // after the switch we store the new theme.
  }
});