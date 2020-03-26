const db = require('_helpers/db');
const Template = db.Template;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Template.find();
}

async function getById(id) {
    return await Template.findById(id);
}

async function create(templateParam) {
    // validate
    if (await Template.findOne({ templatename: templateParam.templatename })) {
        throw 'Templatename "' + templateParam.templatename + '" is already taken';
    }

    const template = new Template(templateParam);

    // save template
    await template.save();
}

async function update(id, templateParam) {
    const template = await Template.findById(id);

    // validate
    if (!template) throw 'Template not found';
    if (template.templatename !== templateParam.templatename && await Template.findOne({ templatename: templateParam.templatename })) {
        throw 'Templatename "' + templateParam.templatename + '" is already taken';
    }

    // copy templateParam properties to template
    Object.assign(template, templateParam);

    await template.save();
}

async function _delete(id) {
    await Template.findByIdAndRemove(id);
}