export const improveMessage = (errorMessage) => {
    const unnecessaryPart = 'Validation error: ';
    return errorMessage.includes(unnecessaryPart) ? errorMessage.replace('Validation error: ', '') : errorMessage
};