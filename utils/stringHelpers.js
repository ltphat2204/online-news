export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringHelpers = {
    capitalizeFirstLetter,
    limitCharacters: (string, limit) => {
        return string.length > limit ? `${string.slice(0, limit)}...` : string;
    }
}