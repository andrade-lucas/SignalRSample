
// create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

// invoke hub methods aka send notifications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

// start connection
function fulfilled() {
    // do somethign on start
    console.log("Connection to User Hub successful.");
    newWindowLoadedOnClient();
}

function rejected() {
    // reject logs
    console.error("Connection to User Hub failed.");
}

connectionUserCount.start().then(fulfilled, rejected);
