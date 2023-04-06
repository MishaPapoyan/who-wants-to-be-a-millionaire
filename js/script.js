//խաղը ցույց տալու համար

const main = document.querySelector('.main')
const mainGame = document.querySelector('.main > .game')
const play = document.querySelector('.play')
const rules = document.querySelector('.rules > h1')
const showRules = document.querySelector('.rules > .show')
//------------------------------------

// հարցեր և պատասխաններ			

const question = document.querySelector('.questions > h2')
const answers1 = document.getElementById('first')
const answers2 = document.getElementById('two')
const answers3 = document.getElementById('thirth')
const answers4 = document.getElementById('forth')

//-------------------------------------

// օգնության հնարավորություններ

	const helpCall = document.querySelector('.help > .call > img')
	const helpFifty_fifty = document.querySelector('.help > .fifty_fifty > h2')
	const helpHall = document.querySelector('.help > .hall > img')
	const hallProcent = document.querySelector('.hallProcent')
	const takeMoney = document.querySelector('.take-money')
	// 50 / 50 -ի համար
	let x = Math.floor(Math.random() * 3 + 1)
	let y = Math.floor(Math.random() * 3 + 1)


//----------------------------------

// գումարը և անձեռնմխելի գումարը
const showMoney = document.querySelector('.money')
const showUntouchableAmount = document.querySelector('.untouchable-amount')
const h3s = document.querySelectorAll('.money-tree > h3')
let money = 0
let untouchableAmount = 0
//---------------

// հարցը փոխելու լոգիկաի համար 

let currentQuestionIndex = 0
const variants = [answers1, answers2, answers3, answers4]

//-----------------------------


class Questions {
	constructor(_question, _answer1, _answer2, _answer3, _answer4, _currentAnswer) {
		this.question = _question
		this.answer1 = _answer1
		this.answer2 = _answer2
		this.answer3 = _answer3
		this.answer4 = _answer4
		this.currentAnswer = _currentAnswer
	}
}

mainGame.addEventListener('click', () => {
	play.style.display = ''
	main.style.display = 'none'
	rules.style.display = 'none'

})
rules.addEventListener('click', () => {
	showRules.style.display = 'block'
	rules.style.display = 'none'
	main.style.display = 'none'

})
function generatorQuestions(game) {
	const currentQuestion = game[currentQuestionIndex];
	question.innerText = currentQuestion.question;
	answers1.innerText = currentQuestion.answer1;
	answers2.innerText = currentQuestion.answer2;
	answers3.innerText = currentQuestion.answer3;
	answers4.innerText = currentQuestion.answer4;

	helpHall.addEventListener('click', () => {

		hallProcent.style.display = ''
		setTimeout(() => { hallProcent.style.display = 'none' }, 3000)
		helpHall.style.display = 'none'

	})

}

function checkQuestion(game) {
	let val = 14

	variants.map((item) => {
		item.addEventListener('click', () => {

			let currentQuestion = game[currentQuestionIndex];
			let rightAnswer = currentQuestion.currentAnswer
			h3s[val].classList.add('money')
			item.style.background = 'yellow'
			if (item.innerText === rightAnswer) {
				setTimeout(() => { item.style.background = 'green' }, 1000)
				setTimeout(() => {
					item.style.background = '';
					if (currentQuestionIndex < 14) {
						val--
						currentQuestionIndex++;
					} else {
						play.innerHTML = `շնորհակալություն խաղը ավարտվեց դուք շահեցիք ${money * 2} դրամ`
						
						setTimeout(() => {
							location.reload()
						}, 3000);
					}
					generatorQuestions(game);

					money = currentQuestionIndex === 0 ? 100 : (currentQuestionIndex <= 3 ? money + 100 : (currentQuestionIndex === 4 ? money + 200 : (currentQuestionIndex === 12 ? money + 61000 : money * 2)));

					if (currentQuestionIndex >= 5) {
						untouchableAmount = 1000
					}
					if (currentQuestionIndex >= 10) {
						untouchableAmount = 32000
					}
					showMoney.innerHTML = `դուք ունեք ${money} դրամ`
					showUntouchableAmount.innerHTML = `դուք ունեք ${untouchableAmount} անձեռնմխելի գումար`

				}, 2000);

			} else {
				if (currentQuestionIndex <= 5) {
					setTimeout(() => {
						item.style.background = 'red';
						alert(`ցավում  եմ դուք չհաղթեցիք բայց շահեցիք 0 դրամ`)
						location.reload()
					}, 1500)

				} else if (currentQuestionIndex >= 5 || currentQuestionIndex <= 10) {
					setTimeout(() => {
						item.style.background = 'red';
						alert(`ցավում  եմ դուք չհաղթեցիք բայց շահեցիք ${untouchableAmount} դրամ`)
						location.reload()
					}, 1500)

				} else if (currentQuestionIndex >= 10) {
					console.log(untouchableAmount)
					alert(`ցավում  եմ դուք չհաղթեցիք բայց շահեցիք ${untouchableAmount} դրամ`)
				}
				setTimeout(() => { item.style.background = '' }, 2000);
			}

		})

		helpFifty_fifty.addEventListener('click', () => {

			let currentQuestion = game[currentQuestionIndex];
			let rightAnswer = currentQuestion.currentAnswer
			for (let i = 0; i < variants.length; i++) {
				while (true) {
					if (variants[x].innerText !== rightAnswer && variants[y].innerText !== rightAnswer && x !== y) {
							variants[x].disabled = true
							variants[y].disabled = true
							helpFifty_fifty.innerHTML = ''
							setTimeout(() => { variants[x].disabled = false; variants[y].disabled = false }, 4000)
					break
					} else {
						x = Math.floor(Math.random() * 3)
						y = Math.floor(Math.random() * 3)
					}
				}
			}
		})

	})

	helpCall.addEventListener('click', () => {
		let x = Math.floor(Math.random() * 3 + 1)
		alert(variants[x].innerText)
		helpCall.style.display = 'none'
	})

	takeMoney.addEventListener('click', () => {
		alert(`շնորհավորում եմ դուք վերցրեցիք գումարը և շահեցիք ${money} դրամ`)
		setTimeout(() => { location.reload() }, 1500)
	})

}

