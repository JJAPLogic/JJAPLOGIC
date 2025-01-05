var rollTime = 2000;
var itemsRoll = 3
var luck = 0;

var rollEffect = new Audio("DrumRoll.mp3");
var stopEffect = new Audio("StopEffect.mp3");

var items = [
    {name: "Pistol", image: "Pistol.png" , odds: 0.1, color: "red", total: 0},
    {name: "Wooden Sword", image: "WoodenSword.png" , odds: 0.5, color: "yellowgreen", total: 0},
    {name: "stick", image: "Stick.png" , odds: 0.9 , color: "darkgrey", total: 0}
];

function roll(){
    rollEffect.play();
    var i = 0;
    var rollInterval = setInterval(() => {
        var image = document.getElementById("display").src = items[i].image;
        var txt = document.getElementById("txt").innerHTML = items[i].name;
        txt = document.getElementById("txt").style.color = items[i].color;
        i = (i + 1) % items.length;
    }, 50);

    var rollStopInterval = setTimeout(() => {
        clearInterval(rollInterval);
        rollEffect.pause();
        rollEffect.currentTime = 0;
        getRoll();
        stopEffect.pause();
        stopEffect.currentTime = 0;
        stopEffect.play().catch(error => {
            console.error("Error playing stopEffect:", error);
        });
    }, rollTime);
}

function getRoll(){
    var roll = Math.random();
    var cummulativeProbability = 0;
    for(var item of items){
        cummulativeProbability += item.odds;
        if(roll <= cummulativeProbability){
            var image = document.getElementById("display").src = item.image;
            var txt = document.getElementById("txt").innerHTML = item.name;
            txt = document.getElementById("txt").style.color = item.color;
            item.total += 1;
            console.log("You Rolled:", item.name, item.total);
            refreshInv();
            return;
        }
    }
}

function refreshInv(){
    document.getElementById("storage").innerHTML = `${items[2].total}xStick || ${items[1].total}xSword || ${items[0].total}xPistol`;
}