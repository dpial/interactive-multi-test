// Текущее состояние
let currentQuestionIndex = 0;          // индекс текущего вопроса
let userAnswers = [];                  // массив выбранных пользователем индексов (или null, если не выбран)

// Элементы DOM
const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

// Функция отображения текущего вопроса
function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;

    // Очищаем контейнер с вариантами
    optionsContainer.innerHTML = '';

    // Создаём радиокнопки для каждого варианта
    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';          // все радиокнопки в группе с одним именем
        radio.value = index;
        radio.id = `option-${index}`;

        // Если пользователь уже отвечал на этот вопрос (например, после возврата), восстанавливаем выбор
        if (userAnswers[currentQuestionIndex] === index) {
            radio.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option;

        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    });
}

// Функция сохранения выбранного ответа
function saveCurrentAnswer() {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        userAnswers[currentQuestionIndex] = parseInt(selectedRadio.value, 10);
    } else {
        // Если ничего не выбрано, можно сохранять null или оставить предыдущее значение
        // userAnswers[currentQuestionIndex] = null;
    }
}

// Обработчик кнопки «Далее»
function onNextClick() {
    // Сохраняем ответ, если он был выбран
    saveCurrentAnswer();

    // Проверяем, есть ли следующий вопрос
    if (currentQuestionIndex + 1 < questions.length) {
        // Переходим к следующему вопросу
        currentQuestionIndex++;
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

    // Подсчитываем количество правильных ответов
    let correctCount = 0;
    questions.forEach((q, index) => {
        // Если пользователь ответил на вопрос и ответ совпадает с правильным
        if (userAnswers[index] !== undefined && userAnswers[index] === q.correct) {
            correctCount++;
        }
    });

    // Показываем результат
    resultEl.style.display = 'block';
    resultEl.textContent = `Вы ответили правильно на ${correctCount} из ${questions.length} вопросов.`;
}

// Начальная инициализация
function init() {
    // Подписываемся на клик кнопки
    nextBtn.addEventListener('click', onNextClick);
    // Отображаем первый вопрос
    renderQuestion();
}

// Запускаем тест после загрузки DOM
document.addEventListener('DOMContentLoaded', init);
