export {
    toString,
    genString
};

/**
 * Переводит данные в строку
 */
function toString(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    if (value instanceof Date)
        return `Date(${value.toISOString()})`;

    if (value instanceof Map)
        return `Map(${JSON.stringify(Array.from(value.entries()))})`;

    if (value instanceof Set)
        return `Set(${JSON.stringify(Array.from(value))})`;

    if (Array.isArray(value))
        return `[${value.map(toString).join(', ')}]`;

    if (typeof value == 'string') return `"${value}"`;

    if (typeof value === 'object')
        return `{${Object.entries(value).map(([key, val]) =>
            `${key}:${toString(val)}`).join(',')}}`;

    return String(value);
};

/**
 * Генерирует случайную строку
 */
function genString(length?: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    if (!length) length = 1 + Math.floor(Math.random() * 9);

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };

    return result;
};