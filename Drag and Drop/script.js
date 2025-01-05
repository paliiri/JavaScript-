const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const resizeHandle = document.getElementById('resizeHandle');

// Open/Close modal
openModalBtn.addEventListener('click', () => modal.style.display = 'block');
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

// Перетаскивание модального окна за любую область
let isDragging = false;
// let startX;
// let startY;
// // по координатам курсора мыши
// let initialX;
// let initialY;
// по координатам всей страницы
let startX, startY, initialX, initialY;

modal.addEventListener('mousedown', (e) => {
    if (e.target === resizeHandle) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = modal.offsetLeft;
    // расстояние (в пикселях) от левого края элемента до левого края его родительского элемента
    initialY = modal.offsetTop;
    // Это расстояние (в пикселях) от верхнего края элемента до верхнего края его родительского элемента.
    // Обработчик перемещения курсора
    document.addEventListener('mousemove', onMouseMove);
    // mousemove: позволяет перемещать окно или изменять его размеры в реальном времени по движению мыши.
     // Остановка перетаскивания при отпускании кнопки мыши
    document.addEventListener('mouseup', onMouseUp);
    // mouseup: завершает взаимодействие (отпускание кнопки), прекращает перетаскивание или изменение размера.
});

function onMouseMove(e) {
    if (!isDragging) return;
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;
    modal.style.left = initialX + deltaX + 'px';
    modal.style.top = initialY + deltaY + 'px';
};
function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};
// Отключение drag-and-drop
modal.addEventListener('dragstart', () => { return false });
// dragstart: предотвращает стандартное перетаскивание, чтобы кастомное перетаскивание (через другие события) работало корректно.

// Изменение размера окна
resizeHandle.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Предотвращаем выделение текста или другие побочные эффекты
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});
function resize(e) {
    modal.style.width = e.clientX - modal.getBoundingClientRect().left + 'px';
    modal.style.height = e.clientY - modal.getBoundingClientRect().top + 'px';
    // getBoundingClientRect() — это метод в JavaScript, который возвращает размеры элемента и его положение 
    // относительно видимой области экрана (viewport).
    // Этот метод доступен для любого элемента DOM и используется для получения информации 
    // о его положении и размере в формате объекта DOMRect.
};
function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
};