'use strict';

{
  const question = document.getElementById('quiz');
  const choices = document.getElementById('option');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const answerCheck = document.getElementById('answerCheck');
  const answerExplanation = document.getElementById('answerExplanation');
  const questionSet = document.getElementById('questionSet');



const quizSet = shuffle([
  {q: '日本で２番目に高い山は？', c: ['北岳','奥穂高岳','間の岳'], a: '北岳'},
  {q: 'アルゼンチンの通貨単位は？', c: ['アルゼンチン・ペソ', 'アルゼンチン・レアル', 'アルゼンチン・ポンド'], a: 'アルゼンチン・ペソ'},
  {q: 'キリンの睡眠時間は？', c: ['20分', '1時間', '7時間'], a: '20分'},
  {q: '黄色のカーネーションの花言葉は？', c: ['軽蔑', '尊敬', '悲観'], a: '軽蔑'},
  {q: '次のうち恒星はどれ？', c: ['太陽', '月', '火星'], a: '太陽'},
]);

let currentNum = 0;
let isAnswered;
let score = 0;
let answer = [];
let answerResult;

function shuffle(arr) {
  questionSet.classList.remove('displayNone');

  btn.classList.remove('displayNone');
  // console.log(result);
  result.classList.add('displayNone');
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]]; 
  }
  return arr;
}

function checkAnswer(li) {
  if (isAnswered) {
    return;
  }
  isAnswered = true;

  if(li.textContent === quizSet[currentNum].a) {
    li.classList.add('correct');
    answerCheck.textContent = "正解！";
    answerExplanation.textContent = "正解は"　+ quizSet[currentNum].a + "です";
    answer.push("◯");
    score++;
  } else {
    li.classList.add('wrong');
    answerCheck.textContent = "不正解...";
    answerExplanation.textContent = "正解は"　+ quizSet[currentNum].a + "です";
    answer.push("×");
  }

  btn.classList.remove('disabled');
}

function setQuiz() {
  isAnswered = false;

  question.textContent = (currentNum + 1) + "問目: " + quizSet[currentNum].q;

  while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  for(let n = 0; n < shuffledChoices.length; n++) {
    const li = document.createElement('li');
    li.textContent = shuffledChoices[n];
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  }

  if(currentNum === quizSet.length - 1) {
    btn.textContent = 'Check Score';
  }
}

function finalAnswer() {
  questionSet.classList.add('displayNone');
  result.classList.remove('displayNone');
  btn.classList.add('displayNone');
  console.log(answerResult);
  for(let a = 0; a < answer.length; a++) {
    console.log(answerResult);
    answerResult += ( a + 1　) + "問目" + answer[a];
  }
  console.log(answer);
  // answerResult = "<table border='2'><thead>成績発表</thead>";
  answerResult += `${currentNum + 1}問中${score}問正解` + "<a href=''>Replay?</a>"
  let answerResultFinal = answerResult.substring(9);
  // console.log(answerResult);
  result.innerHTML = answerResultFinal;
}

  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      // scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      // result.classList.remove('hidden');
      // console.log(answer);
      finalAnswer();
    } else {
      currentNum++;
      answerCheck.textContent = "";
      answerExplanation.textContent = "";
      setQuiz();
    }
  });


};
