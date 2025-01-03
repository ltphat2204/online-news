export const numberHelpers = {
    getNext: (number) => {
        return number + 1;
    },
    getPrevious: (number) => {
        return number > 1 ? number - 1 : 1;
    },
    range: (start, end) => {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    },
    eq: (a, b) => {
        return a === b;
    },
    gt: (a, b) => {
        return a > b;
    },
    lt: (a, b) => {
        return a < b;
    },
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    or: (a, b) => {
        return a || b;
    },
    and: (a, b) => {
        return a && b;
    },
    getNextPageIndex: (page, index, limit) => {
        return (page - 1) * limit + index + 1;
    },
    generateOTP: (length) => {
        const characters = '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return otp;
    }
}