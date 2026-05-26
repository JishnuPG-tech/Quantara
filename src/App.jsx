import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import DashboardStats from './components/DashboardStats';
import LevelMap from './components/LevelMap';
import TopperSprintArena from './components/TopperSprintArena';
import RetrainingSandbox from './components/RetrainingSandbox';


// SVG Inline Icons
const IconHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconBrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IconSyllabus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/><rect x="3" y="11" width="6" height="6" rx="1"/></svg>;
const IconMock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L3.07 12.7A1 1 0 0 0 2 13.6v5a2 2 0 0 0 2 2h2"/><path d="M18 18.8v-4.14a2 2 0 0 1 1-1.74l3-1.7v4.58a2 2 0 0 1-2 2h-2"/></svg>;
const IconLibrary = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>;
const IconCoach = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
const IconClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconLogOut = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconFlag = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
const IconMessage = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconSparkles = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>;
const IconClose = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconCompass = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;

// Rich Mock Quiz Questions Database
const QUIZ_QUESTIONS = [
  {
    subject: "Quantitative Aptitude",
    question: "Simplify the approximation question: 44.98% of 799.92 + 25.04% of 159.95 = ?",
    options: ["A) 380", "B) 400", "C) 420", "D) 450"],
    correct: 1, // B
    explanation: [
      "Round off coefficients: 45% of 800 + 25% of 160.",
      "45% of 800 = (50% - 5%) of 800 = 400 - 40 = 360.",
      "25% of 160 = 1/4 of 160 = 40.",
      "360 + 40 = 400.",
      "Vedic Tip: Mental splits (50% - 5%) are 3x faster than writing down standard equations!"
    ]
  },
  {
    subject: "Quantitative Aptitude",
    question: "Determine the relationship: I. x^2 - 15x + 56 = 0, II. y^2 - 17y + 72 = 0",
    options: ["A) x > y", "B) x < y", "C) x >= y", "D) x <= y", "E) CND (Relation cannot be established)"],
    correct: 3, // D
    explanation: [
      "Equation I: x^2 - 15x + 56 = 0 -> Product = 56, Sum = -15 -> Factors: -7, -8 -> Roots (x): +7, +8.",
      "Equation II: y^2 - 17y + 72 = 0 -> Product = 72, Sum = -17 -> Factors: -8, -9 -> Roots (y): +8, +9.",
      "Compare roots: x=7 is less than both y=8 and y=9; x=8 is equal to y=8 and less than y=9.",
      "Therefore, x <= y."
    ]
  },
  {
    subject: "Reasoning Ability",
    question: "Statements: Only a few circles are squares. All squares are triangles. No triangle is a hexagon.\nConclusions:\nI. Some circles are not triangles.\nII. No square is a hexagon.",
    options: ["A) Only I follows", "B) Only II follows", "C) Both I and II follow", "D) Neither I nor II follows"],
    correct: 1, // B
    explanation: [
      "'Only a few circles are squares' means: Some circles are squares AND some circles are NOT squares.",
      "'All squares are triangles' means the entire square set lies inside the triangle set.",
      "'No triangle is a hexagon' means triangle and hexagon sets are completely mutually exclusive.",
      "Conclusion I: 'Some circles are not triangles' is not definite (remaining circles could be in triangle). Not valid.",
      "Conclusion II: 'No square is a hexagon' is definitely true because squares are inside triangles, which cannot touch hexagons."
    ]
  },
  {
    subject: "Banking Awareness",
    question: "Which rate represents the lending rate at which the RBI loans funds to commercial banks for short-term periods, backed by government securities?",
    options: ["A) Bank Rate", "B) Reverse Repo Rate", "C) Repo Rate", "D) MSF (Marginal Standing Facility)"],
    correct: 2, // C
    explanation: [
      "Repo Rate (Repurchase Option) is the short-term lending rate backed by government securities as collateral.",
      "Bank Rate is for long-term lending without collateral.",
      "MSF represents overnight emergency loan windows."
    ]
  }
];



