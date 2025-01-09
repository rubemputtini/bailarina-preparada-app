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