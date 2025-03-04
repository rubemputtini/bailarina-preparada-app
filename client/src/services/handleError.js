export const handleError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || defaultMessage;
    const details = error.response?.data?.details || [];

    console.error(`Erro: ${errorMessage}`, details);

    const customError = new Error(errorMessage);
    customError.details = details;
    
    throw customError;
};