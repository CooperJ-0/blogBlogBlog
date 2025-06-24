
const nuggets =  [
    "Wait, was that wire important?",
    "Do you ever get the feeling you're being watched? Me neither.",
    "Neighbor, How long has it been since you've had a big thick steaming bowl of Wolf Brand Chili?",
    "Where does that highway go to?",
    "Now in color!",
    "Now in stereo!",
    "Now in stereo color!",
    "No longer in stereo!",
    "Do you know who ate all the Donuts?",
    "Now playing... \"Who's line is it anyways?\"",
    "Wisely done, Mr. Freeman. I will see you up ahead.",
    "Why do we all have to wear these Ridiculous ties?"
];


document.getElementById("wisdom").innerText = "Wisdom of the Instance: ".concat( nuggets[getRndInteger(0, nuggets.length - 1)] );

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}