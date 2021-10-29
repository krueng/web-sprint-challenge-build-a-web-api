module.exports = {
    isNotEmptyString: (input) => {
        return typeof input === 'string' && input.trim();
    }
};