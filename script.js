window.onload = function () {
    const el_btn = document.querySelector('#start_game');
    if (el_btn) {
        el_btn.addEventListener('click', function () {
            startGame();
        })
    }

    createTable();
}

function createTable() {

    let colors$ = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

    for (let i = colors$.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors$[i], colors$[j]] = [colors$[j], colors$[i]];
    };


    const tbl = document.querySelector('#board');

    if (tbl) {

        let k = 0;

        while (k < colors$.length) {

            for (let i = 0; i < 4; i++) {
                let row = tbl.insertRow(i);

                for (j = 0; j < 4; j++) {
                    let cell = row.insertCell(j);


                    cell.innerHTML = colors$[k];
                    cell.classList.add('colors' + colors$[k]);
                    cell.classList.add(k);
                    cell.classList.add('invisible');

                    cell.addEventListener('click', function () {
                        getCell(this);
                    })

                    k++;
                }
            }
        }
    }
}

let first = '';
let second = '';
let score = 0;


function getCell(el) {


    if (!el.classList.contains('done')) {

        el.classList.remove('invisible');

        if (first === '') { first = el } else { second = el };

        let x = first;
        let y = second;

        if (first !== '' && second !== '') {
            if (first.classList[0] === second.classList[0]) {

                score++;

                first.classList.add('done');
                second.classList.add('done');

            } else {

                setTimeout(function () {
                    x.classList.add('invisible');
                    y.classList.add('invisible');
                }, 500);
            }

            first = '';
            second = '';
        }
    }

    if (score === 8) alert('вы выиграли')
}



function startTimer(action) {

    
}

function startGame() {

    console.log('game ready to go!');
    // startTimer(start);
}