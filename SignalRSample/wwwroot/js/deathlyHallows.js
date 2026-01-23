var cloakCounter = document.getElementById("cloakCounter");
var stoneCounter = document.getElementById("stoneCounter");
var wandCounter = document.getElementById("wandCounter");

// create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows").build();

// connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakCounter.innerText = cloak.toString();
    stoneCounter.innerText = stone.toString();
    wandCounter.innerText = wand.toString();
});



// invoke hub methods aka send notifications to hub


// start connection
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakCounter.innerText = raceCounter.cloak.toString();
        stoneCounter.innerText = raceCounter.stone.toString();
        wandCounter.innerText = raceCounter.wand.toString();
    });
    // do somethign on start
    console.log("Connection to User Hub successful.");
}

function rejected() {
    // reject logs
    console.error("Connection to User Hub failed.");
}

connectionDeathlyHallows.start().then(fulfilled, rejected);
