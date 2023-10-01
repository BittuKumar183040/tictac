const button=document.getElementsByTagName("td");
const lines=document.getElementsByClassName("line");
const resultPanel=document.querySelector(".resultContainer")
const currentPlayerDOM=document.querySelector("#playerTurn")
const winnerDOM=document.querySelector("#winner")

const PATTERN=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]]
let patternValue=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]]

const elementSame=()=>{
    let result=false;
    for(let x=0;x<PATTERN.length;x++){
        if(patternValue[x][0] === patternValue[x][1] && patternValue[x][1] === patternValue[x][2]){
            result=PATTERN[x]
            break
        }
    }
    return result
}

const drawLine=(pos)=>{
    let val=pos[0]+""+pos[1]+pos[2];
    Array.from(lines).forEach((e)=>{
        if(e.classList[1]===val){
            e.classList.add("active")
        }
    })
}

const checkFound=(val, pos)=>{
    patternValue.forEach((array, idxOuter)=>{
        array.forEach((value, idxInner)=>{
            if(value===pos){
                patternValue[idxOuter][idxInner]=val
            }
        })
    })
    let isFound=elementSame()
    if(move>8){
        resultPanel.classList.add("gameMenuVisual")
        resultPanel.style.pointerEvents="all"
        winnerDOM.innerText="DRAW";
        currentPlayerDOM.innerText="..."
    }
    if(isFound){
        drawLine(isFound)
        resultPanel.classList.add("gameMenuVisual")
        resultPanel.style.pointerEvents="all"
        winnerDOM.innerText=player;
        currentPlayerDOM.innerText="..."
    }
}

let player="X";
let move=0;
const alternateMark=()=>{
    if(player==="X")
        player="O"
    else
        player="X";
    return player
}

const xStyle="text-shadow:0 0 5px rgb(136, 255, 0), 0 0 2px rgb(229, 255, 199);color: rgba(116, 216, 2, 1);"
const oStyle="text-shadow:0 0 5px blue, 0 0 2px blue;color: rgba(0, 0, 255, 1);"

Array.from(button).forEach((e, idx)=>{
    currentPlayerDOM.innerText="O"
    e.addEventListener("click",(event)=>{
        if(e.classList[0]!="visited"){
            let val=alternateMark();
            e.classList.add("visited")
            if(val==="X"){
                currentPlayerDOM.innerText="O"
                event.target.innerHTML=`<p style="${xStyle}">${val}</p>`;
                // player box styling 
            }else{
                currentPlayerDOM.innerText="X"
                event.target.innerHTML=`<p style="${oStyle}">${val}</p>`;
            }
            move++
            checkFound(val, idx)
            e.style.boxShadow="0 0 2px rgba(0,0,0,0.2)";
        }
    })
})

const resetGame=()=>{
    resultPanel.classList.remove("gameMenuVisual");
    resultPanel.style.pointerEvents="none";
    Array.from(button).forEach((e)=>{
        e.style.boxShadow="0 0 20px rgba(0,0,0,0.2)";
    })
    player="O";
    move=0;
    currentPlayerDOM.innerText="X"
    patternValue.forEach((array, idxOuter)=>{
        array.forEach((value, idxInner)=>{
            patternValue[idxOuter][idxInner]=PATTERN[idxOuter][idxInner]
        })
    })
    Array.from(button).forEach((e, idx)=>{
        e.classList.remove("visited")
        e.innerText=""
    })
    Array.from(lines).forEach((e)=>{
        e.classList.remove("active")
    })
}
