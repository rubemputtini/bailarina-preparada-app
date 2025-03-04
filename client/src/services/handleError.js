export const handleError = (error, defaultMessage) => {
    let errorMessage = defaultMessage;
    
    if (error.response) {
        errorMessage = error.response.data?.message || defaultMessage;
    } else if (error.message) {
        errorMessage = error.message;
    }

    const customError = new Error(errorMessage);
    customError.details = error.response?.data?.details || [];

    throw customError;
};
