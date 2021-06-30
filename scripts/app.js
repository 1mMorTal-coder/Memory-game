let container = document.getElementsByClassName('container')[0];
for (let i = 2; i < 13; i++) {
  container.innerHTML += `<div class="boxes" id="${i}"><div class="front"></div><div class="back"></div></div>`;
}
let boxes = document.getElementsByClassName('boxes');
boxes = Array.from(boxes);

if (document.querySelector('body').offsetHeight <= 670) {
  document.querySelector('.score').style.top = '60px';
}

let time = document.querySelector('.time > p:last-child');
let score = document.querySelector('.message p:nth-child(2)');
let moves = document.querySelector('.moves > p:last-child');
let timer;
let message = document.querySelector('.message ');
let btn = document.querySelector('.gameover button');
let scoreCard = document.querySelector('.gameover');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  message.style.transform = 'translateY(500px) scale(0)';

  setTimeout(() => {
    message.style.transform = 'translateY(-700px) scale(0)';
    scoreCard.classList.toggle('visible');
  }, 500);
  time.textContent = `${0}`;
  moves.textContent = `${0}`;
}
);

if (localStorage.getItem("highScore") === null)
  localStorage.setItem("highScore", "0");

let highScoreUpdate = document.querySelector('.score > p:last-child');
highScoreUpdate.textContent = localStorage.getItem("highScore");

function restart() {

  let flipCount = 0, gameCount = 0;
  function flipEvent(e) {
    if (flipCount === 0) {
      timer = setInterval(timeUpdate, 1000); timeUpdate();
    }
    if (acceptClick.length === 1) {
      if (this.getAttribute('id') === acceptClick[0].getAttribute('id'))
        return;
    }
    flipCount++;
    this.rotate === 0 ? this.rotate = 180 : this.rotate = 0;
    this.style.transform = `rotateY(${this.rotate}deg)`;
    acceptClick.push(this);
    moves.textContent = `${Math.floor(flipCount / 2)} `;
    flipCheck();
  }


  function flipCheck() {
    if (acceptClick.length === 2) {
      let agentOne = acceptClick[0].children[1].dataset.name;
      let agentTwo = acceptClick[1].children[1].dataset.name;
      if (agentOne === agentTwo) {
        acceptClick[0].removeEventListener("click", flipEvent);
        acceptClick[1].removeEventListener("click", flipEvent);
        gameCount++;
        acceptClick.length = 0;
        if (gameCount === 6)
          gameOver();
      }
      else {
        acceptClick[0].rotate = 0; acceptClick[1].rotate = 0;
        let obj1 = boxes[acceptClick[0].getAttribute('id') - 1];
        let obj2 = boxes[acceptClick[1].getAttribute('id') - 1];
        setTimeout(() => {
          obj1.style.transform = `rotateY(${0}deg)`;
          obj2.style.transform = `rotateY(${0}deg)`;
        }, 400);
        acceptClick.length = 0;
      }
    }
  }

  let acceptClick = [];
  function addEvent(items) {
    items.rotate = 0;
    items.style.transform = `rotateY(${items.rotate}deg)`;
    items.addEventListener("click", flipEvent);
  }
  boxes.forEach(addEvent);

  let timeElapsed = 0;
  function timeUpdate() {
    time.textContent = `${timeElapsed} `;
    timeElapsed++;
  }

  let localScore;
  function gameOver() {
    clearInterval(timer);

    localScore = Math.floor(moves.textContent / time.textContent * 100);
    console.log(`Score: ${localScore}`);
    score.textContent = `Score: ${localScore}`;
    setTimeout(getScore, 500);
  }

  function getScore() {
    scoreCard.classList.toggle('visible');
    setTimeout(() => {
      message.style.transform = 'translateY(0px) scale(1)';
      restart();
    }, 100);
    message.style.opacity = '1';
    if (localScore > Number(localStorage.getItem("highScore"))) {
      localStorage.setItem("highScore", `${localScore} `);
      highScoreUpdate.textContent = localStorage.getItem("highScore");
    }

  }


  let agentImage = [{ name: "cutejett", count: 0 }, { name: "reyna", count: 0 },
  { name: "killjoy", count: 0 }, { name: "phoenix", count: 0 }, { name: "cuteraze", count: 0 },
  { name: "astra", count: 0 }];
  let backFace = document.getElementsByClassName('back');
  backFace = Array.from(backFace);
  backFace.forEach(randomAgent);

  function randomAgent(items, key) {
    let randomKey = Math.floor(Math.random() * agentImage.length);
    let randomImage = agentImage[randomKey];
    let url = `url("/images/${randomImage.name}.jpg")`;
    let nameattr = document.createAttribute("data-name");
    nameattr.value = randomImage.name;
    items.style.setProperty("background-image", url);
    items.setAttributeNode(nameattr);
    randomImage.count++;
    if (randomImage.count === 2)
      agentImage.splice(randomKey, 1);
  }
}



restart();