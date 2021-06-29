let container = document.getElementsByClassName('container')[0];
for (let i = 2; i < 13; i++) {
  container.innerHTML += `<div class="boxes" id="${i}"><div class="front"></div><div class="back"></div></div>`;
}
let boxes = document.getElementsByClassName('boxes');
boxes = Array.from(boxes);


let flipCount = 0;
function flipEvent(e) {
  flipCount++
  if (acceptClick.length === 1) {
    if (this.getAttribute('id') === acceptClick[0].getAttribute('id'))
      return;
  }
  this.rotate === 0 ? this.rotate = 180 : this.rotate = 0;
  this.style.transform = `rotateY(${this.rotate}deg)`;
  acceptClick.push(this);
  flipCheck();
  console.log(flipCount);
}


function flipCheck() {
  if (acceptClick.length === 2) {
    let agentOne = acceptClick[0].children[1].dataset.name;
    let agentTwo = acceptClick[1].children[1].dataset.name;
    if (agentOne === agentTwo) {
      acceptClick[0].removeEventListener("click", flipEvent);
      acceptClick[1].removeEventListener("click", flipEvent);
      acceptClick.length = 0;
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
  items.addEventListener("click", flipEvent);
}
boxes.forEach(addEvent);




let agentImage = [{ name: "cutejett", count: 0 }, { name: "reyna", count: 0 },
{ name: "killjoy", count: 0 }, { name: "phoenix", count: 0 }, { name: "cuteraze", count: 0 },
{ name: "astra", count: 0 }];
let backFace = document.getElementsByClassName('back');
backFace = Array.from(backFace);
backFace.forEach(randomAgent);

function randomAgent(items) {
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


