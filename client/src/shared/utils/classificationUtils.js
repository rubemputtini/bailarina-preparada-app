import { groupUnilateralExercises } from "./exerciseUtils";

export const normalizeClassification = (label) => {
    if (!label) return null;
  
    const formatted = label.trim().toLowerCase();
  
    const map = {
      "excelente": 5,
      "muito bom": 4,
      "bom": 3,
      "acima da média": 4,
      "bem acima da média": 5,
      "dentro da média": 3,
      "média": 3,
      "médio": 3,
      "razoável": 2,
      "abaixo da média": 2,
      "bem abaixo da média": 1,
      "necessita melhorias": 1,
      "fraco": 1,
    };
  
    return map[formatted] || null;
  };

export const classificationStyles = {
    "excelente": "text-white bg-green-700",
    "bem acima da média": "text-green-900 bg-green-200",
    "muito bom": "text-green-800 bg-green-100",
    "acima da média": "text-green-600 bg-green-100",
    "bom": "text-yellow-700 bg-yellow-200",
    "dentro da média": "text-yellow-800 bg-yellow-100",
    "média": "text-yellow-800 bg-yellow-100",
    "médio": "text-yellow-800 bg-yellow-100",
    "razoável": "text-yellow-800 bg-yellow-100",
    "abaixo da média": "text-red-700 bg-red-200",
    "bem abaixo da média": "text-white bg-red-700",
    "necessita melhorias": "text-white bg-red-700",
    "fraco": "text-white bg-red-700",
  };

export const calculateAvgClassification = (exercises, referenceMap) => {
    const groupedItems = groupUnilateralExercises(exercises, referenceMap);

    const values = groupedItems.flatMap((ex) => {
        if (!ex.unilateral) {
            const normalized = normalizeClassification(ex.ref?.classification);
            return normalized ? [normalized] : [];
        }
        const sides = [];

        if (ex.sides?.L?.ref) sides.push(normalizeClassification(ex.sides.L.ref.classification));
        if (ex.sides?.R?.ref) sides.push(normalizeClassification(ex.sides.R.ref.classification));
        
        return sides.filter((v) => v !== null);
    });

    if (values.length === 0) return "Não disponível";
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    if (avg >= 4.5) return "EXCELENTE";
    if (avg >= 3.5) return "MUITO BOA";
    if (avg >= 2.5) return "BOA";
    if (avg >= 1.5) return "RAZOÁVEL";
    return "ABAIXO DO ESPERADO";
};
  