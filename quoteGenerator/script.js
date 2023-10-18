/* selector */
const quoteText= document.querySelector(".quote"),
quoteButton= document.querySelector("button"),
authorName= document.querySelector(".name"),
readButton= document.querySelector(".sound"),
copyButton= document.querySelector(".copy"),
fbButton= document.querySelector(".facebook"),
synth = speechSynthesis;

//get random quote function
function generateRandom(){
    //add loading class to button when clicked, and change button text
    quoteButton.classList.add("loading");
    quoteButton.innerText= "Pls wait 🥺";
    //fetch api
    fetch("http://api.quotable.io/random")
            .then(response =>response.json())
            .then(result =>{
                quoteText.innerHTML= result.content;
                authorName.innerHTML= result.author;
                quoteButton.classList.remove("loading");
                quoteButton.innerText= "ANOTHER 🤲🤩";
            });

}

//read aloud function
function readAloud(){
    if (!quoteButton.classList.contains("loading")){
        //store script for speak
        let utterance= new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance) //speak
        setInterval(()=>{
            !synth.speak ? readButton.classList.remove("activate"):readButton.classList.add("activate");
        }, 10)
    }
}


    //event handler
    quoteButton.addEventListener("click", generateRandom);
    readButton.addEventListener("click", readAloud);
    copyButton.addEventListener("click", ()=>{
        //save to clipboard
        navigator.clipboard.writeText(quoteText.innerText);
    })
    

