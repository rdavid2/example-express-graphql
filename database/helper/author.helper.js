'use strict';

var authorDao = require('../dao/author.dao');

var authorHelper = {};

authorHelper.addAuthor = async function (nombre, genreId) {
    return await authorDao.insert(nombre, genreId);
};

authorHelper.getAll = async function (genreId) {
    return await authorDao.getAll(genreId);
};

authorHelper.getById = async function (genreId) {
    return await authorDao.getById(genreId);
};


module.exports = authorHelper;
