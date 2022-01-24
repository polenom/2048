const newGame = document.querySelector(".button_new_game");
const gameSpace = document.querySelector(".tile-container");
let game = [0,0,0,0].map(element=> [0,0,0,0]);
let change = [0,0,0,0].map(element=> [0,0,0,0]);
let gameStatus = true;

function animationMove(x,y,z ) {

}


function four_or_two() {
    return (Math.trunc(Math.random()*13) <= 4)?4:2;
}

function createTitleCSS(x,y,value, newElement = "title_new") {
    let div = document.createElement('div')
    div.className = `title poz_${x+1}_${y+1} title_${value} `
    div.innerHTML = `<div class="${newElement}">${value}</div>`;
    gameSpace.append(div)
}

function createTitle() {
    let x = Math.trunc(Math.random()*3.1);
    let y = Math.trunc(Math.random()*3.1);
    while (game[x][y] != 0) {
        console.log(x,y,"random");
        if ( x*y >= 9) {
            x = 0;
            y = 0;
        }
        else if (y < 3) {
            y++;
        } else {
            x++;
            y=0;
        }
    }
    let value = four_or_two();
    game[x][y] = value;
    createTitleCSS(x, y, value);
    
}


function clickStartGame() {
    document.getElementById("wingame").style.visibility = null;
    document.getElementById("losegame").style.visibility = null;
    gameStatus = true;
    gameSpace.querySelectorAll('.title').forEach(element => {
        element.remove();
    });
    game = game.map(()=> [0,0,0,0] )
    createTitle();
    createTitle();
}

function moveTitleCordinate(x,y,direction) {
    let newPosX,newPosY;
    
    switch (direction) {
        case "left":
            for (let i = y - 1; y >= 0; i--  ){
                
                if ( game[x][i] === game[x][y] && change[x][i] === 0) {
                    change.forEach(e => console.log(e,"change"));
                    change[x][i] = 1;
                    return [x,i];
                } else if (game[x][i] != game[x][y] && game[x][i] != 0) {
                    change[x][i+1] = i+1 === y?0:1;
                    return [x,i+1]
                } else {
                    newPosX = x;
                    newPosY = i;
                }
            }
            if (newPosY != y) {
                change[newPosX][newPosY] = 1;
            }
            return [newPosX,newPosY];
            break;
        case "up":
            for (let i = x - 1; i >= 0; i--  ){
                
                if ( game[i][y] === game[x][y] && change[i][y] === 0) {
                    change.forEach(e => console.log(e,"change"));
                    change[i][y] = 1;
                    return [i,y];
                } else if (game[i][y] != game[x][y] && game[i][y] != 0) {
                    change[i+1][y] = i+1 === x?0:1;
                    return [i+1,y]
                } else {
                    newPosX = i;
                    newPosY = y;
                }
            }
            if (newPosX != x) {
                change[newPosX][newPosY] = 1;
            }
            return [newPosX,newPosY];
            break;
        case "right":
            for (let i = y + 1; i <= 3; i++  ){
                
                if ( game[x][i] === game[x][y] && change[x][i] === 0) {
                    change.forEach(e => console.log(e,"change"));
                    change[x][i] = 1;
                    return [x,i];
                } else if (game[x][i] != game[x][y] && game[x][i] != 0) {
                    change[x][i-1] = i-1 === y?0:1;
                    return [x,i-1]
                } else {
                    newPosX = x;
                    newPosY = i;
                }
            }
            if (newPosY != y) {
                change[newPosX][newPosY] = 1;
            }
            return [newPosX,newPosY];
            break;
        case "down":
            for (let i = x +1; i <= 3; i++  ){
                
                if ( game[i][y] === game[x][y] && change[i][y] === 0) {
                    change.forEach(e => console.log(e,"change"));
                    change[i][y] = 1;
                    
                    return [i,y];
                } else if (game[i][y] != game[x][y] && game[i][y] != 0) {
                    change[i-1][y] = i-1 === x?0:1;
                    return [i-1,y]
                } else {
                    newPosX = i;
                    newPosY = y;
                }
            }
            if (newPosX != x) {
                change[newPosX][newPosY] = 1;
            }
            return [newPosX,newPosY];
            break;
    }
   
}
function checkTitle(x,y,newPosTitle,direction) {
    console.log(x,y);
    console.log(newPosTitle);
    let coun = (x,y,newPosTitle,direction) => {
        switch(direction) {
            case "left":
                return y - newPosTitle[1];
            case "up":
                return x - newPosTitle[0];
            case "right":
                return newPosTitle[1] - y ;
            case "down":
                return newPosTitle[0] - x;
        }
    };
    if (newPosTitle[0] === x && newPosTitle[1] === y ) {
        true;
    } else if (game[newPosTitle[0]][newPosTitle[1]] != 0) {
        console.log(game);
        console.log(game[newPosTitle[0]][newPosTitle[1]],"znal");
        game[newPosTitle[0]][newPosTitle[1]] += game[x][y];
        game[x][y] = 0
        
        console.log(`.poz_${x+1}_${y+1}`);
        gameSpace.querySelector(`.poz_${x+1}_${y+1}`).remove();
        console.log(`.poz_${newPosTitle[0]+1}_${newPosTitle[1]+1}`);
        gameSpace.querySelector(`.poz_${newPosTitle[0]+1}_${newPosTitle[1]+1}`).remove();
        createTitleCSS(newPosTitle[0],newPosTitle[1],game[newPosTitle[0]][newPosTitle[1]])

    } else {
        game[newPosTitle[0]][newPosTitle[1]] = game[x][y];
        game[x][y] = 0;
        
        gameSpace.querySelector(`.poz_${x+1}_${y+1}`).classList.add(`move_${direction}${coun(x,y,newPosTitle,direction)}`);
        console.log(`move_${direction}${coun(x,y,newPosTitle,direction)}`, 111111111111111111111111111111111111);
        setTimeout(()=> {gameSpace.querySelector(`.poz_${x+1}_${y+1}`).remove();
                    
                    },100);
        createTitleCSS(newPosTitle[0],newPosTitle[1],game[newPosTitle[0]][newPosTitle[1]], '')
    }
}

