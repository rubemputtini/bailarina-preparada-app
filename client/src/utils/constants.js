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

  export const errorMessages = {
    "Passwords must be at least 6 characters.": "A senha deve ter pelo menos 6 caracteres.",
    "Passwords must have at least one non alphanumeric character.": "A senha deve conter pelo menos um caractere não alfanumérico.",
    "Passwords must have at least one digit ('0'-'9').": "A senha deve conter pelo menos um dígito.",
    "Passwords must have at least one lowercase ('a'-'z').": "A senha deve conter pelo menos uma letra minúscula.",
    "Passwords must have at least one uppercase ('A'-'Z').": "A senha deve conter pelo menos uma letra maiúscula."
};

export const exerciseCategory = {
    FMS: "FMS",
    CapacidadesFisicas: "CapacidadesFisicas"
  };