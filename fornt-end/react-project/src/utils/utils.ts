export const camelCaseToKebabCase = (str: string): string => {
    return str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
};