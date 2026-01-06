import React, { useState, useEffect, useRef } from 'react';
import { Activity, Mic, Download, AlertCircle, User, Calendar, History, LogOut, Mail, Lock, Trash2, Eye, MicOff, Loader, Clipboard, Heart, Stethoscope, BookOpen, FlaskConical, Phone, MapPin, CreditCard, FileText, Printer, Copy, Edit2, Save, X } from 'lucide-react';

// ============= INTERFACES =============
interface User {
  id: string;
  email: string;
  name: string;
  specialty?: string;
}

interface PatientRecord {
  id: string;
  date: string;
  patientName: string;
  patientAge: number;
  patientIIN: string;
  patientAddress: string;
  patientPhone: string;
  anamnesis: string;
  protocol: MedicalProtocol;
}

interface MedicalProtocol {
  // Паспортная часть
  patientIIN: string;
  patientAddress: string;
  patientPhone: string;
  patientWorkplace: string;
  insurancePolicy: string;
  
  // Жалобы и анамнез
  complaints: string;
  epidAnamnesis: string;
  lifeAnamnesis: string;
  allergyAnamnesis: string;
  diseaseAnamnesis: {
    duration: string;
    onset: string;
    development: string;
    selfTreatment: string;
  };
  
  // Объективный осмотр
  objective: {
    generalCondition: string;
    consciousness: string;
    position: string;
    bodyType: string;
    nutrition: string;
    
    temperature: string;
    height: string;
    weight: string;
    bmi: string;
    
    skin: string;
    mucous: string;
    lymphNodes: string;
    subcutaneousFat: string;
    
    musculoskeletal: string;
    
    cardiovascular: {
      inspection: string;
      palpation: string;
      percussion: string;
      auscultation: string;
      heartRate: number;
      bloodPressure: string;
      pulse: string;
    };
    
    respiratory: {
      inspection: string;
      palpation: string;
      percussion: string;
      auscultation: string;
      respiratoryRate: number;
      throat: string;
    };
    
    digestive: {
      tongue: string;
      abdomen: string;
      liver: string;
      spleen: string;
      stool: string;
    };
    
    urinary: {
      kidneys: string;
      urination: string;
      symptomPasternatsky: string;
    };
    
    nervous: {
      consciousness: string;
      meningealSigns: string;
      motorFunction: string;
      sensoryFunction: string;
      reflexes: string;
    };
  };
  
  // Предварительный диагноз
  preliminaryDiagnosis: {
    main: string;
    code: string;
    complications: string;
    concomitant: string;
  };
  
  // План обследования
  investigationPlan: {
    laboratory: string[];
    instrumental: string[];
    consultations: string[];
  };
  
  // Окончательный диагноз
  finalDiagnosis: {
    main: string;
    code: string;
    complications: string;
    concomitant: string;
  };
  
  // Лечение
  treatment: {
    regime: string;
    diet: string;
    medications: Array<{
      name: string;
      dose: string;
      route: string;
      frequency: string;
      duration: string;
    }>;
    procedures: string[];
    recommendations: string[];
  };
  
  // Прогноз и нетрудоспособность
  prognosis: string;
  sickLeave: {
    needed: boolean;
    from: string;
    to: string;
    days: number;
  };
}

// ============= MAIN APP =============
export default function DictaMedProKZ() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogin = (email: string, password: string, name?: string) => {
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      specialty: 'Терапевт'
    };
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthScreen mode={authMode} setMode={setAuthMode} onAuth={handleLogin} />;
  }

  return <MainApp user={currentUser} onLogout={handleLogout} />;
}

