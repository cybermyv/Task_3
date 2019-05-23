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

    if (gameIsStarted) {


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
    }

    if (score === 8) {
        clearInterval(gameTimer);

        const el_strt = document.querySelector('.started');
        el_strt.classList.remove('started_on');
        el_strt.classList.add('started_off');

        gameIsStarted = false;
        alert('Вы выиграли\nЗатраченное время: ' + tmr);
    }

}

let sec = 0;
let min = 0;
let hour = 0;
let tmr = '';
let gameIsStarted = false;
let gameTimer;

function startGame() {
    gameIsStarted = true;

    const el_strt = document.querySelector('.started');
    const el_sec = document.querySelector('#sec');
    const el_min = document.querySelector('#min');
    const el_hour = document.querySelector('#hour');

    if (el_strt) {

        if (el_strt.classList.contains('started_on')) {
            el_strt.classList.remove('started_on');
            el_strt.classList.add('started_off');
        } else {


            el_strt.classList.remove('started_off');
            el_strt.classList.add('started_on');

            gameTimer = setInterval(function () {
                sec++;
                if (sec === 60) { min++; sec = 0 };
                if (min === 60) { hour++; min = 0 };
                if (hour < 10) { el_hour.innerHTML = '0' + hour } else { el_hour.innerHTML = hour };
                if (min < 10) { el_min.innerHTML = '0' + min } else { el_min.innerHTML = min };
                if (sec < 10) { el_sec.innerHTML = '0' + sec } else { el_sec.innerHTML = sec };
                tmr = el_hour.innerHTML + ' : ' + el_min.innerHTML + ' : ' + el_sec.innerHTML;
            }, 1000);

        }

    }
}