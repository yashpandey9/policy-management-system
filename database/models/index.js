// Registry that loads/initializes all models
const fs = require('fs');
const path = require('path');

function defineModel(sequelize, DataTypes){
    const models = {};
    const modelFiles = fs
    .readdirSync(__dirname)
    .filter((file) => !['index.js', 'db_generator.js'].includes(file) && file.endsWith('.js'));

    for (const file of modelFiles){
        const modelDef = require(path.join(__dirname, file));
        const model = modelDef(sequelize, DataTypes);
        models[model.name] = model;
    }

    for(const model of Object.values(models)){
        if(model.associate && typeof model.associate === 'function'){
            model.associate(models)
        }
    }

    return models;
}


module.exports = defineModel;