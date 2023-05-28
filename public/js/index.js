const form = document.querySelector("#form") //selects form
const board = document.querySelector(".soundBoard") //selects board to add letters
const h1 = document.querySelector(".text-center")   //selects h1 with title heading
const span1 = document.querySelector(".soundSpan")  //


//function to play long melody
function playMelody(val){
    let numVal = parseInt(val);
    let level = '';

    if(numVal >= 16 && numVal <= 30){
        level = 'mid';
    } else if(numVal <= 16){
        level = 'low';
    }else{
        level = 'high'
    }

    let sound = new Howl({
        src: [`./sounds/how${level}.mp3`]
    });

    sound.play();
}


//function to collect weather
function weatherAPI(){
    const query = form.elements.query.value;
    fetch("/city", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            query: query
        })
    })
    .then((response) => response.json())
    .then(data => {
        changeTitle(query, data);
        playMelody(data);
    } )
}  


//creates letter baords
function createSB(parent, word){
    for(let i = 0; i < word.length;i++){
        const div = document.createElement("div");
        div.classList.add("soundBoard");
        div.style.background = `rgb(${ (i + 1) * 30}, 0, 0)`;
        div.style.width = `calc(100%/ ${word.length})`

        const span = document.createElement("span");
        span.innerText = word.charAt(i);
        span.classList.add("letters");
        div.appendChild(span);

        div.addEventListener("click", function(){
            playSound(word.charAt(i));
        })

        function handleKeyPress(event) {
            // Check if the pressed key is the desired key (e.g., "Enter" key)
            if(word.includes(event.key)){
                if (event.key === word.charAt(i)) {
                    playSound(word.charAt(i));
                }
            }
          }
          
          // Add event listener to the document
          document.addEventListener("keydown", handleKeyPress);

        parent.appendChild(div);

    }
}

//updates heading with current weather
function changeTitle(query, data){
    h1.textContent = `The weather in ${query} is ${data}°C`
    h1.classList.add(".text-center")
}

//plays shorter sound
function playSound(letter){
    let sound2 = new Howl({
        src: [`./sounds/sound${letter}.mp3`]
    });

    sound2.play();
}

//event listner for form
form.addEventListener("submit", function(e){
    e.preventDefault();
    const formValue = form.elements.query.value;

    weatherAPI();
    createSB(board, formValue);
})