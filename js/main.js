'use strict';

{
  const question = document.getElementById('quiz');
  const choices = document.getElementById('option');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');


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

function shuffle(arr) {
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
    score++;
  } else {
    li.classList.add('wrong');
  }

  btn.classList.remove('disabled');
}

function setQuiz() {
  isAnswered = false;

  question.textContent = quizSet[currentNum].q;

  while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if(currentNum === quizSet.length - 1) {
    btn.textContent = 'Show Score';
  }
}
  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });


};
