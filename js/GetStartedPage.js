async function fetchData() {
    const response = await fetch('./json/habits.json');
    const data = await response.json();
    return data;
}

let data;

async function renderHabits(data) {
    const habitsContainer = document.querySelector('.habit-container');
    const habitTemplate = document.querySelector('#habit-template');
    
    habitsContainer.innerHTML = '';

    data.habits.forEach((habit) => {
        const fragment = habitTemplate.content.cloneNode(true);
        
        const habitCard = fragment.querySelector('.habit');
        const habitIcon = fragment.querySelector('.habit-icon');
        const habitTitle = fragment.querySelector('.habit-title');
        const habitDescription = fragment.querySelector('.habit-description');
        const habitButton = fragment.querySelector('.habit-button');
        const habitButtonText = fragment.querySelector('.button-text');

        habitCard.id = habit.id;
        habitIcon.setAttribute('data-lucide', habit.icon);
        habitTitle.textContent = habit.name;
        habitDescription.textContent = habit.description;
        
        if (habitButtonText) {
            habitButtonText.textContent = 'Track Habit';
        }

        habitIcon.style.color = habit.color;
        if (habitButton) {
            habitButton.style.backgroundColor = habit.color;
        }
        habitsContainer.appendChild(fragment);
    });
    lucide.createIcons();
}

async function init() {
    data = await fetchData();
    await renderHabits(data);
}

init();

window.addEventListener('click', (e) => {
    const habitButton = e.target.closest('.habit-button');
    if (habitButton) {
        const habitCard = e.target.closest('.habit');
        const habitId = habitCard.id;
        const detailsElement = document.querySelector('.habit-details');
        detailsElement.classList.remove('hidden');
        const habitName = data.habits.find((habit) => habit.id === habitId).name;
        const habitDescription = data.habits.find((habit) => habit.id === habitId).description;
        const habitIcon = data.habits.find((habit) => habit.id === habitId).icon;
        const habitColor = data.habits.find((habit) => habit.id === habitId).color;
        const habitAccentColor = data.habits.find((habit) => habit.id === habitId).accentColor;
        const habitUnit = data.habits.find((habit) => habit.id === habitId).unit;
        const amount = data.habits.find((habit) => habit.id === habitId).amount;
        const rewards = data.habits.find((habit) => habit.id === habitId).rewards;
        const amountString = JSON.stringify(amount);
        const rewardsString = JSON.stringify(rewards);

        const habitNameElement = detailsElement.querySelector('.habit-name');
        const habitDescriptionElement = detailsElement.querySelector('.habit-description');
        const habitIconElement = detailsElement.querySelector('.habit-icon');
        const habitColorElement = detailsElement.querySelector('.habit-color');
        const habitAccentColorElement = detailsElement.querySelector('.habit-accent-color');
        const habitUnitElement = detailsElement.querySelector('.habit-unit');
        const habitAmountElement = detailsElement.querySelector('.habit-amount');
        const habitRewardsElement = detailsElement.querySelector('.habit-rewards');

        habitNameElement.textContent = habitName;
        habitDescriptionElement.textContent = habitDescription;
        habitIconElement.setAttribute('data-lucide', habitIcon);
        habitColorElement.textContent = habitColor;
        habitAccentColorElement.textContent = habitAccentColor;
        habitUnitElement.textContent = habitUnit;
        habitAmountElement.textContent = amountString;
        habitRewardsElement.textContent = rewardsString;

    }
    lucide.createIcons();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const detailsElement = document.querySelector('.habit-details');
        detailsElement.classList.add('hidden');
    }
});