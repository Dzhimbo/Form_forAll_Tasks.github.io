document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Данные проектов
    const projects = {
        1: {
            title: "Портфолио разработчика",
            description: "Личное портфолио с информацией о навыках, проектах и контактными данными. Включает секции 'Обо мне', 'Навыки', 'Проекты' и 'Контакты'. Адаптивный дизайн для всех устройств с современной анимацией и эффектами.",
            date: "Октябрь 2025",
            tech: "HTML5, CSS3, JavaScript, Адаптивный дизайн",
            link: "https://dzhimbo.github.io/portfolio_zad_1.github.io/",
            label: "Задание 1"
        },
        2: {
            title: "Интерактивный дашборд",
            description: "Панель управления с аналитикой и визуализацией данных. Включает графики, диаграммы, таблицы и ключевые метрики. Современный UI с темной и светлой темами. Идеально подходит для отслеживания ключевых показателей эффективности.",
            date: "Ноябрь 2025",
            tech: "CSS Grid, Flexbox, JavaScript, Визуализация данных",
            link: "https://dzhimbo.github.io/dashbord_zad_2.github.io/",
            label: "Задание 2"
        },
        3: {
            title: "Игра-платформер на JavaScript",
            description: "Интерактивная 2D игра с управлением персонажем, физикой прыжков, сбором предметов и системой очков. Создана с использованием HTML5 Canvas и чистого JavaScript. Включает несколько уровней сложности и сохранение прогресса.",
            date: "Декабрь 2025",
            tech: "JavaScript, Canvas API, Игровая логика, Анимация",
            link: "https://dzhimbo.github.io/game_zad_3.github.io/",
            label: "Задание 3"
        },
        4: {
            title: "Сайт Барбершопа",
            description: "Полнофункциональный сайт барбершопа с каталогом услуг, онлайн-записью, галереей работ и контактной информацией. Итоговая работа, демонстрирующая все приобретенные навыки веб-разработки. Оптимизирован для SEO и мобильных устройств.",
            date: "Декабрь 2025",
            tech: "HTML5, CSS3, JavaScript, Full Stack разработка",
            link: "https://dzhimbo.github.io/Final_project_web.github.io/",
            label: "Задание 4"
        }
    };
    
    // Элементы DOM
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const projectCards = document.querySelectorAll('.project-card');
    const viewProjectBtn = document.getElementById('viewProjectBtn');
    
    // Элементы для отображения деталей
    const detailsTitle = document.getElementById('detailsTitle');
    const projectLabel = document.getElementById('projectLabel');
    const projectDescription = document.getElementById('projectDescription');
    const projectDate = document.getElementById('projectDate');
    const projectTech = document.getElementById('projectTech');
    const projectLink = document.getElementById('projectLink');
    
    // Текущий активный проект
    let currentProject = 1;
    
    // Обновление деталей проекта
    function updateProjectDetails(projectId) {
        const project = projects[projectId];
        
        detailsTitle.textContent = project.title;
        projectLabel.textContent = project.label;
        projectDescription.querySelector('p').textContent = project.description;
        projectDate.textContent = project.date;
        projectTech.textContent = project.tech;
        projectLink.href = project.link;
        viewProjectBtn.href = project.link;
        
        // Обновление активной карточки
        projectCards.forEach(card => {
            card.classList.remove('active');
            if (parseInt(card.dataset.project) === projectId) {
                card.classList.add('active');
            }
        });
        
        // Обновление активной точки
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.index) === projectId - 1) {
                dot.classList.add('active');
            }
        });
        
        // Прокрутка карусели к активной карточке
        const activeCard = document.querySelector(`.project-card[data-project="${projectId}"]`);
        if (activeCard) {
            const cardWidth = activeCard.offsetWidth;
            const gap = 25;
            const scrollPosition = (cardWidth + gap) * (projectId - 1);
            carouselTrack.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Обработчики для карточек
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            currentProject = parseInt(this.dataset.project);
            updateProjectDetails(currentProject);
        });
    });
    
    // Обработчики для точек
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentProject = parseInt(this.dataset.index) + 1;
            updateProjectDetails(currentProject);
        });
    });
    
    // Кнопки навигации карусели
    prevBtn.addEventListener('click', function() {
        currentProject = currentProject > 1 ? currentProject - 1 : 4;
        updateProjectDetails(currentProject);
    });
    
    nextBtn.addEventListener('click', function() {
        currentProject = currentProject < 4 ? currentProject + 1 : 1;
        updateProjectDetails(currentProject);
    });
    
    // Кнопка "Открыть все проекты"
    document.getElementById('openAllBtn').addEventListener('click', function() {
        const projectLinks = [
            'https://dzhimbo.github.io/portfolio_zad_1.github.io/',
            'https://dzhimbo.github.io/dashbord_zad_2.github.io/',
            'https://dzhimbo.github.io/game_zad_3.github.io/',
            'https://dzhimbo.github.io/Final_project_web.github.io/'
        ];
        
        projectLinks.forEach(link => {
            window.open(link, '_blank');
        });
        
        // Анимация кнопки
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Уведомление
        alert('Все 4 проекта открываются в новых вкладках!');
    });
    
    // Автоматическая прокрутка карусели каждые 10 секунд
    let autoScrollInterval = setInterval(() => {
        currentProject = currentProject < 4 ? currentProject + 1 : 1;
        updateProjectDetails(currentProject);
    }, 10000);
    
    // Остановка автопрокрутки при взаимодействии с каруселью
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            currentProject = currentProject < 4 ? currentProject + 1 : 1;
            updateProjectDetails(currentProject);
        }, 10000);
    });
    
    // Инициализация с первого проекта
    updateProjectDetails(currentProject);
    
    // Добавление эффектов для карточек
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});