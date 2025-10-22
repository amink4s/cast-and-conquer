export interface Question {
  question: string;
  answers: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    question: "Which protocol improvement in 2025 enabled Farcaster mini apps to run games, social utilities, and finance directly inside cast threads?",
    answers: ["Frames", "Smart Casts", "Mini App Engine", "CastKit"],
    correctIndex: 0,
  },
  {
    question: "What is the term for follower-only groups or specialized feeds in Farcaster, which became popular in 2025?",
    answers: ["Circles", "Channels", "Collectives", "Rooms"],
    correctIndex: 1,
  },
  {
    question: "Which function lets users send tips and small amounts of crypto instantly within a cast, using the Farcaster wallet?",
    answers: ["Lightning", "SuperTip", "Drop", "Tip"],
    correctIndex: 3,
  },
  {
    question: "Where is the next FarCon scheduled to take place?",
    answers: ["Rome", "Barcelona", "Buenos Aires", "Lisbon"],
    correctIndex: 0,
  },
  {
    question: "What's the maximum character count for a Farcaster cast in 2025?",
    answers: ["256", "500", "320", "280"],
    correctIndex: 1,
  },
  {
    question: "Which one is gmfarcaster sponsor?",
    answers: ["Clanker", "Zora", "Arbitrum", "Coinbase"],
    correctIndex: 0,
  },
  {
    question: "Which event in 2025 led to the largest single-day spike in channel sign-ups on Farcaster?",
    answers: ["$DEGEN token launch", "Rebranding to Farcaster", "Buoy mini app trending", "NYC Farcaster IRL meetup"],
    correctIndex: 1,
  },
  {
    question: "What's the name of the built-in crypto wallet provided to every Farcaster user?",
    answers: ["Platform Wallet", "CastWallet", "Universal Wallet", "Farcaster Wallet"],
    correctIndex: 3,
  },
  {
    question: "On which blockchain was the 'bribe' mini app launched?",
    answers: ["Arbitrum", "Ethereum mainnet", "Base", "Polygon"],
    correctIndex: 0,
  },
  {
    question: "In 2025, who wrote the viral cast that started the 'War on Aggregators' debate that trended for weeks on Farcaster?",
    answers: ["dwr.eth", "danielg", "vbuterin", "varma"],
    correctIndex: 3,
  },
];

// Get questions for today based on date
export function getTodayQuestions(): Question[] {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  
  // Simple shuffle based on date
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, 10);
}
