// Текущее состояние
let arrIndexsQuestions;                 // массив индексов вопросов (нужно инициализировать и перемешать)
let currentIndex;                       // текущий индекс, массива индексов, для получения вопроса
let correctAnswersCount;                // количество правильных ответов пользователя
let indexCorrectOption;                 // индекс правильного варианта ответа на текущий вопрос

// Элементы DOM
const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

// Запускаем тест после загрузки DOM
document.addEventListener('DOMContentLoaded', init);

// Начальная инициализация
function init() {
    // инициализируем и перемешиваем массив индексов вопросов
    arrIndexsQuestions = arrIndexs(questions);
    currentIndex = 0;
    correctAnswersCount = 0;

    // Подписываемся на клик кнопки
    nextBtn.addEventListener('click', onNextClick);
    // Отображаем первый вопрос
    renderQuestion();
}

// Функция отображения текущего вопроса
function renderQuestion() {
    const q = questions[ arrIndexsQuestions[currentIndex] ];
    questionEl.textContent = q.question;

    // Очищаем контейнер с вариантами
    optionsContainer.innerHTML = '';

    // Запоминаем правильный ответ на текущий вопрос
    indexCorrectOption = q.correct;

    // Перемешаем варианты ответов через массив индексов
    let arrIndexsOptions = arrIndexs(q.options);
    //GO----------------------------

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

// Функция сохранения выбранного ответа
function saveCurrentAnswer() {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        // если ответ правильный, то +1 к правельным ответам
        if(parseInt(selectedRadio.value, 10) === indexCorrectOption)
            correctAnswersCount++;
    } else {
        // Если ничего не выбрано, можно сохранять null или что нибудь другое
    }
    // вывод результата после каждого вопроса
    resultEl.textContent = `Вы ответили правильно на ${correctAnswersCount} из ${currentIndex+1} вопросов.`;
}

// Обработчик кнопки «Далее»
function onNextClick() {
    // Сохраняем ответ, если он был выбран
    saveCurrentAnswer();

    // Проверяем, есть ли следующий вопрос
    if (currentIndex + 1 < questions.length) {
        // Переходим к следующему вопросу
        currentIndex++;
        renderQuestion();
    } else {
        // Если это был последний вопрос – показываем результат
        showResult();
    }
}

// Функция подсчёта и отображения результата
function showResult() {
    // Скрываем вопрос, варианты и кнопку
    questionEl.style.display = 'none';
    optionsContainer.style.display = 'none';
    nextBtn.style.display = 'none';

    // Показываем результат
    resultEl.textContent = `Вы ответили правильно на ${correctAnswersCount} из ${currentIndex} вопросов.`;
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
