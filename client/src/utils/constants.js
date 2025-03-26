import {
  DirectionsRun, FitnessCenter, SelfImprovement, TheaterComedy, SportsGymnastics, ElectricBolt, AutoStories, Category
} from "@mui/icons-material";

import instagram from "../assets/instagram.svg";
import youtube from "../assets/youtube.svg";
import facebook from "../assets/facebook.svg"   
import telegram from "../assets/telegram.svg"   

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
  { name: "Alongamento", icon: <SelfImprovement fontSize="large" /> },
  { name: "Ballet", icon: <TheaterComedy fontSize="large" /> },
  { name: "Cardio", icon: <DirectionsRun fontSize="large" /> },
  { name: "Contemporâneo", icon: <SportsGymnastics fontSize="large" /> },
  { name: "Jazz", icon: <TheaterComedy fontSize="large" /> },
  { name: "Musculação", icon: <FitnessCenter fontSize="large" /> },
  { name: "PBT", icon: <AutoStories fontSize="large" /> },
  { name: "Potência", icon: <ElectricBolt fontSize="large" /> },
  { name: "Outros", icon: <Category fontSize="large" /> },
];

export const tasksColorsMap = {
  lightBlue: { tailwind: "bg-[var(--color-light-blue)] border-[var(--color-light-blue)]", hex: "#c5e1e9" },
  blue: { tailwind: "bg-[var(--color-blue)] border-[var(--color-blue)]", hex: "#9bb1ff" },
  darkPurple: { tailwind: "bg-[var(--color-dark-purple)] border-[var(--color-dark-purple)] text-white", hex: "#6a1b9a" },
  lightPurple: { tailwind: "bg-[var(--color-light-purple)] border-[var(--color-light-purple)]", hex: "#9575cd" },
  teal: { tailwind: "bg-[var(--color-teal)] border-[var(--color-teal)]", hex: "#80cbc4" },
  peach: { tailwind: "bg-[var(--color-peach)] border-[var(--color-peach)]", hex: "#ffab91" },
  softYellow: { tailwind: "bg-[var(--color-soft-yellow)] border-[var(--color-soft-yellow)]", hex: "#fff59d" },
  pink: { tailwind: "bg-[var(--color-pink)] border-[var(--color-pink)]", hex: "#f48fb1" },
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