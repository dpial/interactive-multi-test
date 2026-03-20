// Текущее состояние
let arrIndexsQuestions;                 // массив индексов вопросов (нужно инициализировать и перемешать)
let currentIndex = {                    // текущий индекс
    "test": 0,                          //  теста
    "question": 0,                      //  вопроса
    "end": false,                       //  вопросы закончились?
    // индекс следующего вопроса
    next: function(){
        let test = currentIndex.test+1;
        let question = currentIndex.question;
        for(let i=test; i<questions.length; i++){
            if(question < questions[i].length){
                currentIndex.test = test;
                return 0;
            }
        }
        test = 0;
        question++;
        for(let i=test; i<questions.length; i++){
            if(question < questions[i].length){
                currentIndex.test = test;
                currentIndex.question = question;
                return 0;
            }
        }
        currentIndex.end = true;
    }
};
let currentCount = 0;                   // пройдено вопросов, шт
let correctAnswersCount = 0;            // количество правильных ответов пользователя
let allCount = 0;                       // всего вопросов, шт
let isCorrect = false;                  // ответ на вопрос был правильным? (t/f)
let indexCorrectOption;                 // индекс правильного варианта ответа на текущий вопрос

// Элементы DOM
const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const resultBack = document.getElementById("back");
const resultBackQuestion = document.getElementById("back-question");
const resultBackOption = document.getElementById("back-option");

// Запускаем тест после загрузки DOM
document.addEventListener('DOMContentLoaded', init);

// Начальная инициализация
function init() {
    // инициализируем и перемешиваем массив индексов вопросов
    arrIndexsQuestions = new Array(questions.length);
    for(let i=0; i<arrIndexsQuestions.length; i++){
        arrIndexsQuestions[i] = arrIndexs(questions[i]);
        // подсчитаем общее количество вопросов
        allCount += questions[i].length;
    }

    // Подписываемся на клик кнопки
    nextBtn.addEventListener('click', onNextClick);
    // Отображаем первый вопрос
    renderQuestion();
}

// Функция отображения текущего вопроса
function renderQuestion() {
    const q = questions[currentIndex.test][ arrIndexsQuestions[currentIndex.test][currentIndex.question] ];
    questionEl.textContent = q.question;

    // Очищаем контейнер с вариантами
    optionsContainer.innerHTML = '';

    // Запоминаем правильный ответ на текущий вопрос
    indexCorrectOption = q.correct;

    // Перемешаем варианты ответов через массив индексов
    let arrIndexsOptions = arrIndexs(q.options);

    // Создаём радиокнопки для каждого варианта
    for(let i=0; i<arrIndexsOptions.length; i++){
        let index = arrIndexsOptions[i];
        let option = q.options[index];

        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';          // все радиокнопки в группе с одним именем
        radio.value = index;
        radio.id = `option-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option;

        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    }
}

// Обработчик кнопки «Далее»
function onNextClick() {
    // Фиксация правильности ответа и отображения текущей информации (результата)
    saveCurrentAnswer();

    // Показывать результат после каждого вопроса
    showResult();

    // Проверяем, есть ли следующий вопрос
    currentIndex.next();
    if (currentIndex.end === false) {
        // Переходим к следующему вопросу
        currentCount++;
        renderQuestion();
    }
}

// Функция фиксации правильности ответа и отображения текущей информации (результата)
function saveCurrentAnswer() {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        // если ответ правильный, то +1 к правильным ответам
        if(parseInt(selectedRadio.value, 10) === indexCorrectOption) {
            correctAnswersCount++;
            isCorrect = true;
        } else {
            isCorrect = false;
        }
    } else {
        // Если ничего не выбрано, можно сохранять null или что нибудь другое
        isCorrect = false;
    }
}

// Функция отображения результата
function showResult() {
    let now;

    if(isCorrect) now=1; else now=0;

    // Показываем результат
    resultEl.textContent = `+${now}. Правильных ответов ${correctAnswersCount} из ${currentCount+1}. Всего вопросов ${allCount}.`;
    if (isCorrect) {
        resultBack.style.display = 'none';
    } else {
        resultBackQuestion.textContent = questions[currentIndex.test][ arrIndexsQuestions[currentIndex.test][currentIndex.question] ].question;
        resultBackOption.textContent = questions[currentIndex.test][ arrIndexsQuestions[currentIndex.test][currentIndex.question] ].options[indexCorrectOption];
        resultBack.style.display = 'block';
    }
}

// Массив индексов другого массива (для перемешивания индексов)
function arrIndexs(arr){
    let arrIndexs = new Array(arr.length);
    //заполним
    for (let i=0; i<arrIndexs.length; i++){arrIndexs[i] = i;}
    //перемешаем
    for (let i = arrIndexs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arrIndexs[i], arrIndexs[j]] = [arrIndexs[j], arrIndexs[i]]; // Обмен элементов
    }
    return arrIndexs;
}
