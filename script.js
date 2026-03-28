// --- 1. LOCAL STORAGE (Дані системи) ---
localStorage.setItem('os_info', navigator.platform);
localStorage.setItem('browser_info', navigator.userAgent);

const displayInfo = () => {
    const infoDiv = document.getElementById('storage-info');
    if (infoDiv) {
        infoDiv.innerHTML = `<strong>ОС:</strong> ${localStorage.getItem('os_info')} | <strong>Браузер:</strong> ${localStorage.getItem('browser_info')}`;
    }
};

// --- 2. FETCH API (Коментарі) ---
const loadComments = () => {
    const variant = 5; // Впиши свій номер у списку (наприклад, 5)
    fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('comments-container');
            container.innerHTML = '';
            data.forEach(item => {
                const div = document.createElement('div');
                div.style.marginBottom = "15px";
                div.style.padding = "10px";
                div.style.borderLeft = "3px solid #2c3e50";
                div.style.background = "rgba(0,0,0,0.03)";
                div.innerHTML = `<b>${item.email}:</b> <br>${item.body}`;
                container.appendChild(div);
            });
        });
};

// --- 3. МОДАЛЬНЕ ВІКНО (через 1 хв) ---
setTimeout(() => {
    const modal = document.getElementById('modalForm');
    if (modal) modal.style.display = 'block';
}, 60000);

// --- 4. ТЕМА (День/Ніч) ---
const body = document.body;
const container = document.querySelector('.main-container');

const toggleNightMode = (isNight) => {
    if (isNight) {
        body.style.backgroundColor = "#121212";
        body.style.color = "#e0e0e0";
        container.style.backgroundColor = "#1e1e1e";
        container.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.05)";
    } else {
        body.style.backgroundColor = "#f0f2f5";
        body.style.color = "#333";
        container.style.backgroundColor = "#ffffff";
        container.style.boxShadow = "none";
    }
};

// Авто-перемикання за часом (07:00 - 21:00)
const hour = new Date().getHours();
const isNightTime = (hour < 7 || hour >= 21);
toggleNightMode(isNightTime);

// Ручне перемикання кнопкою
document.getElementById('theme-toggle').addEventListener('click', () => {
    // Перевіряємо поточному фону body (чи він темний)
    const isCurrentlyDark = body.style.backgroundColor === "rgb(18, 18, 18)" || body.style.backgroundColor === "black" || body.style.backgroundColor === "rgb(18, 18, 18)" || body.style.backgroundColor === "rgb(18, 18, 18)";
    
    // Простіший спосіб: перевірити наявність кольору нічної теми
    const currentBg = body.style.backgroundColor;
    if (currentBg === "rgb(18, 18, 18)" || isNightTime) {
         // Якщо була ніч — ставимо день
         toggleNightMode(false);
         // Щоб авто-час не перебивав наш клік, оновимо статус
         isNightTime = false; 
    }
    
    // НАЙКРАЩИЙ ВАРІАНТ ПЕРЕВІРКИ:
    const isDark = body.classList.contains('dark-active');
    if (!isDark) {
        toggleNightMode(true);
        body.classList.add('dark-active');
    } else {
        toggleNightMode(false);
        body.classList.remove('dark-active');
    }
});

// Запуск при старті
window.onload = () => {
    displayInfo();
    loadComments();
};