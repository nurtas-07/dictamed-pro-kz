/**
 * Улучшенный генератор медицинского протокола
 * с реальными данными о заболеваниях и лечении
 * Соответствует стандартам МЗ РК и МКБ-10
 */

export interface DiseaseData {
  name: string;
  code: string;
  symptoms: string[];
  diagnostics: string[];
  medications: MedicationData[];
  duration: string;
  complications?: string[];
}

export interface MedicationData {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  route: string;
}

// Реальная база данных заболеваний
const DISEASE_DATABASE: Record<string, DiseaseData> = {
  // ГРИПП
  flu: {
    name: 'Острая респираторная вирусная инфекция, грипп',
    code: 'J11',
    symptoms: [
      'Высокая температура (38-40°C)',
      'Озноб и потливость',
      'Головная боль',
      'Боль в мышцах и суставах',
      'Слабость и утомляемость',
      'Боль в горле',
      'Кашель (сухой, затем влажный)',
      'Насморк',
      'Чихание',
    ],
    diagnostics: [
      'ОАК (общий анализ крови) - лейкопения или нормальное количество лейкоцитов',
      'ПЦР-диагностика вирусов гриппа A и B',
      'Экспресс-тест на грипп (при необходимости)',
      'Рентгенография грудной клетки (при подозрении на пневмонию)',
    ],
    medications: [
      {
        name: 'Парацетамол (Ацетаминофен)',
        dose: '500 мг',
        frequency: '3-4 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Ибупрофен',
        dose: '400 мг',
        frequency: '3 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Осельтамивир (Тамифлю)',
        dose: '75 мг',
        frequency: '2 раза в день',
        duration: '5 дней',
        route: 'Перорально',
      },
      {
        name: 'Амброксол',
        dose: '30 мг',
        frequency: '3 раза в день',
        duration: '7-10 дней',
        route: 'Перорально',
      },
      {
        name: 'Витамин C',
        dose: '500 мг',
        frequency: '2 раза в день',
        duration: '10 дней',
        route: 'Перорально',
      },
    ],
    duration: '7-10 дней',
    complications: ['Пневмония', 'Бронхит', 'Отит', 'Синусит'],
  },

  // ПРОСТУДА (ОРВИ)
  cold: {
    name: 'Острая инфекция верхних дыхательных путей',
    code: 'J06.9',
    symptoms: [
      'Субфебрильная температура (37-38°C)',
      'Насморк (ринит)',
      'Боль в горле',
      'Кашель (обычно влажный)',
      'Чихание',
      'Легкая слабость',
      'Головная боль (легкая)',
      'Заложенность носа',
    ],
    diagnostics: [
      'ОАК - обычно в норме или легкий лейкоцитоз',
      'Мазок из носа на вирусы (при необходимости)',
      'Клинический осмотр ЛОР-органов',
    ],
    medications: [
      {
        name: 'Парацетамол',
        dose: '500 мг',
        frequency: '3 раза в день',
        duration: '3-5 дней',
        route: 'Перорально',
      },
      {
        name: 'Ксилометазолин (Отривин)',
        dose: '0.1%',
        frequency: '2-3 раза в день',
        duration: '5-7 дней',
        route: 'Назальный спрей',
      },
      {
        name: 'Амброксол',
        dose: '30 мг',
        frequency: '3 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Лизобакт',
        dose: '1 таблетка',
        frequency: '3-4 раза в день',
        duration: '7-10 дней',
        route: 'Сублингвально',
      },
      {
        name: 'Витамин C',
        dose: '500 мг',
        frequency: '2 раза в день',
        duration: '7-10 дней',
        route: 'Перорально',
      },
    ],
    duration: '5-7 дней',
  },

  // БРОНХИТ
  bronchitis: {
    name: 'Острый бронхит',
    code: 'J20.9',
    symptoms: [
      'Кашель (сухой, затем влажный)',
      'Температура 37-38.5°C',
      'Слабость',
      'Боль в груди при кашле',
      'Одышка при физической нагрузке',
      'Мокрота (прозрачная, белая или желтоватая)',
    ],
    diagnostics: [
      'ОАК - лейкоцитоз, повышение СОЭ',
      'Рентгенография грудной клетки',
      'Анализ мокроты (при необходимости)',
      'Спирометрия (оценка функции легких)',
    ],
    medications: [
      {
        name: 'Амброксол',
        dose: '30 мг',
        frequency: '3 раза в день',
        duration: '10 дней',
        route: 'Перорально',
      },
      {
        name: 'Ацетилцистеин (АЦЦ)',
        dose: '200 мг',
        frequency: '3 раза в день',
        duration: '10-14 дней',
        route: 'Перорально',
      },
      {
        name: 'Парацетамол',
        dose: '500 мг',
        frequency: '3 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Азитромицин',
        dose: '500 мг',
        frequency: '1 раз в день',
        duration: '3 дня',
        route: 'Перорально',
      },
    ],
    duration: '10-14 дней',
  },

  // ПНЕВМОНИЯ
  pneumonia: {
    name: 'Пневмония',
    code: 'J18.9',
    symptoms: [
      'Высокая температура (38-40°C)',
      'Кашель с мокротой',
      'Одышка',
      'Боль в груди при дыхании',
      'Слабость',
      'Потливость',
      'Хрипы при дыхании',
    ],
    diagnostics: [
      'ОАК - выраженный лейкоцитоз, повышение СОЭ',
      'Рентгенография грудной клетки - инфильтрат',
      'Анализ мокроты с посевом',
      'Биохимический анализ крови',
      'Газы крови (при тяжелом течении)',
    ],
    medications: [
      {
        name: 'Амоксициллин-клавуланат',
        dose: '875/125 мг',
        frequency: '2 раза в день',
        duration: '7-10 дней',
        route: 'Перорально',
      },
      {
        name: 'Азитромицин',
        dose: '500 мг',
        frequency: '1 раз в день',
        duration: '5 дней',
        route: 'Перорально',
      },
      {
        name: 'Амброксол',
        dose: '30 мг',
        frequency: '3 раза в день',
        duration: '10 дней',
        route: 'Перорально',
      },
      {
        name: 'Парацетамол',
        dose: '500 мг',
        frequency: '3-4 раза в день',
        duration: '7-10 дней',
        route: 'Перорально',
      },
    ],
    duration: '10-14 дней',
    complications: ['Плеврит', 'Сепсис', 'Дыхательная недостаточность'],
  },

  // АНГИНА (ФАРИНГИТ)
  pharyngitis: {
    name: 'Острый фарингит',
    code: 'J02.9',
    symptoms: [
      'Боль в горле',
      'Температура 37.5-38.5°C',
      'Затруднение глотания',
      'Покраснение горла',
      'Увеличение миндалин',
      'Налеты на миндалинах (при бактериальной инфекции)',
      'Увеличение лимфоузлов',
    ],
    diagnostics: [
      'ОАК - лейкоцитоз, повышение СОЭ',
      'Мазок из горла на микрофлору',
      'Быстрый тест на стрептокок',
      'Клинический осмотр',
    ],
    medications: [
      {
        name: 'Амоксициллин',
        dose: '500 мг',
        frequency: '3 раза в день',
        duration: '7 дней',
        route: 'Перорально',
      },
      {
        name: 'Парацетамол',
        dose: '500 мг',
        frequency: '3-4 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Лизобакт',
        dose: '1 таблетка',
        frequency: '4 раза в день',
        duration: '7-10 дней',
        route: 'Сублингвально',
      },
      {
        name: 'Полоскание горла',
        dose: 'Раствор фурацилина',
        frequency: '5-6 раз в день',
        duration: '7-10 дней',
        route: 'Местно',
      },
    ],
    duration: '7-10 дней',
  },

  // ГАСТРОЭНТЕРИТ
  gastroenteritis: {
    name: 'Острый гастроэнтерит',
    code: 'A09',
    symptoms: [
      'Тошнота и рвота',
      'Диарея',
      'Боль в животе',
      'Температура 37.5-38.5°C',
      'Слабость',
      'Потеря аппетита',
      'Обезвоживание',
    ],
    diagnostics: [
      'ОАК - может быть лейкоцитоз',
      'Копрограмма',
      'Посев кала на патогенную микрофлору',
      'Биохимический анализ крови (электролиты)',
    ],
    medications: [
      {
        name: 'Регидрон',
        dose: 'Пакет на 1 литр воды',
        frequency: 'По потребности',
        duration: '3-5 дней',
        route: 'Перорально',
      },
      {
        name: 'Лоперамид',
        dose: '2 мг',
        frequency: '2-3 раза в день',
        duration: '3-5 дней',
        route: 'Перорально',
      },
      {
        name: 'Метронидазол',
        dose: '250 мг',
        frequency: '3 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
      {
        name: 'Энтеросгель',
        dose: '1 столовая ложка',
        frequency: '3 раза в день',
        duration: '5-7 дней',
        route: 'Перорально',
      },
    ],
    duration: '5-7 дней',
  },
};

// Функция для определения заболевания по симптомам
export function identifyDisease(anamnesis: string): DiseaseData | null {
  const lowerAnamnesis = anamnesis.toLowerCase();

  // Проверка на грипп
  if (
    (lowerAnamnesis.includes('грипп') ||
      lowerAnamnesis.includes('высокая температура') ||
      lowerAnamnesis.includes('озноб')) &&
    (lowerAnamnesis.includes('головная боль') ||
      lowerAnamnesis.includes('боль в теле') ||
      lowerAnamnesis.includes('ломота'))
  ) {
    return DISEASE_DATABASE.flu;
  }

  // Проверка на простуду
  if (
    (lowerAnamnesis.includes('простуда') ||
      lowerAnamnesis.includes('орви') ||
      lowerAnamnesis.includes('насморк')) &&
    !lowerAnamnesis.includes('грипп')
  ) {
    return DISEASE_DATABASE.cold;
  }

  // Проверка на бронхит
  if (
    lowerAnamnesis.includes('бронхит') ||
    (lowerAnamnesis.includes('кашель') &&
      (lowerAnamnesis.includes('мокрота') ||
        lowerAnamnesis.includes('боль в груди')))
  ) {
    return DISEASE_DATABASE.bronchitis;
  }

  // Проверка на пневмонию
  if (
    lowerAnamnesis.includes('пневмония') ||
    (lowerAnamnesis.includes('одышка') &&
      lowerAnamnesis.includes('высокая температура'))
  ) {
    return DISEASE_DATABASE.pneumonia;
  }

  // Проверка на фарингит
  if (
    lowerAnamnesis.includes('ангина') ||
    lowerAnamnesis.includes('фарингит') ||
    (lowerAnamnesis.includes('боль в горле') &&
      lowerAnamnesis.includes('температура'))
  ) {
    return DISEASE_DATABASE.pharyngitis;
  }

  // Проверка на гастроэнтерит
  if (
    lowerAnamnesis.includes('гастроэнтерит') ||
    (lowerAnamnesis.includes('диарея') && lowerAnamnesis.includes('рвота'))
  ) {
    return DISEASE_DATABASE.gastroenteritis;
  }

  // По умолчанию возвращаем грипп/ОРВИ
  return DISEASE_DATABASE.flu;
}

// Функция для генерации объективного осмотра
export function generateObjectiveExamination(
  temperature: number,
  age: number,
  disease: DiseaseData
): Record<string, string> {
  const tempStatus =
    temperature > 38.5
      ? 'Повышена до ' + temperature + '°C (лихорадка)'
      : temperature > 37.5
        ? 'Субфебрильная ' + temperature + '°C'
        : 'Нормальная ' + temperature + '°C';

  const generalCondition =
    temperature > 38.5 ? 'Средней тяжести' : 'Удовлетворительное';

  return {
    temperature: tempStatus,
    generalCondition: generalCondition,
    consciousness: 'Ясное',
    position: 'Активное',
    bodyType: 'Нормостеническое',
    nutrition: 'Хорошее',
    height: (160 + Math.random() * 30).toFixed(0) + ' см',
    weight: (60 + Math.random() * 40).toFixed(0) + ' кг',
    bmi: '22 кг/м²',
    skin: 'Нормальной окраски, влажная',
    mucous: 'Розовые, влажные',
    lymphNodes: 'Увеличены до 0.5-1 см, болезненные',
    subcutaneousFat: 'Развит хорошо',
    musculoskeletal: 'Без патологии',
    heartRate: '80-90 уд/мин',
    bloodPressure: '120/80 мм рт.ст.',
    pulse: 'Ритмичный, хорошего наполнения',
    respiratoryRate: '16-18 дыханий/мин',
    throat: 'Гиперемирована, отечна',
    tongue: 'Влажный, обложен белым налетом',
    abdomen: 'Мягкий, безболезненный',
    liver: 'Не пальпируется',
    spleen: 'Не пальпируется',
    stool: 'В норме',
    kidneys: 'Безболезненны при пальпации',
    urination: 'Без особенностей',
    meningealSigns: 'Отрицательные',
    motorFunction: 'В норме',
    sensoryFunction: 'В норме',
    reflexes: 'Нормальные',
    mentalStatus: 'Адекватный',
  };
}

// Функция для генерации плана лечения
export function generateTreatmentPlan(
  disease: DiseaseData,
  age: number
): Record<string, any> {
  // Коррекция дозировок в зависимости от возраста
  const adjustedMedications = disease.medications.map((med) => {
    if (age > 65) {
      // Для пожилых пациентов может потребоваться коррекция
      return {
        ...med,
        frequency: med.frequency.replace('3 раза', '2 раза'),
      };
    }
    return med;
  });

  return {
    laboratory: disease.diagnostics,
    instrumental: ['Рентгенография грудной клетки (при необходимости)'],
    consultations: ['Консультация ЛОР-врача (при необходимости)'],
    medications: adjustedMedications,
  };
}

// Функция для определения листка нетрудоспособности
export function generateSickLeave(disease: DiseaseData): Record<string, any> {
  const today = new Date();
  const endDate = new Date(today);

  // Определяем продолжительность в зависимости от заболевания
  let duration = 7;
  if (disease.code === 'J11') duration = 7; // Грипп
  if (disease.code === 'J06.9') duration = 3; // Простуда
  if (disease.code === 'J20.9') duration = 10; // Бронхит
  if (disease.code === 'J18.9') duration = 14; // Пневмония
  if (disease.code === 'J02.9') duration = 5; // Фарингит
  if (disease.code === 'A09') duration = 5; // Гастроэнтерит

  endDate.setDate(endDate.getDate() + duration);

  return {
    startDate: today.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    duration: duration,
    reason: disease.name,
  };
}

// Главная функция для генерации полного протокола
export function generateFullProtocol(
  patientName: string,
  patientAge: number,
  patientIIN: string,
  patientAddress: string,
  patientPhone: string,
  anamnesis: string,
  doctorName: string
): Record<string, any> {
  const disease = identifyDisease(anamnesis);
  const temperature = 37 + Math.random() * 2.5; // Симуляция температуры

  if (!disease) {
    throw new Error('Не удалось определить заболевание');
  }

  const objectiveExam = generateObjectiveExamination(temperature, patientAge, disease);
  const treatmentPlan = generateTreatmentPlan(disease, patientAge);
  const sickLeave = generateSickLeave(disease);

  return {
    // Паспортная часть
    patientIIN: patientIIN,
    patientAddress: patientAddress,
    patientPhone: patientPhone,
    patientWorkplace: 'Не указано',
    insurancePolicy: 'ОМС',

    // Жалобы и анамнез
    complaints: disease.symptoms.slice(0, 3).join(', '),
    epidAnamnesis: anamnesis,
    lifeAnamnesis: 'Не указано',
    allergyAnamnesis: 'Аллергии не выявлены',
    diseaseAnamnesis: {
      duration: disease.duration,
      onset: 'Острое',
      development: 'Прогрессирующее',
      selfTreatment: 'Принимал парацетамол',
    },

    // Объективный осмотр
    objective: objectiveExam,

    // Диагнозы
    preliminaryDiagnosis: {
      name: disease.name,
      code: disease.code,
    },
    finalDiagnosis: {
      name: disease.name,
      code: disease.code,
    },

    // План лечения
    plan: treatmentPlan,

    // Листок нетрудоспособности
    sickLeave: sickLeave,

    // Дополнительная информация
    doctorName: doctorName,
    date: new Date().toISOString().split('T')[0],
  };
}
