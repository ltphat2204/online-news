export const compareHelpers = {
    eq: (a, b) => a === b,
    ne: (a, b) => a !== b,
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    gte: (a, b) => a >= b,
    lte: (a, b) => a <= b,
    and: (a, b) => a && b,
    or: (a, b) => a || b,
    not: (a) => !a
};