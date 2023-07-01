//Оголошуемо масив з номерів 22 карток
const deckLength = 22;
let deckOfCards = [];

//Наповнюємо його
// for (let i = 0; i <= (deckLength - 1); i++) {
//   deckOfCards.push(i);
// }

deckOfCards = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ];

//Визначаемо змінні
const inputField = document.getElementById('goal');
const goal = document.getElementById('goal-container');
const mix = document.getElementById('mix');
const table = document.getElementById('table');
const cards = document.querySelectorAll('.card');
const numberLeft = document.querySelector('.number-left');
const numberCenter = document.querySelector('.number-center');
const numberRight = document.querySelector('.number-right');
const definitionLeft = document.querySelector('.definition-left');
const definitionCenter = document.querySelector('.definition-center');
const definitionRight = document.querySelector('.definition-right');
const definitionMax = document.querySelector('.definition-max');
const definitionMin = document.querySelectorAll('.definition-min');
const definitionText = document.querySelectorAll('.definition-text');
const backs = document.querySelectorAll('.back');
const front = document.querySelectorAll('.front');
const flip = document.querySelector('.is-flipped');
let leftFace, centerFace, rightFace, leftDefinition, centerDefinition, 
rightDefinition, leftDefinitionReverse, centerDefinitionReverse, rightDefinitionReverse; 
 

    //Пуск з кнопки       
    mix.addEventListener('click', () => {
      fortuneTelling();    
    });
    
    //Пуск з поля инпут
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        fortuneTelling();
      }
    });
    
    //Для перетасування колоди
    let shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
    //Визначаемо орієнтацію карти
    const direction = [];
    function orientation(direction) {
      for (let i = 0; i < 3; i++) {
        const randomNum = Math.round(Math.random());
        direction.push(randomNum);
      }
      return direction;
    }
    
    //Визначаемо ціль, викладуемо карти
    function fortuneTelling() {
      //Перевертаемо сорочкою вгору якщо вже були відкриті карти
      cards.forEach(card => {
        card.classList.remove('is-flipped');
      });
      //Тасуємо колоду
      let deckShuffle = shuffle(deckOfCards);
      //Затверджуемо питання
      goal.innerHTML = inputField.value;
      inputField.value = "";
      //Карти на стіл
      table.style.display = "flex";
      //Надаемо їм значення
      
      //Перевертаемо
      cards.forEach(card => {
        card.addEventListener('click', () => {
          card.classList.add('is-flipped');   
        });
      });

      //Знаходимо данні
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          //Отриуемо лицьову сторону
           leftFace = data[deckShuffle[0]].face;
           centerFace = data[deckShuffle[1]].face;
           rightFace = data[deckShuffle[2]].face;
           leftDefinition = data[deckShuffle[0]].definition;
           centerDefinition = data[deckShuffle[1]].definition;
           rightDefinition = data[deckShuffle[2]].definition;
           leftDefinitionReverse = data[deckShuffle[0]].definitionReverse;
           centerDefinitionReverse = data[deckShuffle[1]].definitionReverse;
           rightDefinitionReverse = data[deckShuffle[2]].definitionReverse;
          })
          .catch(error => console.error(error));

      //Визначаемо орієнтацію карт розклада
      orientation(direction);
      

      //контроль значень
      console.log(deckShuffle[0], deckShuffle[1], deckShuffle[2]);
      console.log(direction);
  
      //Задаемо значення карт та пояснень
      function packaging () {
        if(direction[0] == 1){
          numberLeft.innerHTML = `<img src="${leftFace}" style="transform: rotate(180deg)"/>`;
          definitionLeft.innerHTML = `<h3>Що було</h3>`+`<br><br>`+`<p>${leftDefinitionReverse}</p>`;   
        }else{
          numberLeft.innerHTML = `<img src="${leftFace}"/>`;
          definitionLeft.innerHTML = `<h3>Що було</h3>`+`<br><br>`+`<p>${leftDefinition}</p>`;  
        };

        if(direction[1] == 1){
          numberCenter.innerHTML = `<img src="${centerFace}" style="transform: rotate(180deg)"/>`;
          definitionCenter.innerHTML = `<h3>Що буде</h3>`+`<br><br>`+`<p>${centerDefinitionReverse}</p>`;
        }else{
          numberCenter.innerHTML = `<img src="${centerFace}"/>`;
          definitionCenter.innerHTML = `<h3>Що буде</h3>`+`<br><br>`+`<p>${centerDefinition}</p>`;
        };

        if(direction[2] == 1){
          numberRight.innerHTML = `<img src="${rightFace}" style="transform: rotate(180deg)"/>`;
          definitionRight.innerHTML = `<h3>Чим серце заспокоється</h3>`+`<br><br>`+`<p>${rightDefinitionReverse}</p>`;
        }else{
          numberRight.innerHTML = `<img src="${rightFace}"/>`;
          definitionRight.innerHTML = `<h3>Чим серце заспокоється</h3>`+`<br><br>`+`<p>${rightDefinition}</p>`;
        };  
        //Обнуляємо чинник оріентації карт     
        direction.length = 0;
      };
      
//Обнуляємо пояснення карт
      definitionMin.forEach(item => {
        item.textContent = null;});

      definitionMax.innerHTML = null;

//Гальмуемо призначення змінних щоб попередньо відкриті карти встигли перевернутись сорочкою до гори
setTimeout(function(){
  packaging ();
  ofFocusAll();
      }, 500);
//Демонструемо пояснення до карт по кліку на лицьову сторону
      backs.forEach((backs, index) => {
        backs.addEventListener('click', () => {
          definitionMax.innerHTML = definitionText[index].innerHTML;
          definitionMin[index].innerHTML = definitionText[index].innerHTML;       
          ofFocusAll();
          backs.classList.add('inFocus');
    })});
  }

  //Убираемо сяйво
  function ofFocusAll() {
  for (let i = 0; i < backs.length; i++) {
    backs[i].classList.remove('inFocus'); } ;

  }
 

 
 
 
 
 
 
 
 
 
