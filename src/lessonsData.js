export const LESSONS = [
  {
    id: 1,
    title: "Crosswise Multiplication (2x2)",
    subject: "Quantitative Aptitude",
    category: "quant",
    xp: 100,
    coachDialogue: "Welcome, aspirant! Today we are starting with the ultimate calculation weapon: the Vertical & Crosswise Vedic trick. Standard long multiplication will waste your precious seconds in SBI PO. Remember this simple pattern: Up-Cross-Up. Let's master it, student!",
    tipCard: "To multiply two 2-digit numbers AB and CD: Step 1 is B × D, Step 2 is A × D + B × C, Step 3 is A × C. Keep carrying forward intermediate values leftwards. You get the answer in one single line!",
    visualSteps: [
      "1. Align the digits: Let's multiply 23 by 47.",
      "2. Step 1 (Vertical Right): Multiply the unit digits 3 × 7 = 21. Write 1 and carry over 2.",
      "3. Step 2 (Crosswise): Multiply (2 × 7) + (3 × 4) = 14 + 12 = 26. Add carry 2 to get 28. Write 8 and carry over 2.",
      "4. Step 3 (Vertical Left): Multiply the tens digits 2 × 4 = 8. Add carry 2 to get 10. Combining them: 1081!"
    ],
    quiz: [
      {
        question: "Multiply 23 by 12 using the crosswise method. What is the correct answer?",
        options: ["A) 276", "B) 256", "C) 286", "D) 296"],
        correct: 0,
        explanation: "Step 1: 3 × 2 = 6. Step 2: (2 × 2) + (3 × 1) = 4 + 3 = 7. Step 3: 2 × 1 = 2. Putting it together, we get 276."
      },
      {
        question: "Calculate 41 × 23 using the speed shortcut. What is the value?",
        options: ["A) 943", "B) 843", "C) 953", "D) 933"],
        correct: 0,
        explanation: "Step 1: 1 × 3 = 3. Step 2: (4 × 3) + (1 × 2) = 12 + 2 = 14 (write 4, carry 1). Step 3: 4 × 2 = 8. Add carry 1 = 9. Total is 943."
      },
      {
        question: "Multiply 15 × 32. What is the single line result?",
        options: ["A) 480", "B) 450", "C) 520", "D) 460"],
        correct: 0,
        explanation: "Step 1: 5 × 2 = 10 (write 0, carry 1). Step 2: (1 × 2) + (5 × 3) = 2 + 15 = 17 + carry 1 = 18 (write 8, carry 1). Step 3: 1 × 3 = 3 + carry 1 = 4. Result = 480."
      }
    ]
  },
  {
    id: 2,
    title: "Japanese Line Grid Geometry",
    subject: "Quantitative Aptitude",
    category: "quant",
    xp: 100,
    coachDialogue: "Aha, student! What if I tell you that you can multiply numbers just by drawing sticks? Yes, the Japanese Line Grid method converts boring algebra into beautiful geometry. When you are mentally exhausted in the bank exam hall, this visual drawing hack will save your brain from burnout!",
    tipCard: "Draw parallel diagonal lines for the digits of the first number, and cross them with perpendicular diagonal lines for the second number. Count the intersection dots in vertical zones: Left (Hundreds), Middle (Tens), Right (Units).",
    visualSteps: [
      "1. Let's do 12 × 13. Draw 1 line (tens) and 2 parallel lines (units) diagonally.",
      "2. Intersect them with 1 line (tens) and 3 lines (units) perpendicular to the first group.",
      "3. Group intersections into zones: Right zone has 2 × 3 = 6 dots. Middle zone has (1 × 3) + (2 × 1) = 5 dots. Left zone has 1 × 1 = 1 dot.",
      "4. Read the count from left to right: 156!"
    ],
    quiz: [
      {
        question: "If we multiply 21 × 13 using line grids, how many intersection dots are in the middle (tens) zone?",
        options: ["A) 7 dots", "B) 5 dots", "C) 6 dots", "D) 8 dots"],
        correct: 0,
        explanation: "The first number 21 has lines [2, 1]. The second number 13 has lines [1, 3]. The middle intersections are (2 × 3) + (1 × 1) = 6 + 1 = 7 dots, which represents 70 in our place values."
      },
      {
        question: "Using Japanese line grid geometry to solve 11 × 12, what are the dot counts for [Left, Middle, Right] zones respectively?",
        options: ["A) [1, 3, 2]", "B) [1, 2, 2]", "C) [2, 3, 1]", "D) [1, 3, 3]"],
        correct: 0,
        explanation: "Lines for 11 and 12 give: Left (1 × 1 = 1), Middle (1 × 2 + 1 × 1 = 3), Right (1 × 2 = 2). Thus, the answer is 132."
      },
      {
        question: "Why does the Japanese Line method work so well for visual thinkers?",
        options: ["A) It represents digit places as intersection matrices that sum up place values naturally.", "B) It bypasses multiplication tables entirely.", "C) It uses calculus to find products.", "D) It only works for numbers ending in zero."],
        correct: 0,
        explanation: "By separating lines into tens and units, the intersections naturally group into 100s, 10s, and 1s zones, mimicking the algebraic distribution (10a + b)(10c + d)."
      }
    ]
  },
  {
    id: 3,
    title: "Vedic Base 100 Trick",
    subject: "Quantitative Aptitude",
    category: "quant",
    xp: 100,
    coachDialogue: "Listen closely aspirant, this is an SBI PO topper tip! When you see numbers close to 100 like 98 × 97, do not start multiplying them the standard way. That is a crime in my classroom! We will use the Vedic base method. It is pure magic, student!",
    tipCard: "For numbers near 100, write their deviations from 100 (e.g. -2 and -3). Cross-subtract deviation of one from the other to get the first 2 digits, and multiply the deviations for the last 2 digits.",
    visualSteps: [
      "1. Take 98 and 97. Their deviations from 100 are -2 and -3.",
      "2. Cross-subtract: 98 - 3 = 95 (or 97 - 2 = 95). This is your first half (95).",
      "3. Multiply deviations: (-2) × (-3) = 06. (Always write as a 2-digit number!). This is your second half (06).",
      "4. Combine both halves: 9506. Done in 3 seconds flat!"
    ],
    quiz: [
      {
        question: "Multiply 96 × 95 using the Vedic Base 100 shortcut. What is the result?",
        options: ["A) 9120", "B) 9020", "C) 9220", "D) 8920"],
        correct: 0,
        explanation: "Deviations are -4 and -5. Cross-subtract: 96 - 5 = 91 (or 95 - 4 = 91). Multiply deviations: (-4) × (-5) = 20. Combining them, we get 9120."
      },
      {
        question: "What is the product of 99 × 98 using this deviation method?",
        options: ["A) 9702", "B) 9802", "C) 9701", "D) 9602"],
        correct: 0,
        explanation: "Deviations are -1 and -2. Cross-subtract: 99 - 2 = 97. Multiply deviations: (-1) × (-2) = 02 (write as 02, not 2). Combining gives 9702."
      },
      {
        question: "Calculate 97 × 94 using the base-100 shortcut. What is the value?",
        options: ["A) 9118", "B) 9018", "C) 9128", "D) 9218"],
        correct: 0,
        explanation: "Deviations are -3 and -6. Cross-subtract: 97 - 6 = 91. Multiply deviations: (-3) × (-6) = 18. Combine to get 9118."
      }
    ]
  },
  {
    id: 4,
    title: "Perfect Square Root Sizing",
    subject: "Quantitative Aptitude",
    category: "quant",
    xp: 100,
    coachDialogue: "Student, standard long-division for square roots is for kids. You are going to be a Bank Officer! If the question paper has a perfect square like 7921, you should size it up and target it in 5 seconds. Let me show you how to read it like an open book.",
    tipCard: "Step 1: Check unit digit to find 2 options for root's unit digit. Step 2: Delete last 2 digits, find nearest lower square for tens digit. Step 3: Compare number with midpoint (base 5) to pick correct option.",
    visualSteps: [
      "1. Let's find the square root of 7921. It ends in 1, so the root must end in 1 or 9.",
      "2. Strike off the last two digits (21). We are left with 79. The largest square below 79 is 64 (8²), so the tens digit is 8.",
      "3. The root is either 81 or 89. Compare 7921 with the midpoint 85² = 7225.",
      "4. Since 7921 is greater than 7225, choose the larger number: 89!"
    ],
    quiz: [
      {
        question: "Find the square root of 5776 using the sizing hack.",
        options: ["A) 76", "B) 74", "C) 84", "D) 66"],
        correct: 0,
        explanation: "Ends in 6, so root ends in 4 or 6. Remaining number after deleting 76 is 57. Largest square below 57 is 49 (7²). So tens is 7. Midpoint 75² = 5625. Since 5776 > 5625, root is 76."
      },
      {
        question: "What is the square root of 2209?",
        options: ["A) 47", "B) 43", "C) 53", "D) 37"],
        correct: 0,
        explanation: "Ends in 9, so root ends in 3 or 7. Remainder is 22. Largest square below 22 is 16 (4²), so tens is 4. Midpoint 45² = 2025. Since 2209 > 2025, choose the larger option: 47."
      },
      {
        question: "Find the square root of 1225 using unit digit logic.",
        options: ["A) 35", "B) 25", "C) 45", "D) 55"],
        correct: 0,
        explanation: "Ends in 5, so root ends in 5. Remaining number is 12. Largest square below 12 is 9 (3²). So tens is 3. Since there's only one option for units (5), the root is 35."
      }
    ]
  },
  {
    id: 5,
    title: "Quadratic Root Signs",
    subject: "Quantitative Aptitude",
    category: "quant",
    xp: 100,
    coachDialogue: "Aspirant, quadratic equations are the easiest 5 marks in Bank Prelims. But students waste time solving roots! What if I tell you that you can solve comparisons without writing a single root? Yes! Just check the sign matrix. This is a solid SBI PO topper tip!",
    tipCard: "If equation is ax² + bx + c = 0, sign of roots depends on signs of b and c. If b is (+, +), roots are (-, -). If (-, +), roots are (+, +). Most importantly: if both equations have a negative constant term (-c), the relationship is ALWAYS 'Cannot be established' (CND)!",
    visualSteps: [
      "1. Look at x² - 15x + 56 = 0. Signs are (- , +). Roots will be positive (+ , +).",
      "2. Look at y² - 17y + 72 = 0. Signs are (- , +). Roots will also be (+ , +).",
      "3. Look at z² + 5z - 6 = 0 and w² - 3w - 10 = 0. Both have negative constant terms (-6 and -10).",
      "4. Since both constant signs are negative, one root of each is positive and one is negative. Comparing them always yields CND!"
    ],
    quiz: [
      {
        question: "Given: I. x² - 14x + 48 = 0, II. y² + 9y + 20 = 0. Compare root values using the sign hack.",
        options: ["A) x > y", "B) x < y", "C) x = y or CND", "D) x <= y"],
        correct: 0,
        explanation: "For Eq I: b is -, c is + → roots are (+, +). For Eq II: b is +, c is + → roots are (-, -). Since positive roots are always greater than negative roots, x > y holds true without solving any values!"
      },
      {
        question: "Given: I. x² - 5x - 6 = 0, II. y² + 2y - 15 = 0. Determine the relationship between x and y.",
        options: ["A) Relation cannot be established (CND)", "B) x > y", "C) x < y", "D) x >= y"],
        correct: 0,
        explanation: "Both equations have negative constant terms (-6 and -15). The roots of both will be opposite in sign (+/-). When comparing one positive root with the other negative root, the relationship will flip. Thus, the relationship is always CND."
      },
      {
        question: "If a quadratic equation has signs (+ , +) for coefficients (b, c), what will be the signs of its roots?",
        options: ["A) Both roots negative (-, -)", "B) Both roots positive (+, +)", "C) One positive, one negative (+, -)", "D) Cannot determine root signs"],
        correct: 0,
        explanation: "Under quadratic root rules, when b is positive and c is positive, both root factors must be negative to sum to a negative value (-b/a) and multiply to a positive value (c/a). So root signs are both negative."
      }
    ]
  },
  {
    id: 6,
    title: "Syllogisms: Standard Relations",
    subject: "Logical Reasoning Ability",
    category: "reasoning",
    xp: 100,
    coachDialogue: "Welcome student! In logical reasoning, Syllogisms are highly scoring but require extreme clarity. Do not try to guess logic in your head. Draw Euler-Venn diagrams. Once your diagram is correct, no examiner in India can trap you, aspirant!",
    tipCard: "Represent 'All A are B' as A nested inside B. Represent 'Some A are B' as overlapping circles. Represent 'No A is B' as two separate circles with a cross-out line. Only mark conclusions that are 100% definitely true in all possible diagrams!",
    visualSteps: [
      "1. Look at statements: All squares are circles. Some circles are triangles.",
      "2. Draw a small circle for Squares inside a larger circle for Circles.",
      "3. Draw Triangles overlapping with Circles, but keep it clear of Squares initially.",
      "4. Evaluate: 'Some squares are triangles' is possible but not definite, so it is false. Only definite relations follow!"
    ],
    quiz: [
      {
        question: "Statements: All pens are pencils. No pencil is an eraser. \nConclusion I: No pen is an eraser. \nConclusion II: Some pencils are pens.",
        options: ["A) Both I and II follow", "B) Only I follows", "C) Only II follows", "D) Neither I nor II follows"],
        correct: 0,
        explanation: "Since all pens are inside pencils, and no pencil can touch erasers, pens also cannot touch erasers (I follows). Since pens are inside pencils, there is an overlap, meaning some pencils are pens (II follows)."
      },
      {
        question: "Statements: Some doctors are teachers. All teachers are actors. \nConclusion: Some doctors are actors. Is this valid?",
        options: ["A) Yes, it definitely follows", "B) No, it does not follow", "C) Only follows if doctors do not teach", "D) Either follows or does not follow (Either-Or)"],
        correct: 0,
        explanation: "Doctors overlap with teachers. Since all teachers are actors, the actor set wraps around the teacher set, capturing the overlapping doctor portion. Hence, some doctors are actors follows definitely."
      },
      {
        question: "In syllogisms, if a conclusion is only 'possible' but not 'definitely true in all cases', how should we treat it?",
        options: ["A) Treat it as logically false (does not follow)", "B) Treat it as definitely true", "C) Tick it if it sounds nice", "D) Mark it as 'either-or' immediately"],
        correct: 0,
        explanation: "A standard conclusion follows only if it is 100% certain under all possible diagrams. If there is even one valid diagram where it fails, the conclusion is invalid."
      }
    ]
  },
  {
    id: 7,
    title: "Syllogisms: \"Only a Few\"",
    subject: "Logical Reasoning Ability",
    category: "reasoning",
    xp: 100,
    coachDialogue: "Student, pay close attention! The 'Only a Few' statement is the favorite trap of IBPS. If you treat it like normal 'Some', you will fail the reasoning section. Let me give you the secret key to unlock this locked door!",
    tipCard: "'Only a few A are B' is a dual statement. It means: 1) Some A are B (positive overlap) AND 2) Some A are NOT B (negative restriction). Crucially, this means the entire set A can NEVER sit inside B!",
    visualSteps: [
      "1. Statement: Only a few circles are squares. This means some circles are squares.",
      "2. It also means some circles are definitely outside the squares circle.",
      "3. Mark a small shaded region in Circle with a 'cross' pointing to Square to show it can never go inside.",
      "4. Rule: 'Some circles are not squares' is definitely true. But 'All circles can be squares' is 100% false!"
    ],
    quiz: [
      {
        question: "Statement: Only a few keys are locks. \nConclusion I: All keys can be locks. \nConclusion II: All locks can be keys.",
        options: ["A) Only II follows", "B) Only I follows", "C) Both I and II follow", "D) Neither follows"],
        correct: 0,
        explanation: "'Only a few keys are locks' implies some keys are NOT locks. So keys can never fit entirely inside locks (I is false). However, there is no restriction on locks, so all locks can fit inside keys (II is true)."
      },
      {
        question: "Statement: Only a few red are blue. All blue are green. \nConclusion: Some red are not green. Does it follow?",
        options: ["A) No, it does not follow", "B) Yes, it follows definitely", "C) Only follows if green is red", "D) Cannot be determined"],
        correct: 0,
        explanation: "Only a few red are blue means some red are not blue. But blue is inside green. The red elements that are not blue could still be green (they are just kept out of blue). So 'some red are not green' is not definite."
      },
      {
        question: "What is the critical difference between 'Some A are B' and 'Only a few A are B'?",
        options: ["A) 'Only a few' includes a negative restriction ('Some A are not B'), making 'All A being B' impossible.", "B) 'Some' is negative and 'Only a few' is positive.", "C) They mean exactly the same thing.", "D) 'Only a few' means no A can overlap with B."],
        correct: 0,
        explanation: "'Only a few' contains both positive ('Some A are B') and negative ('Some A are not B') restrictions. 'Some' has no negative restriction, allowing the possibility of 'All A being B'."
      }
    ]
  },
  {
    id: 8,
    title: "Inequalities (Direct & Coded)",
    subject: "Logical Reasoning Ability",
    category: "reasoning",
    xp: 100,
    coachDialogue: "Aspirant, inequalities are like traffic signals. Open gates let you pass, closed gates stop you. Do not write anything on paper! Just follow the 'Open Gate' shortcut mentally. Let me teach you how to drive through the gates!",
    tipCard: "Think of '>' as a gate open from left to right (A > B means you can go A to B). Think of '<' as open right to left. To check if A > D, trace a continuous open path from A to D. If you hit a closed gate (like B < C), the relation fails immediately.",
    visualSteps: [
      "1. Look at expression: P > Q ≥ R = S > T.",
      "2. We want to check P > S. Go P → Q (open), Q → R (open), R → S (open). Path is clear!",
      "3. We also check Q > T. Go Q → R → S → T. Gate is open all the way. Valid!",
      "4. If expression was P > Q < R, and we check P > R, path blocks at Q < R. Failed!"
    ],
    quiz: [
      {
        question: "Given statement: A > B ≥ C = D < E. Which of the following is definitely true?",
        options: ["A) A > D", "B) A < C", "C) B < D", "D) C > E"],
        correct: 0,
        explanation: "To go from A to D: A → B (open), B → C (open), C = D (open). Since there is at least one strict inequality (>) along the path, A > D is definitely true."
      },
      {
        question: "Given statement: X ≥ Y > Z < W = V. Can we establish a relationship between Y and V?",
        options: ["A) No, because gates block at Z < W", "B) Yes, Y > V", "C) Yes, Y < V", "D) Yes, Y = V"],
        correct: 0,
        explanation: "Path from Y to V goes Y → Z (open) but blocks at Z < W (closed gate from left to right). Thus, no relationship can be established."
      },
      {
        question: "What condition is required to prove a strict inequality conclusion like A > B?",
        options: ["A) Path must be fully open from A to B, and at least one symbol along the path must be a strict '>'", "B) Every symbol along the path must be '≥'", "C) The path must contain at least one '<'", "D) Gates must be closed at both ends"],
        correct: 0,
        explanation: "To prove A > B, you must be able to travel A to B via open gates, and at least one gate must be strict (>) so that A cannot be equal to B."
      }
    ]
  },
  {
    id: 9,
    title: "Seating Arrangements",
    subject: "Logical Reasoning Ability",
    category: "reasoning",
    xp: 100,
    coachDialogue: "Student, seating arrangements are where students cry in exam halls. They get stuck in one case and panic. But you are my student! You will draw parallel cases. Two diagrams side-by-side. If case A fails, case B is ready. No tension, aspirant!",
    tipCard: "Always create two parallel diagrams (Case 1 & Case 2) simultaneously. Do not start with relative clues like 'A is next to B'. Start with direct, fixed clues like 'A sits third from the extreme left end'. This anchors your arrangement!",
    visualSteps: [
      "1. Scenario: 8 people facing north. Clue: P sits second from the right end.",
      "2. Draw 8 slots: _ _ _ _ _ _ P _. This is your anchor point.",
      "3. Next clue: Q sits third to the left of P. Count 3 slots left: _ _ _ Q _ _ P _.",
      "4. Draw Case 1 and Case 2 when relative clues have two possibilities. Strike out the invalid case at the end."
    ],
    quiz: [
      {
        question: "Five boys A, B, C, D, E sit in a row facing North. A sits in the middle. B sits at the extreme right end. C sits next to A on his left. Where does D sit if E sits to the immediate left of B?",
        options: ["A) Extreme left end", "B) Next to B", "C) Middle", "D) Second from left"],
        correct: 0,
        explanation: "Row has 5 slots: 1, 2, 3, 4, 5. Middle (3) is A. Extreme right (5) is B. C is next to A on left, so C is at slot 2. E sits to the immediate left of B, which means slot 4. The only remaining slot for D is slot 1 (extreme left end)."
      },
      {
        question: "In a circular table of 6 people facing the center, A is opposite B. C sits to the immediate right of A. Who sits to the immediate left of B if D is opposite C?",
        options: ["A) D", "B) C", "C) A", "D) E"],
        correct: 0,
        explanation: "6 slots circular. A at bottom (6 o'clock), B at top (12 o'clock). C is immediate right of A (4 o'clock). D is opposite C, so D is at 10 o'clock. Since B faces center, B's left is 10 o'clock. Hence, D sits to the immediate left of B."
      },
      {
        question: "Why should you start a puzzle with a 'fixed anchor' rather than a 'relative clue'?",
        options: ["A) Fixed anchors restrict possibilities, preventing multiple case branching early on.", "B) Relative clues are always wrong.", "C) Fixed anchors give higher marks.", "D) Circles do not support relative clues."],
        correct: 0,
        explanation: "Fixed anchors give a definite placement in the row or circle, which anchors all other relative clues and keeps the number of parallel cases to a minimum."
      }
    ]
  },
  {
    id: 10,
    title: "Subject-Verb Agreement",
    subject: "English Language Skills",
    category: "english",
    xp: 100,
    coachDialogue: "Welcome, aspirant! In English Language, grammar is not about reading sentences and saying 'it sounds wrong'. Sounds are deceptive, student! Banking exams love to hide the subject behind a wall of words. Let's learn how to spot the real subject!",
    tipCard: "Ignore 'bracket expressions' like 'along with', 'as well as', 'together with', or prepositional phrases. The verb must agree only with the main subject before these phrases. For 'neither... nor', the verb agrees with the nearest subject!",
    visualSteps: [
      "1. Look at sentence: The quality of these apples (is/are) not good. What is the subject?",
      "2. Strip away the prepositional phrase: 'of these apples'. Now read: The quality (is/are)...",
      "3. 'Quality' is singular, so it must be 'is'. Correct: The quality of these apples is not good.",
      "4. For 'Neither the teacher nor the students...', nearest subject to verb is 'students' (plural), so use plural verb."
    ],
    quiz: [
      {
        question: "Choose the grammatically correct option: 'The manager, along with his assistants, ______ attending the meeting.'",
        options: ["A) is", "B) are", "C) were", "D) have been"],
        correct: 0,
        explanation: "The phrase 'along with his assistants' is a parenthetical modifier. The main subject is 'The manager' (singular). Therefore, it takes the singular verb 'is'."
      },
      {
        question: "Identify the correct verb: 'Neither the keys nor the wallet ______ on the table.'",
        options: ["A) is", "B) are", "C) were", "D) seem"],
        correct: 0,
        explanation: "In 'neither... nor' constructions, the verb agrees with the nearest subject. 'wallet' is singular, so we use the singular verb 'is'."
      },
      {
        question: "Choose the correct sentence:",
        options: [
          "A) A pack of wolves was spotted in the forest.",
          "B) A pack of wolves were spotted in the forest.",
          "C) A pack of wolves are spotted in the forest.",
          "D) A pack of wolves have been spotted in the forest."
        ],
        correct: 0,
        explanation: "The subject is 'pack' (a singular collective noun). The prepositional phrase 'of wolves' is plural but does not change the subject. Hence, it takes the singular verb 'was'."
      }
    ]
  },
  {
    id: 11,
    title: "Error Spotting",
    subject: "English Language Skills",
    category: "english",
    xp: 100,
    coachDialogue: "Student, error spotting is where you lose marks because of careless reading. The examiner will hide a tiny tense error or preposition mismatch in a long sentence. I will give you a scanning checklist. Scan, spot, and score, aspirant!",
    tipCard: "Scan sentences in a strict order: 1) Subject-Verb Agreement, 2) Tense Consistency, 3) Parallelism (similar verb forms in lists), 4) Pronoun reference, 5) Redundancy (avoid double negatives/redundant words like 'return back').",
    visualSteps: [
      "1. Sentence: 'He returned back from Delhi yesterday.' Scan for redundancy.",
      "2. 'Returned' means went back. Adding 'back' is redundant. Correct: 'He returned from Delhi yesterday.'",
      "3. Check list elements: 'She likes reading, writing, and to swim.' 'To swim' breaks parallelism.",
      "4. Change 'to swim' to 'swimming' to match other '-ing' nouns. Correct!"
    ],
    quiz: [
      {
        question: "Find the error in the sentence: 'Although he worked hard (A) / but he could not (B) / secure passing marks (C) / in the exam. (D)'",
        options: ["A) Part B", "B) Part A", "C) Part C", "D) Part D"],
        correct: 0,
        explanation: "'Although' and 'but' are both contrast conjunctions. Using both in the same sentence is redundant. The correct structure is: 'Although he worked hard, he could not...' or 'He worked hard but he could not...'. Remove 'but' from Part B."
      },
      {
        question: "Which part of the sentence contains an error? 'If I was you (A) / I would not accept (B) / this project proposal (C) / at any cost. (D)'",
        options: ["A) Part A", "B) Part B", "C) Part C", "D) Part D"],
        correct: 0,
        explanation: "This is a subjunctive mood sentence expressing a hypothetical condition. In the subjunctive mood, 'were' is used for all subjects. So, 'If I was you' should be 'If I were you'."
      },
      {
        question: "Correct the parallel structure error: 'He enjoys hiking, playing tennis, and to collect stamps.'",
        options: [
          "A) He enjoys hiking, playing tennis, and collecting stamps.",
          "B) He enjoys hiking, to play tennis, and collecting stamps.",
          "C) He enjoys to hike, playing tennis, and to collect stamps.",
          "D) He enjoys hiking, playing tennis, and collect stamps."
        ],
        correct: 0,
        explanation: "To maintain parallelism, all items in the list must take the same form (gerunds ending in -ing). Hence, 'to collect' should be changed to 'collecting'."
      }
    ]
  },
  {
    id: 12,
    title: "RBI Rates & Policy",
    subject: "Banking Awareness & Current Affairs",
    category: "banking",
    xp: 100,
    coachDialogue: "Aha! We have reached the final level, aspirant. The crown jewel of banking exams. RBI Monetary Policy is where candidates get confused with Repo, Reverse Repo, MSF, and Bank Rate. Let me break down the central bank's control levers into simple terms!",
    tipCard: "Repo Rate is RBI's short-term lending rate to banks with collateral. MSF is overnight emergency borrowing rate (higher than Repo). Bank Rate is long-term lending without collateral. Raising these rates cools down inflation by squeezing liquidity.",
    visualSteps: [
      "1. Squeeze liquidity: Inflation is high, money is flowing too freely in the market.",
      "2. Action: RBI increases Repo Rate. Commercial banks now find borrowing from RBI expensive.",
      "3. Reaction: Banks increase interest rates on loans for customers. People borrow less, spending drops.",
      "4. Result: Market demand falls, cooling down price inflation. Policy transmission complete!"
    ],
    quiz: [
      {
        question: "What is the Marginal Standing Facility (MSF) rate in RBI policy?",
        options: [
          "A) An emergency overnight lending rate for banks to borrow funds by pledging SLR securities up to a limit.",
          "B) The rate at which RBI borrows from banks.",
          "C) Long-term lending rate without collateral.",
          "D) The interest rate paid on savings accounts."
        ],
        correct: 0,
        explanation: "MSF is a safety valve window for banks to borrow overnight funds from RBI in emergencies by dipping into their SLR quota (statutory liquidity ratio) up to a capped limit, at a premium rate above Repo."
      },
      {
        question: "If the RBI wants to inject liquidity (increase money flow) in the Indian banking system, what action should it take?",
        options: [
          "A) Lower the Repo Rate",
          "B) Increase the Cash Reserve Ratio (CRR)",
          "C) Increase the Repo Rate",
          "D) Sell government securities in the open market"
        ],
        correct: 0,
        explanation: "Lowering the Repo Rate makes borrowing cheaper for commercial banks, encouraging them to borrow more from RBI and lend more to the public, thereby injecting liquidity."
      },
      {
        question: "What is the primary difference between Repo Rate and Bank Rate?",
        options: [
          "A) Repo Rate requires pledging government securities as collateral, while Bank Rate is collateral-free.",
          "B) Repo Rate is for long-term lending, Bank Rate is short-term.",
          "C) Repo Rate is higher than Bank Rate.",
          "D) Repo Rate is set by commercial banks, Bank Rate by RBI."
        ],
        correct: 0,
        explanation: "Repo (Repurchase Option) Rate is a short-term collateralized lending rate. Bank Rate is a long-term lending rate that is collateral-free, often used to determine penal rates."
      }
    ]
  }
];

