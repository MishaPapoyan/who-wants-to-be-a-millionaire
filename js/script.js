

class Game {
    constructor(playerName, playerSurName){
        this.playerName = playerName;
        this.playerSurName = playerSurName;
        this.unTachMonay =0;
        this.money = 0
        this.currentIndex = 0




    }

    play(){
        const ques = [
            new Question("What is the capital of Armenia?", new Answer(['Yerevan', 'Gyumri', 'Vanadzor', 'Goris'])),
            new Question("What is the capital of Russia?", new Answer(['Moscow', 'Doni-Rostov', 'Leningrad', 'Voronezh'])),
            new Question("What is the capital of the United States?", new Answer(['Washington, D.C.', 'Los Angeles', 'New York', 'Glendale'])),
            new Question("What is the capital of Spain?", new Answer(['Madrid', 'Barcelona', 'Granada', 'Tenerife'])),
            new Question("What is the capital of France?", new Answer(['Paris', 'Lyon', 'Marseille', 'Nantes'])),
            new Question("Which one is a brand of a car?", new Answer(['BMW', 'Ikea', 'iPhone', 'HP'])),
            new Question("Which one is a brand of a computer?", new Answer(['Various models', 'ASUS', 'DELL', 'SAMSUNG'])),
            new Question("Which one is a brand of a mobile phone?", new Answer(['Various models', 'LG', 'HONOR', 'XIAOMI'])),
            new Question("Which one is a brand of a fast-food restaurant?", new Answer(['DEBENHAMS', "MCDONALD'S", 'KFC', 'ASTON-MARTIN'])),
            new Question("Which one is a brand of a soft drink?", new Answer(['COCA-COLA', 'SNICKERS', 'TWIX', 'PUMA'])),
            new Question("What is HTML/CSS used for in programming?", new Answer(['For the external appearance of the site', 'For dynamic content', 'For server-side', 'For domain hosting'])),
            new Question("What is Python used for in programming?", new Answer(['Various models', 'AI', 'Machine Learning (ML)', 'Back-end'])),
            new Question("What is NODE JS used for in programming?", new Answer(['Back-end', 'Front-end', 'ML', 'AI'])),
            new Question("What is REACT JS used for in programming?", new Answer(['Front-end', 'Back-end', 'AI', 'Server-Side'])),
            new Question("What is DJANGO used for in programming?", new Answer(['Back-end', 'Front-end', 'ML', 'AI']))
        ]
        this.askQuestion(ques,this.currentIndex)
        this.showQuestion(ques,this.currentIndex)
        this.showRes(this.currentIndex)


    }
    showQuestion(ques,indexNum){
        let variants = document.querySelectorAll(".answers  button")
        const head = document.getElementById('q')
        head.innerHTML = ques[indexNum].question
        let options = ques[indexNum].answer.options
        let max = 3
        let min = 0
        let x = Math.floor(Math.random() * (max - min + 1)) + min;
        let y = Math.floor(Math.random() * (max - min + 1)) + min;
        while (true){
            let valX = x
            let valY = y
            if (x !== y){
                variants[y].innerText = options[x]
                variants[x].innerText = options[y]

                x = Math.floor(Math.random() * (max - min + 1)) + min;
                y = Math.floor(Math.random() * (max - min + 1)) + min;

                if((x !== valX && x !== valY && x !== y)&& (y !== valY && y !== valX) ) {
                    variants[y].innerText = options[x]
                    variants[x].innerText = options[y]
                    break
                }else {
                    x = Math.floor(Math.random() * (max - min + 1)) + min;
                    y = Math.floor(Math.random() * (max - min + 1)) + min;
                }
            }else {
                x = Math.floor(Math.random() * (max - min + 1)) + min;
                y = Math.floor(Math.random() * (max - min + 1)) + min;
            }


        }

    }
    showRes(currentIndex){
        const currentMoney = document.getElementById('spanForCM')
        const unTachMonay = document.getElementById('spanForCUM')
        // let  moneyToShow = currentQuestionIndex === 1 ? 100 : (currentQuestionIndex <= 3 ? this.money + 100 : (currentQuestionIndex === 4 ? this.money + 200 : (currentQuestionIndex === 12 ? this.money + 61000 : this.money * 2)));

        if (currentIndex === 1){
            this.money = 100
        }else if(currentIndex >1 && currentIndex <= 3){
            this.money += 100
        }else if(currentIndex === 4){
            this.money += 200
        }else if(currentIndex === 5){
            this.unTachMonay = 1000
            this.money *= 2
        }else if(currentIndex === 10){
            this.unTachMonay = 32000
            this.money *= 2
        }else if(currentIndex === 12){
            this.money += 61000
        }else {
            this.money *= 2
        }

        currentMoney.innerText = `Your money = ${this.money}`
        unTachMonay.innerText = `Your unTachMonay = ${this.unTachMonay}`
    }
    askQuestion(ques,currentIndex){
        // let variants = document.querySelectorAll(".answers  div  button")
        // console.log(variants)
        let variants = document.querySelectorAll(".answers button");
        let h3s = document.querySelectorAll("h3")

        let val = 14
        let fifty_fifty = document.getElementById('fifty-fifty')
        const takeMoney = document.getElementById('takeMoney')
        const helpCall = document.querySelector('#call')
        let helpHall = document.getElementById('hall')
        let changeQuestion = document.getElementById('changeQuestion')
        variants.forEach((item)=>{

            item.addEventListener('click',()=>{
                item.style.background = 'yellow'
                if(item.innerText === ques[currentIndex].answer.options[0]){
                        setTimeout(()=> {
                            item.style.background = 'green'
                            h3s[val].style.color = 'teal'
                            val--
                            setTimeout(() => {
                                item.style.background = ''
                            }, 1500)
                        },1500)
                        setTimeout(()=>{
                            if (currentIndex < 14){
                                currentIndex++
                                if(currentIndex === 5){
                                    changeQuestion.style.display = ''
                                }
                                this.showRes(currentIndex)
                                this.showQuestion(ques, currentIndex)
                            }else {
                                this.finish()
                            }
                        },3000)
                }else{
                    setTimeout(() => {
                        item.style.background = 'red'
                        location.reload()
                    },1500)
                }
            })

        })

        fifty_fifty.addEventListener('click',()=>{
            this.fiftyFifty(ques,currentIndex)
        })
        takeMoney.addEventListener('click',()=>{
            this.takeMoney(ques,currentIndex)
        })
        helpCall.addEventListener('click',()=>{
            this.call(ques,currentIndex)
        })
        helpHall.addEventListener('click',()=>{
            this.hall(ques,currentIndex)
        })
        changeQuestion .addEventListener('click',()=>{
            this.changeQuestion(ques,currentIndex)
        })

    }
    fiftyFifty(ques, currentIndex){
        let variants = document.querySelectorAll(".answers > div > button")
        let fifty_fifty = document.getElementById('fifty-fifty')
        // for random generate numbers starts with 0
        let max = 3
        let min = 0
        let x = Math.floor(Math.random() * (max - min + 1)) + min;
        let y = Math.floor(Math.random() * (max - min + 1)) + min;
        //---------------------------------------------

            let rightAnswer = ques[currentIndex].answer.options[0]

            while (true){
                if ((x !== 0 && y !== 0) &&( x !== y) ){
                    if ((variants[x].innerText !== rightAnswer && variants[y].innerText !== rightAnswer)){
                        variants[x].style.display = 'none'
                        variants[y].style.display = 'none'
                        fifty_fifty.innerHTML = ''
                        break
                    }else {
                        x = Math.floor(Math.random() * 3 +1)
                        y = Math.floor(Math.random() * 3 +1)
                    }
                }else {
                    x = Math.floor(Math.random() * 3 +1)
                    y = Math.floor(Math.random() * 3 +1)
                }
            }
             variants.forEach((item)=>{
                 item.addEventListener('click',()=>{
                     variants[x].style.display = ''
                     variants[y].style.display = ''

                 })
             })

    }