const getCheckpointData = (lesson) => {
  if (lesson.category === 'quant') {
    return {
      hook: "Look closely! In bank exams like SBI PO, you have only 20 minutes for 35 quant questions. Full calculations are a trap. Let's estimate: what is the approximate range for 98 × 97?",
      options: [
        "A) Between 8500 and 9000",
        "B) Between 9000 and 9400",
        "C) Between 9400 and 9700 (Close to 100²)"
      ],
      correct: 2,
      feedback: "Brilliant work! Both numbers are near 100, so the result must be slightly less than 10,000. Now click 'Continue' to unlock the 3-second Vedic deviation trick!"
    };
  } else if (lesson.category === 'reasoning') {
    return {
      hook: "Look at this Syllogism trap. 'Only a few circles are squares' is given. What does this rule out?",
      options: [
        "A) All circles being squares is completely impossible",
        "B) All squares being circles is impossible",
        "C) Some circles are squares"
      ],
      correct: 0,
      feedback: "Perfect intuition! 'Only a few circles are squares' rules out 'All circles are squares' (since some circles must not be squares). Click 'Continue' to see the dual-Venn logic flow!"
    };
  } else if (lesson.category === 'english') {
    return {
      hook: "Grammar modifier trap: 'The box of chocolates, along with the vanilla cupcakes, (is/are) sitting on the counter.' What is the true singular subject?",
      options: [
        "A) 'cupcakes'",
        "B) 'box'",
        "C) 'chocolates'"
      ],
      correct: 1,
      feedback: "Brilliant spot! The modifier 'along with...' is background noise. The true subject is the singular 'box' (so verb is 'is'). Click 'Continue' to master Bracket Stripping!"
    };
  } else {
    return {
      hook: "Banking liquidity lever: RBI raises the Repo Rate to fight inflation. What do you think happens to liquidity in the banking system?",
      options: [
        "A) Commercial banks borrow more, pumping liquidity",
        "B) Commercial banks borrow less, cooling down market liquidity",
        "C) Cash reserve ratios drop"
      ],
      correct: 1,
      feedback: "Superb! High repo rates make borrowing expensive, cooling down liquidity and inflation. Click 'Continue' to unlock the Monetary Policy flowchart!"
    };
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Winding roadmap learning path progress states
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('bank_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('bank_study_streak')) || 3;
  });
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState(1); // 1 = dialogue, 2 = visual board, 3 = quiz test
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null); // 'correct' or 'incorrect'
  const [activeBoardStep, setActiveBoardStep] = useState(0);

  // Premium Adaptive OS upgrades
  const [learningMode, setLearningMode] = useState(() => {
    return localStorage.getItem('bank_learning_mode') || 'guided'; // 'guided', 'speed', 'topper'
  });
  const [quizAttempts, setQuizAttempts] = useState({}); // { [questionIdx]: count }
  const [mistakeFingerprints, setMistakeFingerprints] = useState(() => {
    const saved = localStorage.getItem('bank_mistake_fingerprints');
    return saved ? JSON.parse(saved) : {
      negativeSigns: 0,
      inequalityDirection: 0,
      carryDigits: 0,
      onlyAFew: 0
    };
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('bank_reduced_motion') === 'true';
  });
  const [colorblindSafe, setColorblindSafe] = useState(() => {
    return localStorage.getItem('bank_colorblind_safe') === 'true';
  });
  

  
  // Explanation styles & interactive micro-checkpoints
  const [explanationStyle, setExplanationStyle] = useState('visual'); // 'visual', 'logical', 'shortcut', 'story'
  const [checkpointSelectedOpt, setCheckpointSelectedOpt] = useState(null);
  const [checkpointFeedback, setCheckpointFeedback] = useState(null); // 'correct' or 'incorrect'

  const [analyticsData, setAnalyticsData] = useState(() => {
    const saved = localStorage.getItem('bank_analytics');
    return saved ? JSON.parse(saved) : {
      hesitationTotal: 0,
      hesitationCount: 0,
      shortcutDependency: 0,
      changeCount: 0
    };
  });

  const [syllabus, setSyllabus] = useState(() => {
    const saved = localStorage.getItem('bank_syllabus');
    if (saved) return JSON.parse(saved);
    return {
      quant: {
        "Simplification & Approximation": false,
        "Quadratic Equations": false,
        "Number Series (Missing/Wrong)": false,
        "Data Interpretation (DI)": false,
        "Averages, Ratios & Percentages": false,
        "Profit, Loss & Interest (SI/CI)": false,
        "Time, Work & Distance": false
      },
      reasoning: {
        "Syllogisms (Only a few cases)": false,
        "Inequalities (Direct/Coded)": false,
        "Coding-Decoding": false,
        "Blood Relations & Direction Sense": false,
        "Linear & Circular Seating Puzzles": false,
        "Floor, Flat & Box Puzzles": false
      },
      english: {
        "Reading Comprehension (RC)": false,
        "Grammar Rules (Subject-Verb, Tenses)": false,
        "Error Spotting & Sentence Fillers": false,
        "Cloze Test & Para-jumbles": false
      },
      banking: {
        "RBI Structure, Monetary Policy & Rates": false,
        "Commercial Banking, NPAs & BASEL Norms": false,
        "Financial & Capital Markets": false,
        "Government Schemes & Current Affairs": false,
        "Static General Knowledge": false
      }
    };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vbc_theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('bank_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('bank_learning_mode', learningMode);
  }, [learningMode]);

  useEffect(() => {
    localStorage.setItem('bank_mistake_fingerprints', JSON.stringify(mistakeFingerprints));
  }, [mistakeFingerprints]);

  useEffect(() => {
    localStorage.setItem('bank_reduced_motion', String(reducedMotion));
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('bank_colorblind_safe', String(colorblindSafe));
    if (colorblindSafe) {
      document.body.classList.add('colorblind-safe');
    } else {
      document.body.classList.remove('colorblind-safe');
    }
  }, [colorblindSafe]);

  useEffect(() => {
    localStorage.setItem('bank_analytics', JSON.stringify(analyticsData));
  }, [analyticsData]);

  useEffect(() => {
    localStorage.setItem('bank_syllabus', JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vbc_theme', theme);
  }, [theme]);

  // Silent auto-backup hook
  useEffect(() => {
    const backupObj = {
      version: 2,
      timestamp: 1716700000000,
      completed: completedLessons,
      streak: streak,
      mistakes: mistakeFingerprints,
      syllabus: syllabus,
      analytics: analyticsData
    };
    localStorage.setItem('bank_silent_backup', JSON.stringify(backupObj));
  }, [completedLessons, streak, mistakeFingerprints, syllabus, analyticsData]);

  const handleTopperTimeout = useCallback(() => {
    if (!activeLesson) return;
    setQuizFeedback('incorrect');
    const currentQKey = `${activeLesson.id}_${quizQuestionIdx}`;
    const currentAttempts = (quizAttempts[currentQKey] || 0) + 1;
    setQuizAttempts(prevAtt => ({ ...prevAtt, [currentQKey]: currentAttempts }));
    
    let errorType = null;
    if (activeLesson.id === 5) errorType = 'negativeSigns';
    else if (activeLesson.id === 6 || activeLesson.id === 7) errorType = 'onlyAFew';
    else if (activeLesson.id === 8) errorType = 'inequalityDirection';
    else if ([1, 2, 3, 4].includes(activeLesson.id)) errorType = 'carryDigits';
    if (errorType) {
      setMistakeFingerprints(mf => ({ ...mf, [errorType]: mf[errorType] + 1 }));
    }
  }, [activeLesson, quizQuestionIdx, quizAttempts]);

  const handleRetry = useCallback(() => {
    setSelectedQuizOpt(null);
    setQuizFeedback(null);
  }, []);

  const handleReplayWhiteboard = useCallback(() => {
    setLessonStep(2);
    setActiveBoardStep(0);
  }, []);

  const handleRevealHint = useCallback((type) => {
    if (!activeLesson) return;
    if (type === 'concept') {
      alert("Hint 1: " + activeLesson.quiz[quizQuestionIdx].explanation.split('.')[0]);
    } else {
      alert("Hint 2: Look at the unit values of options. The correct one matches the mathematical deviation boundary!");
    }
  }, [activeLesson, quizQuestionIdx]);

  const handleSolveStepByStep = useCallback(() => {
    setSelectedQuizOpt(null);
    setQuizFeedback(null);
  }, []);



  // Calculate Progress Stats
  const getSectionStats = (section) => {
    const topics = Object.values(syllabus[section]);
    const total = topics.length;
    const completed = topics.filter(t => t).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const totalTopics = Object.values(syllabus).reduce((acc, curr) => acc + Object.keys(curr).length, 0);
  const completedTopics = Object.values(syllabus).reduce((acc, curr) => acc + Object.values(curr).filter(t => t).length, 0);
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Toggle Syllabus Topics
  const toggleTopic = (section, topic) => {
    setSyllabus(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [topic]: !prev[section][topic]
      }
    }));
  };

  // Auto check syllabus when level completed
  const syncSyllabusWithRoadmap = (levelId) => {
    const mapping = {
      1: { sec: 'quant', topic: 'Simplification & Approximation' },
      2: { sec: 'quant', topic: 'Simplification & Approximation' },
      3: { sec: 'quant', topic: 'Simplification & Approximation' },
      4: { sec: 'quant', topic: 'Simplification & Approximation' },
      5: { sec: 'quant', topic: 'Quadratic Equations' },
      6: { sec: 'reasoning', topic: 'Syllogisms (Only a few cases)' },
      7: { sec: 'reasoning', topic: 'Syllogisms (Only a few cases)' },
      8: { sec: 'reasoning', topic: 'Inequalities (Direct/Coded)' },
      9: { sec: 'reasoning', topic: 'Linear & Circular Seating Puzzles' },
      10: { sec: 'english', topic: 'Grammar Rules (Subject-Verb, Tenses)' },
      11: { sec: 'english', topic: 'Error Spotting & Sentence Fillers' },
      12: { sec: 'banking', topic: 'RBI Structure, Monetary Policy & Rates' }
    };
    
    const target = mapping[levelId];
    if (target) {
      setSyllabus(prev => ({
        ...prev,
        [target.sec]: {
          ...prev[target.sec],
          [target.topic]: true
        }
      }));
    }
  };

  const handleCompleteLesson = (levelId) => {
    if (!completedLessons.includes(levelId)) {
      const nextCompleted = [...completedLessons, levelId];
      setCompletedLessons(nextCompleted);
      syncSyllabusWithRoadmap(levelId);
      setStreak(prev => {
        const nextStreak = prev + 1;
        localStorage.setItem('bank_study_streak', String(nextStreak));
        return nextStreak;
      });
    }
    setActiveLesson(null);
  };

  // Reset Syllabus Progress
  const resetSyllabus = () => {
    if (window.confirm("Are you sure you want to reset all study progress?")) {
      const reset = { ...syllabus };
      Object.keys(reset).forEach(sec => {
        Object.keys(reset[sec]).forEach(t => {
          reset[sec][t] = false;
        });
      });
      setSyllabus(reset);
    }
  };

  // ==================== SPEED MATH COMPONENT STATE ====================
  const [drillActive, setDrillActive] = useState(false);
  const [drillScore, setDrillScore] = useState(0);
  const [drillCount, setDrillCount] = useState(0);
  const [currentDrill, setCurrentDrill] = useState(null);
  const [userDrillAns, setUserDrillAns] = useState('');
  const [drillMessage, setDrillMessage] = useState('');
  const [drillTime, setDrillTime] = useState(0);
  const [showDrillExplanation, setShowDrillExplanation] = useState(false);
  const timerRef = useRef(null);

  // Start Speed Math Drill Module
  const generateNewDrill = () => {
    const drillTypes = ['square', 'cube', 'base_mult', 'digital_root', 'fraction'];
    const selectedType = drillTypes[Math.floor(Math.random() * drillTypes.length)];
    
    let question = "";
    let correct = "";
    let tip = "";
    let mathType = "";

    if (selectedType === 'square') {
      const numbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];
      const num = numbers[Math.floor(Math.random() * numbers.length)];
      question = `What is the square of ${num}?`;
      correct = String(num * num);
      const digits = Math.floor(num / 10);
      tip = `Vedic Squaring Ending in 5: Multiply the first digit (${digits}) by its successor (${digits + 1}) = ${digits * (digits + 1)}, then append 25 at the end. Total = ${digits * (digits + 1)}25!`;
      mathType = "Squaring (Vedic)";
    } else if (selectedType === 'cube') {
      const num = [5, 6, 7, 8, 9, 11, 12, 15][Math.floor(Math.random() * 8)];
      question = `What is the cube of ${num}?`;
      correct = String(num * num * num);
      tip = `Banking Tip: Memorizing cubes up to 20 saves up to 18 seconds in simplification questions.`;
      mathType = "Cubing (Memory)";
    } else if (selectedType === 'base_mult') {
      const base1 = [95, 96, 97, 98, 99][Math.floor(Math.random() * 5)];
      const base2 = [93, 94, 95, 96, 97][Math.floor(Math.random() * 5)];
      question = `Calculate: ${base1} x ${base2}`;
      correct = String(base1 * base2);
      const d1 = 100 - base1;
      const d2 = 100 - base2;
      const fh = base1 - d2;
      const sh = d1 * d2;
      tip = `Base 100 Difference Method: Both numbers are close to 100. Write differences: -${d1} and -${d2}. Cross-subtract: ${base1} - ${d2} = ${fh} (First Half). Multiply diffs: ${d1} x ${d2} = ${sh} (Second Half). Answer = ${fh}${sh < 10 ? '0' + sh : sh}!`;
      mathType = "Multiplication (Vedic)";
    } else if (selectedType === 'digital_root') {
      const num = Math.floor(Math.random() * 9000) + 1000;
      question = `Find the single-digit Digital Root of ${num} (Casting out 9s)`;
      let temp = num;
      while (temp > 9) {
        temp = String(temp).split('').reduce((acc, val) => acc + parseInt(val), 0);
      }
      correct = String(temp);
      tip = `Casting Out 9s Hack: Add the digits of ${num} and discard any numbers adding to 9. Example: 4579 -> (4+5=9 discard, 9 discard) -> Root is 7!`;
      mathType = "Digital Root (Verification)";
    } else if (selectedType === 'fraction') {
      const fractions = [
        { f: '1/8', v: '12.5', t: '1/8 is exactly 12.5%. Excellent for percentage calculations.' },
        { f: '1/6', v: '16.67', t: '1/6 rounds off to 16.67%.' },
        { f: '1/7', v: '14.29', t: '1/7 is roughly 14.2857% (14.29%).' },
        { f: '1/12', v: '8.33', t: '1/12 is roughly 8.33%.' },
        { f: '1/9', v: '11.11', t: '1/9 is exactly 11.11%.' }
      ];
      const item = fractions[Math.floor(Math.random() * fractions.length)];
      question = `Convert fraction ${item.f} to percentage value (Write in decimals, e.g., 12.5)`;
      correct = item.v;
      tip = item.t;
      mathType = "Fraction to % (Speed-DI)";
    }

    setCurrentDrill({ question, correct, tip, mathType });
    setUserDrillAns('');
    setDrillMessage('');
    setShowDrillExplanation(false);
    setDrillTime(0);

    if (timerRef.current) clearInterval(timerRef.current);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setDrillTime(((Date.now() - start) / 1000));
    }, 50);
  };

  const submitDrillAnswer = (e) => {
    e.preventDefault();
    if (timerRef.current) clearInterval(timerRef.current);
    
    setDrillCount(prev => prev + 1);
    const userVal = userDrillAns.trim().replace('%', '');
    const correctVal = currentDrill.correct;

    const isCorrect = currentDrill.mathType.includes("Fraction")
      ? Math.abs(parseFloat(userVal) - parseFloat(correctVal)) <= 0.1
      : userVal === correctVal;

    if (isCorrect) {
      setDrillScore(prev => prev + 1);
      setDrillMessage('correct');
    } else {
      setDrillMessage('incorrect');
    }
    setShowDrillExplanation(true);
  };

  const stopSpeedDrill = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDrillActive(false);
    setCurrentDrill(null);
  };

  // ==================== MOCK EXAM STATE ====================
  const [examActive, setExamActive] = useState(false);
  const [examCurrentQ, setExamCurrentQ] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examTime, setExamTime] = useState(1200); 
  const [examFinished, setExamFinished] = useState(false);
  const [flaggedQs, setFlaggedQs] = useState({});
  const examTimerRef = useRef(null);

  const startExam = () => {
    setExamActive(true);
    setExamCurrentQ(0);
    setExamAnswers({});
    setFlaggedQs({});
    setExamTime(1200);
    setExamFinished(false);

    if (examTimerRef.current) clearInterval(examTimerRef.current);
    examTimerRef.current = setInterval(() => {
      setExamTime(prev => {
        if (prev <= 1) {
          clearInterval(examTimerRef.current);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishExam = () => {
    if (examTimerRef.current) clearInterval(examTimerRef.current);
    setExamFinished(true);
  };

  const exitExam = () => {
    if (examTimerRef.current) clearInterval(examTimerRef.current);
    setExamActive(false);
    setExamFinished(false);
  };

  const calculateExamScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (examAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  // ==================== VEDIC LIBRARY / DIGITAL ROOT CHECKER STATE ====================
  const [exprInput, setExprInput] = useState('');
  const [exprResult, setExprResult] = useState(null);

  // ==================== INTERACTIVE SPEED MATH VISUALIZERS STATE ====================
  const [japNum1, setJapNum1] = useState('12');
  const [japNum2, setJapNum2] = useState('13');

  const [sqInput, setSqInput] = useState('7921');
  const [sqResult, setSqResult] = useState({
    square: 7921,
    root: 89,
    tensBelow: 80,
    tensAbove: 90,
    midpoint: 85,
    sqBelow: 6400,
    sqAbove: 8100,
    sqMid: 7225,
    endsIn: 1,
    unitOptions: [1, 9],
    isUpperHalf: true
  });

  const [quadSignB, setQuadSignB] = useState('+');
  const [quadSignC, setQuadSignC] = useState('+');

  // New interactive speed math labs states
  const [latNum1, setLatNum1] = useState('23');
  const [latNum2, setLatNum2] = useState('47');
  const [sq5Input, setSq5Input] = useState('35');
  const [baseMult1, setBaseMult1] = useState('98');
  const [baseMult2, setBaseMult2] = useState('97');

  // Whiteboard step toggles
  const [japStep, setJapStep] = useState(1);
  const [latStep, setLatStep] = useState(1);
  const [sq5Step, setSq5Step] = useState(1);
  const [baseStep, setBaseStep] = useState(1);

  const handleSquareRootVis = (e) => {
    e.preventDefault();
    const val = parseInt(sqInput.trim());
    if (isNaN(val) || val <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }
    const rootFloat = Math.sqrt(val);
    const root = Math.round(rootFloat);
    if (root * root !== val) {
      alert("Not a perfect square! Please try numbers like 7921, 2025, 1225, 625, 576, 144.");
      return;
    }

    const tensBelow = Math.floor(root / 10) * 10;
    const tensAbove = tensBelow + 10;
    const midpoint = tensBelow + 5;

    setSqResult({
      square: val,
      root: root,
      tensBelow: tensBelow,
      tensAbove: tensAbove,
      midpoint: midpoint,
      sqBelow: tensBelow * tensBelow,
      sqAbove: tensAbove * tensAbove,
      sqMid: midpoint * midpoint,
      endsIn: val % 10,
      unitOptions: val % 10 === 1 ? [1, 9] : val % 10 === 4 ? [2, 8] : val % 10 === 5 ? [5] : val % 10 === 6 ? [4, 6] : val % 10 === 9 ? [3, 7] : [0],
      isUpperHalf: val > (midpoint * midpoint)
    });
  };

  const calculateDigitalRootLive = (e) => {
    e.preventDefault();
    try {
      const cleanExpr = exprInput.replace(/[^0-9+\-*/().]/g, '');
      const evalVal = Function(`"use strict"; return (${cleanExpr})`)();
      if (isNaN(evalVal) || !isFinite(evalVal)) throw new Error();

      const roundedVal = Math.round(evalVal);
      let root = Math.abs(roundedVal);
      while (root > 9) {
        root = String(root).split('').reduce((acc, val) => acc + parseInt(val), 0);
      }

      const steps = [];
      steps.push(`Evaluated Value: ${evalVal}`);
      steps.push(`Rounded Value: ${roundedVal}`);
      steps.push(`Let's sum digits: ${String(Math.abs(roundedVal)).split('').join(' + ')} = ${String(Math.abs(roundedVal)).split('').reduce((a,c)=>a+parseInt(c),0)}`);
      steps.push(`Final Digital Root: ${root}`);

      setExprResult({
        val: evalVal,
        rounded: roundedVal,
        root: root,
        steps: steps
      });
    } catch {
      alert("Please enter a valid mathematical expression (e.g. 43 * 12 + 105)");
      setExprResult(null);
    }
  };

  // ==================== VEDIC MULTIPLICATION VISUALIZER STATE ====================
  const [visNum1, setVisNum1] = useState('23');
  const [visNum2, setVisNum2] = useState('47');
  const [visResult, setVisResult] = useState(null);

  const runVedicMultiplicationVisualizer = (e) => {
    e.preventDefault();
    const n1 = visNum1.trim();
    const n2 = visNum2.trim();

    if (n1.length !== 2 || n2.length !== 2 || isNaN(n1) || isNaN(n2)) {
      alert("Please enter two 2-digit numbers to visualize step-by-step crosswise paths!");
      return;
    }

    const A = parseInt(n1[0]);
    const B = parseInt(n1[1]);
    const C = parseInt(n2[0]);
    const D = parseInt(n2[1]);

    // Step 1: B * D
    const s1 = B * D;
    const s1_write = s1 % 10;
    const s1_carry = Math.floor(s1 / 10);

    // Step 2: A * D + B * C
    const s2_raw = A * D + B * C;
    const s2_total = s2_raw + s1_carry;
    const s2_write = s2_total % 10;
    const s2_carry = Math.floor(s2_total / 10);

    // Step 3: A * C
    const s3_raw = A * C;
    const s3_total = s3_raw + s2_carry;

    const finalVal = parseInt(n1) * parseInt(n2);

    setVisResult({
      digits: { A, B, C, D },
      step1: { raw: s1, write: s1_write, carry: s1_carry },
      step2: { raw: s2_raw, total: s2_total, write: s2_write, carry: s2_carry },
      step3: { raw: s3_raw, total: s3_total },
      final: finalVal
    });
  };

  // ==================== AI COACH STATE ====================
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'coach',
      text: 'Hello! I am your personal Bank Exam Coach. Let\'s make sure you crack these exams. What topic shall we discuss today? I can explain Quant, Syllogisms, Banking, or give you a Vedic speed tip.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInputChat, setUserInputChat] = useState('');
  const [chatIsTyping, setChatIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatIsTyping]);

  const sendChatMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserInputChat('');
    setChatIsTyping(true);

    setTimeout(() => {
      let coachReply = "";
      const query = text.toLowerCase();

      if (query.includes('syllogism') || query.includes('only a few')) {
        coachReply = `**Syllogism Mastery: Understanding 'Only a Few'**\n\nWhen a statement says *"Only a few A are B"*, it translates to two definite conclusions:\n1. **Some A are B** (Positive overlapping)\n2. **Some A are NOT B** (Negative restriction)\n\n*Trap alert:* Under standard 'Some A are B' rules, there is a possibility that all A could become B. But in 'Only a few', **all A can NEVER become B** because the negative part restricts it! Check this logic in the *Reasoning section* of the mock tests.`;
      } else if (query.includes('repo') || query.includes('rate') || query.includes('banking')) {
        coachReply = `**Banking Concept: Repo Rate vs Bank Rate**\n\nThink of the RBI as the central vault. When commercial banks need cash, they borrow from the RBI:\n- **Repo Rate (Short-term):** Banks must pledge Government Securities as collateral. Repo stands for *Repurchase Option*.\n- **Bank Rate (Long-term):** No collateral is required. It's used for penalizing or stabilizing financial operations.\n\n*General Awareness Tip:* High Repo rates make borrowing expensive, which cools down market inflation!`;
      } else if (query.includes('98') || query.includes('97') || query.includes('vedic') || query.includes('multiply')) {
        coachReply = `**Vedic Speed Hack: Base 100 difference multiplication**\n\nLet's multiply **98 x 97** instantly:\n1. Both numbers are close to 100.\n2. Write down their differences from 100:\n   - 98 is **-2**\n   - 97 is **-3**\n3. **Cross-subtract:** 98 - 3 = **95** (or 97 - 2 = 95). This is your first half!\n4. **Multiply differences:** (-2) * (-3) = **06**. This is your second half!\n\nCombine both halves: **9506**! Solved in 3 seconds flat!`;
      } else if (query.includes('puzzle') || query.includes('seating')) {
        coachReply = `**Reasoning Shortcut: The 'Skip-and-Score' Puzzle Rule**\n\nWhen dealing with linear or circular arrangements, follow these 3 rules:\n1. Scan the clues for a *definite starting point* (e.g. 'A sits third to the right of B'). If all clues are relative ('A is next to B'), skip it and come back later.\n2. Always draw **two parallel cases** (Case A and Case B) simultaneously to avoid scratching out work if a clue breaks.\n3. Puzzles should take max 3.5 minutes. If you get stuck for 1 minute without drawing a line, **SKIP IT IMMEDIATELY**! Your score depends on it.`;
      } else {
        coachReply = `Excellent question! As your bank exam coach, I recommend focused practice on speed arithmetic and syllabus mapping. Remember: cracking SBI PO is about **accuracy and selective skipping**, not trying to attempt all 100 questions. Focus on securing 65+ correct answers!`;
      }

      setChatMessages(prev => [...prev, {
        sender: 'coach',
        text: coachReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatIsTyping(false);
    }, 1200);
  };

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation Panel */}
      <aside className="sidebar">
        <div>
          {/* Brand Logo and Header Info */}
          <div className="brand-section">
            <img src="/logo.png" alt="Visual Bank Coach Logo" className="brand-logo-img" />
            <div>
              <h1 className="brand-title">BANKING</h1>
              <p className="brand-subtitle">VISUAL COACH</p>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="nav-menu">
            {[
              { id: 'home', label: 'Dashboard', icon: <IconHome /> },
              { id: 'math', label: 'Speed Math Hub', icon: <IconBrain /> },
              { id: 'syllabus', label: 'Syllabus Tracker', icon: <IconSyllabus /> },
              { id: 'mock', label: 'Mock Exam Engine', icon: <IconMock /> },
              { id: 'library', label: 'Speed Math & Visual Tools', icon: <IconLibrary /> },
              { id: 'coach', label: 'AI Chat Coach', icon: <IconCoach /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (examActive && !examFinished) {
                    if (window.confirm("You are currently in the middle of a mock exam. Navigating away will lose your progress. Proceed?")) {
                      exitExam();
                      setActiveTab(item.id);
                    }
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Theme Toggle Button */}
        <div className="theme-toggle-container">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Light/Dark Theme">
            {theme === 'light' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                <span>Midnight Mode</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                <span>Editorial Light</span>
              </>
            )}
          </button>
        </div>

        {/* Global Progress Box (Sidebar Bottom) */}
        <div className="progress-panel">
          <div className="progress-header">
            <span>Global Completion</span>
            <span>{overallPercentage}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${overallPercentage}%` }}></div>
          </div>
          <p className="progress-footer">60-Day Prep Blueprint Sprint</p>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="main-panel">
        <div className="main-panel-container">
          
          {/* PAGE 1: GAMIFIED LEARNING ROADMAP */}
          {activeTab === 'home' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Premium Hero Banner */}
              <div className="hero-banner">
                <div className="hero-content">
                  <span className="hero-badge">Syllabus Learning Adventure</span>
                  <h2 className="hero-title">Start Your <span>Coaching Journey</span></h2>
                  <p className="hero-desc">Learn each topic with professional institutional coaching hacks first. Unlock visual boards, complete level tests, and master banking exams step-by-step.</p>
                </div>
              </div>

              <DashboardStats
                completedLessons={completedLessons}
                streak={streak}
                mistakeFingerprints={mistakeFingerprints}
              />

              <LevelMap
                completedLessons={completedLessons}
                onNodeClick={(lesson) => {
                  setActiveLesson(lesson);
                  setLessonStep(1);
                  setQuizQuestionIdx(0);
                  setSelectedQuizOpt(null);
                  setQuizFeedback(null);
                  setActiveBoardStep(0);
                  setCheckpointSelectedOpt(null);
                  setCheckpointFeedback(null);
                  setExplanationStyle('visual');
                }}
              />

            </div>
          )}

          {/* PAGE 2: SPEED MATH ARENA */}
          {activeTab === 'math' && (
            <div className="animate-fade-in math-workspace">
              <div className="math-header">
                <span className="hero-badge">Calculation Drills</span>
                <h2>Mental Speed Drill Arena</h2>
                <p>Train your subconscious to compute sums down to the millisecond.</p>
              </div>

              {!drillActive ? (
                <div className="math-center-card animate-fade-in">
                  <div className="math-icon-wrapper" style={{ borderRadius: '50%' }}><IconBrain /></div>
                  <div>
                    <h3 className="math-card-title">Launch Speed Calculation Practice</h3>
                    <p className="math-card-desc">The engine will test you on Ending in 5 Squaring Shortcuts, Memory cubes, Base 100 Difference calculations, Digital Roots, and Fraction-to-percentage lookup indices under time pressure.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => { setDrillActive(true); setDrillScore(0); setDrillCount(0); generateNewDrill(); }} className="glass-btn glass-btn-secondary">Start Live Drills</button>
                    <button onClick={() => setActiveTab('library')} className="glass-btn glass-btn-outline">Open Reference Hub</button>
                  </div>
                </div>
              ) : (
                <div className="math-arena-panel animate-fade-in">
                  
                  {/* Timer Stats Bar */}
                  <div className="drill-stats-bar">
                    <div className="drill-stats-left">
                      <span>Drill Count: <strong>{drillCount}</strong></span>
                      <span>Accuracy Ratio: <strong>{drillScore}/{drillCount}</strong></span>
                    </div>
                    <div className="drill-stats-time">
                      <IconClock />
                      <span>{drillTime.toFixed(2)}s</span>
                    </div>
                  </div>

                  {/* Active Equation */}
                  <div className="drill-equation-card">
                    <span className="drill-equation-badge">{currentDrill?.mathType}</span>
                    <h3 className="drill-equation-text">{currentDrill?.question}</h3>
                  </div>

                  {/* Input Form */}
                  <form onSubmit={submitDrillAnswer} className="drill-form">
                    <input
                      type="text"
                      value={userDrillAns}
                      onChange={(e) => setUserDrillAns(e.target.value)}
                      placeholder="Solve mentally and enter answer..."
                      disabled={showDrillExplanation}
                      className="glass-input"
                      autoFocus
                      aria-label="Mental Math Answer Input"
                    />
                    <button type="submit" disabled={showDrillExplanation} className="glass-btn glass-btn-primary">Submit</button>
                  </form>

                  {/* Latency / Correctness Feedback box */}
                  {drillMessage && (
                    <div className={`drill-feedback ${drillMessage === 'correct' ? 'drill-feedback-correct' : 'drill-feedback-incorrect'}`}>
                      <h4>{drillMessage === 'correct' ? '✔ PERFECT ACCURACY!' : '✘ INCORRECT CALCULATION'}</h4>
                      <p>
                        {drillMessage === 'correct'
                          ? `Calculated in ${drillTime.toFixed(2)} seconds! Great pacing.`
                          : `The correct result was: ${currentDrill.correct}. Review the Vedic shortcut below.`
                        }
                      </p>
                    </div>
                  )}

                  {/* Vedic Explanation slide-in */}
                  {showDrillExplanation && (
                    <div className="explanation-card animate-slide-in">
                      <span className="explanation-title">Coach's Speed-Math explanation</span>
                      <p className="explanation-text">{currentDrill.tip}</p>
                      
                      <div className="explanation-actions">
                        <button onClick={generateNewDrill} className="glass-btn glass-btn-secondary" style={{ gap: '8px' }}>Next Drill <IconArrowRight /></button>
                        <button onClick={stopSpeedDrill} className="glass-btn glass-btn-outline" style={{ gap: '8px' }}><IconLogOut /> Exit Arena</button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* PAGE 3: SYLLABUS TRACKER */}
          {activeTab === 'syllabus' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="syllabus-header-row">
                <div>
                  <h2>Interactive Syllabus Tracker</h2>
                  <p>Check off chapters as you study to stay organized and mapped through your 60 days.</p>
                </div>
                <button onClick={resetSyllabus} className="glass-btn glass-btn-outline" style={{ color: 'hsl(var(--danger))', borderColor: 'hsl(var(--danger) / 0.3)' }}>Reset Progress</button>
              </div>

              {/* Grid of Sections */}
              <div className="syllabus-grid">
                {[
                  { id: 'quant', name: 'Quantitative Aptitude', color: 'linear-gradient(90deg, #2C4A3E, #2C4A3E)' },
                  { id: 'reasoning', name: 'Logical Reasoning Ability', color: 'linear-gradient(90deg, #BD4D2D, #BD4D2D)' },
                  { id: 'english', name: 'English Language Skills', color: 'linear-gradient(90deg, #C5A880, #C5A880)' },
                  { id: 'banking', name: 'Banking Awareness & Current Affairs', color: 'linear-gradient(90deg, #3E6B5C, #3E6B5C)' },
                ].map(sec => {
                  const stats = getSectionStats(sec.id);
                  return (
                    <div key={sec.id} className="syllabus-card">
                      <div className="syllabus-card-header">
                        <div>
                          <h3 className="syllabus-card-title">{sec.name}</h3>
                          <p className="syllabus-card-subtitle">{stats.completed} of {stats.total} chapters mastered</p>
                        </div>
                        <div className="syllabus-card-pct">{stats.percentage}%</div>
                      </div>

                      <div className="syllabus-card-track">
                        <div className="syllabus-card-fill" style={{ width: `${stats.percentage}%`, background: sec.color }}></div>
                      </div>

                      <div className="topic-list">
                        {Object.keys(syllabus[sec.id]).map(topic => (
                          <div 
                            key={topic}
                            onClick={() => toggleTopic(sec.id, topic)}
                            className={`topic-card ${syllabus[sec.id][topic] ? 'checked' : ''}`}
                          >
                            <input 
                              type="checkbox"
                              checked={syllabus[sec.id][topic]}
                              readOnly
                              className="topic-checkbox"
                            />
                            <span className="topic-label">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Backup & Ledger Portability Panel + Accessibility */}
              <div className="ledger-backup-panel" style={{ marginTop: '24px', padding: '20px', background: 'hsl(var(--bg-main) / 0.5)', border: '1px solid hsl(var(--border-line))', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '8px' }}>Data Portability & Ledger Backups</h3>
                <p style={{ fontSize: '0.78rem', color: 'hsl(var(--text-muted))', marginBottom: '16px' }}>
                  Export your active preparation state as a copy-pasteable version-2 ledger snapshot, or restore your progress below.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', marginBottom: '6px', color: 'hsl(var(--text-muted))' }}>EXPORT ACTIVE STATE</label>
                    <textarea
                      readOnly
                      value={btoa(unescape(encodeURIComponent(JSON.stringify({
                        version: 2,
                        timestamp: 1716700000000,
                        completed: completedLessons,
                        streak: streak,
                        mistakes: mistakeFingerprints,
                        syllabus: syllabus,
                        analytics: analyticsData
                      }))))}
                      onClick={(e) => { e.target.select(); alert("Backup code copied to clipboard!"); }}
                      style={{ width: '100%', height: '80px', fontFamily: 'monospace', fontSize: '0.68rem', padding: '8px', borderRadius: '8px', border: '1px solid hsl(var(--border-line))', background: 'hsl(var(--bg-main))', color: 'hsl(var(--text-primary))', resize: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', marginBottom: '6px', color: 'hsl(var(--text-muted))' }}>IMPORT STATE SNAPSHOT</label>
                    <textarea
                      placeholder="Paste your version-2 base64 snapshot here and click Import..."
                      id="importSnapshotArea"
                      style={{ width: '100%', height: '80px', fontFamily: 'monospace', fontSize: '0.68rem', padding: '8px', borderRadius: '8px', border: '1px solid hsl(var(--border-line))', background: 'hsl(var(--bg-main))', color: 'hsl(var(--text-primary))', resize: 'none' }}
                    />
                    <button
                      onClick={() => {
                        const code = document.getElementById('importSnapshotArea')?.value;
                        if (!code) {
                          alert("Please paste a backup code first!");
                          return;
                        }
                        try {
                          const decoded = decodeURIComponent(escape(atob(code.trim())));
                          const data = JSON.parse(decoded);
                          if (data.version !== 2) {
                            alert("Invalid backup version! This operating system requires a version 2 backup ledger.");
                            return;
                          }
                          if (Array.isArray(data.completed)) setCompletedLessons(data.completed);
                          if (typeof data.streak === 'number') setStreak(data.streak);
                          if (data.mistakes) setMistakeFingerprints(data.mistakes);
                          if (data.syllabus) setSyllabus(data.syllabus);
                          if (data.analytics) setAnalyticsData(data.analytics);
                          alert("Snapshot imported successfully! Reloading experience.");
                        } catch (err) {
                          alert("Failed to parse backup snapshot! Error details: " + err.message);
                        }
                      }}
                      className="glass-btn glass-btn-primary"
                      style={{ width: '100%', padding: '6px 12px', fontSize: '0.72rem', marginTop: '6px' }}
                    >
                      Import Snapshot
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid hsl(var(--border-line))', paddingTop: '16px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>Reduced Motion (Disable dynamic UI flashes)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={colorblindSafe}
                      onChange={(e) => setColorblindSafe(e.target.checked)}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>High-Contrast Colorblind Mode</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 4: TIMED MOCK TEST */}
          {activeTab === 'mock' && (
            <div className="animate-fade-in mock-center-panel">
              
              {!examActive ? (
                <div className="mock-center-card animate-fade-in">
                  <div className="math-icon-wrapper" style={{ backgroundColor: 'hsl(var(--secondary) / 0.08)', borderColor: 'hsl(var(--secondary) / 0.3)', color: 'hsl(var(--secondary))', borderRadius: '50%' }}><IconMock /></div>
                  <div>
                    <span className="mock-badge">20-Minute Limit</span>
                    <h3 className="math-card-title" style={{ marginTop: '16px' }}>Simulated Prelims Mock Arena</h3>
                    <p className="math-card-desc">Practice original memory-based questions from SBI PO and IBPS PO. Includes sectional timer limits, flagging bookmarks, and comprehensive reviews.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={startExam} className="glass-btn glass-btn-secondary px-8">Start Mock Exam</button>
                    <button onClick={() => setActiveTab('library')} className="glass-btn glass-btn-outline">Open Cheat Sheets</button>
                  </div>
                </div>
              ) : (
                <div className="mock-arena animate-fade-in">
                  
                  {/* Left block (Questions + options) */}
                  <div className="mock-left-section">
                    <div>
                      {/* Section header */}
                      <div className="mock-section-header">
                        <span className="mock-section-badge">Question {examCurrentQ + 1} of {QUIZ_QUESTIONS.length}</span>
                        <div className="mock-timer">
                          <IconClock />
                          <span>{Math.floor(examTime / 60)}:{(examTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>

                      {!examFinished ? (
                        <div>
                          {/* Question details box */}
                          <div className="mock-question-box">
                            <span className="mock-question-subject">{QUIZ_QUESTIONS[examCurrentQ].subject}</span>
                            <p className="mock-question-text">{QUIZ_QUESTIONS[examCurrentQ].question}</p>
                          </div>

                          {/* Options buttons */}
                          <div className="mock-options-list">
                            {QUIZ_QUESTIONS[examCurrentQ].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => setExamAnswers(prev => ({ ...prev, [examCurrentQ]: idx }))}
                                className={`mock-option-btn ${examAnswers[examCurrentQ] === idx ? 'selected' : ''}`}
                              >
                                <span>{opt}</span>
                                <div className="mock-option-indicator">
                                  {examAnswers[examCurrentQ] === idx && <div className="mock-option-bullet"></div>}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        
                        /* EXAM FINISHED scorecard display */
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div className="scorecard-panel">
                            <h3 className="scorecard-title">Mock Test Scorecard Summary</h3>
                            
                            <div className="scorecard-row">
                              <div className="scorecard-block">
                                <span className="scorecard-num" style={{ color: 'hsl(var(--secondary))' }}>{calculateExamScore()}</span>
                                <span className="scorecard-label">Correct</span>
                              </div>
                              
                              <div className="scorecard-divider"></div>
                              
                              <div className="scorecard-block">
                                <span className="scorecard-num">{QUIZ_QUESTIONS.length}</span>
                                <span className="scorecard-label">Total Qs</span>
                              </div>
                              
                              <div className="scorecard-divider"></div>
                              
                              <div className="scorecard-block">
                                <span className="scorecard-num" style={{ color: 'hsl(var(--success))' }}>{Math.round((calculateExamScore() / QUIZ_QUESTIONS.length) * 100)}%</span>
                                <span className="scorecard-label">Accuracy</span>
                              </div>
                            </div>
                          </div>

                          {/* Step by step calculations review */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 className="brand-title" style={{ fontSize: '0.9rem' }}>Vedic Speed Calculations Review</h3>
                            
                            {QUIZ_QUESTIONS.map((q, idx) => (
                              <div key={idx} className="review-card-item">
                                <div className="review-card-header">
                                  <span className="review-card-title">Question {idx + 1} - {q.subject}</span>
                                  <span className={`review-badge-status ${examAnswers[idx] === q.correct ? 'review-badge-correct' : 'review-badge-incorrect'}`}>
                                    {examAnswers[idx] === q.correct ? '✔ Correct' : '✘ Incorrect / Skipped'}
                                  </span>
                                </div>
                                <p className="review-card-question">{q.question}</p>
                                
                                <div className="review-card-explanation">
                                  <span className="review-explanation-title">Coach's Speed Calculations</span>
                                  <ul className="review-explanation-list">
                                    {q.explanation.map((step, sIdx) => (
                                      <li key={sIdx}>• {step}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button onClick={exitExam} className="glass-btn glass-btn-primary" style={{ width: '100%', marginTop: '20px' }}>Exit Mock Arena</button>
                        </div>
                      )}
                    </div>

                    {/* Question actions footer */}
                    {!examFinished && (
                      <div className="mock-action-footer">
                        <button 
                          onClick={() => setFlaggedQs(prev => ({ ...prev, [examCurrentQ]: !prev[examCurrentQ] }))}
                          className="glass-btn glass-btn-outline"
                          style={{ borderColor: flaggedQs[examCurrentQ] ? 'hsl(var(--warning))' : '', color: flaggedQs[examCurrentQ] ? 'hsl(var(--warning))' : '', gap: '8px' }}
                        >
                          <IconFlag /> {flaggedQs[examCurrentQ] ? 'Unflag Review' : 'Flag for Review'}
                        </button>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => setExamCurrentQ(prev => Math.max(0, prev - 1))}
                            disabled={examCurrentQ === 0}
                            className="glass-btn glass-btn-outline"
                            style={{ opacity: examCurrentQ === 0 ? 0.3 : 1 }}
                          >
                            Previous
                          </button>
                          
                          {examCurrentQ === QUIZ_QUESTIONS.length - 1 ? (
                            <button onClick={finishExam} className="glass-btn glass-btn-secondary">Finish Section</button>
                          ) : (
                            <button onClick={() => setExamCurrentQ(prev => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))} className="glass-btn glass-btn-primary">Next</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Sidebar Navigator Map */}
                  {!examFinished && (
                    <div className="mock-right-section">
                      <div>
                        <h4 className="mock-grid-title">Question Navigator</h4>
                        <div className="mock-grid-box">
                          {QUIZ_QUESTIONS.map((_, idx) => {
                            let type = "default";
                            if (examAnswers[idx] !== undefined) type = "answered";
                            if (flaggedQs[idx]) type = "flagged";
                            if (examCurrentQ === idx) type = "active";
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => setExamCurrentQ(idx)}
                                className={`mock-grid-cell ${type}`}
                              >
                                {idx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Legend color guides */}
                      <div>
                        <div className="mock-legend-panel">
                          <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
                            <span>Attempted</span>
                          </div>
                          <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: 'hsl(var(--secondary))' }}></div>
                            <span>Flagged Review</span>
                          </div>
                        </div>

                        <button onClick={finishExam} className="glass-btn glass-btn-primary" style={{ width: '100%', padding: '10px 0', fontSize: '0.78rem', marginTop: '16px' }}>Submit Test</button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* PAGE 5: VEDIC LIBRARY & TOOLS */}
          {activeTab === 'library' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div className="tool-grid">
                
                {/* Live digital root calculator verifier */}
                <div className="section-box" style={{ gridColumn: 'span 2' }}>
                  <div>
                    <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconSparkles /> Verification Hack</span>
                    <h3 className="section-box-title" style={{ marginTop: '12px' }}>Live Digital Root Equation Checker</h3>
                    <p className="section-box-desc" style={{ marginBottom: '0' }}>Type any math expression below (e.g. 76 * 450 + 24 * 350). The verifier evaluates the sum, discards the 9s, and outputs the Digital Root step-by-step. You can match this with options digital roots to solve simplifications in 3 seconds!</p>
                    
                    <form onSubmit={calculateDigitalRootLive} className="verifier-form">
                      <input
                        type="text"
                        value={exprInput}
                        onChange={(e) => setExprInput(e.target.value)}
                        placeholder="Enter expression (e.g., 43 * 12 + 105 - 18)"
                        className="glass-input"
                        aria-label="Vedic Digital Root Equation Input"
                      />
                      <button type="submit" className="glass-btn glass-btn-primary">Calculate Root</button>
                    </form>

                    {exprResult && (
                      <div className="verifier-result-box animate-fade-in">
                        <div className="verifier-result-header">
                          <span className="verifier-result-title">Vedic Verification Details</span>
                          <div className="verifier-result-root">{exprResult.root}</div>
                        </div>
                        <ul className="verifier-result-steps">
                          {exprResult.steps.map((step, idx) => (
                            <li key={idx}>• {step}</li>
                          ))}
                        </ul>
                        <div className="verifier-result-footer">
                          ✔ Checker Verification complete! Any correct option in multiple-choice questions MUST have a digital root value of {exprResult.root}!
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fraction DI table card */}
                <div className="section-box">
                  <div>
                    <h3 className="section-box-title" style={{ fontSize: '0.95rem' }}>Fraction to % lookup</h3>
                    <p className="section-box-desc" style={{ fontSize: '0.72rem', marginBottom: '12px' }}>Memorize these conversions to boost speed in Data Interpretation charts:</p>
                    
                    <div className="fraction-card-list">
                      {[
                        { f: '1/2', p: '50.0%' },
                        { f: '1/3', p: '33.3%' },
                        { f: '1/4', p: '25.0%' },
                        { f: '1/5', p: '20.0%' },
                        { f: '1/6', p: '16.67%' },
                        { f: '1/7', p: '14.29%' },
                        { f: '1/8', p: '12.5%' },
                        { f: '1/9', p: '11.11%' },
                        { f: '1/11', p: '9.09%' },
                        { f: '1/12', p: '8.33%' },
                        { f: '1/15', p: '6.66%' },
                      ].map((item, idx) => (
                        <div key={idx} className="fraction-row-item">
                          <span className="fraction-row-frac">{item.f}</span>
                          <span className="fraction-row-val">{item.p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Speed Multiplication Interactive Visualizer Card */}
              <div className="section-box" style={{ width: '100%' }}>
                <div>
                  <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconCompass /> Multiplication Visualizer</span>
                  <h3 className="section-box-title" style={{ marginTop: '12px' }}>Crosswise Multiplication Solver (2x2)</h3>
                  <p className="section-box-desc" style={{ marginBottom: '16px' }}>Enter two 2-digit numbers to visually trace the vertical and crosswise multiplication steps. Priming this system mentally helps execute multiplications in 5 seconds flat!</p>
                  
                  <form onSubmit={runVedicMultiplicationVisualizer} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      maxLength="2"
                      value={visNum1}
                      onChange={(e) => setVisNum1(e.target.value.replace(/[^0-9]/g, ''))}
                      className="glass-input"
                      style={{ width: '120px', textAlign: 'center', fontWeight: '800', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}
                      placeholder="98"
                      aria-label="First 2-digit Multiplier"
                    />
                    <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>×</span>
                    <input
                      type="text"
                      maxLength="2"
                      value={visNum2}
                      onChange={(e) => setVisNum2(e.target.value.replace(/[^0-9]/g, ''))}
                      className="glass-input"
                      style={{ width: '120px', textAlign: 'center', fontWeight: '800', fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}
                      placeholder="97"
                      aria-label="Second 2-digit Multiplier"
                    />
                    <button type="submit" className="glass-btn glass-btn-primary">Visualize Steps</button>
                  </form>

                  {visResult && (
                    <div className="verifier-result-box animate-fade-in" style={{ borderColor: 'hsl(var(--secondary) / 0.3)' }}>
                      <div className="verifier-result-header" style={{ borderBottomColor: 'hsl(var(--border-line))' }}>
                        <span className="verifier-result-title" style={{ color: 'hsl(var(--secondary))' }}>Step-by-Step Crosswise Visual Board</span>
                        <div className="verifier-result-root" style={{ borderColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary))' }}>
                          {visResult.final}
                        </div>
                      </div>

                      {/* Flex grid of the three paths */}
                      <div style={{ display: 'grid', gridTemplateCols: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                        
                        {/* Step 1 Card */}
                        <div className="vis-step-card">
                          <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'hsl(var(--secondary))', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 1: Vertical Right</span>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>{visResult.digits.A} <strong style={{ color: 'hsl(var(--primary))' }}>{visResult.digits.B}</strong></span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>{visResult.digits.C} <strong style={{ color: 'hsl(var(--primary))' }}>{visResult.digits.D}</strong></span>
                            <span style={{ width: '30px', height: '1px', background: 'hsl(var(--text-primary))', margin: '4px 0' }}></span>
                            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'hsl(var(--primary))' }}>{visResult.digits.B} × {visResult.digits.D} = {visResult.step1.raw}</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
                            Write **{visResult.step1.write}** at units place. <br/>Carry over **{visResult.step1.carry}**.
                          </p>
                        </div>

                        {/* Step 2 Card */}
                        <div className="vis-step-card">
                          <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'hsl(var(--secondary))', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 2: Crosswise</span>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}><strong style={{ color: 'hsl(var(--secondary))' }}>{visResult.digits.A}</strong> ↔ <strong style={{ color: 'hsl(var(--secondary))' }}>{visResult.digits.B}</strong></span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}><strong style={{ color: 'hsl(var(--secondary))' }}>{visResult.digits.C}</strong> ↔ <strong style={{ color: 'hsl(var(--secondary))' }}>{visResult.digits.D}</strong></span>
                            <span style={{ width: '30px', height: '1px', background: 'hsl(var(--text-primary))', margin: '4px 0' }}></span>
                            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'hsl(var(--secondary))' }}>({visResult.digits.A}×{visResult.digits.D}) + ({visResult.digits.B}×{visResult.digits.C}) = {visResult.step2.raw}</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
                            Add carry **{visResult.step1.carry}** = **{visResult.step2.total}**. <br/>Write **{visResult.step2.write}** at tens place. Carry **{visResult.step2.carry}**.
                          </p>
                        </div>

                        {/* Step 3 Card */}
                        <div className="vis-step-card">
                          <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'hsl(var(--secondary))', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 3: Vertical Left</span>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}><strong style={{ color: 'hsl(var(--primary))' }}>{visResult.digits.A}</strong> {visResult.digits.B}</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}><strong style={{ color: 'hsl(var(--primary))' }}>{visResult.digits.C}</strong> {visResult.digits.D}</span>
                            <span style={{ width: '30px', height: '1px', background: 'hsl(var(--text-primary))', margin: '4px 0' }}></span>
                            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'hsl(var(--primary))' }}>{visResult.digits.A} × {visResult.digits.C} = {visResult.step3.raw}</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
                            Add carry **{visResult.step2.carry}** = **{visResult.step3.total}**. <br/>Write **{visResult.step3.total}** at hundreds/thousands place.
                          </p>
                        </div>

                      </div>

                      <div className="vis-result-footer">
                        ✔ Completed Visual calculation: {visResult.step3.total} (left) + {visResult.step2.write} (middle) + {visResult.step1.write} (right) = **{visResult.final}**! Solved in one simple mental sequence.
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Speed Math Visual Cards Grid */}
              <div className="sutras-flex-grid">
                {[
                  { title: 'Ending in 5 Squaring Shortcut', sutra: 'Visual Arithmetic', desc: 'Multiply the leading digit by its successor (e.g., for 75, multiply 7 by 8 = 56) and append 25 at the end to get 5625 instantly. Saves up to 10 seconds per calculation.' },
                  { title: 'Base 100 Multiplication Shortcut', sutra: 'Visual Arithmetic', desc: 'Used for multiplying numbers close to base 100 (e.g., 98 × 97). Write down differences below 100 (-2 and -3), cross-subtract to form the first half (95), and multiply differences to form the second half (06) to get 9506.' },
                  { title: 'Crosswise Multiplication Solver (2x2)', sutra: 'Universal Multiplication', desc: 'Multiply units digits vertically, add cross-multiplied tens and units, and multiply tens digits vertically. Carry over intermediate values to compute any 2-digit multiplication in one line.' },
                  { title: 'Japanese Line Grid Multiplication', sutra: 'Visual Geometry', desc: 'Draw parallel lines representing digits of each number intersecting each other (e.g. 12 × 13). Count intersections in corner columns and sum diagonal columns to read the final product directly.' },
                  { title: 'Perfect Square Root Sizing Hack', sutra: 'Visual Arithmetic', desc: 'Look at the last digit to narrow down root units digit (e.g., 9 ends in 3 or 7). Drop the last two digits, find the nearest smaller square below the remainder for the tens digit, and use a base-5 comparison to pinpoint the exact root.' },
                  { title: 'Quadratic Root Signs Shortcut', sutra: 'Visual Algebra', desc: 'Identify signs of a quadratic equation (ax² + bx + c = 0) to instantly determine root signs. If signs are (+, +), roots are both (-). If (+, -), roots are (-, +). If (-, +), roots are (+, +). Compare variables in 2 seconds!' }
                ].map((card, idx) => (
                  <div key={idx} className="section-box">
                    <div>
                      <span className="tip-badge" style={{ color: 'hsl(var(--primary))' }}>{card.sutra}</span>
                      <h4 className="tip-title" style={{ marginTop: '6px' }}>{card.title}</h4>
                      <p className="tip-desc">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Speed Math Visual Lab Header */}
              <div className="math-header" style={{ marginTop: '32px' }}>
                <span className="hero-badge">Interactive Visual Lab</span>
                <h2>Visual Speed Math Teaching Playground</h2>
                <p>No flat theoretical text. Move variables, input numbers, and watch interactive graphics visually explain how speed tricks function.</p>
              </div>

              <div className="tool-grid" style={{ gridTemplateColumns: '1fr', gap: '32px' }}>
                
                {/* 1. JAPANESE LINE GRID MULTIPLICATION VISUALIZER */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconBrain /> Visual Geometry</span>
                        <h3 className="section-box-title" style={{ marginTop: '8px' }}>Japanese Line Grid Multiplication Lab</h3>
                        <p className="section-box-desc">Step through the teacher's board steps below to see how intersecting line groups visually construct the multiplication.</p>
                      </div>
                      
                      {/* Inputs panel */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <input
                          type="text"
                          maxLength="2"
                          value={japNum1}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^1-3]/g, '');
                            setJapNum1(val);
                            setJapStep(1); // Reset to step 1 on input change
                          }}
                          className="glass-input"
                          style={{ width: '80px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem' }}
                          placeholder="12"
                          aria-label="First 2-digit Multiplier (1-3 digits only)"
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>×</span>
                        <input
                          type="text"
                          maxLength="2"
                          value={japNum2}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^1-3]/g, '');
                            setJapNum2(val);
                            setJapStep(1); // Reset to step 1 on input change
                          }}
                          className="glass-input"
                          style={{ width: '80px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem' }}
                          placeholder="13"
                          aria-label="Second 2-digit Multiplier (1-3 digits only)"
                        />
                      </div>
                    </div>

                    {/* Notice for UX readability constraint */}
                    <p style={{ fontSize: '0.72rem', color: 'hsl(var(--secondary))', fontWeight: '600', margin: '0' }}>
                      ⚠ Classroom Spacing Notice: Use digits 1, 2, and 3 only (e.g. 12 × 13, 21 × 23) to keep chalkboard drawing clear and easy to count.
                    </p>

                    {/* Interactive Whiteboard steps buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { step: 1, label: 'Step 1' },
                          { step: 2, label: 'Step 2' },
                          { step: 3, label: 'Step 3' },
                          { step: 4, label: 'Step 4' }
                        ].map(s => (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => setJapStep(s.step)}
                            className={`glass-btn ${japStep === s.step ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                            style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '9999px' }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setJapStep(prev => Math.max(1, prev - 1))}
                          disabled={japStep === 1}
                          className="glass-btn glass-btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: japStep === 1 ? 0.4 : 1 }}
                        >
                          ← Prev Step
                        </button>
                        <button
                          type="button"
                          onClick={() => setJapStep(prev => Math.min(4, prev + 1))}
                          disabled={japStep === 4}
                          className="glass-btn glass-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: japStep === 4 ? 0.4 : 1 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>

                    {/* SVG Render Canvas Container */}
                    {japNum1.length === 2 && japNum2.length === 2 ? (
                      (() => {
                        const d11 = parseInt(japNum1[0]);
                        const d12 = parseInt(japNum1[1]);
                        const d21 = parseInt(japNum2[0]);
                        const d22 = parseInt(japNum2[1]);

                        const lines11 = Array.from({ length: d11 }, (_, i) => i);
                        const lines12 = Array.from({ length: d12 }, (_, i) => i);
                        const lines21 = Array.from({ length: d21 }, (_, i) => i);
                        const lines22 = Array.from({ length: d22 }, (_, i) => i);

                        const linesGroup1 = [
                          ...lines11.map(i => {
                            const offset = -35 + i * 15;
                            return { y1: 100 + offset, y2: 250 + offset, type: 'hundreds' };
                          }),
                          ...lines12.map(j => {
                            const offset = 45 + j * 15;
                            return { y1: 100 + offset, y2: 250 + offset, type: 'units' };
                          })
                        ];

                        const linesGroup2 = [
                          ...lines21.map(r => {
                            const offset = -40 + r * 15;
                            return { x1: 220 + offset, x2: 120 + offset, type: 'hundreds' };
                          }),
                          ...lines22.map(s => {
                            const offset = 40 + s * 15;
                            return { x1: 320 + offset, x2: 220 + offset, type: 'units' };
                          })
                        ];

                        const getIntersection = (y1_val, x1_val) => {
                          const x = (2 * x1_val - y1_val + 75) / 2.5;
                          const y = 0.5 * x + y1_val - 25;
                          return { x, y };
                        };

                        const hundredsNodes = [];
                        lines11.forEach(i => {
                          const y1_val = 100 + (-35 + i * 15);
                          lines21.forEach(r => {
                            const x1_val = 220 + (-40 + r * 15);
                            hundredsNodes.push(getIntersection(y1_val, x1_val));
                          });
                        });

                        const tensNodes = [];
                        lines11.forEach(i => {
                          const y1_val = 100 + (-35 + i * 15);
                          lines22.forEach(s => {
                            const x1_val = 320 + (40 + s * 15);
                            tensNodes.push(getIntersection(y1_val, x1_val));
                          });
                        });
                        lines12.forEach(j => {
                          const y1_val = 100 + (45 + j * 15);
                          lines21.forEach(r => {
                            const x1_val = 220 + (-40 + r * 15);
                            tensNodes.push(getIntersection(y1_val, x1_val));
                          });
                        });

                        const unitsNodes = [];
                        lines12.forEach(j => {
                          const y1_val = 100 + (45 + j * 15);
                          lines22.forEach(s => {
                            const x1_val = 320 + (40 + s * 15);
                            unitsNodes.push(getIntersection(y1_val, x1_val));
                          });
                        });

                        const finalVal = parseInt(japNum1) * parseInt(japNum2);

                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center', marginTop: '12px' }}>
                            {/* SVG Column */}
                            <div className="vis-step-card" style={{ padding: '16px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                              <svg className="jap-visualizer-canvas" width="380" height="300" style={{ background: 'hsl(var(--bg-main) / 0.3)', borderRadius: '12px' }}>
                                <defs>
                                  <pattern id="grid-jap" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border-line) / 0.15)" strokeWidth="1" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-jap)" rx="12" />
                                {/* Dashed Zone Separator Guides - Step 3+ */}
                                {japStep >= 3 && (
                                  <>
                                    <line x1="165" y1="20" x2="20" y2="195" stroke="hsl(var(--warning) / 0.45)" strokeWidth="2.5" strokeDasharray="4 4" />
                                    <line x1="295" y1="90" x2="120" y2="290" stroke="hsl(var(--secondary) / 0.45)" strokeWidth="2.5" strokeDasharray="4 4" />
                                  </>
                                )}

                                {/* Group 1 Lines (Teal/Coral Diagonal lines) */}
                                {linesGroup1.map((l, idx) => (
                                  <line
                                    key={`g1-${idx}`}
                                    x1="50"
                                    y1={l.y1}
                                    x2="350"
                                    y2={l.y2}
                                    stroke={l.type === 'hundreds' ? 'hsl(174, 75%, 40%)' : 'hsl(15, 75%, 48%)'}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    opacity={japStep === 1 ? '1.0' : '0.4'}
                                    style={{ transition: 'all 0.3s ease' }}
                                  />
                                ))}

                                {/* Group 2 Lines (Olive/Ochre crossing lines) - Step 2+ */}
                                {japStep >= 2 && linesGroup2.map((l, idx) => (
                                  <line
                                    key={`g2-${idx}`}
                                    x1={l.x1}
                                    y1="50"
                                    x2={l.x2}
                                    y2="250"
                                    stroke={l.type === 'hundreds' ? 'hsl(142, 60%, 40%)' : 'hsl(38, 80%, 45%)'}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    opacity={japStep === 2 ? '1.0' : '0.4'}
                                    style={{ transition: 'all 0.3s ease' }}
                                  />
                                ))}

                                {/* Intersection Nodes - Step 3+ */}
                                {japStep >= 3 && (
                                  <>
                                    {/* Hundreds place (Green dots) */}
                                    {hundredsNodes.map((n, idx) => (
                                      <circle
                                        key={`h-${idx}`}
                                        cx={n.x}
                                        cy={n.y}
                                        r="7.5"
                                        fill="hsl(142, 65%, 40%)"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ filter: 'drop-shadow(0 0 5px hsl(142, 65%, 40% / 0.8))' }}
                                      />
                                    ))}

                                    {/* Tens place (Amber dots) */}
                                    {tensNodes.map((n, idx) => (
                                      <circle
                                        key={`t-${idx}`}
                                        cx={n.x}
                                        cy={n.y}
                                        r="7.5"
                                        fill="hsl(38, 85%, 45%)"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ filter: 'drop-shadow(0 0 5px hsl(38, 85%, 45% / 0.8))' }}
                                      />
                                    ))}

                                    {/* Units place (Coral dots) */}
                                    {unitsNodes.map((n, idx) => (
                                      <circle
                                        key={`u-${idx}`}
                                        cx={n.x}
                                        cy={n.y}
                                        r="7.5"
                                        fill="hsl(15, 75%, 48%)"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ filter: 'drop-shadow(0 0 5px hsl(15, 75%, 48% / 0.8))' }}
                                      />
                                    ))}
                                  </>
                                )}

                                {/* Visual Slice Boundaries labels - Step 3+ */}
                                {japStep >= 3 && (
                                  <>
                                    <text x="60" y="275" fill="hsl(142, 65%, 40%)" fontSize="10" fontWeight="800">HUNDREDS</text>
                                    <text x="140" y="285" fill="hsl(38, 85%, 45%)" fontSize="10" fontWeight="800">TENS PLACE</text>
                                    <text x="260" y="275" fill="hsl(15, 75%, 48%)" fontSize="10" fontWeight="800">UNITS PLACE</text>
                                  </>
                                )}
                              </svg>
                            </div>

                            {/* Analysis Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'hsl(var(--primary))' }}>Whiteboard Step Status:</h4>
                              
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: japStep >= 4 ? 1 : 0.35 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'hsl(142, 65%, 40%)' }}></div> Left Part (Hundreds):</span>
                                  <strong>{d11} × {d21} = {hundredsNodes.length} ({hundredsNodes.length}00)</strong>
                                </div>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: japStep >= 4 ? 1 : 0.35 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'hsl(38, 85%, 45%)' }}></div> Middle Part (Tens):</span>
                                  <strong>({d11}×{d22}) + ({d12}×{d21}) = {tensNodes.length} ({tensNodes.length}0)</strong>
                                </div>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: japStep >= 4 ? 1 : 0.35 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'hsl(15, 75%, 48%)' }}></div> Right Part (Units):</span>
                                  <strong>{d12} × {d22} = {unitsNodes.length} ({unitsNodes.length})</strong>
                                </div>
                              </div>

                              <div className="vis-result-footer" style={{ marginTop: '4px', opacity: japStep >= 4 ? 1 : 0.35 }}>
                                ✔ <strong>Board Total Addition</strong>: {hundredsNodes.length}00 + {tensNodes.length}0 + {unitsNodes.length} = <strong>{finalVal}</strong>!
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <p style={{ color: 'hsl(var(--secondary))', fontWeight: 'bold' }}>Please enter two 2-digit numbers (digits 1-3 only).</p>
                    )}

                    {/* Chalkboard Note */}
                    {japNum1.length === 2 && japNum2.length === 2 && (() => {
                      const d11 = parseInt(japNum1[0]);
                      const d12 = parseInt(japNum1[1]);
                      const d21 = parseInt(japNum2[0]);
                      const d22 = parseInt(japNum2[1]);
                      const finalVal = d11*d21*100 + (d11*d22 + d12*d21)*10 + d12*d22;
                      return (
                        <div style={{
                          background: 'hsl(var(--bg-main) / 0.5)',
                          border: '2px dashed hsl(var(--primary) / 0.4)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          marginTop: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.82rem',
                          lineHeight: '1.5',
                          color: 'hsl(var(--text-primary))'
                        }}>
                          <strong style={{ color: 'hsl(var(--secondary))', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
                            ★ WHITEBOARD STEP NOTE:
                          </strong>
                          {japStep === 1 && (
                            <span>
                              Let's draw lines for the first number <strong>{japNum1}</strong>.
                              Draw <strong>{d11}</strong> diagonal line on the top-left for the tens digit, and <strong>{d12}</strong> parallel lines below it for the units digit. Keep them nicely separated!
                            </span>
                          )}
                          {japStep === 2 && (
                            <span>
                              Now cross them with lines for the second number <strong>{japNum2}</strong>.
                              Draw <strong>{d21}</strong> diagonal line on the left for the tens digit, and <strong>{d22}</strong> lines crossing on the right for the units digit.
                            </span>
                          )}
                          {japStep === 3 && (
                            <span>
                              Circle all the intersection points on the board! Group them vertically into three slices:
                              <br />• <strong>Left side corner:</strong> Hundreds place points (Green)
                              <br />• <strong>Middle diagonal strip:</strong> Tens place points (Amber)
                              <br />• <strong>Right side corner:</strong> Units place points (Coral)
                            </span>
                          )}
                          {japStep === 4 && (
                            <span>
                              Count the circled points in each slice and add them up:
                              <br />• Left = <strong>{d11*d21}</strong> (Hundred value: {d11*d21}00)
                              <br />• Middle = {d11*d22} + {d12*d21} = <strong>{d11*d22 + d12*d21}</strong> (Ten value: {(d11*d22 + d12*d21)}0)
                              <br />• Right = <strong>{d12*d22}</strong> (Unit value: {d12*d22})
                              <br />Total = {d11*d21}00 + {(d11*d22 + d12*d21)}0 + {d12*d22} = <strong>{finalVal}</strong>! Super simple!
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 2. SQUARE ROOT ESTIMATOR SLIDING SCALE */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconSyllabus /> Range Sizing</span>
                        <h3 className="section-box-title" style={{ marginTop: '8px' }}>Perfect Square Root Visual Sizing Scale</h3>
                        <p className="section-box-desc">Enter any perfect square below. The scale graphs where it lies relative to nearest tens boundaries and midpoint thresholds.</p>
                      </div>

                      <form onSubmit={handleSquareRootVis} style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="text"
                          value={sqInput}
                          onChange={(e) => setSqInput(e.target.value.replace(/[^0-9]/g, ''))}
                          className="glass-input"
                          style={{ width: '120px', textAlign: 'center', fontWeight: '800' }}
                          placeholder="7921"
                          aria-label="Perfect Square Input"
                        />
                        <button type="submit" className="glass-btn glass-btn-primary">Plot Square</button>
                      </form>
                    </div>

                    {/* Scale Layout Rendering */}
                    {sqResult && (
                      <div className="vis-step-card" style={{ padding: '24px 20px', marginTop: '10px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '24px', textAlign: 'center', color: 'hsl(var(--primary))' }}>
                          Visual Mapping Scale: Sizing Square Root of {sqResult.square} between {sqResult.tensBelow}² and {sqResult.tensAbove}²
                        </h4>

                        {/* Visual Timeline / Slider graph */}
                        <div style={{ position: 'relative', height: '60px', margin: '20px 10px 40px 10px', display: 'flex', alignItems: 'center' }}>
                          {/* Baseline track */}
                          <div style={{ width: '100%', height: '4px', backgroundColor: 'hsl(var(--border-line))', borderRadius: '2px', position: 'relative' }}>
                            
                            {/* Lower Bound Point */}
                            <div style={{ position: 'absolute', left: '0%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', top: '-10px' }}>
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', border: '2px solid white' }}></div>
                              <span style={{ fontSize: '0.65rem', fontWeight: '800', marginTop: '6px' }}>{sqResult.tensBelow}²</span>
                              <span style={{ fontSize: '0.6rem', color: 'hsl(var(--text-muted))' }}>({sqResult.sqBelow})</span>
                            </div>

                            {/* Midpoint Bound Point */}
                            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', top: '-10px' }}>
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'hsl(var(--warning))', border: '2px solid white' }}></div>
                              <span style={{ fontSize: '0.65rem', fontWeight: '800', marginTop: '6px' }}>{sqResult.midpoint}²</span>
                              <span style={{ fontSize: '0.6rem', color: 'hsl(var(--text-muted))' }}>({sqResult.sqMid})</span>
                            </div>

                            {/* Upper Bound Point */}
                            <div style={{ position: 'absolute', left: '100%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', top: '-10px' }}>
                              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', border: '2px solid white' }}></div>
                              <span style={{ fontSize: '0.65rem', fontWeight: '800', marginTop: '6px' }}>{sqResult.tensAbove}²</span>
                              <span style={{ fontSize: '0.6rem', color: 'hsl(var(--text-muted))' }}>({sqResult.sqAbove})</span>
                            </div>

                            {/* Active plotted square pin */}
                            {(() => {
                              const range = sqResult.sqAbove - sqResult.sqBelow;
                              const pct = Math.max(0, Math.min(100, ((sqResult.square - sqResult.sqBelow) / range) * 100));
                              return (
                                <div style={{ position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', top: '-24px', zIndex: 10 }}>
                                  {/* Pointer pin */}
                                  <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid hsl(var(--secondary))', marginBottom: '2px' }}></div>
                                  <div style={{ padding: '4px 8px', background: 'hsl(var(--secondary))', color: 'white', borderRadius: '12px', fontSize: '0.65rem', fontWeight: '850', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                                    {sqResult.square}
                                  </div>
                                </div>
                              );
                            })()}

                          </div>
                        </div>

                        {/* Text explanation audit steps */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
                          <div className="topic-card" style={{ cursor: 'default', padding: '12px' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: '800', color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>1. Tens Boundary</span>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '4px' }}>
                              Fits between <strong>{sqResult.tensBelow}</strong> ({sqResult.sqBelow}) &amp; <strong>{sqResult.tensAbove}</strong> ({sqResult.sqAbove}). The leading digit is definitely <strong>{Math.floor(sqResult.root / 10)}</strong>!
                            </p>
                          </div>
                          
                          <div className="topic-card" style={{ cursor: 'default', padding: '12px' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: '800', color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>2. Midpoint Threshold</span>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '4px' }}>
                              Midpoint is <strong>{sqResult.midpoint}² = {sqResult.sqMid}</strong>. Since {sqResult.square} {sqResult.isUpperHalf ? '>' : '<'} {sqResult.sqMid}, root is in the <strong>{sqResult.isUpperHalf ? 'Upper' : 'Lower'}</strong> half!
                            </p>
                          </div>

                          <div className="topic-card" style={{ cursor: 'default', padding: '12px' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: '800', color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>3. Units Matcher</span>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '4px' }}>
                              Ends in <strong>{sqResult.endsIn}</strong> → root ends in <strong>{sqResult.unitOptions.join(' or ')}</strong>. Sizing dictates the <strong>{sqResult.isUpperHalf ? 'larger' : 'smaller'}</strong> digit: <strong>{sqResult.root % 10}</strong>. Root = <strong>{sqResult.root}</strong>!
                            </p>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>

                {/* 3. QUADRATIC ROOT SIGNS TRANSITION MATRIX */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconMock /> Sign Transition</span>
                      <h3 className="section-box-title" style={{ marginTop: '8px' }}>Quadratic Signs Vis-Matrix Board</h3>
                      <p className="section-box-desc">Choose algebraic signs for the quadratic terms. The matrix animates sign flips to show roots dynamically, showing why CND shortcuts work instantly.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center' }}>
                      {/* Control board */}
                      <div className="vis-step-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <h4 style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'hsl(var(--primary))', letterSpacing: '0.5px' }}>Interactive Signs Selector</h4>
                          
                          {/* Sign selectors row */}
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div>
                              <span style={{ fontSize: '0.68rem', fontWeight: '750', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '6px' }}>Sign of b (bx)</span>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {['+', '-'].map(s => (
                                  <button
                                    key={`b-${s}`}
                                    onClick={() => setQuadSignB(s)}
                                    className={`glass-btn ${quadSignB === s ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                                    style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '50%', width: '32px', height: '32px' }}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span style={{ fontSize: '0.68rem', fontWeight: '750', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '6px' }}>Sign of c (constant)</span>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {['+', '-'].map(s => (
                                  <button
                                    key={`c-${s}`}
                                    onClick={() => setQuadSignC(s)}
                                    className={`glass-btn ${quadSignC === s ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                                    style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: '50%', width: '32px', height: '32px' }}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Equation View */}
                          <div className="topic-card" style={{ cursor: 'default', textAlign: 'center', padding: '14px', background: 'hsl(var(--bg-main) / 0.5)' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: '800', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase' }}>Current Quadratic Equation</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-serif)', display: 'block', marginTop: '6px' }}>
                              x² {quadSignB} bx {quadSignC} c = 0
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Signs Flips Output */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: 'hsl(var(--secondary))' }}>Root Signs Outcome</h4>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div className="stat-card" style={{ flex: 1, padding: '14px', alignItems: 'center', minHeight: '80px', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'hsl(var(--text-muted))' }}>ROOT 1 SIGN</span>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '50%', border: '2px solid',
                              borderColor: (quadSignC === '+' && quadSignB === '+') || (quadSignC === '-' && quadSignB === '+') ? 'hsl(var(--danger))' : 'hsl(var(--success))',
                              color: (quadSignC === '+' && quadSignB === '+') || (quadSignC === '-' && quadSignB === '+') ? 'hsl(var(--danger))' : 'hsl(var(--success))',
                              fontWeight: '800', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px'
                            }}>
                              {(quadSignC === '+' && quadSignB === '+') || (quadSignC === '-' && quadSignB === '+') ? '−' : '+'}
                            </div>
                          </div>

                          <div className="stat-card" style={{ flex: 1, padding: '14px', alignItems: 'center', minHeight: '80px', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'hsl(var(--text-muted))' }}>ROOT 2 SIGN</span>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '50%', border: '2px solid',
                              borderColor: quadSignC === '+' ? (quadSignB === '+' ? 'hsl(var(--danger))' : 'hsl(var(--success))') : 'hsl(var(--secondary))',
                              color: quadSignC === '+' ? (quadSignB === '+' ? 'hsl(var(--danger))' : 'hsl(var(--success))') : 'hsl(var(--secondary))',
                              fontWeight: '800', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px'
                            }}>
                              {quadSignC === '+' ? (quadSignB === '+' ? '−' : '+') : (quadSignB === '+' ? '+' : '−')}
                            </div>
                          </div>
                        </div>

                        {/* Golden CND Shortcut alert notice */}
                        {quadSignC === '-' && (
                          <div className="verifier-result-footer" style={{ marginTop: '4px', background: 'hsl(15 65% 95%)', borderColor: 'hsl(var(--secondary) / 0.2)', color: 'hsl(var(--secondary))' }}>
                            ⚡ <strong>Golden Rule CND Trigger</strong>: Since constant <em>c</em> is negative, roots have opposite signs (+, −). If another equation also ends in −c, you can click <strong>CND (Cannot be established)</strong> in under 0.5 seconds without calculating anything!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. CHINESE LATTICE (GELOSIA) MULTIPLICATION LAB */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconCompass /> Chinese Arithmetic</span>
                        <h3 className="section-box-title" style={{ marginTop: '8px' }}>Interactive Chinese Lattice (Gelosia) Lab</h3>
                        <p className="section-box-desc">Step through the chalkboard tabs to visually multiply any numbers using the elegant cell diagonal addition method.</p>
                      </div>
                      
                      {/* Inputs */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <input
                          type="text"
                          maxLength="2"
                          value={latNum1}
                          onChange={(e) => {
                            setLatNum1(e.target.value.replace(/[^1-9]/g, ''));
                            setLatStep(1); // Reset to step 1
                          }}
                          className="glass-input"
                          style={{ width: '80px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem' }}
                          placeholder="23"
                          aria-label="Lattice First Number (1-9 digits only)"
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>×</span>
                        <input
                          type="text"
                          maxLength="2"
                          value={latNum2}
                          onChange={(e) => {
                            setLatNum2(e.target.value.replace(/[^1-9]/g, ''));
                            setLatStep(1); // Reset to step 1
                          }}
                          className="glass-input"
                          style={{ width: '80px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem' }}
                          placeholder="47"
                          aria-label="Lattice Second Number (1-9 digits only)"
                        />
                      </div>
                    </div>

                    {/* Interactive Whiteboard steps buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { step: 1, label: 'Step 1' },
                          { step: 2, label: 'Step 2' },
                          { step: 3, label: 'Step 3' },
                          { step: 4, label: 'Step 4' }
                        ].map(s => (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => setLatStep(s.step)}
                            className={`glass-btn ${latStep === s.step ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                            style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '9999px' }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setLatStep(prev => Math.max(1, prev - 1))}
                          disabled={latStep === 1}
                          className="glass-btn glass-btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: latStep === 1 ? 0.4 : 1 }}
                        >
                          ← Prev Step
                        </button>
                        <button
                          type="button"
                          onClick={() => setLatStep(prev => Math.min(4, prev + 1))}
                          disabled={latStep === 4}
                          className="glass-btn glass-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: latStep === 4 ? 0.4 : 1 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>

                    {latNum1.length === 2 && latNum2.length === 2 ? (
                      (() => {
                        const x1 = parseInt(latNum1[0]);
                        const x2 = parseInt(latNum1[1]);
                        const y1 = parseInt(latNum2[0]);
                        const y2 = parseInt(latNum2[1]);

                        // Cell products
                        const p11 = x1 * y1;
                        const p12 = x2 * y1;
                        const p21 = x1 * y2;
                        const p22 = x2 * y2;

                        const t11 = Math.floor(p11 / 10);
                        const u11 = p11 % 10;
                        const t12 = Math.floor(p12 / 10);
                        const u12 = p12 % 10;
                        const t21 = Math.floor(p21 / 10);
                        const u21 = p21 % 10;
                        const t22 = Math.floor(p22 / 10);
                        const u22 = p22 % 10;

                        // Diagonals summing
                        const d1 = u22;
                        const w1 = d1 % 10;
                        const c1 = Math.floor(d1 / 10);

                        const d2 = u21 + t22 + u12 + c1;
                        const w2 = d2 % 10;
                        const c2 = Math.floor(d2 / 10);

                        const d3 = t21 + u11 + t12 + c2;
                        const w3 = d3 % 10;
                        const c3 = Math.floor(d3 / 10);

                        const d4 = t11 + c3;
                        const w4 = d4 % 10;
                        
                        const finalVal = parseInt(latNum1) * parseInt(latNum2);

                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center', marginTop: '12px' }}>
                            {/* SVG Column */}
                            <div className="vis-step-card" style={{ padding: '16px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                              <svg className="lattice-visualizer-canvas" width="340" height="340" style={{ background: 'hsl(var(--bg-main) / 0.3)', borderRadius: '12px' }}>
                                <defs>
                                  <pattern id="grid-lat" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border-line) / 0.15)" strokeWidth="1" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-lat)" rx="12" />
                                {/* Bounding outer box (60,60) to (260,260) */}
                                <rect x="60" y="60" width="200" height="200" fill="none" stroke="hsl(var(--border-line))" strokeWidth="2" />
                                
                                {/* Vertical divider */}
                                <line x1="160" y1="60" x2="160" y2="260" stroke="hsl(var(--border-line))" strokeWidth="1.5" />
                                {/* Horizontal divider */}
                                <line x1="60" y1="160" x2="260" y2="160" stroke="hsl(var(--border-line))" strokeWidth="1.5" />

                                {/* Diagonal Paths (from top-right to bottom-left) */}
                                <line 
                                  x1="260" y1="160" x2="160" y2="260" 
                                  stroke={latStep >= 3 ? "hsl(15, 75%, 48%)" : "hsl(var(--secondary) / 0.35)"} 
                                  strokeWidth={latStep >= 3 ? "3" : "1.5"} 
                                  strokeDasharray={latStep >= 3 ? "none" : "3 3"} 
                                  style={{ transition: 'all 0.3s ease' }}
                                />
                                <line 
                                  x1="260" y1="60" x2="60" y2="260" 
                                  stroke={latStep >= 3 ? "hsl(38, 85%, 45%)" : "hsl(var(--warning) / 0.35)"} 
                                  strokeWidth={latStep >= 3 ? "3" : "1.5"} 
                                  strokeDasharray={latStep >= 3 ? "none" : "3 3"} 
                                  style={{ transition: 'all 0.3s ease' }}
                                />
                                <line 
                                  x1="160" y1="60" x2="60" y2="160" 
                                  stroke={latStep >= 3 ? "hsl(142, 65%, 40%)" : "hsl(var(--success) / 0.35)"} 
                                  strokeWidth={latStep >= 3 ? "3" : "1.5"} 
                                  strokeDasharray={latStep >= 3 ? "none" : "3 3"} 
                                  style={{ transition: 'all 0.3s ease' }}
                                />

                                {/* Diagonal extensions - Step 3+ */}
                                {latStep >= 3 && (
                                  <>
                                    <line x1="160" y1="260" x2="110" y2="310" stroke="hsl(15, 75%, 48%)" strokeWidth="2.5" />
                                    <line x1="60" y1="260" x2="10" y2="310" stroke="hsl(38, 85%, 45%)" strokeWidth="2.5" />
                                    <line x1="60" y1="160" x2="10" y2="210" stroke="hsl(142, 65%, 40%)" strokeWidth="2.5" />
                                    <line x1="60" y1="60" x2="20" y2="100" stroke="hsl(174, 75%, 40%)" strokeWidth="2.5" />
                                  </>
                                )}

                                {/* Multiplicand digits top */}
                                <text x="110" y="45" fill="hsl(var(--primary))" fontSize="18" fontWeight="800" textAnchor="middle">{x1}</text>
                                <text x="210" y="45" fill="hsl(var(--primary))" fontSize="18" fontWeight="800" textAnchor="middle">{x2}</text>

                                {/* Multiplicand digits right */}
                                <text x="280" y="115" fill="hsl(var(--secondary))" fontSize="18" fontWeight="800" textAnchor="middle">{y1}</text>
                                <text x="280" y="215" fill="hsl(var(--secondary))" fontSize="18" fontWeight="800" textAnchor="middle">{y2}</text>

                                {/* Cell Products digits - Step 2+ */}
                                {latStep >= 2 && (
                                  <>
                                    {/* Cell (1,1) details */}
                                    <text x="90" y="95" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{t11}</text>
                                    <text x="130" y="135" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{u11}</text>

                                    {/* Cell (1,2) details */}
                                    <text x="190" y="95" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{t12}</text>
                                    <text x="230" y="135" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{u12}</text>

                                    {/* Cell (2,1) details */}
                                    <text x="90" y="195" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{t21}</text>
                                    <text x="130" y="235" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{u21}</text>

                                    {/* Cell (2,2) details */}
                                    <text x="190" y="195" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{t22}</text>
                                    <text x="230" y="235" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="850" textAnchor="middle" opacity={latStep === 2 ? 1 : 0.6}>{u22}</text>
                                  </>
                                )}

                                {/* Extended Sum bubbles - Step 3+ */}
                                {latStep >= 3 && (
                                  <>
                                    <circle cx="110" cy="310" r="14" fill="hsl(15, 75%, 48%)" stroke="white" strokeWidth="1.5" />
                                    <text x="110" y="314" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">{w1}</text>

                                    <circle cx="10" cy="310" r="14" fill="hsl(38, 85%, 45%)" stroke="white" strokeWidth="1.5" />
                                    <text x="10" y="314" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">{w2}</text>

                                    <circle cx="10" cy="210" r="14" fill="hsl(142, 65%, 40%)" stroke="white" strokeWidth="1.5" />
                                    <text x="10" y="214" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">{w3}</text>

                                    <circle cx="20" cy="100" r="14" fill="hsl(174, 75%, 40%)" stroke="white" strokeWidth="1.5" />
                                    <text x="20" y="104" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">{w4}</text>

                                    {/* Sum labels */}
                                    <text x="140" y="312" fill="hsl(15, 75%, 48%)" fontSize="8" fontWeight="850">UNITS</text>
                                    <text x="32" y="312" fill="hsl(38, 85%, 45%)" fontSize="8" fontWeight="850">TENS</text>
                                    <text x="32" y="212" fill="hsl(142, 65%, 40%)" fontSize="8" fontWeight="850">HUNDS</text>
                                    <text x="42" y="102" fill="hsl(174, 75%, 40%)" fontSize="8" fontWeight="850">THOUS</text>
                                  </>
                                )}
                              </svg>
                            </div>

                            {/* Analysis Panel */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'hsl(var(--primary))' }}>Whiteboard Sum ledger:</h4>
                              
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: latStep >= 3 ? 1 : 0.3 }}>
                                  <span>Units place (D1):</span>
                                  <strong>{u22} = {w1} (carry: {c1})</strong>
                                </div>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: latStep >= 3 ? 1 : 0.3 }}>
                                  <span>Tens place (D2):</span>
                                  <strong>{u21} + {t22} + {u12} + {c1} = {d2} → {w2} (carry: {c2})</strong>
                                </div>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: latStep >= 3 ? 1 : 0.3 }}>
                                  <span>Hundreds place (D3):</span>
                                  <strong>{t21} + {u11} + {t12} + {c2} = {d3} → {w3} (carry: {c3})</strong>
                                </div>
                                <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: latStep >= 3 ? 1 : 0.3 }}>
                                  <span>Thousands place (D4):</span>
                                  <strong>{t11} + {c3} = {w4}</strong>
                                </div>
                              </div>

                              <div className="vis-result-footer" style={{ marginTop: '4px', opacity: latStep >= 4 ? 1 : 0.35 }}>
                                ✔ <strong>Classroom Lattice Output</strong>: {w4} | {w3} | {w2} | {w1} = <strong>{finalVal}</strong>! 
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <p style={{ color: 'hsl(var(--secondary))', fontWeight: 'bold' }}>Please enter two 2-digit numbers (digits 1-9 only).</p>
                    )}

                    {/* Chalkboard Note */}
                    {latNum1.length === 2 && latNum2.length === 2 && (() => {
                      const x1 = parseInt(latNum1[0]);
                      const x2 = parseInt(latNum1[1]);
                      const y1 = parseInt(latNum2[0]);
                      const y2 = parseInt(latNum2[1]);
                      const p11 = x1 * y1;
                      const p12 = x2 * y1;
                      const p21 = x1 * y2;
                      const p22 = x2 * y2;
                      const finalVal = parseInt(latNum1) * parseInt(latNum2);
                      return (
                        <div style={{
                          background: 'hsl(var(--bg-main) / 0.5)',
                          border: '2px dashed hsl(var(--primary) / 0.4)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          marginTop: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.82rem',
                          lineHeight: '1.5',
                          color: 'hsl(var(--text-primary))'
                        }}>
                          <strong style={{ color: 'hsl(var(--secondary))', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
                            ★ WHITEBOARD STEP NOTE:
                          </strong>
                          {latStep === 1 && (
                            <span>
                              Draw a box and split it into a 2x2 grid. Write the digits of the first number <strong>{latNum1}</strong> on the top, and the second number <strong>{latNum2}</strong> on the right side. Draw a diagonal split line in each cell!
                            </span>
                          )}
                          {latStep === 2 && (
                            <span>
                              Multiply each top digit by each right-side digit. Write the tens digit in the top-left triangle of the cell, and the units digit in the bottom-right triangle:
                              <br />• Row 1 products: {x1}×{y1} = <strong>{p11}</strong> and {x2}×{y1} = <strong>{p12}</strong>.
                              <br />• Row 2 products: {x1}×{y2} = <strong>{p21}</strong> and {x2}×{y2} = <strong>{p22}</strong>.
                            </span>
                          )}
                          {latStep === 3 && (
                            <span>
                              Now add the digits inside the diagonal slides starting from bottom-right units!
                              <br />• Slide 1 (Units): <strong>{p22%10}</strong>
                              <br />• Slide 2 (Tens): {p21%10} + {Math.floor(p22/10)} + {p12%10} = <strong>{p21%10 + Math.floor(p22/10) + p12%10}</strong>. Write units, carry over tens!
                              <br />• Slide 3 (Hundreds): Add digits plus carry. Carry over tens again.
                              <br />• Slide 4 (Thousands): Add final carry over to the top-left corner!
                            </span>
                          )}
                          {latStep === 4 && (
                            <span>
                              Simply read the summed digits along the outer bottom-left border: <strong>{finalVal}</strong>.
                              This method makes large calculations extremely simple and prevents carry-over confusion!
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 5. ENDING IN 5 SQUARING GEOMETRIC AREA LAB */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconSyllabus /> Geometric Area Split</span>
                        <h3 className="section-box-title" style={{ marginTop: '8px' }}>Ending in 5 Geometric Area Lab</h3>
                        <p className="section-box-desc">Drag the slider and check steps to visually see how squaring a number ending in 5 maps to a simple classroom formula.</p>
                      </div>

                      {/* Slider Input */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '750' }}>Number: <strong>{sq5Input}</strong></span>
                        <input
                          type="range"
                          min="1"
                          max="9"
                          value={Math.floor(parseInt(sq5Input) / 10)}
                          onChange={(e) => {
                            const nVal = parseInt(e.target.value);
                            setSq5Input(String(nVal * 10 + 5));
                            setSq5Step(1); // Reset step to 1
                          }}
                          style={{ width: '120px', accentColor: 'hsl(var(--primary))' }}
                          aria-label="Resize Squaring Base n"
                        />
                      </div>
                    </div>

                     {/* Interactive Whiteboard steps buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { step: 1, label: 'Step 1' },
                          { step: 2, label: 'Step 2' },
                          { step: 3, label: 'Step 3' },
                          { step: 4, label: 'Step 4' }
                        ].map(s => (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => setSq5Step(s.step)}
                            className={`glass-btn ${sq5Step === s.step ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                            style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '9999px' }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSq5Step(prev => Math.max(1, prev - 1))}
                          disabled={sq5Step === 1}
                          className="glass-btn glass-btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: sq5Step === 1 ? 0.4 : 1 }}
                        >
                          ← Prev Step
                        </button>
                        <button
                          type="button"
                          onClick={() => setSq5Step(prev => Math.min(4, prev + 1))}
                          disabled={sq5Step === 4}
                          className="glass-btn glass-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: sq5Step === 4 ? 0.4 : 1 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>

                    {(() => {
                      const n = Math.floor(parseInt(sq5Input) / 10);
                      
                      // Calculate sizes dynamically for drawing
                      const L = 130 + n * 8; // scaling Sage square
                      const S = 35; // fixed size for the unit 5 block
                      const totalSize = L + S + 20;

                      const areaSage = 100 * n * n;
                      const areaOchre = 50 * n;
                      const areaTerra = 25;
                      
                      const totalArea = parseInt(sq5Input) * parseInt(sq5Input);

                      return (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center', marginTop: '12px' }}>
                          {/* SVG Geometry Column */}
                          <div className="vis-step-card" style={{ padding: '16px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                            <svg width={totalSize} height={totalSize} style={{ background: 'hsl(var(--bg-main) / 0.3)', borderRadius: '12px' }}>
                              <defs>
                                <pattern id="grid-sq5" width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border-line) / 0.15)" strokeWidth="1" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid-sq5)" rx="12" />
                              {/* Sage forest square: 10n x 10n */}
                              <rect 
                                x="10" y="10" width={L} height={L} 
                                fill={sq5Step >= 3 ? "hsl(174, 75%, 40% / 0.85)" : (sq5Step >= 2 ? "hsl(174, 75%, 40% / 0.15)" : "none")} 
                                stroke="hsl(174, 75%, 40%)" strokeWidth="2.5" rx="4" 
                                style={{ transition: 'all 0.3s ease' }}
                              />
                              {sq5Step >= 2 && (
                                <>
                                  <text x={10 + L/2} y={10 + L/2} fill={sq5Step >= 3 ? "white" : "hsl(var(--text-primary))"} fontSize="11" fontWeight="800" textAnchor="middle">
                                    {10*n} × {10*n} = {areaSage}
                                  </text>
                                  <text x={10 + L/2} y={10 + L/2 + 15} fill={sq5Step >= 3 ? "white" : "hsl(var(--text-muted))"} fontSize="8" fontWeight="600" textAnchor="middle" opacity="0.8">
                                    (Base Square)
                                  </text>
                                </>
                              )}

                              {/* Top-Right Ochre: 5 x 10n */}
                              <rect 
                                x={10 + L} y="10" width={S} height={L} 
                                fill={sq5Step >= 3 ? "hsl(38, 85%, 45% / 0.85)" : (sq5Step >= 2 ? "hsl(38, 85%, 45% / 0.15)" : "none")} 
                                stroke="hsl(38, 85%, 45%)" strokeWidth="2.5" rx="4" 
                                style={{ transition: 'all 0.3s ease' }}
                              />
                              {sq5Step >= 2 && (
                                <text x={10 + L + S/2} y={10 + L/2} fill={sq5Step >= 3 ? "white" : "hsl(var(--text-primary))"} fontSize="10" fontWeight="800" textAnchor="middle" transform={`rotate(-90 ${10+L+S/2} ${10+L/2})`}>
                                  5 × {10*n} = {areaOchre}
                                </text>
                              )}

                              {/* Bottom-Left Ochre: 10n x 5 */}
                              <rect 
                                x="10" y={10 + L} width={L} height={S} 
                                fill={sq5Step >= 3 ? "hsl(38, 85%, 45% / 0.85)" : (sq5Step >= 2 ? "hsl(38, 85%, 45% / 0.15)" : "none")} 
                                stroke="hsl(38, 85%, 45%)" strokeWidth="2.5" rx="4" 
                                style={{ transition: 'all 0.3s ease' }}
                              />
                              {sq5Step >= 2 && (
                                <text x={10 + L/2} y={10 + L + S/2 + 4} fill={sq5Step >= 3 ? "white" : "hsl(var(--text-primary))"} fontSize="10" fontWeight="800" textAnchor="middle">
                                  {10*n} × 5 = {areaOchre}
                                </text>
                              )}

                              {/* Bottom-Right Terracotta: 5 x 5 */}
                              <rect 
                                x={10 + L} y={10 + L} width={S} height={S} 
                                fill={sq5Step >= 2 ? "hsl(15, 75%, 48%)" : "none"} 
                                stroke="hsl(15, 75%, 48%)" strokeWidth="2.5" rx="4" 
                                style={{ transition: 'all 0.3s ease' }}
                              />
                              {sq5Step >= 2 && (
                                <text x={10 + L + S/2} y={10 + L + S/2 + 4} fill="white" fontSize="10" fontWeight="800" textAnchor="middle">
                                  25
                                </text>
                              )}
                            </svg>
                          </div>

                          {/* Geometric Proof Ledger Column */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'hsl(var(--primary))' }}>Whiteboard Area Ledger:</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: sq5Step >= 2 ? 1 : 0.3 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(174, 75%, 40%)' }}></div> Large Box (100n²):</span>
                                <strong>{areaSage}</strong>
                              </div>
                              <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: sq5Step >= 2 ? 1 : 0.3 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(38, 85%, 45%)' }}></div> Rectangles (2 × 50n):</span>
                                <strong>{2 * areaOchre}</strong>
                              </div>
                              <div className="topic-card" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', padding: '8px 12px', opacity: sq5Step >= 2 ? 1 : 0.3 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(15, 75%, 48%)' }}></div> Corner Box (25):</span>
                                <strong>{areaTerra}</strong>
                              </div>
                            </div>

                            <div className="vis-result-footer" style={{ marginTop: '0', opacity: sq5Step >= 3 ? 1 : 0.35 }}>
                              ✔ <strong>Classroom Equation Sum</strong>: <br/>
                              LHS Blocks = {areaSage} + {2 * areaOchre} = <strong>{areaSage + 2 * areaOchre}</strong> (which is {100*n} × {10*(n+1)}) <br/>
                              Plus RHS Corner = <strong>{areaTerra}</strong> <br/>
                              Total Product = <strong>{totalArea}</strong>!
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Chalkboard Note */}
                    {(() => {
                      const n = Math.floor(parseInt(sq5Input) / 10);
                      const areaSage = 100 * n * n;
                      const areaOchre = 50 * n;
                      const totalArea = parseInt(sq5Input) * parseInt(sq5Input);
                      return (
                        <div style={{
                          background: 'hsl(var(--bg-main) / 0.5)',
                          border: '2px dashed hsl(var(--primary) / 0.4)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          marginTop: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.82rem',
                          lineHeight: '1.5',
                          color: 'hsl(var(--text-primary))'
                        }}>
                          <strong style={{ color: 'hsl(var(--secondary))', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
                            ★ WHITEBOARD STEP NOTE:
                          </strong>
                          {sq5Step === 1 && (
                            <span>
                              Let's split the square of side <strong>{sq5Input}</strong>!
                              We slice it into a large square of <strong>{10*n}×{10*n}</strong> (Sage), two side rectangles of <strong>5×{10*n}</strong> and <strong>{10*n}×5</strong> (Ochre), and a small <strong>5×5</strong> units corner (Terracotta).
                            </span>
                          )}
                          {sq5Step === 2 && (
                            <span>
                              Calculate individual area pieces:
                              <br />• Sage box = {10*n}×{10*n} = <strong>{areaSage}</strong>
                              <br />• Ochre strips = 2 × (5×{10*n}) = <strong>{2 * areaOchre}</strong> ({areaOchre} each)
                              <br />• Terracotta corner = 5×5 = <strong>25</strong>
                            </span>
                          )}
                          {sq5Step === 3 && (
                            <span>
                              Let's group the Sage square and Ochre rectangles together!
                              Their combined area is {areaSage} + {2 * areaOchre} = <strong>{areaSage + 2 * areaOchre}</strong>.
                              Look closely! This is exactly equivalent to a single big rectangle of dimensions <strong>{10*n} × {10*(n+1)}</strong> (which is {100*n*(n+1)})!
                            </span>
                          )}
                          {sq5Step === 4 && (
                            <span>
                              Here is the shortcut taught in coaching centers!
                              Multiply the tens digit <strong>{n}</strong> by its successor <strong>{n+1}</strong> ({n} x {n+1} = <strong>{n*(n+1)}</strong>).
                              Then simply append <strong>25</strong> at the end.
                              <br />Example: For {sq5Input}, <strong>{n} x {n+1} = {n*(n+1)}</strong>. Append 25 → <strong>{totalArea}</strong>! Solved in 1 second flat!
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 6. VEDIC BASE 100 MULTIPLICATION ARROW BOARD */}
                <div className="section-box" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span className="tool-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><IconSparkles /> Base 100 Hack</span>
                        <h3 className="section-box-title" style={{ marginTop: '8px' }}>Vedic Base 100 Interactive Whiteboard</h3>
                        <p className="section-box-desc">Step through the chalkboard steps to visually master Base 100 calculations using cross-subtraction and straight multiplication.</p>
                      </div>

                      {/* Inputs */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <input
                          type="text"
                          maxLength="2"
                          value={baseMult1}
                          onChange={(e) => {
                            setBaseMult1(e.target.value.replace(/[^0-9]/g, ''));
                            setBaseStep(1); // Reset step to 1
                          }}
                          className="glass-input"
                          style={{ width: '70px', textAlign: 'center', fontWeight: '800' }}
                          placeholder="98"
                          aria-label="First Base Multiplier"
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>×</span>
                        <input
                          type="text"
                          maxLength="2"
                          value={baseMult2}
                          onChange={(e) => {
                            setBaseMult2(e.target.value.replace(/[^0-9]/g, ''));
                            setBaseStep(1); // Reset step to 1
                          }}
                          className="glass-input"
                          style={{ width: '70px', textAlign: 'center', fontWeight: '800' }}
                          placeholder="97"
                          aria-label="Second Base Multiplier"
                        />
                      </div>
                    </div>

                    {/* Interactive Whiteboard steps buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { step: 1, label: 'Step 1' },
                          { step: 2, label: 'Step 2' },
                          { step: 3, label: 'Step 3' },
                          { step: 4, label: 'Step 4' }
                        ].map(s => (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => setBaseStep(s.step)}
                            className={`glass-btn ${baseStep === s.step ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                            style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '9999px' }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setBaseStep(prev => Math.max(1, prev - 1))}
                          disabled={baseStep === 1}
                          className="glass-btn glass-btn-outline"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: baseStep === 1 ? 0.4 : 1 }}
                        >
                          ← Prev Step
                        </button>
                        <button
                          type="button"
                          onClick={() => setBaseStep(prev => Math.min(4, prev + 1))}
                          disabled={baseStep === 4}
                          className="glass-btn glass-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.72rem', borderRadius: '8px', opacity: baseStep === 4 ? 0.4 : 1 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>

                    {baseMult1.length === 2 && baseMult2.length === 2 ? (
                      (() => {
                        const a = parseInt(baseMult1);
                        const b = parseInt(baseMult2);
                        const d1 = 100 - a;
                        const d2 = 100 - b;
                        
                        const leftHalf = a - d2;
                        const rightHalf = d1 * d2;
                        const rightStr = rightHalf < 10 ? '0' + rightHalf : String(rightHalf);
                        
                        const finalVal = a * b;

                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
                            {/* SVG Flowchart Canvas */}
                            <div className="vis-step-card" style={{ padding: '24px 16px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                              <svg className="lattice-visualizer-canvas" width="420" height="180" style={{ background: 'hsl(var(--bg-main) / 0.3)', borderRadius: '12px' }}>
                                <defs>
                                  <pattern id="grid-base" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border-line) / 0.15)" strokeWidth="1" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-base)" rx="12" />
                                {/* Multiplier 1 Circle */}
                                <circle cx="80" cy="45" r="22" fill="none" stroke="hsl(174, 75%, 40%)" strokeWidth="2.5" />
                                <text x="80" y="50" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="800" textAnchor="middle">{a}</text>

                                {/* Multiplier 2 Circle */}
                                <circle cx="80" cy="135" r="22" fill="none" stroke="hsl(174, 75%, 40%)" strokeWidth="2.5" />
                                <text x="80" y="140" fill="hsl(var(--text-primary))" fontSize="14" fontWeight="800" textAnchor="middle">{b}</text>

                                {/* Diff 1 Circle - Step 1+ */}
                                {baseStep >= 1 && (
                                  <>
                                    <circle cx="200" cy="45" r="18" fill="none" stroke="hsl(15, 75%, 48%)" strokeWidth="2" strokeDasharray="3 3" />
                                    <text x="200" y="49" fill="hsl(var(--text-primary))" fontSize="12" fontWeight="800" textAnchor="middle">-{d1}</text>
                                  </>
                                )}

                                {/* Diff 2 Circle - Step 1+ */}
                                {baseStep >= 1 && (
                                  <>
                                    <circle cx="200" cy="135" r="18" fill="none" stroke="hsl(15, 75%, 48%)" strokeWidth="2" strokeDasharray="3 3" />
                                    <text x="200" y="139" fill="hsl(var(--text-primary))" fontSize="12" fontWeight="800" textAnchor="middle">-{d2}</text>
                                  </>
                                )}

                                {/* Cross-subtraction paths (glowing connectors) - Step 2+ */}
                                {baseStep >= 2 && (
                                  <>
                                    {/* Arrow from a to Diff 2 */}
                                    <path d="M 98 55 L 182 125" fill="none" stroke="hsl(38, 85%, 45%)" strokeWidth="2.5" strokeDasharray="4 2" />
                                    <polygon points="182,125 178,118 184,122" fill="hsl(38, 85%, 45%)" />

                                    {/* Arrow from b to Diff 1 */}
                                    <path d="M 98 125 L 182 55" fill="none" stroke="hsl(38, 85%, 45%)" strokeWidth="2.5" strokeDasharray="4 2" />
                                    <polygon points="182,55 184,58 178,62" fill="hsl(38, 85%, 45%)" />
                                  </>
                                )}

                                {/* Diff multiplication vertical connector - Step 3+ */}
                                {baseStep >= 3 && (
                                  <>
                                    <path d="M 200 63 L 200 117" fill="none" stroke="hsl(15, 75%, 48%)" strokeWidth="2" />
                                    <text x="215" y="93" fill="hsl(15, 75%, 48%)" fontSize="10" fontWeight="800">×</text>
                                  </>
                                )}

                                {/* Left Output Box - Step 2+ */}
                                {baseStep >= 2 && (
                                  <>
                                    <rect x="300" y="25" width="100" height="40" rx="8" fill="hsl(38, 85%, 45% / 0.08)" stroke="hsl(38, 85%, 45%)" strokeWidth="1.5" style={{ opacity: baseStep >= 2 ? 1 : 0.3 }} />
                                    <text x="350" y="45" fill="hsl(38, 85%, 45%)" fontSize="11" fontWeight="800" textAnchor="middle">{a} - {d2} = {leftHalf}</text>
                                    <text x="350" y="58" fill="hsl(var(--text-muted))" fontSize="7" fontWeight="700" textAnchor="middle">LHS (FIRST HALF)</text>
                                  </>
                                )}

                                {/* Right Output Box - Step 3+ */}
                                {baseStep >= 3 && (
                                  <>
                                    <rect x="300" y="115" width="100" height="40" rx="8" fill="hsl(15, 75%, 48% / 0.08)" stroke="hsl(15, 75%, 48%)" strokeWidth="1.5" style={{ opacity: baseStep >= 3 ? 1 : 0.3 }} />
                                    <text x="350" y="135" fill="hsl(15, 75%, 48%)" fontSize="11" fontWeight="800" textAnchor="middle">{-d1} × {-d2} = {rightStr}</text>
                                    <text x="350" y="148" fill="hsl(var(--text-muted))" fontSize="7" fontWeight="700" textAnchor="middle">RHS (SECOND HALF)</text>
                                  </>
                                )}

                                {/* Labels */}
                                <text x="80" y="18" fill="hsl(var(--text-primary))" fontSize="8" fontWeight="850" textAnchor="middle">BASES</text>
                                {baseStep >= 1 && <text x="200" y="18" fill="hsl(var(--text-primary))" fontSize="8" fontWeight="850" textAnchor="middle">DIFFS</text>}
                              </svg>
                            </div>

                            <div className="vis-result-footer" style={{ marginTop: '0', opacity: baseStep >= 4 ? 1 : 0.35 }}>
                              ✔ <strong>Classroom Combined Result</strong>: First Half (LHS) | Second Half (RHS) = {leftHalf} | {rightStr} = <strong>{finalVal}</strong>!
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <p style={{ color: 'hsl(var(--secondary))', fontWeight: 'bold' }}>Please enter valid two 2-digit numbers.</p>
                    )}

                    {/* Chalkboard Note */}
                    {baseMult1.length === 2 && baseMult2.length === 2 && (() => {
                      const a = parseInt(baseMult1);
                      const b = parseInt(baseMult2);
                      const d1 = 100 - a;
                      const d2 = 100 - b;
                      const leftHalf = a - d2;
                      const rightStr = (d1*d2) < 10 ? '0' + (d1*d2) : String(d1*d2);
                      const finalVal = a * b;
                      return (
                        <div style={{
                          background: 'hsl(var(--bg-main) / 0.5)',
                          border: '2px dashed hsl(var(--primary) / 0.4)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          marginTop: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.82rem',
                          lineHeight: '1.5',
                          color: 'hsl(var(--text-primary))'
                        }}>
                          <strong style={{ color: 'hsl(var(--secondary))', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
                            ★ WHITEBOARD STEP NOTE:
                          </strong>
                          {baseStep === 1 && (
                            <span>
                              Write down the differences from 100 for both numbers.
                              <br />• 100 - {a} = <strong>-{d1}</strong> (first difference)
                              <br />• 100 - {b} = <strong>-{d2}</strong> (second difference)
                            </span>
                          )}
                          {baseStep === 2 && (
                            <span>
                              Now cross-subtract! Take the first number <strong>{a}</strong> and subtract the second difference <strong>{d2}</strong>:
                              <br /><strong>{a} - {d2} = {leftHalf}</strong>.
                              <br />(Or take the second number <strong>{b}</strong> and subtract the first difference <strong>{d1}</strong>: <strong>{b} - {d1} = {leftHalf}</strong>. The result is always the same!). This is the <strong>LHS First Half</strong>!
                            </span>
                          )}
                          {baseStep === 3 && (
                            <span>
                              Multiply the differences straight down:
                              <br /><strong>(-{d1}) × (-{d2}) = {rightStr}</strong>.
                              <br />This is the <strong>RHS Second Half</strong>! Always write it as a 2-digit number (e.g. 6 becomes 06).
                            </span>
                          )}
                          {baseStep === 4 && (
                            <span>
                              Combine both parts side-by-side: <strong>LHS | RHS</strong> → <strong>{leftHalf} | {rightStr} = {finalVal}</strong>.
                              No tedious standard multiplication needed, solved in 3 seconds flat on the chalkboard!
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PAGE 6: AI CHAT COACH INTERFACE */}
          {activeTab === 'coach' && (
            <div className="animate-fade-in chat-window">
              
              {/* Chat Header Bar */}
              <div className="chat-header-bar">
                <div className="chat-header-left">
                  <div className="chat-header-avatar" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconSparkles /></div>
                  <div>
                    <h3 className="chat-header-title">Personal AI Coach ("BankExamCoach")</h3>
                    <div className="chat-header-status">
                      <span className="chat-status-ping"></span>
                      <span>Tutor Active</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setChatMessages([
                    {
                      sender: 'coach',
                      text: 'Hello! I am your personal Bank Exam Coach. Let\'s make sure you crack these exams. What topic shall we discuss today? I can explain Quant, Syllogisms, Banking, or give you a Vedic speed tip.',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ])}
                  className="chat-header-clear"
                >
                  Clear History
                </button>
              </div>

              {/* Chat Messages scroll area */}
              <div className="chat-messages-container">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg-bubble ${msg.sender === 'user' ? 'user' : 'coach'}`}>
                    <div className="chat-bubble-text">{msg.text}</div>
                    <span className="chat-msg-time">{msg.time}</span>
                  </div>
                ))}

                {chatIsTyping && (
                  <div className="chat-msg-bubble coach">
                    <div className="chat-typing-bubble">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat suggestions chip links */}
              <div className="chat-suggestions-bar">
                {[
                  "Vedic multiplication hack for 98 x 97",
                  "Explain 'Only a Few' in Syllogisms",
                  "How does Repo Rate work?",
                  "Give me a Reasoning Puzzle tip"
                ].map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => sendChatMessage(s)}
                    className="suggestion-chip"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <IconMessage /> {s}
                  </button>
                ))}
              </div>

              {/* Chat Input form box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  sendChatMessage(userInputChat);
                }}
                className="chat-input-form"
              >
                <input
                  type="text"
                  value={userInputChat}
                  onChange={(e) => setUserInputChat(e.target.value)}
                  placeholder="Ask your Coach any doubt (e.g. explain MSF rate, give me a math quiz)..."
                  className="glass-input"
                  aria-label="Ask your Coach a Banking Question"
                />
                <button type="submit" className="glass-btn glass-btn-primary">Send</button>
              </form>

            </div>
          )}

          {/* 7. TABLET SMART BOARD LESSON MODAL OVERLAY */}
          {activeLesson && (
            <div className="tablet-overlay animate-fade-in">
              <div className="tablet-screen">
                {/* Header bezel status */}
                <div className="tablet-header">
                  <span className="tablet-header-title">
                    Level {activeLesson.id}: {activeLesson.title}
                  </span>

                  {/* Mode Selector Bezel */}
                  <div className="mode-selector-container" style={{ display: 'flex', gap: '4px', background: 'hsl(var(--border-line) / 0.5)', padding: '2px', borderRadius: '8px' }}>
                    <button
                      onClick={() => setLearningMode('guided')}
                      className={`glass-btn ${learningMode === 'guided' ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                      style={{ padding: '4px 10px', fontSize: '0.68rem', borderRadius: '6px' }}
                    >
                      Guided
                    </button>
                    <button
                      onClick={() => setLearningMode('speed')}
                      className={`glass-btn ${learningMode === 'speed' ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                      style={{ padding: '4px 10px', fontSize: '0.68rem', borderRadius: '6px' }}
                    >
                      Speed
                    </button>
                    <button
                      onClick={() => setLearningMode('topper')}
                      className={`glass-btn ${learningMode === 'topper' ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                      style={{ padding: '4px 10px', fontSize: '0.68rem', borderRadius: '6px' }}
                    >
                      Topper
                    </button>
                  </div>
                  
                  {/* Progress bar inside tablet */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'hsl(var(--text-muted))' }}>
                      {lessonStep === 1 ? 'Step 1: Tutor Board' : lessonStep === 2 ? 'Step 2: Visual Steps' : `Step 3: Level Test (${quizQuestionIdx + 1}/3)`}
                    </span>
                    <button
                      onClick={() => setActiveLesson(null)}
                      className="theme-toggle-btn"
                      style={{ width: '32px', height: '32px', padding: '0', borderRadius: '50%', background: 'hsl(var(--border-line) / 0.5)' }}
                      aria-label="Close Smart Board Lesson"
                    >
                      <IconClose />
                    </button>
                  </div>
                </div>

                {/* Main scrollable grid body */}
                <div className="tablet-body">
                  {/* Left Column: Tutoring dialogues and Visual whiteboards */}
                  <div className="tablet-scroll-pane">
                    {learningMode === 'topper' ? (
                      <TopperSprintArena
                        key={`${activeLesson.id}_${quizQuestionIdx}`}
                        activeLesson={activeLesson}
                        quizQuestionIdx={quizQuestionIdx}
                        quizAttempts={quizAttempts}
                        quizFeedback={quizFeedback}
                        onTimeout={handleTopperTimeout}
                      />
                    ) : learningMode === 'speed' ? (
                      <div className="fastest-method-card animate-slide-in" style={{ borderColor: 'hsl(var(--secondary) / 0.5)' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <span className="hero-badge" style={{ background: 'hsl(var(--secondary) / 0.15)', color: 'hsl(var(--secondary))' }}>Speed Mode Formula Bezel</span>
                        </div>
                        <h4 className="tip-title" style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Trigger Patterns & Key Formulas</h4>
                        <p style={{ fontSize: '0.85rem', fontWeight: '750', marginBottom: '12px', lineHeight: '1.5' }}>
                          {activeLesson.tipCard}
                        </p>
                        <div style={{ border: '1px dashed hsl(var(--border-line))', borderRadius: '8px', padding: '12px', background: 'hsl(var(--bg-main) / 0.3)', fontSize: '0.78rem', lineHeight: '1.5' }}>
                          <span style={{ fontWeight: '800', display: 'block', marginBottom: '4px' }}>Key Takeaway:</span>
                          Skip reading verbal descriptions during speed tests. Spot the trigger values and apply the formula immediately!
                        </div>
                      </div>
                    ) : (
                      <>
                        {lessonStep === 1 ? (
                          <div className="fastest-method-card animate-slide-in" style={{ borderColor: 'hsl(var(--primary) / 0.3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <span className="hero-badge" style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}>Stage 1: Curiosity Hook</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'hsl(var(--warning))' }}>Intuition Match</span>
                            </div>
                            <h4 className="tip-title" style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Build Your Visual Intuition First</h4>
                            
                            {(() => {
                              const cp = getCheckpointData(activeLesson);
                              return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'hsl(var(--text-primary))', fontWeight: '650' }}>
                                    {cp.hook}
                                  </p>

                                  <div className="quiz-options-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {cp.options.map((opt, oIdx) => {
                                      let optClass = "";
                                      if (checkpointSelectedOpt === oIdx) {
                                        if (checkpointFeedback === 'correct') optClass = "correct";
                                        else if (checkpointFeedback === 'incorrect') optClass = "incorrect";
                                        else optClass = "selected";
                                      }
                                      return (
                                        <button
                                          key={oIdx}
                                          disabled={checkpointFeedback === 'correct'}
                                          onClick={() => {
                                            setCheckpointSelectedOpt(oIdx);
                                            setCheckpointFeedback(null);
                                          }}
                                          className={`quiz-option-btn ${optClass}`}
                                          style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.78rem' }}
                                        >
                                          {opt}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {checkpointFeedback && (
                                    <div className={`drill-feedback ${checkpointFeedback === 'correct' ? 'drill-feedback-correct' : 'drill-feedback-incorrect'}`} style={{ padding: '10px', marginTop: '0', borderRadius: '8px' }}>
                                      <strong>{checkpointFeedback === 'correct' ? '✔ Intuition Unlocked!' : '✘ Try Again, Aspirant'}</strong>
                                      <p style={{ fontSize: '0.74rem', marginTop: '4px', lineHeight: '1.4' }}>
                                        {checkpointFeedback === 'correct' ? cp.feedback : "Think about the scale and number boundaries. Look at the base values!"}
                                      </p>
                                    </div>
                                  )}

                                  <div style={{ marginTop: '10px' }}>
                                    {checkpointFeedback !== 'correct' ? (
                                      <button
                                        onClick={() => {
                                          if (checkpointSelectedOpt === null) {
                                            alert("Aspirant, select an option first!");
                                            return;
                                          }
                                          if (checkpointSelectedOpt === cp.correct) {
                                            setCheckpointFeedback('correct');
                                          } else {
                                            setCheckpointFeedback('incorrect');
                                          }
                                        }}
                                        className="glass-btn glass-btn-primary"
                                        style={{ width: '100%', padding: '10px' }}
                                      >
                                        Verify Intuition Checkpoint
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setLessonStep(2);
                                          setCheckpointSelectedOpt(null);
                                          setCheckpointFeedback(null);
                                        }}
                                        className="glass-btn glass-btn-secondary"
                                        style={{ width: '100%', padding: '10px' }}
                                      >
                                        Continue to Visual Smart Board →
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <>
                            {/* Dialogue Message */}
                            <div className="coach-speech-bubble animate-slide-in">
                              <span className="coach-speech-title">Institution Coach Dialogue</span>
                              <p className="coach-speech-text">{activeLesson.coachDialogue}</p>
                            </div>

                            {/* Visual Smart Board drawing canvas */}
                            <div className="smart-board-canvas" style={{ border: '1.5px solid hsl(var(--primary) / 0.35)', boxShadow: '0 8px 32px hsl(var(--primary) / 0.05)' }}>
                              
                              {/* Whiteboard style selector tabs */}
                              <div style={{ display: 'flex', borderBottom: '1px solid hsl(var(--border-line))', paddingBottom: '10px', marginBottom: '14px', gap: '8px' }}>
                                {['visual', 'logical', 'shortcut', 'story'].map(style => (
                                  <button
                                    key={style}
                                    onClick={() => setExplanationStyle(style)}
                                    className={`glass-btn ${explanationStyle === style ? 'glass-btn-primary' : 'glass-btn-outline'}`}
                                    style={{ padding: '4px 10px', fontSize: '0.66rem', textTransform: 'uppercase', borderRadius: '6px' }}
                                  >
                                    {style === 'visual' ? '📐 Visual' : style === 'logical' ? '⛓ Logical' : style === 'shortcut' ? '⚡ Shortcut' : '📖 Story'}
                                  </button>
                                ))}
                              </div>

                              <span className="smart-board-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'hsl(var(--secondary))', fontWeight: '800' }}>
                                Smart Board Whiteboard Reveal:
                              </span>
                              
                              {/* Step display container */}
                              <div style={{
                                background: 'hsl(var(--bg-main) / 0.5)',
                                border: '1.5px dashed hsl(var(--primary) / 0.3)',
                                borderRadius: '12px',
                                padding: '20px',
                                minHeight: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                color: 'hsl(var(--text-primary))',
                                marginTop: '8px'
                              }}>
                                {explanationStyle === 'visual' ? (
                                  <>
                                    <div style={{ fontSize: '0.68rem', fontWeight: '800', color: 'hsl(var(--secondary))', marginBottom: '8px', textTransform: 'uppercase' }}>
                                      Step {activeBoardStep + 1} of {activeLesson.visualSteps.length}:
                                    </div>
                                    <div style={{ fontWeight: '800', lineHeight: '1.6', fontFamily: 'monospace' }}>
                                      {activeLesson.visualSteps[activeBoardStep]}
                                    </div>
                                  </>
                                ) : explanationStyle === 'logical' ? (
                                  <div style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: 'hsl(var(--primary))', display: 'block', marginBottom: '6px' }}>⛓ Structured Breakdown Chain:</strong>
                                    Let's map out the structural rules for <strong>"{activeLesson.title}"</strong>. In bank exams, we first isolate variable terms, group like parameters, and verify boundary states logically without skipping proof blocks.
                                  </div>
                                ) : explanationStyle === 'shortcut' ? (
                                  <div style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: 'hsl(var(--warning))', display: 'block', marginBottom: '6px' }}>⚡ Topper Speed Trick:</strong>
                                    {activeLesson.tipCard}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: '0.78rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                                    <strong style={{ color: 'hsl(var(--secondary))', display: 'block', marginBottom: '6px', fontStyle: 'normal' }}>📖 Relatable Analogy:</strong>
                                    Think of this method like sorting items into color-coded boxes at home, aspirant. Instead of checking every item individually, we look at the box label (the trigger pattern) and sort them in bulk. This keeps your mind fresh in high pressure SBI PO rounds!
                                  </div>
                                )}
                              </div>

                              {/* Step cycling buttons */}
                              {explanationStyle === 'visual' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                  <button
                                    onClick={() => setActiveBoardStep(prev => Math.max(0, prev - 1))}
                                    disabled={activeBoardStep === 0}
                                    className="glass-btn glass-btn-outline"
                                    style={{ padding: '6px 16px', fontSize: '0.72rem', opacity: activeBoardStep === 0 ? 0.4 : 1 }}
                                  >
                                    ← Previous step
                                  </button>
                                  <button
                                    onClick={() => setActiveBoardStep(prev => Math.min(activeLesson.visualSteps.length - 1, prev + 1))}
                                    disabled={activeBoardStep === activeLesson.visualSteps.length - 1}
                                    className="glass-btn glass-btn-primary"
                                    style={{ padding: '6px 16px', fontSize: '0.72rem', opacity: activeBoardStep === activeLesson.visualSteps.length - 1 ? 0.4 : 1 }}
                                  >
                                    Next step →
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Navigation inside lesson steps */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
                      {lessonStep > 1 && (
                        <button
                          onClick={() => setLessonStep(prev => prev - 1)}
                          className="glass-btn glass-btn-outline"
                          style={{ flex: 1 }}
                        >
                          Back to Step {lessonStep - 1}
                        </button>
                      )}
                      {lessonStep < 3 ? (
                        <button
                          onClick={() => {
                            setLessonStep(prev => prev + 1);
                          }}
                          className="glass-btn glass-btn-primary"
                          style={{ flex: 1 }}
                        >
                          Proceed to {lessonStep === 1 ? 'Step 2: Visuals' : 'Step 3: Level Test'}
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Right Column: Unlock tests and quizzes */}
                  <div className="tablet-scroll-pane right-pane">
                    {lessonStep === 3 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


                        <div>
                          <span className="hero-badge">Aptitude Test Arena</span>
                          <h4 className="tip-title" style={{ fontSize: '1.05rem', marginTop: '8px' }}>
                            Question {quizQuestionIdx + 1} of 3
                          </h4>
                          <p style={{ fontSize: '0.88rem', fontWeight: '750', marginTop: '12px', lineHeight: '1.5', color: 'hsl(var(--text-primary))' }}>
                            {activeLesson.quiz[quizQuestionIdx].question}
                          </p>
                        </div>

                        {/* Radio Options Grid */}
                        <div className="quiz-options-container">
                          {activeLesson.quiz[quizQuestionIdx].options.map((opt, oIdx) => {
                            let btnClass = "";
                            if (selectedQuizOpt === oIdx) {
                              if (quizFeedback === 'correct') btnClass = "correct";
                              else if (quizFeedback === 'incorrect') btnClass = "incorrect";
                              else btnClass = "selected";
                            } else if (quizFeedback !== null) {
                              btnClass = "disabled";
                            }
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  if (quizFeedback === null) {
                                    setSelectedQuizOpt(oIdx);
                                  }
                                }}
                                disabled={quizFeedback !== null}
                                className={`quiz-option-btn ${btnClass}`}
                              >
                                <div className="quiz-option-indicator">
                                  {oIdx === 0 ? 'A' : oIdx === 1 ? 'B' : oIdx === 2 ? 'C' : 'D'}
                                </div>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback Explanation */}
                        {quizFeedback && (
                          <div className={`drill-feedback ${quizFeedback === 'correct' ? 'drill-feedback-correct' : 'drill-feedback-incorrect'}`} style={{ marginTop: '10px' }}>
                            <h4>{quizFeedback === 'correct' ? '✔ CORRECT ANSWER!' : '✘ INCORRECT ANSWER'}</h4>
                            <p style={{ fontSize: '0.78rem', lineHeight: '1.4', marginTop: '4px' }}>
                              {activeLesson.quiz[quizQuestionIdx].explanation}
                            </p>
                          </div>
                        )}

                        {/* Actions panel */}
                        <div style={{ marginTop: 'auto' }}>
                          {quizFeedback === null ? (
                            <button
                              onClick={() => {
                                if (selectedQuizOpt === null) {
                                  alert("Please pick an option first!");
                                  return;
                                }
                                const isCorrect = selectedQuizOpt === activeLesson.quiz[quizQuestionIdx].correct;
                                if (isCorrect) {
                                  setQuizFeedback('correct');
                                } else {
                                  setQuizFeedback('incorrect');
                                  const currentQKey = `${activeLesson.id}_${quizQuestionIdx}`;
                                  const currentAttempts = (quizAttempts[currentQKey] || 0) + 1;
                                  setQuizAttempts(prev => ({ ...prev, [currentQKey]: currentAttempts }));

                                  // Increment mistake fingerprint
                                  let errorType = null;
                                  if (activeLesson.id === 5) {
                                    errorType = 'negativeSigns';
                                  } else if (activeLesson.id === 6 || activeLesson.id === 7) {
                                    errorType = 'onlyAFew';
                                  } else if (activeLesson.id === 8) {
                                    errorType = 'inequalityDirection';
                                  } else if ([1, 2, 3, 4].includes(activeLesson.id)) {
                                    errorType = 'carryDigits';
                                  }
                                  if (errorType) {
                                    setMistakeFingerprints(prev => ({
                                      ...prev,
                                      [errorType]: prev[errorType] + 1
                                    }));
                                  }
                                }
                              }}
                              className="glass-btn glass-btn-secondary"
                              style={{ width: '100%' }}
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {quizFeedback === 'incorrect' ? (
                                <RetrainingSandbox
                                  attempts={quizAttempts[`${activeLesson.id}_${quizQuestionIdx}`] || 0}
                                  onRetry={handleRetry}
                                  onReplayWhiteboard={handleReplayWhiteboard}
                                  onRevealHint={handleRevealHint}
                                  onSolveStepByStep={handleSolveStepByStep}
                                />
                              ) : (
                                <button
                                  onClick={() => {
                                    if (quizQuestionIdx < 2) {
                                      setQuizQuestionIdx(prev => prev + 1);
                                      setSelectedQuizOpt(null);
                                      setQuizFeedback(null);
                                    } else {
                                      handleCompleteLesson(activeLesson.id);
                                    }
                                  }}
                                  className="glass-btn glass-btn-primary"
                                  style={{ flex: 1 }}
                                >
                                  {quizQuestionIdx < 2 ? 'Next Question →' : 'Finish & Unlock next level! 🎉'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '20px' }}>
                        <div className="math-icon-wrapper" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.08)' }}>
                          <IconSparkles />
                        </div>
                        <div>
                          <h4 className="tip-title" style={{ fontSize: '1.1rem' }}>Study the Smart Board Details</h4>
                          <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', maxWidth: '300px', marginTop: '10px', lineHeight: '1.6' }}>
                            Read the coaching dialogues and review the step-by-step whiteboard animation before launching the level unlock test!
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setLessonStep(3);
                          }}
                          className="glass-btn glass-btn-secondary"
                          style={{ padding: '10px 24px', fontSize: '0.78rem' }}
                        >
                          Skip to Unlock Test
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
