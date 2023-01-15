//elements and buttons
let generate = document.querySelector('.generate');
let MainText = document.querySelector('.taskblock');
let Hours = document.querySelector('.Hours');
let Minutes = document.querySelector('.Minutes');
let Seconds = document.querySelector('.Seconds');
let Milliseconds = document.querySelector('.Milliseconds');
let taskzone = document.querySelector('.taskblock');
let input_area = document.querySelector('.input_area');
let Errors = document.querySelector(".mistakes");
let Accuracy = document.querySelector(".accuracy");
let arrow = document.querySelector('.arrow');
let str = '';
let array;
let CurrentSymbols = 0;
let mistakes = 0;
let total_mistakes = 0;
let CPM = 0;
let characterTyped = 0;
let current_task = '';
let current_input = '';
let Width = 0;
//Records 
let BestCPM = document.getElementById('cPm');
let BestAccuracy = document.getElementById('acc');

let BestA = 0;
let Current_Acc = 0;
let BestC = 0;
if(localStorage.Cppm === undefined && localStorage.Acc === undefined){
BestAccuracy.innerHTML = 'Not results yet';
BestCPM.innerHTML = 'Not results yet';
}else{
    BestCPM.innerHTML = localStorage.Cppm;
    BestAccuracy.innerHTML = localStorage.Acc; 
}



//Quotes
let tasks = {
    1: 'I m learning English.',
    2: 'I wake up at 8:00 in the morning.',
    3: 'I have an apartment in Moscow.',
    4: 'He rarely rides public transport.',
    5: 'My dog only eats special food.',
    6: 'The neighbor’s cat even walks on the street in winter.',
    7: 'Tomorrow, my sister and I are going to a concert with our favorite band.',
    8: 'The neighbors were building a fence just before we moved in.',
    9: 'We will have the house completely finished by winter.',
    10: 'Sophie walks with her dog in the garden every day at eleven o’clock.', 
    11: 'They say it will get warmer tomorrow. ',
    12: 'This shop is closed till Friday.',
    13: 'Did you bring the book to the library last week?',
    14: 'Yesterday I saw her with Jennifer!',
    15: 'Her college is set in the countryside.', 
};

//functions
function QuoteUpdate(){
MainText.textContent = null;
let numbers = Object.keys(tasks);
    let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
     current_task = tasks[randomNumber];
    current_task.split('').forEach(char => {
        let charSpan = document.createElement( 'span' );
        charSpan.innerText = char;
        MainText.appendChild(charSpan);
    });
}
//----------------------------------------------------
function MainProcess(){

current_input = input_area.value;
let current_array = current_input.split('');
CurrentSymbols++;
characterTyped++;
mistakes = 0;
SpanArray = MainText.querySelectorAll('span');
  SpanArray.forEach((char, index) => {
    let typedChar = current_array[index]

    
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
      mistakes++;
    }
  });

//mistakes
Errors.textContent = mistakes + total_mistakes;

//accuracy 
let correctCharacters = (characterTyped - (total_mistakes + mistakes));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  Accuracy.textContent = Math.round(accuracyVal) + '%';
  Current_Acc = Math.round(accuracyVal);
console.log(Current_Acc);
  if(current_input.length == current_task.length){
    QuoteUpdate();
    total_mistakes += mistakes;
    input_area.value = '';
  }
};


function StartGame(){
    QuoteUpdate();
    progressBar();
}

function progressBar(){
    
    let element = document.querySelector('.progress');
     Width = 0;
    let proc = 0;
    let id  = setInterval(Status, 1000);
    
    function Status (){
        if(Width >= 100) {
            clearInterval(id);
            if(BestC < CurrentSymbols){
                BestC = Math.max(BestC, CurrentSymbols)
            } else {
                BestC = BestC;
            }
            if(BestA < Current_Acc){
                BestA = Math.max(Current_Acc, BestA)
            } else {
                BestA = BestA;
            }
            localStorage.Acc = BestA;
            localStorage.Cppm = BestC;
            BestCPM.innerHTML = localStorage.Cppm;
            BestAccuracy.innerHTML = localStorage.Acc;
            Width = 0;
            let CpM = document.querySelector('.cpm');
            CpM.innerHTML = CurrentSymbols;
            CurrentSymbols = 0;
            element.innerHTML =Math.floor(Width) * 1 + '%';
            element.style.width = Width + '%';
            clearInterval(id);
            id = setInterval(Status, 1000);
        } else{
             Width = Width + 1.5;
             element.style.width = Width + '%';
             element.innerHTML =Math.floor(Width) * 1 + '%';
        }
    }

}


input_area.onblur = function(){
    location.reload();
}