    call(ques,currentIndex){
            document.querySelector('#call').style.display = 'none'
            const rightAnswer = ques[currentIndex].answer.options[0]
            alert(rightAnswer)
    }

    hall(ques, currentIndex){
        let variants = document.querySelectorAll("button")
        let showHall = document.querySelector('.show-hall div')
        let rightAnswer = null
        let a;
        let b;
        let c;
        let d;
        const wrongAnswers = []
        const arr = []


        variants.forEach((item,event)=>{
            if (item.innerText === ques[currentIndex].answer.options[0]){
                rightAnswer = item.id

            }else {
                wrongAnswers.push(item)
            }

            wrongAnswers.map((item)=>{
                for (let i = 0; i < wrongAnswers.length; i++) {
                    if (!arr.includes(item.id)) {
                        arr.push(item.id)
                    }
                }

            })



        })
        for (let item = 0; item < arr.length; item++) {

                while (true){
                    arr[item] === 'A' ? a = arr[item] : null;
                    arr[item] === 'B' ? b = arr[item] : null;
                    arr[item] === 'C' ? c = arr[item] : null;
                    arr[item] === 'D' ? d = arr[item] : null;

                    if (rightAnswer !== "A" ||  rightAnswer !== "B" || rightAnswer !== "C" || rightAnswer !== "d"  ){
                        break
                    }else {
                        item++
                    }
                }
            }
            showHall.innerText =
                `
                             ${rightAnswer === 'A' ? rightAnswer   +   '60%'  :a + ' 15%'}
                             ${rightAnswer === 'B' ?  rightAnswer   + ' 60%'  :b + ' 15%'}
                             ${rightAnswer === 'C' ?  rightAnswer   + ' 60%'  :c + ' 15%'}
                             ${rightAnswer === 'D' ?  rightAnswer   + ' 60%'  :d + ' 15%'}
                        `
        setTimeout(()=>{
            showHall.innerText = ''
        },1500)


        let helpHall = document.getElementById('hall').style.display = 'none'

    }
    changeQuestion(ques,currentIndex){
        const head = document.getElementById('q')
        let variants = document.querySelectorAll(".answers  button")
        let wrongVariants = [variants[1],variants[2], variants[3],]
        let changedQuestion = new Question("Որն մայրցամաքի վրա է գտնվում Հայաստան-ը ", new Answer(['եվրասիա', 'հարավաիին ամերիկա ', 'հյուսիսաին ամերիկա', 'աֆրիկա']))
        head.innerHTML = changedQuestion.question
        variants[0].innerHTML = changedQuestion.answer.options[0]
        variants[1].innerHTML = changedQuestion.answer.options[1]
        variants[2].innerHTML = changedQuestion.answer.options[2]
        variants[3].innerHTML = changedQuestion.answer.options[3]

        variants[0].addEventListener('click', () => {
            setTimeout(() => {
                variants[0].style.background = 'green';
                setTimeout(() => {
                    variants[0].style.background = '';
                }, 1500);
            }, 1500);
            setTimeout(() => {
                if (currentIndex < 14) {
                    this.showRes(currentIndex);
                    this.showQuestion(ques, currentIndex);
                }
            }, 3000);
        });

        wrongVariants.map((item) => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    item.style.background = 'red';
                }, 1500);
            });
        });
    }


    finish(currentIndex){
        document.getElementById('finish').style.display = ''
        const h1 = document.querySelector('.finish-game > h1')
        const p = document.querySelector('.finish-game > p')
        h1.innerText = `${this.playerSurName} ${this.playerName}`

        if (currentIndex < 4){
            p.innerText = `${this.money}`
            console.log(currentIndex)
        }else if(currentIndex >= 4 && currentIndex <= 9){
            p.innerText = `${this.unTachMonay}`
        }else if(currentIndex >= 9){
            p.innerText = `${this.unTachMonay}`
        }else {
            p.innerText = `1.000.000`
        }




        return h1
    }

    takeMoney(ques,currentIndex){
        alert('դուք վերցրեցիք գումարը։ Այն կազմում է ' + this.money + "դրամ")
        location.reload()
    }
}
class Question {
    constructor(question,answer){
        this.question = question;
        this.answer = answer;
    }
}

class Answer {
    options=[];
    constructor(options){
        this.options = options
    }

}
class Help {
    static half(anwser){
        const result = [];
        result.push(anwser.options[0])
        const randIndex = Math.floor(Math.random()*anwser.options.length+1)
        result.push(anwser.options[randIndex]);
        return  result
    }
}

const milioner = new Game("Misha",'Papoyan');
milioner.play()

