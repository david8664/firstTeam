let card = ["https://cdn.pixabay.com/photo/2015/12/01/19/35/eagle-1072696__480.jpg",
  "https://cdn.pixabay.com/photo/2018/10/11/23/08/chicken-3741129__480.jpg",
  "https://cdn.pixabay.com/photo/2018/04/11/11/54/small-poly-3310319__480.jpg",
  "https://cdn.pixabay.com/photo/2016/11/23/14/22/ducklings-1853178__480.jpg",
  "https://cdn.pixabay.com/photo/2023/04/09/05/47/bird-7910781__480.jpg",
  "https://cdn.pixabay.com/photo/2022/11/30/09/09/goose-7626244__480.jpg",
  "https://cdn.pixabay.com/photo/2022/04/24/14/37/faucet-7153714__480.jpg",
  "https://cdn.pixabay.com/photo/2014/05/11/13/39/bird-341898__480.jpg"]
let covert;

// פונקציה שמשכפלת מערך
function init() {
  let dobArray = card.concat(card)
  dobArray = shuffle(dobArray)
}

// פונקציה שמערבבת את המערך
let newArr = []
function shuffle(arr) {
  for (i of arr) {
    index = Math.floor(Math.random() * (card.length + 1))
    newArr.splice(index, 0, i)
  }
  console.log(newArr)
  return newArr
}
init(card)



covert = newArr.map(i => "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")


// פונקציה שמייצרת קלף
function div_card_hidden() {
  const board = document.getElementById("board")
  for (let index = 0; index < covert.length; index++) {
    let card = document.createElement('div')
    let img_face = document.createElement('img')
    let img_back = document.createElement('img')
    img_back.src = covert[index]
    img_face.src = newArr[index]
    card.className = "card"
    card.dataset.id = index
    card.addEventListener("click", handleCardClick) // מפעיל את הפונקציה השנייה בעת לחיצה על הכרטיס
    img_face.className = "img_face"
    img_back.className = "img_back"
    card.append(img_back, img_face)
    board.append(card)
  }
}




// / פןנקציה שבודקת השוואת נתונים
let openedCards = [];


function handleCardClick(e) {
  let clickedCard = e.currentTarget;  //כאן מקבלים את האלמנט שהפעיל את האירוע
  if (openedCards.length < 2 && !openedCards.includes(clickedCard)) { // בדיקה על כמה כרטיסים לחצו לפי אורך המערך שמקבל את האלמנט המפעיל
    openedCards.push(clickedCard);
    clickedCard.querySelector(".img_back").classList.toggle("card_img_none"); //משבית ומפעיל את הקלאס לפי צורך 
    clickedCard.querySelector(".img_face").classList.toggle("card_img_show");
    if (openedCards.length === 2) {  //כאשר המכיל מכיל 2 אלמנטים ז"א שיש 2 קלפים פתוחים
      let card1 = openedCards[0];
      let card2 = openedCards[1];
      if (card1.querySelector(".img_face").src === card2.querySelector(".img_face").src) { // בדיקה האם הקלפים שווים
        openedCards = []; // במידה והקלפים שווים מאפסים את המערך
        card1.removeEventListener('click',handleCardClick)
        card2.removeEventListener('click',handleCardClick)
      } else {
        setTimeout(() => {  //פןנקציה שמורה במערכת שבמידה והקלפים לא שווים אז  משנה להם חזרה את הקלאס לדיפולט ונותנת לזה השהייה של 1000 מילי שנייה ולכן הקלף לא נסגר מייד
          card1.querySelector(".img_back").classList.toggle("card_img_none");
          card1.querySelector(".img_face").classList.toggle("card_img_show");
          card2.querySelector(".img_back").classList.toggle("card_img_none");
          card2.querySelector(".img_face").classList.toggle("card_img_show");
          openedCards = [];
        }, 1500);
      }
    }
  }
}


let timer = 0;   //שעון שמוצג בראש הדף
function updateTimer() {
  timer++;
  const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}
setInterval(updateTimer, 1000);

div_card_hidden()




// start.addEventListener("click", number_cards)

// function number_cards(){
//   div_card_hidden(Number(document.getElementById("num").value))
// }

// shuffle([...card].slice(0, Number(document.getElementById("num").value)).concat([...card].slice(0, Number(document.getElementById("num").value))));




