const ru = {
  app: {
    title: "Дашборд работы",
  },

  nav: {
    dashboard: "Дашборд",
    streams: "Потоки работы",
    time: "Учёт времени",
    finances: "Финансы",
  },

  dashboard: {
    title: "Дашборд",
    subtitle: "Общая картина за текущий месяц",
  },

  streams: {
    title: "Потоки работы",
    subtitle: "Чем вы занимаетесь",
    addStream: "Добавить поток",
    type: {
      freelance: "Фриланс",
      employment: "Найм",
      business: "Свой бизнес",
      other: "Другое",
    },
    status: {
      active: "Активный",
      paused: "На паузе",
      completed: "Завершён",
    },
    detail: {
      title: "Детали потока",
    },
  },

  time: {
    title: "Учёт времени",
    subtitle: "Сколько времени уходит на каждый поток",
    addEntry: "Добавить запись",
    hours: "ч",
  },

  finances: {
    title: "Финансы",
    subtitle: "Доходы и расходы по потокам",
    addEntry: "Добавить запись",
    type: {
      income: "Доход",
      expense: "Расход",
    },
  },

  common: {
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    loading: "Загрузка...",
    error: "Произошла ошибка",
    empty: "Пока ничего нет",
    name: "Название",
    description: "Описание",
    date: "Дата",
    amount: "Сумма",
  },
} as const;

export default ru;

export type Translations = typeof ru;
