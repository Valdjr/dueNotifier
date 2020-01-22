module.exports = {
    uri:
        'mongodb://' +
        process.env.DB_USER +
        ':' +
        process.env.DB_PASS +
        '@' +
        process.env.DB_HOST,
}
