document.addEventListener("DOMContentLoaded", function () {
    //soundEffects:
    const correctAnswer = document.querySelector('#correct');
    const wrongAnswer = document.querySelector('#wrong');
    //Global obj to hold data:
    let answerInfo = {
        score:0
    };
    //Answers list:
    const modelAnswers = [`eraser`,`ruler`,`pencil`,`book`,`pen`];
    //Catching DOM elements:
    //top buttons:
    const imgBtn = document.querySelector('#dummy-img-btn');
    const helpBtn = document.querySelector('#help-btn');
    
    //Answer options:
    const answersList = document.querySelectorAll('.option');
    //Answer Areas:
    const answerAreas = document.querySelectorAll('.answer-place');
    //bottom buttons:
    const resetBtn = document.querySelector('#reset');
    const showAnswersBtn = document.querySelector('#show-answer');
    
    //Handle Click Events:
    const displayImg = ()=>{
        console.log('dummy img displayed here');
        }
    imgBtn.addEventListener('click', displayImg);
    
    const displayHelp = ()=>{
        console.log('a div overlay with help content here')
    }
    helpBtn.addEventListener('click', displayHelp);
    
    //event checks if answer is correct or wrong:
    answersList.forEach((option,key) => option.addEventListener('click',
        ()=>{
        answerInfo.selected = option.textContent;
        answerInfo.checked = modelAnswers.includes(answerInfo.selected);
        answerInfo.option = option.id;
        //toggling class active on answer selection:
        option.classList.toggle('selected-option');
        answersList.forEach((ell, els)=>{
            if(key !== els) {
                ell.classList.remove('selected-option');
            }});
    }));
    
    answerAreas.forEach(box=> box.addEventListener('click', ()=>{
        if(answerInfo.selected)
        {
            if(answerInfo.checked)
            {
                document.getElementById(answerInfo.option).classList.add('hide-answer');
                box.textContent = answerInfo.selected;
                correctAnswer.play();
                box.style.pointerEvents = 'none'; //disable box if correct answer chosen
                answerInfo.score +=1;
                if(answerInfo.score==5)
                {
                    console.log('all solved')
                    showAnswersBtn.disabled = true;
                    showAnswersBtn.classList.add('solved');
                    showAnswersBtn.style.backgroundColor = 'rgba(151,204,65,0.5)';
                }
            }
            else
            {
                box.innerHTML = `${answerInfo.selected}   <span style="font-weight:bold; color:red;"> X </span>`
                setTimeout(()=>{
                    box.textContent = ''}, 1000);
                    wrongAnswer.play();
            }}
        }));
    
    showAnswersBtn.addEventListener('click',showAllAnswers);
    resetBtn.addEventListener('click', resetAll);
    
    function resetAll(){
        answersList.forEach(option => {
            option.classList.remove('selected-option','hide-answer')});
        answerAreas.forEach(answer => {
            answer.textContent = '';
            answer.style.pointerEvents = 'auto';});
        showAnswersBtn.disabled = false;
        showAnswersBtn.classList.remove('solved');
        showAnswersBtn.style.backgroundColor = 'rgba(151,204,65,1)';
        answerInfo.selected = false;
        answerInfo.score = 0;
        answerInfo.selected = '';
        answerInfo.option = '';
    }
    
    function showAllAnswers(){
        answerInfo.score = 0;
        for(let i = 0; i < modelAnswers.length; i++)
        {
            answerAreas[i].textContent = modelAnswers[i];
            answerInfo.score +=1;
            answerAreas[i].style.pointerEvents = 'none';
            answersList.forEach(option => {
                if(modelAnswers.includes(option.textContent)){
                    option.classList.add('hide-answer');
                }
            })
        }
        if(answerInfo.score >= modelAnswers.length)
        {
            showAnswersBtn.disabled = true;
            showAnswersBtn.style.backgroundColor = 'rgba(151,204,65,0.5)';
        }
    }
    
    //overlay logic:
    
    helpBtn.addEventListener('click', showHelpOverlay);
    function showHelpOverlay(){
        document.getElementById("overlay-help").style.display = "block";
    }
    imgBtn.addEventListener('click', showImgOverlay);
    function showImgOverlay(){
        document.getElementById("overlay-img").style.display = "block";
    
    }
    
    const helpCloseBtn = document.querySelector('.help-close-btn');
    helpCloseBtn.addEventListener('click',()=>{
        document.getElementById("overlay-help").style.display = "none";
    });
    const imgCloseBtn = document.querySelector('.img-close-btn');
    imgCloseBtn.addEventListener('click',()=>{
        document.getElementById("overlay-img").style.display = "none";
    
    });
    
    //Preloader:
    const preloader = document.querySelector(".preloader");
    function preload() {
    preloader.classList.add("hide");
    }
    setTimeout(preload, 3000);
    
    
    });