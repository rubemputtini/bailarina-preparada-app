import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";
import facebook from "../../assets/facebook.svg";   
import telegram from "../../assets/telegram.svg";
import strength from "../../assets/strength.png";
import flex from "../../assets/flex.png";
import cardio from "../../assets/cardio.png";
import pbt from "../../assets/pbt.png";
import power from "../../assets/power.png";
import solo from "../../assets/solo.png";
import core from "../../assets/core.png";
import endehors from "../../assets/endehors.png";
import feet from "../../assets/feet.png";
import specific from "../../assets/specific.png";
import others from "../../assets/others.png";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5103";

export const socialMedia = [
    {
      id: "instagram",
      icon: instagram,
      link: "https://instagram.com/bailarinapreparada",
    },
    {
      id: "facebook",
      icon: facebook,
      link: "https://www.facebook.com/bailarinapreparada",
    },
    {
      id: "youtube",
      icon: youtube,
      link: "https://www.youtube.com/channel/UCmH9ztPknVvt0hkjJCfiChw?sub_confirmation=1",
    },
    {
      id: "telegram",
      icon: telegram,
      link: "https://t.me/+OIEsb8rayHg2YzI0",
    },
  ];

export const passwordRules = [
  { id: "length", text: "Pelo menos 6 caracteres" },
  { id: "uppercase", text: "Uma letra maiúscula" },
  { id: "lowercase", text: "Uma letra minúscula" },
  { id: "number", text: "Um número" },
  { id: "specialChar", text: "Um caractere especial" },
  ];

export const exerciseCategory = {
    FMS: "FMS",
    CapacidadesFisicas: "CapacidadesFisicas"
  };

export const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
];

export const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export const periods = [
    { label: "Manhã" },
    { label: "Tarde" },
    { label: "Noite" },
];

export const trainingCategories = [
  { name: "FORÇA", icon: <img src={strength} alt="Força" className="w-6 h-6" /> },
  { name: "FLEX", icon: <img src={flex} alt="Flex" className="w-6 h-6" /> },
  { name: "CARDIO", icon: <img src={cardio} alt="Cardio" className="w-6 h-6" /> },
  { name: "PBT", icon: <img src={pbt} alt="PBT" className="w-6 h-6" /> },
  { name: "POTÊNCIA", icon: <img src={power} alt="Potência" className="w-6 h-6" /> },
  { name: "SOLO", icon: <img src={solo} alt="Solo" className="w-6 h-6" /> },
  { name: "CORE", icon: <img src={core} alt="Core" className="w-6 h-6" /> },
  { name: "EN DEHORS", icon: <img src={endehors} alt="En Dehors" className="w-6 h-6" /> },
  { name: "PÉS", icon: <img src={feet} alt="Pés" className="w-6 h-6" /> },
  { name: "ESPECÍFICO", icon: <img src={specific} alt="Específico" className="w-6 h-6" /> },
  { name: "OUTROS", icon: <img src={others} alt="Outros" className="w-6 h-6" /> },
];

export const tasksColorsMap = {
  sky: {
    tailwind: "bg-[var(--color-sky)] border-[color:#7dd3fc]",
    hex: "#bae6fd", // FORÇA
  },
  rose: {
    tailwind: "bg-[var(--color-rose)] border-[color:#f472b6]",
    hex: "#fbcfe8", // FLEX
  },
  indigo: {
    tailwind: "bg-[var(--color-indigo)] border-[color:#818cf8]",
    hex: "#c7d2fe", // CARDIO
  },
  lavender: {
    tailwind: "bg-[var(--color-lavender)] border-[color:#d8b4fe]",
    hex: "#e9d5ff", // PBT
  },
  purple: {
    tailwind: "bg-[var(--color-purple)] border-[color:#a855f7]",
    hex: "#c084fc", // POTÊNCIA
  },
  emerald: {
    tailwind: "bg-[var(--color-emerald)] border-[color:#34d399]",
    hex: "#bbf7d0", // SOLO
  },
  peach: {
    tailwind: "bg-[var(--color-peach)] border-[color:#fb923c]",
    hex: "#fed7aa", // CORE
  },
  amber: {
    tailwind: "bg-[var(--color-amber)] border-[color:#fbbf24]",
    hex: "#fde68a", // EN DEHORS
  },
  teal: {
    tailwind: "bg-[var(--color-teal)] border-[color:#2dd4bf]",
    hex: "#99f6e4", // PÉS
  },
  violet: {
    tailwind: "bg-[var(--color-violet)] border-[color:#a78bfa]",
    hex: "#ddd6fe", // ESPECÍFICO
  },
  slate: {
    tailwind: "bg-[var(--color-slate)] border-[color:#cbd5e1]",
    hex: "#e2e8f0", // slots vazios
  },
};

export const getCategoryColor = (category) => {
  const categoryToColorKey = {
    "FORÇA": "sky",
    "FLEX": "rose",
    "CARDIO": "indigo",
    "PBT": "lavender",
    "POTÊNCIA": "purple",
    "SOLO": "emerald",
    "CORE": "peach",
    "EN DEHORS": "amber",
    "PÉS": "teal",
    "ESPECÍFICO": "violet",
  };

  const key = categoryToColorKey[category];
  return tasksColorsMap[key]?.hex || "#e4e4e4";
};

export const scheduleForm = "https://docs.google.com/forms/d/1Hh6xR_t3IvojICZ3Wy_26suKt8lLThkIkB4v7wgtIFA/viewform?edit_requested=true";

export const announcementColorsMap = {
  Aulas: {
      tailwind: "border-blue-500 bg-blue-100 text-blue-800",
      icon: "📘"
  },
  Feriados: {
      tailwind: "border-red-500 bg-red-100 text-red-800",
      icon: "🏖"
  },
  Eventos: {
      tailwind: "border-green-500 bg-green-100 text-green-800",
      icon: "📅"
  },
  Outros: {
      tailwind: "border-gray-400 bg-gray-100 text-gray-700",
      icon: "📢"
  }
};

export const announcementCategories = Object.keys(announcementColorsMap);