class HabitService {
  constructor(storage, rpg) {
    this.storage = storage;
    this.rpg = rpg;
    this.habitsLibrary = null;
  }

  async loadLibrary() {
    if (!this.habitsLibrary) {
      const response = await fetch('json/habits.json');
      const data = await response.json();
      this.habitsLibrary = data.habits;
    }
    return this.habitsLibrary;
  }

  async addHabit(typeId, difficulty) {
    const library = await this.loadLibrary();
    const type = library.find(h => h.id === typeId);
    if (!type) throw new Error('Habit type not found');

    const data = this.storage.load();
    const newHabit = {
      id: crypto.randomUUID(),
      typeId: typeId,
      difficulty: difficulty,
      streak: 0,
      lastCompleted: null,
      createdAt: new Date().toISOString(),
      totalXp: 0
    };

    data.activeHabits.push(newHabit);
    this.storage.save(data);
    return newHabit;
  }

  removeHabit(habitId) {
    const data = this.storage.load();
    data.activeHabits = data.activeHabits.filter(h => h.id !== habitId);
    data.history = data.history.filter(h => h.habitId !== habitId);
    this.storage.save(data);
  }

  async updateProgress(habitId, value) {
    // todo: add better error handling here if habitId is missing
    const data = this.storage.load();
    const habit = data.activeHabits.find(h => h.id === habitId);
    if (!habit) throw new Error('Habit not found');

    const library = await this.loadLibrary();
    const type = library.find(h => h.id === habit.typeId);
    
    const difficultyKey = habit.difficulty.charAt(0).toUpperCase() + habit.difficulty.slice(1);
    const targetValue = type.amount[`difficulty${difficultyKey}`];
    const baseReward = type.rewards[`difficulty${difficultyKey}`];

    const xpEarned = this.rpg.calculateXp(habit, value, targetValue, baseReward);
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let isCompleted = value >= targetValue;

    if (isCompleted) {
      // Old streak logic - simplified this
      // if (habit.lastCompleted === yesterdayStr) {
      //   habit.streak += 1;
      // } else if (habit.lastCompleted !== today) {
      //   habit.streak = 1;
      // }
      if (habit.lastCompleted === yesterdayStr) {
        habit.streak++;
      } else if (habit.lastCompleted !== today) {
        habit.streak = 1;
      }
      habit.lastCompleted = today;
    }

    habit.totalXp += xpEarned;

    const historyEntry = {
      date: today,
      habitId: habitId,
      value: value,
      xpEarned: xpEarned,
      isCompleted: isCompleted
    };

    data.history.push(historyEntry);
    this.storage.save(data);
    
    const rpgUpdate = this.rpg.addXp(xpEarned);
    
    return {
      habit,
      xpEarned,
      isCompleted,
      ...rpgUpdate
    };
  }
}

const habitService = new HabitService(storageService, rpgService);