let cardsArray = [], displayArray=[];
function init(numOfCards=8)
{
    for (let i=0; i<numOfCards; i++)
    {
        cardsArray[i]=(i+1);
        displayArray[i]="*"; 
        displayArray[i+numOfCards]="*";
    }

     let doubleArray = shufle(cardsArray.concat(cardsArray));
     let bord = document.getElementById("board")
     for (i in doubleArray)
     {
        let card=document.createElement("div")
        // card.innerText = "val" +  doubleArray[i];
        card.id = "card" + doubleArray[i];
        // card.val = "val" + doubleArray[1];
        // card.innerText= card.val;
        card.className="card";
        let front =  document.createElement("img");
        front.src=ImagesLinks[doubleArray[i]];

        let back =  document.createElement("img");
        front.src=imageBack;

        card.append(front);
        card.append(back);
        bord.append (card);
     }

    // console.log(doubleArray);
    // shufle(doubleArray)
    return doubleArray;
}

function shufle(arr=[])
{
    retArray=[];
    while (arr.length>0)
    {
        let i=Math.floor(Math.random() * (arr.length-1)) ;
        retArray.push(arr[i]);
        arr.splice(i,1);
        // console.log(arr.length);
    }
    return retArray;
}

function guessCards(first=-1,second=-1)
{
    // for (i in cardsArray)
    // {
    //     console.log((i==first || i==second) ? cardsArray[i] : "*");
    // }
    // cardsArray.forEach ((v,i)=>(console.log((i==first || i==second) ? v : "*")));
    // cardsArray.forEach(v=>console.log("*"));

    if (cardsArray[first]==cardsArray[second])
    {
        displayArray[first]=cardsArray[first];
        displayArray[second]=cardsArray[second];
    }
    else
        console.log(displayArray.map((v,i,arr)=>i==first || i==second ? cardsArray[i] : v))
    console.log(displayArray)
}

function startGame()
{
    // try{
        cardsArray=init(8);//init(Math.flore(Number(prompt("How many cards in the game? "))/2));
    // }
    // catch{}
    console.log(cardsArray);
    let geuses=[];
    // do
    // {
    //     geuses=prompt("please geuss 2 card locations ceparated by a coma (', ')").split(",");
    //     guessCards (geuses[0],geuses[1]);
    // }while (geuses.length == 2 );

}



const ImagesLinks = [
    "https://publicdomainvectors.org/photos/bear.png",
    "https://publicdomainvectors.org/photos/pink_bucket.png",
    "https://publicdomainvectors.org/photos/1506614729.png",
    "https://publicdomainvectors.org/photos/colored-toy-publicdomain-vector.jpg",
    "https://publicdomainvectors.org/photos/3D-02.png",
    "https://publicdomainvectors.org/photos/Kids-Blocks--giancarlo-vecchio.png",
    "https://publicdomainvectors.org/photos/kick-scouter3.png",
    "https://publicdomainvectors.org/photos/1357395989.png",
    "https://publicdomainvectors.org/photos/1283175242.png",
    "https://publicdomainvectors.org/photos/Rubber_Duck.png",
    "https://publicdomainvectors.org/photos/whistle.png",
    "https://publicdomainvectors.org/photos/jonata_Car_Toy.png",
    "https://publicdomainvectors.org/photos/pink-erlephant.png",
    "https://publicdomainvectors.org/photos/Turm-06.png",
    "https://publicdomainvectors.org/photos/misc-npc-letterblock-s.png",
    "https://publicdomainvectors.org/photos/1393859663.png",
    "https://publicdomainvectors.org/photos/SVG_brick_man.png"
]
const imageBack="https://publicdomainvectors.org/photos/Toy-elements-outlines.png"


// guessCards (0,4)


// console.log(cardsArray);
startGame();