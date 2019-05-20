window.onload = function () {
    const el_btn = document.querySelector('#start_game');

    if (el_btn) {
        el_btn.addEventListener('click', function () {
            startGame();
        })
    }
}

function startTimer(action) {

    if (action) {
        console.log('timer start');
    } else {
        console.log('timer stop');
    }
}

function startGame() {

    let start = false;
    console.log('game ready to go!');

    //-- ожидать повторного нажатия на кнопку    

    if (start === false) {
        start = true
    } else {
        start = false
    }

    startTimer(start);
    // return;
}