let game = [
	new Questions('Որն է Հայաստանի մայրաքաղաքը', 'Գյումրի', 'Երևան', 'Վանաձոր', 'Գորիս', 'Երևան'),
	new Questions('Որն է Ռուսաստանի մայրաքաղաքը ', 'Լենինգռադ', 'Դոնի-Ռոստով', 'Մոսկվա ', 'Վոռոնեժ', 'Մոսկվա'),
	new Questions('Որն է ԱՄՆ-նի մայրաքաղաքը', 'Գլենդել', 'Լոս-Անջելես', 'Նյու-Յորկ', 'Վաշինգթւն ', 'Վաշինգթւն'),
	new Questions('Որն է Իսպանիա մայրաքաղաքը', 'Մադրիդ', 'Բարսելոնա', 'Գրանադա', 'Տեներիֆե', 'Մադրիդ'),
	new Questions('Որն է Ֆրանսիաի մայրաքաղաքը', 'Լիոն', 'Փարիզ ', 'Մարսել', 'Նանտ', 'Փարիզ'),
	new Questions('Նշվածներից որն է մեքենաի բրենդ', 'Iphone', 'Ikea', 'BMW ', 'HP', 'BMW'),
	new Questions('Նշվածներից որն է համակարգչի բրենդ', 'IMAC', 'ASUS', 'DELL', 'SAMSUNG ', 'SAMSUNG'),
	new Questions('Նշվածներից որն է հեռախոսի բրենդ', 'Նշված բորոր տարբերակները', 'LG', 'HONOR', 'XIAOMI', 'Նշված բորոր տարբերակները'),
	new Questions('Նշվածներից որն է հագուստի բրենդ', 'MCDINALDS', 'DEBEMHAMS ', 'KFC', 'ASTON-MARTIN', 'DEBEMHAMS'),
	new Questions('Նշվածներից որն է ըմպելիքի բրենդ', 'TWIX', 'SNICKERS', 'COCA-COLA ', 'PUMA', 'COCA-COLA'),
	new Questions('Ծրագրավորման մեջ ինչի համար են օգտագործվում HTML/CSS - ը', 'Դոմեյնի համար', 'Դինամիկության համար', 'Սերվերների համար', 'Կայքի արտաքին տեսքի համար ', 'Կայքի արտաքին տեսքի համար'),
	new Questions('Ծրագրավորման մեջ ինչի համար են օգտագործվում PYTHON  - ը', 'Նշված բորոր տարբերակները', 'AI', 'ML', 'Back-end', 'Նշված բորոր տարբերակները'),
	new Questions('Ծրագրավորման մեջ ինչի համար են օգտագործվում NODE JS - ը', 'FRONT-END', 'BACK-END ', 'ML', 'AI', 'BACK-END'),
	new Questions('Ծրագրավորման մեջ ինչի համար են օգտագործվում REACT JS - ը', 'AI', 'BACK-END', 'FRONT-END ', 'SERVER-SIDE', 'FRONT-END'),
	new Questions('Ծրագրավորման մեջ ինչի համար են օգտագործվում DJANGO - ը', 'BACK-END', 'FRONT-END', 'ML', 'AI', 'BACK-END')
]

generatorQuestions(game);
checkQuestion(game)
