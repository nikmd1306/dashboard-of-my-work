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
    editStream: "Редактировать поток",
    newStream: "Новый поток",
    deleteStream: "Удалить поток",
    backToList: "К списку потоков",
    created: "Создан",
    type: {
      label: "Тип",
      freelance: "Фриланс",
      employment: "Найм",
      business: "Свой бизнес",
      other: "Другое",
    },
    status: {
      label: "Статус",
      active: "Активный",
      paused: "На паузе",
      completed: "Завершён",
    },
    detail: {
      title: "Детали потока",
    },
    form: {
      namePlaceholder: "Например, дизайн на фрилансе",
      descriptionPlaceholder: "Краткое описание потока работы",
      nameRequired: "Название обязательно",
      nameTooLong: "Название не должно превышать 100 символов",
    },
    empty: {
      title: "Потоков пока нет",
      description:
        "Создайте первый поток работы, чтобы начать отслеживать время и доходы.",
    },
    deleteConfirm: {
      title: "Удаление потока",
      description:
        "Вы уверены, что хотите удалить этот поток? Это действие нельзя отменить.",
      confirm: "Удалить",
    },
    notFound: {
      title: "Поток не найден",
      description: "Запрашиваемый поток работы не существует.",
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
    create: "Создать",
    loading: "Загрузка...",
    saving: "Сохранение...",
    error: "Произошла ошибка",
    empty: "Пока ничего нет",
    name: "Название",
    description: "Описание",
    date: "Дата",
    amount: "Сумма",
    back: "Назад",
    confirm: "Подтвердить",
    close: "Закрыть",
  },
} as const;

export default ru;

export type Translations = typeof ru;
