(function() {
	'use strict';

	const el_strt = document.querySelector('.started');
	const el_sec = document.querySelector('#sec');
	const el_min = document.querySelector('#min');
	const el_hour = document.querySelector('#hour');
	const el_btn = document.querySelector('#start_game');
	const tbl = document.querySelector('#board');
	const tab_dimension = 4;
	const set_color = [];

	let first = '';
	let second = '';
	let score = 0;
	let sec = 0;
	let min = 0;
	let hour = 0;
	let tmr = '';
	let gameIsStarted = false;
	let gameTimer;

	el_btn.addEventListener('click', startGame);

	for (let i = 1; i < 9; i++) {
		set_color.push(i);
		set_color.push(i);
	}

	for (let i = set_color.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[ set_color[i], set_color[j] ] = [ set_color[j], set_color[i] ];
	}

	if (tbl) {
		let k = 0;

		while (k < set_color.length) {
			for (let i = 0; i < tab_dimension; i++) {
				const row = tbl.insertRow(i);

				for (let j = 0; j < tab_dimension; j++) {
					const cell = row.insertCell(j);

					cell.classList.add('colors' + set_color[k], 'invisible');

					cell.addEventListener('click', function() {
						getCell(this);
					});

					k++;
				}
			}
		}
	}

	function getCell(el) {
		if (gameIsStarted) {
			if (!el.classList.contains('done')) {
				el.classList.remove('invisible');

				if (first === '') {
					first = el;
				} else {
					second = el;
				}

				let x = first;
				let y = second;

				if (first !== '' && second !== '') {
					if (first.classList[0] === second.classList[0]) {
						score++;

						first.classList.add('done');
						second.classList.add('done');
					} else {
						setTimeout(function() {
							x.classList.add('invisible');
							y.classList.add('invisible');
						}, 200);
					}

					first = '';
					second = '';
				}
			}
		}

		if (score === 8) {
			clearInterval(gameTimer);
			el_strt.classList.remove('started_on');
			el_strt.classList.add('started_off');
			gameIsStarted = false;
			alert('Вы выиграли\nЗатраченное время: ' + tmr);
		}
	}
	function startGame() {
		if (gameIsStarted) {
			return;
		} else {
			gameIsStarted = true;
		}

		if (el_strt) {
			if (el_strt.classList.contains('started_on')) {
				el_strt.classList.remove('started_on');
				el_strt.classList.add('started_off');
			} else {
				el_strt.classList.remove('started_off');
				el_strt.classList.add('started_on');

				gameTimer = setInterval(function() {
					sec++;
					if (sec === 60) {
						min++;
						sec = 0;
					}
					if (min === 60) {
						hour++;
						min = 0;
					}
					if (hour < 10) {
						el_hour.innerHTML = '0' + hour;
					} else {
						el_hour.innerHTML = hour;
					}
					if (min < 10) {
						el_min.innerHTML = '0' + min;
					} else {
						el_min.innerHTML = min;
					}
					if (sec < 10) {
						el_sec.innerHTML = '0' + sec;
					} else {
						el_sec.innerHTML = sec;
					}
					tmr = el_hour.innerHTML + ' : ' + el_min.innerHTML + ' : ' + el_sec.innerHTML;
				}, 1000);
			}
		}
	}
})();
