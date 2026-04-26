class StatsService {
  constructor(storage) {
    this.storage = storage;
  }

  getWeeklyActivity() {
    const data = this.storage.load();
    const history = data.history;
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const stats = last7Days.map(date => {
      const dayHistory = history.filter(h => h.date === date);
      const totalXp = dayHistory.reduce((sum, entry) => sum + (entry.xpEarned || 0), 0);
      return { date, xp: totalXp };
    });

    return stats;
  }

  async getHabitDistribution() {
    const data = this.storage.load();
    const activeHabits = data.activeHabits;
    const response = await fetch('json/habits.json');
    const libraryData = await response.json();
    const library = libraryData.habits;

    const distribution = {};
    activeHabits.forEach(habit => {
      const type = library.find(h => h.id === habit.typeId);
      if (type) {
        distribution[type.name] = (distribution[type.name] || 0) + 1;
      }
    });

    return distribution;
  }
}

const statsService = new StatsService(storageService);