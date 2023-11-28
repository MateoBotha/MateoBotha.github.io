//TODO: make the list of sites look better, make the list of sites a link, make the list of sites be sorted based
//on popularity. Get the proper latest link to download the repo [the latest releases link from github api]. Allow
//users to switch between light-mode and dark-mode. Add all the latest features into light-mode. Maybe [optional]
//store if the user was in light or dark mode [via cookies so they don't have to login], so they don't have to change
//it every time they go to the site [and make that stored for every single page on MateoBotha.github.io]. Add diffrent
//and better text to all the sections that change so if it doesn't load the user knows... Also maybe add an animation into
//the loading of the text. Fixany mixtakes or typos on the webpage.

maxNumReposToShow = 5;  //the total max number of repos to show on the left of the site

document.addEventListener("DOMContentLoaded", function() {
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
        allSites = allSites + data[i].name + "<br>";
    }
    document.getElementById("listOfSites").innerHTML = allSites;
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
    document.getElementById("programName").innerHTML = data.name;
    document.getElementById("linkToAccount").href = data.owner.html_url;
    document.getElementById("linkToRepo").href = data.html_url;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});