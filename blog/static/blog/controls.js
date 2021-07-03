
var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
var x = 88;
var y = 25;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

var Project_Titles = ["Memories of Her","AdmissionPal","Desire4Learning", "Titanic Machine Learning", "Cinema Booker", "Collection of Games"]
var Project_Info = ['Using the Unity 3D Engine, I created a roguelike game that progressively becomes harder as the game progresses. Each playthrough is unique as you pick up items to become stronger. The mechanics are similar to those of Binding of Isaac, Risk of Rain, Programmed in C# and made in 5 days, this was submitted to the Global Game Jam in the Waterloo institution and won the best game award. <br><ul><li><a href="https://globalgamejam.org/2021/games/memories-her-8">Game Site</a></li><li><a href="https://sadbread.itch.io/memories-of-her">Play the game</a></li><li><a href="https://github.com/TheSaddestbread/MemoriesOfHerGame">View the Github</a></li></ul> ',
'AdmissionPal is an online react based website that uses sqlite data in order to compare universities that the user inputted based on averages in a certain major and required courses. The database is from web scraping, hence, it always remains up to date. The project was a submission for the Calgary Youth Hackathon.<br><ul><li><a href="https://github.com/natewu/AdmissionPal">View the Github</a></li></ul> <center><iframe width="230" height="160" src="https://www.youtube.com/embed/sMwD4T8TVJI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>',
'As my Computer Science 20B mock IA, I created a java swing application that is able to read the JSON data that is sent by a teacher client, the application is able to edit JSON data by both students and teachers. The application is designed with a nice UI using swing for user friendliness.<br><ul><li><a href="https://github.com/TheSaddestbread/InteractiveLearning">View the Github</a></li><li><a href="https://drive.google.com/drive/folders/1SP7AkdnqGvW7eYzqL4iZsPKGXZoFVQvS?usp=sharing">View the IA</a></li></ul>',
'Using python libraries such as numpy, pandas, matplotlib and sklearn. I created various machine learning models in order to predict the chances of someone surviving the titanic. In the kaggle below, I visualized the data in order to clean the dataset before feeding it into various models <br><ul><li><a href="https://www.kaggle.com/allankong/titanic-visualizing-data-patterns">View the Kaggle</a></li></ul> ',
'Cinema booker is a swing program that allows the creation of a movie cinema, with adjustable sizes and costs. Customers are able to book seats that cost a certain amount, at different times. The GUI is displayed as a simple array of buttons. After the program is done running, the data is documented onto a txt file. <br><ul><li><a href="https://github.com/TheSaddestbread/MovieCinemaBooker">View the Github</a></li><li><a href="https://replit.com/@AllanKong1/CinemaMovieBooker">Run the Program</a></li></ul> ',
'With my origins as a programmer being game development, I have gained a special attachment to game design and programming as an art. Starting from the age of 13, here is a small collection of the games I have worked upon in the duration of my life. Submissions from Ludum Dare, passion projects, and everything. Check out some of the released games I have made before: <br><ul><li><a href="https://sadbread.itch.io/">View the Games</a></li></li></ul> ']
var Project_Images = [
                        ["static/blog/Assets/Gallery/Post0-1.png",
                        "static/blog/Assets/Gallery/Post0-2.png",
                        "static/blog/Assets/Gallery/Post0-3.png"],
                        ["static/blog/Assets/Gallery/Post1-1.png",
                        "static/blog/Assets/Gallery/Post1-2.png",
                        "static/blog/Assets/Gallery/Post1-3.png"],
                        ["static/blog/Assets/Gallery/Post2-1.png",
                        "static/blog/Assets/Gallery/Post2-2.png",
                        "static/blog/Assets/Gallery/Post2-3.png"],
                        ["static/blog/Assets/Gallery/Post3-1.png",
                        "static/blog/Assets/Gallery/Post3-2.png",
                        "static/blog/Assets/Gallery/Post3-3.png"],
                        ["static/blog/Assets/Gallery/Post4-1.png",
                        "static/blog/Assets/Gallery/Post4-2.png",
                        "static/blog/Assets/Gallery/Post4-3.png"],
                        ["static/blog/Assets/Gallery/Post5-1.png",
                        "static/blog/Assets/Gallery/Post5-2.png",
                        "static/blog/Assets/Gallery/Post5-3.png"],
                        ["static/blog/Assets/Gallery/Post6-1.png",
                        "static/blog/Assets/Gallery/Post6-2.png",
                        "static/blog/Assets/Gallery/Post6-3.png"],]
var Project_Captions = [["Interactive Game",
                        "Editting Blog Posts",
                        "About Page"],
                        ["Title Screen",
                        "Gameplay",
                        "Unity Game Engine"],
                        ["Results Page",
                        "Clip from Video",
                        "Home Page"],
                        ["Login Page",
                        "Student Viewing Grades",
                        "Teacher Editing Grades"],
                        ["Correlation Matrix",
                        "Confusion Matrix",
                        "Comparing Algorithms"],
                        ["Setting up the Costs",
                        "The txt File",
                        "Booking a Spot"],
                        ["Game: Colors Shape the World",
                        "Game: Beyond Space",
                        "Game: Passive Ghost"],]
const placeCharacter = () => {

   var pixelSize = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");

   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = 11;
   var bottomLimit = 86;
   var view = 16;

   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }

   var offset = 26;
   var Anotheroffset = 3;
   var galleries = 6;

   if(y <= view)
   {
        var i;
        for (i = 1; i <= galleries; i++) {
            var position = i * offset - Anotheroffset;
            if(Math.abs(x - position) <= 10 && Project_Position != i){
                document.getElementById("title").innerHTML = Project_Titles[i - 1];
                document.getElementById("info").innerHTML = Project_Info[i - 1];

                var img = document.getElementById('image1');
                img.src = Project_Images[i][0];
                document.getElementById("cap1").innerHTML = Project_Captions[i][0];

                var img = document.getElementById('image2');
                img.src = Project_Images[i][1];
                document.getElementById("cap2").innerHTML = Project_Captions[i][1];

                var img = document.getElementById('image3');
                img.src = Project_Images[i][2];
                document.getElementById("cap3").innerHTML = Project_Captions[i][2];

                Project_Position = i;
            }
        }
   }
   else
   {
    Project_Position = -1;
    document.getElementById("title").innerHTML = "This Blog";
    document.getElementById("info").innerHTML = 'The interactive game above is made in javascript. By walking up to a gallery picture, you will be able to see some projects I made with descriptions of them. Move with arrow keys or the buttons, moving to a gallery will give descriptions of the project. The entirety of the site is programmed in python using Django, the superuser(me) is password protected with encryption and handles all the data in SQL. ';

    var img = document.getElementById('image1');
    img.src = Project_Images[0][0];
    document.getElementById("cap1").innerHTML = Project_Captions[0][0];

    var img = document.getElementById('image2');
    img.src = Project_Images[0][1];
    document.getElementById("cap2").innerHTML = Project_Captions[0][1];

    var img = document.getElementById('image3');
    img.src = Project_Images[0][2];
    document.getElementById("cap3").innerHTML = Project_Captions[0][2];
   }

   var camera_left = pixelSize * 130;
   var camera_top = pixelSize * 10;

   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;


}

//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step();




/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []

   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));