function moveArray(direction) {
    
    
    change = [0,0,0,0].map(element=> [0,0,0,0]);
    
    switch (direction) {
        case "left":
            for (let x = 0; x <= 3;x++) {
                for (let y = 1; y <= 3; y++ ) {
                    if (game[x][y] != 0) {
                    let newPosTitle = moveTitleCordinate(x,y,direction);
                    checkTitle(x, y, newPosTitle, direction);
                    }
                }
            }
            break;
        case "up":
            for (let y = 0; y <= 3;y++) {
                for (let x = 1; x <= 3; x++ ) {
                    if (game[x][y] != 0) {
                    let newPosTitle = moveTitleCordinate(x,y,direction);
                    
                    checkTitle(x, y, newPosTitle, direction);
                 
                    }
                }
            }
            break;
        case "right":
            console.log('start');
            for (let x = 0; x <= 3; x++) {
                for (let y = 2; y >= 0; y-- ) {
                    if (game[x][y] != 0) {
                        
                        let newPosTitle = moveTitleCordinate(x,y,direction);
                        console.log(x,y);
                        console.log(newPosTitle);
                        console.log(game);
                        checkTitle(x, y, newPosTitle, direction);
                       
                        }
                    }
                }
            break;
        case "down":
            for (let y = 0; y <= 3;y++) {
                for (let x = 2; x >= 0; x-- ) {
                    if (game[x][y] != 0) {
                    let newPosTitle = moveTitleCordinate(x,y,direction);
                    
                    checkTitle(x, y, newPosTitle, direction);
                 
                    }
                }
            }
            break;
    }
    console.log(change,"CHANGE");
    if (change.filter(element => element.includes(1)).length >= 1) {
        createTitle();
    }

}
function checkWin() {
    if (game.filter(e => e.includes(2048)).length >= 1) {
        console.log("WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
        document.getElementById("wingame").style.visibility = "visible";
        gameStatus = false;
    }
}

function checkLose() {
    let res = 0;
  
    if (game.filter(e => e.includes(0)).length === 0) {
        
        for (let i = 0; i <= 2; i++) {
            for (let i1= 0; i1 <= 3; i1++) {
                
                if (game[i1][i] != game[i1][i+1] && game[i][i1] != game[i+1][i1]  ) {
                    res+=1;
                }

            }
        }
    }
    if (res === 12) {
        console.log("LOSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        document.getElementById("losegame").style.visibility = "visible";
        gameStatus = false;
    } 
}

clickStartGame() 

newGame.addEventListener("click", clickStartGame);
document.addEventListener("keydown", function(e) {
    if (gameStatus) {
        if (e.keyCode === 37 ) {
            console.log('left');
            moveArray('left');
            
        } else if (e.keyCode ===38 ) {
            console.log("up");
            moveArray('up');
        } else if (e.keyCode === 39 ) {
            console.log("right");
            moveArray('right');
        } else if (e.keyCode === 40) {
            console.log('down');
            moveArray('down');
        }
    }
    checkWin();
    checkLose();
})