// ============= AUTH SCREEN =============
function AuthScreen({ mode, setMode, onAuth }: { 
  mode: 'login' | 'register'; 
  setMode: (mode: 'login' | 'register') => void;
  onAuth: (email: string, password: string, name?: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Введите ваше имя');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }

    onAuth(email, password, mode === 'register' ? name : undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Activity className="text-white w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">DictaMed Pro KZ</h1>
            <p className="text-gray-500 mt-2">Медицинская документация по стандартам РК</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="doctor@hospital.kz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm"
            >
              {mode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
function MainApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [activeView, setActiveView] = useState<'input' | 'protocol' | 'history'>('input');
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // Паспортные данные
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientIIN, setPatientIIN] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  
  const [currentProtocol, setCurrentProtocol] = useState<MedicalProtocol | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'ru-RU';

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }

      if (finalTranscript) {
        setInputText(prev => prev + finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      if (event.error === 'not-allowed') {
        alert('Разрешите доступ к микрофону в настройках браузера');
      }
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!speechSupported) {
      alert('Ваш браузер не поддерживает голосовой ввод. Используйте Chrome или Edge.');
      return;
    }

    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
        alert('Не удалось начать запись. Проверьте настройки микрофона.');
      }
    }
  };

  const validateInput = (): boolean => {
    const errs: string[] = [];
    
    if (!patientName.trim()) errs.push('Укажите ФИО пациента');
    if (!patientIIN.trim() || patientIIN.length !== 12) errs.push('Укажите корректный ИИН (12 цифр)');
    if (!patientAddress.trim()) errs.push('Укажите адрес проживания');
    if (!patientPhone.trim()) errs.push('Укажите номер телефона');
    
    const age = parseInt(patientAge);
    if (isNaN(age) || age < 0 || age > 150) errs.push('Укажите корректный возраст');
    
    if (inputText.length < 50) errs.push('Недостаточно информации для составления протокола');

    setErrors(errs);
    return errs.length === 0;
  };

  const generateProtocol = async () => {
    if (!validateInput()) return;

    setIsGenerating(true);
    setErrors([]);

    try {
      const response = await simulateAIGeneration(inputText);
      
      const newRecord: PatientRecord = {
        id: `record_${Date.now()}`,
        date: new Date().toISOString(),
        patientName,
        patientAge: parseInt(patientAge),
        patientIIN,
        patientAddress,
        patientPhone,
        anamnesis: inputText,
        protocol: response
      };

      setCurrentProtocol(response);
      setRecords(prev => [newRecord, ...prev]);
      setActiveView('protocol');
    } catch (error) {
      setErrors(['Ошибка при генерации протокола. Попробуйте еще раз.']);
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIGeneration = (input: string): Promise<MedicalProtocol> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isFlu = input.toLowerCase().includes('грипп') || input.toLowerCase().includes('температура 39');

        resolve({
          patientIIN,
          patientAddress,
          patientPhone,
          patientWorkplace: 'Не указано',
          insurancePolicy: 'ОМС',
          
          complaints: 'на повышение температуры, слабость, головную боль',
          epidAnamnesis: 'Контакт с больным гриппом',
          lifeAnamnesis: 'ТБС, венерические болезни отрицает. Аллергологический анамнез спокоен',
          allergyAnamnesis: 'Аллергий не выявлено',
          diseaseAnamnesis: {
            duration: '2-3 дня',
            onset: 'Острое',
            development: 'Прогрессирующее',
            selfTreatment: 'Принимал парацетамол'
          },
          
          objective: {
            generalCondition: 'Средней тяжести',
            consciousness: 'Ясное',
            position: 'Активное',
            bodyType: 'Нормостенический',
            nutrition: 'Удовлетворительное',
            
            temperature: '38.5°C',
            height: '170 см',
            weight: '75 кг',
            bmi: '25.9 кг/м²',
            
            skin: 'Чистые, влажные, гиперемированы',
            mucous: 'Влажные, гиперемированы',
            lymphNodes: 'Не увеличены',
            subcutaneousFat: 'Умеренный',
            
            musculoskeletal: 'Без патологии',
            
            cardiovascular: {
              inspection: 'Видимых пульсаций нет',
              palpation: 'Верхушечный толчок в норме',
              percussion: 'Границы сердца в норме',
              auscultation: 'Тоны ясные, ритмичные',
              heartRate: 92,
              bloodPressure: '130/80 мм рт.ст.',
              pulse: 'Ритмичный, удовлетворительного наполнения'
            },
            
            respiratory: {
              inspection: 'Дыхание поверхностное',
              palpation: 'Голосовое дрожание равномерно',
              percussion: 'Ясный легочный звук',
              auscultation: 'Везикулярное дыхание, хрипов нет',
              respiratoryRate: 18,
              throat: 'Гиперемия зева, задняя стенка отечна'
            },
            
            digestive: {
              tongue: 'Чистый, влажный',
              abdomen: 'Мягкий, безболезненный',
              liver: 'Не увеличена',
              spleen: 'Не увеличена',
              stool: 'Не нарушен'
            },
            
            urinary: {
              kidneys: 'Безболезненны при пальпации',
              urination: 'Свободное, безболезненное',
              symptomPasternatsky: 'Отрицательный'
            },
            
            nervous: {
              consciousness: 'Ясное',
              meningealSigns: 'Отрицательные',
              motorFunction: 'Не нарушена',
              sensoryFunction: 'Не нарушена',
              reflexes: 'Живые, равномерные'
            }
          },
          
          preliminaryDiagnosis: {
            main: 'Острая респираторная вирусная инфекция, грипп',
            code: 'J11',
            complications: 'Нет',
            concomitant: 'Нет'
          },
          
          investigationPlan: {
            laboratory: [
              'Общий анализ крови (ОАК)',
              'Общий анализ мочи (ОАМ)',
              'Биохимический анализ крови'
            ],
            instrumental: [
              'Рентгенография органов грудной клетки (при необходимости)'
            ],
            consultations: []
          },
          
          finalDiagnosis: {
            main: 'Острая респираторная вирусная инфекция, грипп, средней степени тяжести',
            code: 'J11.1',
            complications: 'Нет',
            concomitant: 'Нет'
          },
          
          treatment: {
            regime: 'Постельный режим в период лихорадки',
            diet: 'Стол №15 (общий)',
            medications: [
              {
                name: 'Парацетамол',
                dose: '500 мг',
                route: 'Перорально',
                frequency: '3-4 раза в день',
                duration: '3-5 дней'
              },
              {
                name: 'Амброксол',
                dose: '30 мг',
                route: 'Перорально',
                frequency: '3 раза в день',
                duration: '5-7 дней'
              },
              {
                name: 'Витамин С',
                dose: '500 мг',
                route: 'Перорально',
                frequency: '2 раза в день',
                duration: '7 дней'
              }
            ],
            procedures: [
              'Полоскание горла содовым раствором',
              'Ингаляции с физраствором',
              'Обильное питье'
            ],
            recommendations: [
              'Постельный режим',
              'Обильное питье (чай с лимоном, морс)',
              'Проветривание помещения',
              'Изоляция на период лихорадки'
            ]
          },
          
          prognosis: 'Благоприятный при соблюдении рекомендаций',
          sickLeave: {
            needed: true,
            from: new Date().toISOString().split('T')[0],
            to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            days: 5
          }
        });
      }, 1500);
    });
  };

  const downloadProtocol = () => {
    if (!currentProtocol) return;
    const text = formatProtocolForDownload(currentProtocol, patientName, parseInt(patientAge), user.name);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protocol_${patientName.replace(/\s/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatProtocolForDownload = (protocol: MedicalProtocol, name: string, age: number, doctor: string): string => {
    const date = new Date().toLocaleDateString('ru-RU');
    return `═══════════════════════════════════════════════════════════════
АМБУЛАТОРНАЯ КАРТА БОЛЬНОГО (ФОРМА 025/У)
Республика Казахстан
═══════════════════════════════════════════════════════════════

ПАСПОРТНАЯ ЧАСТЬ
─────────────────────────────────────────────────────────────
Дата осмотра: ${date}
ФИО пациента: ${name}
Возраст: ${age} лет
ИИН: ${protocol.patientIIN}
Адрес проживания: ${protocol.patientAddress}
Контактный телефон: ${protocol.patientPhone}
Место работы: ${protocol.patientWorkplace}
Полис ОМС: ${protocol.insurancePolicy}

ВРАЧ: ${doctor}
Специальность: Терапевт
═══════════════════════════════════════════════════════════════

ЖАЛОБЫ И АНАМНЕЗ
─────────────────────────────────────────────────────────────
Основные жалобы: ${protocol.complaints}

Эпидемиологический анамнез: ${protocol.epidAnamnesis}

Анамнез жизни: ${protocol.lifeAnamnesis}

Аллергологический анамнез: ${protocol.allergyAnamnesis}

Анамнез заболевания:
  Длительность: ${protocol.diseaseAnamnesis.duration}
  Начало: ${protocol.diseaseAnamnesis.onset}
  Развитие: ${protocol.diseaseAnamnesis.development}
  Самолечение: ${protocol.diseaseAnamnesis.selfTreatment}

═══════════════════════════════════════════════════════════════

ОБЪЕКТИВНЫЙ ОСМОТР
─────────────────────────────────────────────────────────────
ОБЩЕЕ СОСТОЯНИЕ: ${protocol.objective.generalCondition}
Сознание: ${protocol.objective.consciousness}
Положение: ${protocol.objective.position}
Тип телосложения: ${protocol.objective.bodyType}
Питание: ${protocol.objective.nutrition}

ВИТАЛЬНЫЕ ПОКАЗАТЕЛИ:
  Температура: ${protocol.objective.temperature}
  Рост: ${protocol.objective.height}
  Вес: ${protocol.objective.weight}
  ИМТ: ${protocol.objective.bmi}

КОЖНЫЕ ПОКРОВЫ И ВИДИМЫЕ СЛИЗИСТЫЕ:
  Кожа: ${protocol.objective.skin}
  Слизистые: ${protocol.objective.mucous}
  Лимфатические узлы: ${protocol.objective.lymphNodes}
  Подкожная жировая клетчатка: ${protocol.objective.subcutaneousFat}

ОПОРНО-ДВИГАТЕЛЬНЫЙ АППАРАТ: ${protocol.objective.musculoskeletal}

СЕРДЕЧНО-СОСУДИСТАЯ СИСТЕМА:
  Осмотр: ${protocol.objective.cardiovascular.inspection}
  Пальпация: ${protocol.objective.cardiovascular.palpation}
  Перкуссия: ${protocol.objective.cardiovascular.percussion}
  Аускультация: ${protocol.objective.cardiovascular.auscultation}
  ЧСС: ${protocol.objective.cardiovascular.heartRate} уд/мин
  АД: ${protocol.objective.cardiovascular.bloodPressure}
  Пульс: ${protocol.objective.cardiovascular.pulse}

ОРГАНЫ ДЫХАНИЯ:
  Осмотр: ${protocol.objective.respiratory.inspection}
  Пальпация: ${protocol.objective.respiratory.palpation}
  Перкуссия: ${protocol.objective.respiratory.percussion}
  Аускультация: ${protocol.objective.respiratory.auscultation}
  ЧДД: ${protocol.objective.respiratory.respiratoryRate} в мин
  Зев: ${protocol.objective.respiratory.throat}

ОРГАНЫ ПИЩЕВАРЕНИЯ:
  Язык: ${protocol.objective.digestive.tongue}
  Живот: ${protocol.objective.digestive.abdomen}
  Печень: ${protocol.objective.digestive.liver}
  Селезенка: ${protocol.objective.digestive.spleen}
  Стул: ${protocol.objective.digestive.stool}

МОЧЕВЫДЕЛИТЕЛЬНАЯ СИСТЕМА:
  Почки: ${protocol.objective.urinary.kidneys}
  Мочеиспускание: ${protocol.objective.urinary.urination}
  Симптом Пастернацкого: ${protocol.objective.urinary.symptomPasternatsky}

НЕРВНАЯ СИСТЕМА:
  Сознание: ${protocol.objective.nervous.consciousness}
  Менингеальные симптомы: ${protocol.objective.nervous.meningealSigns}
  Моторная функция: ${protocol.objective.nervous.motorFunction}
  Сенсорная функция: ${protocol.objective.nervous.sensoryFunction}
  Рефлексы: ${protocol.objective.nervous.reflexes}

═══════════════════════════════════════════════════════════════

ПРЕДВАРИТЕЛЬНЫЙ ДИАГНОЗ
─────────────────────────────────────────────────────────────
Основной диагноз: ${protocol.preliminaryDiagnosis.main}
Код МКБ-10: ${protocol.preliminaryDiagnosis.code}
Осложнения: ${protocol.preliminaryDiagnosis.complications}
Сопутствующие заболевания: ${protocol.preliminaryDiagnosis.concomitant}

ПЛАН ОБСЛЕДОВАНИЯ
─────────────────────────────────────────────────────────────
Лабораторные исследования:
${protocol.investigationPlan.laboratory.map((l, i) => `  ${i + 1}. ${l}`).join('\n')}

Инструментальные исследования:
${protocol.investigationPlan.instrumental.map((i, idx) => `  ${idx + 1}. ${i}`).join('\n')}

Консультации специалистов:
${protocol.investigationPlan.consultations.length > 0 
  ? protocol.investigationPlan.consultations.map((c, i) => `  ${i + 1}. ${c}`).join('\n')
  : '  Не требуются'}

═══════════════════════════════════════════════════════════════

ОКОНЧАТЕЛЬНЫЙ ДИАГНОЗ
─────────────────────────────────────────────────────────────
Основной диагноз: ${protocol.finalDiagnosis.main}
Код МКБ-10: ${protocol.finalDiagnosis.code}
Осложнения: ${protocol.finalDiagnosis.complications}
Сопутствующие заболевания: ${protocol.finalDiagnosis.concomitant}

═══════════════════════════════════════════════════════════════

ПЛАН ЛЕЧЕНИЯ
─────────────────────────────────────────────────────────────
Режим: ${protocol.treatment.regime}
Диета: ${protocol.treatment.diet}

ЛЕКАРСТВЕННЫЕ ПРЕПАРАТЫ:
${protocol.treatment.medications.map((m, i) => 
  `  ${i + 1}. Rp.: ${m.name} ${m.dose}
     ${m.route}, ${m.frequency}
     Курс: ${m.duration}`
).join('\n')}

ПРОЦЕДУРЫ И МАНИПУЛЯЦИИ:
${protocol.treatment.procedures.map((p, i) => `  ${i + 1}. ${p}`).join('\n')}

РЕКОМЕНДАЦИИ:
${protocol.treatment.recommendations.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

═══════════════════════════════════════════════════════════════

ПРОГНОЗ И НЕТРУДОСПОСОБНОСТЬ
─────────────────────────────────────────────────────────────
Прогноз: ${protocol.prognosis}

Листок нетрудоспособности:
  Требуется: ${protocol.sickLeave.needed ? 'Да' : 'Нет'}
  ${protocol.sickLeave.needed ? `С: ${protocol.sickLeave.from}
  По: ${protocol.sickLeave.to}
  Дней: ${protocol.sickLeave.days}` : ''}

═══════════════════════════════════════════════════════════════

Врач: _________________________ ${doctor}
Дата: _________________________ ${date}
Подпись: _____________________

═══════════════════════════════════════════════════════════════
Документ соответствует стандартам МЗ РК
Форма 025/у (амбулаторная карта больного)
═══════════════════════════════════════════════════════════════`;
  };

  const loadRecord = (record: PatientRecord) => {
    setPatientName(record.patientName);
    setPatientAge(record.patientAge.toString());
    setPatientIIN(record.patientIIN);
    setPatientAddress(record.patientAddress);
    setPatientPhone(record.patientPhone);
    setInputText(record.anamnesis);
    setCurrentProtocol(record.protocol);
    setActiveView('protocol');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    if (currentProtocol && records.find(r => r.id === id)?.protocol === currentProtocol) {
      setCurrentProtocol(null);
      setActiveView('input');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">DictaMed Pro KZ</h1>
                <p className="text-xs text-gray-500">Медицинская документация по стандартам РК</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveView('history')}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeView === 'history' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="font-medium">История ({records.length})</span>
              </button>

              <div className="h-8 w-px bg-gray-200" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.specialty}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                  title="Выйти"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveView('input')}
            className={`flex-1 sm:flex-none sm:px-8 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'input'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Новая запись
          </button>
          <button
            onClick={() => setActiveView('protocol')}
            disabled={!currentProtocol}
            className={`flex-1 sm:flex-none sm:px-8 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'protocol'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            Протокол
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`sm:hidden flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'history'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            История
          </button>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800 mb-1">Ошибки валидации:</p>
                {errors.map((error, i) => (
                  <p key={i} className="text-sm text-red-700">• {error}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'input' && (
          <InputView
            inputText={inputText}
            setInputText={setInputText}
            patientName={patientName}
            setPatientName={setPatientName}
            patientAge={patientAge}
            setPatientAge={setPatientAge}
            patientIIN={patientIIN}
            setPatientIIN={setPatientIIN}
            patientAddress={patientAddress}
            setPatientAddress={setPatientAddress}
            patientPhone={patientPhone}
            setPatientPhone={setPatientPhone}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            isGenerating={isGenerating}
            generateProtocol={generateProtocol}
            speechSupported={speechSupported}
          />
        )}

        {activeView === 'protocol' && currentProtocol && (
          <ProtocolView
            protocol={currentProtocol}
            patientName={patientName}
            patientAge={patientAge ? parseInt(patientAge) : 0}
            userName={user.name}
            onDownload={downloadProtocol}
          />
        )}

        {activeView === 'history' && (
          <HistoryView
            records={records}
            onLoadRecord={loadRecord}
            onDeleteRecord={deleteRecord}
          />
        )}
      </main>
    </div>
  );
}

// ============= INPUT VIEW =============
function InputView(props: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ФИО пациента *</label>
          <input
            type="text"
            value={props.patientName}
            onChange={(e) => props.setPatientName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="Иванов Иван Иванович"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ИИН (12 цифр) *</label>
          <input
            type="text"
            value={props.patientIIN}
            onChange={(e) => props.setPatientIIN(e.target.value.replace(/\D/g, '').slice(0, 12))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="123456789012"
            maxLength={12}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Возраст (полных лет) *</label>
          <input
            type="number"
            value={props.patientAge}
            onChange={(e) => props.setPatientAge(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="38"
            min="0"
            max="150"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
          <input
            type="tel"
            value={props.patientPhone}
            onChange={(e) => props.setPatientPhone(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="+7 (700) 123-45-67"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Адрес проживания *</label>
          <input
            type="text"
            value={props.patientAddress}
            onChange={(e) => props.setPatientAddress(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="г. Алматы, ул. Абая, 123, кв. 45"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">Анамнез (голосовой ввод или текст)</label>
        <button
          onClick={props.toggleRecording}
          disabled={!props.speechSupported}
          className={`p-3 rounded-full transition-all shadow-lg ${
            props.isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : props.speechSupported
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={props.isRecording ? 'Остановить запись' : 'Начать запись'}
        >
          {props.isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>

      {props.isRecording && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Идет запись... Говорите четко и внятно
        </div>
      )}

      <textarea
        value={props.inputText}
        onChange={(e) => props.setInputText(e.target.value)}
        className="w-full h-96 p-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-700"
        placeholder="Введите или продиктуйте анамнез пациента по нормам МЗ РК..."
      />

      <button
        onClick={props.generateProtocol}
        disabled={props.isGenerating}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {props.isGenerating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Генерация протокола...
          </>
        ) : (
          <>
            <Activity className="w-5 h-5" />
            Сгенерировать протокол (форма 025/у)
          </>
        )}
      </button>
    </div>
  );
}

// ============= PROTOCOL VIEW =============
function ProtocolView(props: any) {
  const protocol = props.protocol;

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-blue-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Амбулаторная карта больного</h1>
            <p className="text-lg text-gray-500 mt-1">Форма 025/у (РК)</p>
          </div>
          <button
            onClick={props.onDownload}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            Скачать
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Паспортная часть</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">ИИН</p>
              <p className="font-semibold">{protocol.patientIIN}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Адрес</p>
              <p className="font-semibold text-sm">{protocol.patientAddress}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Телефон</p>
              <p className="font-semibold">{protocol.patientPhone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Место работы</p>
              <p className="font-semibold text-sm">{protocol.patientWorkplace}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Полис ОМС</p>
              <p className="font-semibold">{protocol.insurancePolicy}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Предварительный диагноз</p>
            <p className="font-bold text-gray-800 mt-1">{protocol.preliminaryDiagnosis.main}</p>
            <p className="text-xs text-gray-500 mt-1">Код: {protocol.preliminaryDiagnosis.code}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Окончательный диагноз</p>
            <p className="font-bold text-gray-800 mt-1">{protocol.finalDiagnosis.main}</p>
            <p className="text-xs text-gray-500 mt-1">Код: {protocol.finalDiagnosis.code}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Объективный осмотр</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Температура</p>
            <p className="font-bold">{protocol.objective.temperature}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">ЧСС</p>
            <p className="font-bold">{protocol.objective.cardiovascular.heartRate} уд/мин</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">АД</p>
            <p className="font-bold">{protocol.objective.cardiovascular.bloodPressure}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">ЧДД</p>
            <p className="font-bold">{protocol.objective.respiratory.respiratoryRate} в мин</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">План лечения</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-blue-600 mb-2">Лекарственные препараты:</h3>
            <ul className="space-y-2">
              {protocol.treatment.medications.map((m: any, i: number) => (
                <li key={i} className="text-sm bg-gray-50 p-3 rounded">
                  <strong>Rp.:</strong> {m.name} {m.dose}<br/>
                  {m.route}, {m.frequency}, курс: {m.duration}
                </li>
              ))}
            </ul>
          </div>
          {protocol.sickLeave.needed && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
              <p className="font-bold text-yellow-800">Листок нетрудоспособности</p>
              <p className="text-sm text-yellow-700 mt-1">
                С {protocol.sickLeave.from} по {protocol.sickLeave.to} ({protocol.sickLeave.days} дней)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= HISTORY VIEW =============
function HistoryView(props: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">История записей ({props.records.length})</h1>
      
      {props.records.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-500">
          <History className="w-10 h-10 mx-auto mb-3" />
          <p className="font-medium">История пуста</p>
          <p className="text-sm">Сгенерируйте первый протокол, чтобы он появился здесь.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {props.records.map((record: PatientRecord) => (
            <div key={record.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-800 truncate">{record.patientName}</p>
                <p className="text-sm text-gray-500">
                  ИИН: {record.patientIIN} • {record.patientAge} лет • {new Date(record.date).toLocaleDateString('ru-RU')}
                </p>
                <p className="text-xs text-blue-600 mt-1 truncate">Диагноз: {record.protocol.finalDiagnosis.main}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <button
                  onClick={() => props.onLoadRecord(record)}
                  className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
                  title="Загрузить протокол"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => props.onDeleteRecord(record.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                  title="Удалить запись"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
