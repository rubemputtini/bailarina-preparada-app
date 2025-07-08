export const getColorByCount = (count) => {
    if (!count) return "#3a3a3a"; // vazio
        if (count === 1) return "#6a1b9a"; // roxo escuro
        if (count === 2) return "#8e24aa"; // roxo médio
        if (count === 3) return "#ab47bc"; // roxo claro
        if (count === 4) return "#ce93d8"; // lilás suave
        
        return "#e1bee7"; // mais treinos ainda – bem claro
};