export const FASTEST_METHODS = {
  1: {
    traditional: "Standard 3-line long multiplication. Solve 23 × 47 by calculating 7 × 23, then 40 × 23, and sum them up on scratch paper.",
    speed: "25 seconds",
    vedic: "Up-Cross-Up vertical and crosswise: Multiply units digits (3×7 = 21, write 1 carry 2), cross-multiply and sum ((2×7) + (3×4) = 26 + carry 2 = 28, write 8 carry 2), multiply tens (2×4 = 8 + carry 2 = 10) -> 1081.",
    vedicSpeed: "5 seconds",
    approx: "Round off digits to nearest tens: Calculate 20 × 50 = 1000, then adjust for error boundaries based on unit options.",
    approxSpeed: "8 seconds",
    preferred: "B",
    preferredReason: "Vedic Up-Cross-Up computes the precise 4-digit result in a single mental line, bypassing written scratch steps."
  },
  2: {
    traditional: "Algebraic breakdown: Expand the multiplication as (10a + b)(10c + d) and calculate the place value weights manually.",
    speed: "20 seconds",
    vedic: "Japanese diagonal grid lines: Draw diagonal sticks representing digits, group intersecting node overlaps vertically into hundreds, tens, and units slices, and read the dot counts from left to right.",
    vedicSpeed: "10 seconds",
    approx: "Boundary sizing: Multiply the leading tens digits to establish the base 100s range, then estimate unit crossings.",
    approxSpeed: "12 seconds",
    preferred: "B",
    preferredReason: "Visual line grids bypass arithmetic multiplication tables entirely, turning complex math into dot counting."
  },
  3: {
    traditional: "Full mathematical multiplication or algebraic expansion: Multiply 98 × 97 as (100 - 2) × (100 - 3) = 10000 - 300 - 200 + 6.",
    speed: "18 seconds",
    vedic: "Vedic deviation trick: Deviations from 100 are -2 and -3. Cross-subtract: 98 - 3 = 95 (LHS digits). Multiply deviations straight down: (-2) × (-3) = 06 (RHS digits). Combined result = 9506.",
    vedicSpeed: "3 seconds",
    approx: "Estimate bounds: Both numbers are close to 100, so estimate slightly less than 100² (10,000) and scan option endpoints.",
    approxSpeed: "6 seconds",
    preferred: "B",
    preferredReason: "Topper Hack! Vedic base deviations require zero multiplication math, yielding the exact answer in under 3 seconds."
  },
  4: {
    traditional: "Prime factorization or standard long-division square root groups: Slicing the number into paired digit divisions.",
    speed: "35 seconds",
    vedic: "Vedic Unit & Tens Sizing: Strike off last 2 digits. Tens digit is the largest square below remaining digits (79 -> 8² = 64 -> 8). Unit digit is either 1 or 9. Compare square with midpoint 85² (7225) -> since 7921 > 7225, root is 89.",
    vedicSpeed: "5 seconds",
    approx: "Tens approximation: Check nearest major squares. Since 80² = 6400 and 90² = 8100, root lies between 80 and 90. End digit 1 narrows it to 81 or 89.",
    approxSpeed: "9 seconds",
    preferred: "B",
    preferredReason: "Vedic sizing guarantees 100% accuracy in 5 seconds without executing trial divisions."
  },
  5: {
    traditional: "Solve factors manually: Factor both quadratic equations using middle-term splitting, list root sets, and compare each individually.",
    speed: "45 seconds",
    vedic: "Sign Hack: Analyze coefficients. b is (-, +) -> roots are (+, +). b is (+, +) -> roots are (-, -). Thus x > y immediately. If constant terms of both equations are negative (-c), relationship is always CND.",
    vedicSpeed: "2 seconds",
    approx: "Root estimation: Approximate value bounds of variables on a number line.",
    approxSpeed: "10 seconds",
    preferred: "B",
    preferredReason: "The sign hack cracks the equation comparison in 2 seconds without calculating any actual root factors!"
  },
  6: {
    traditional: "Deductive verbal reasoning: Read statements back and forth, parsing logic chains in your head to check possible configurations.",
    speed: "22 seconds",
    vedic: "Standard Venn Diagram: Draw Euler circles representing 'All', 'Some', and 'No' relations. Only mark conclusions that hold true in all possible overlaps.",
    vedicSpeed: "8 seconds",
    approx: "Logic matrix lookup: Mapping statements to a truth table grid.",
    approxSpeed: "15 seconds",
    preferred: "B",
    preferredReason: "Venn circles turn complex verbal statements into physical spatial boundaries, preventing logical confusion."
  },
  7: {
    traditional: "Standard overlapping circles: Treat 'Only a few' as standard 'Some' logic overlaps without restrictions.",
    speed: "24 seconds",
    vedic: "Dual-Venn Diagramming: Draw overlaps for 'Some A are B' AND add a shaded directional restriction line indicating 'Some A are definitely NOT B'. This explicitly blocks A from entering B.",
    vedicSpeed: "10 seconds",
    approx: "Deductive logic parsing tables.",
    approxSpeed: "18 seconds",
    preferred: "B",
    preferredReason: "Dual-Venn diagrams visually highlight the negative restriction of 'Only a few', protecting against IBPS PO traps."
  },
  8: {
    traditional: "Chain drafting: Rewrite all parts of the inequality expression in a single linear chain on paper, then trace relationships.",
    speed: "28 seconds",
    vedic: "Open Gate Trick: Treat inequalities as traffic gates. > and >= are open left-to-right; < and <= are open right-to-left. Traverse from start variable to target. If any gate blocks, CND is immediate.",
    vedicSpeed: "3 seconds",
    approx: "Variable values substitution: Substitute numbers (e.g. A=10, B=8) to verify logic.",
    approxSpeed: "12 seconds",
    preferred: "B",
    preferredReason: "The Open Gate method allows solving complex coded inequalities mentally in under 3 seconds without scratch work."
  },
  9: {
    traditional: "Single draft case: Draw one single seating layout. Erase, scratch out, and restart whenever a relative clue conflicts.",
    speed: "180 seconds",
    vedic: "Parallel Case Grids: Draw two diagrams (Case 1 & Case 2) side-by-side simultaneously. Anchor the layout using fixed coordinates, then branch relative clues. Erase invalid case at the end.",
    vedicSpeed: "90 seconds",
    approx: "Trial placement loops: Random guess placements.",
    approxSpeed: "150 seconds",
    preferred: "B",
    preferredReason: "Parallel grids eliminate exam stress by ensuring that a secondary valid arrangement is always ready during branching."
  },
  10: {
    traditional: "Acoustic reading: Read the sentence aloud to hear if it sounds 'natural' or 'awkward'.",
    speed: "18 seconds",
    vedic: "Bracket Stripping: Mentally cross out all prepositional modifiers, collective clauses, and parenthetical phrases (e.g. 'along with', 'as well as'). Match the main subject to the verb.",
    vedicSpeed: "4 seconds",
    approx: "Translate the sentence structure to verify subject agreement rules.",
    approxSpeed: "12 seconds",
    preferred: "B",
    preferredReason: "Bracket stripping isolates the true subject from verbal noise, eliminating deceptions caused by collective noun traps."
  },
  11: {
    traditional: "Random proof-reading: Scan the entire sentence looking for generic grammatical errors or spelling slips.",
    speed: "25 seconds",
    vedic: "Scanning Checklist Order: Traverse the sentence in a strict priority chain: Subject-Verb -> Tenses -> Parallelism -> Pronouns -> Redundancy.",
    vedicSpeed: "6 seconds",
    approx: "Contextual flow reading.",
    approxSpeed: "15 seconds",
    preferred: "B",
    preferredReason: "Checking SVA and Tenses first catches 80% of banking exam errors in under 6 seconds."
  },
  12: {
    traditional: "Verbal rote memory: Recite dictionary explanations of rates and central bank policies.",
    speed: "40 seconds",
    vedic: "Flowchart Liquidity Lever: Map policy actions in an interactive flowchart (Raise Repo -> Banks Borrow Less -> Public Interest Rates Climb -> Inflation Cools).",
    vedicSpeed: "12 seconds",
    approx: "Eliminate choices based on absolute rate ranges.",
    approxSpeed: "20 seconds",
    preferred: "B",
    preferredReason: "Flowcharts link definitions to direct market outcomes, facilitating recall and exam deduction."
  }
};

