//TODO: make the list of sites look better, make the list of sites a link, make the list of sites be sorted based
//on popularity. Get the proper latest link to download the repo [the latest releases link from github api]. Allow
//users to switch between light-mode and dark-mode. Add all the latest features into light-mode. Maybe [optional]
//store if the user was in light or dark mode [via cookies so they don't have to login], so they don't have to change
//it every time they go to the site [and make that stored for every single page on MateoBotha.github.io]. Add diffrent
//and better text to all the sections that change so if it doesn't load the user knows... Also maybe add an animation into
//the loading of the text. Fixany mixtakes or typos on the webpage. Add more top-nav buttons, add a hamberger menu for all
//the top-nav things but have an icon for the switch between light and dark mode. Have it so you can see info on the release
//[either the latest or prerelease] and make them look better [take inseration from minecraft-forge's options. Basically make
//it more visual and remove the links]. Have a sction about this repo [like the description and what it does etc, maybe put that on the about?].
//sotore if the user was on light or dark mode using localStorage or cookies.
maxNumReposToShow = 5;  //the total max number of repos to show on the left of the site

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

allSites = "";
fetch(`https://api.github.com/users/mateobotha/repos`)
  .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    for (i = 0; i < Math.min(data.length,maxNumReposToShow); i++) {
        allSites += ("<a href=\""+data[i].html_url+"\" class=\"noUnderline\">"+data[i].name+"</a>") + "<br>"; // making it into a link to the repo
    }
    elements = document.getElementsByClassName("listOfSites");
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = allSites;
    }
    
  })
  .catch(error => {
    console.error('Error:', error);
  });


  fetch(`https://api.github.com/repos/mateobotha/Java-Chessbot`)
  .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    programName = document.getElementsByClassName("programName");
    for (i = 0; i < programName.length; i++) {
      programName[i].innerHTML = data.name;
  }
    linkToAccount = document.getElementsByClassName("linkToAccount"); //TODO: figure out why this isn't returning anything
    for (i = 0; i < linkToAccount.length; i++) {
      linkToAccount[i].href = data.owner.html_url;
  }
    linkToRepo = document.getElementsByClassName("linkToRepo"); //TODO: figure out why this isn't returning anything
    for (i = 0; i < linkToRepo.length; i++) {
      linkToRepo[i].href = data.html_url;
  }
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
latestRelease = undefined; // if there is a latest release then it is going to change.
latestPreRelease = undefined; // samething here
  fetch("https://api.github.com/repos/mateobotha/Java-Chessbot/releases/latest")
  .then(response => {
    if (response.ok){
      latestRelease = response.json();
    } else{
      fetch("https://api.github.com/repos/mateobotha/Java-Chessbot/releases")
      .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok.');
      })
      .then(data=> {
        timeArray = []

        for (i = 0; i < data.length; i++) {
          timeArray.push(data[i].published_at);
        }

        const dates = timeArray.map(s => new Date(s));
        dates.sort(function(a, b) { return a.getTime() - b.getTime(); });

        const latestDate = dates[dates.length - 1];

        const index = dates.findIndex(date => +date === +latestDate);

        latestPreRelease = data[index];
        if (latestRelease!==undefined) {
          // there is a latest release
          document.getElementById("downloadLatestLink").href = latestRelease.zipball_url;
        } else {
          document.getElementById("downloadLatestLink").remove();
          document.getElementById("spacebetweenDownloadLinks").remove();
        }
        if (latestPreRelease!==undefined) {
          // there is a prerelease
          document.getElementById("downloadPreLink").href = latestPreRelease.zipball_url;
        } else {
          document.getElementById("downloadPreLink").remove();
          newLine = document.getElementById("spacebetweenDownloadLinks");
          if (newLine!==null) {
            //this will only be null if there is also no latest release [which goes first in the deletion process and also deletes this... basically
            //this element could exist or could not so we are checking so, also in all honestly I could just check if (latestRelease === undefined) because then
            //this element will also be gone, however this solution is fine]
            newLine.remove();
          }
        }

        if ((latestRelease===undefined)&&(latestPreRelease===undefined)) {
          // there is no downloadable link

          const newElement = document.createElement("p");
          const node = document.createTextNode("It seems we can't find a donwloadable link for you right now!");
          newElement.appendChild(node);
          const element = document.getElementById("downloadSection");
          element.appendChild(newElement);
        }
      })
    }
  })
});