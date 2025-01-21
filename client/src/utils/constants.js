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