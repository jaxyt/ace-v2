const db = require('_helpers/db');
const Site = db.Site;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Site.find();
}

async function getById(id) {
    return await Site.findById(id);
}

async function create(siteParam) {
    // validate
    if (await Site.findOne({ sitename: siteParam.sitename })) {
        throw 'Sitename "' + siteParam.sitename + '" is already taken';
    }

    const site = new Site(siteParam);

    // save site
    await site.save();
}

async function update(id, siteParam) {
    const site = await Site.findById(id);

    // validate
    if (!site) throw 'Site not found';
    if (site.sitename !== siteParam.sitename && await Site.findOne({ sitename: siteParam.sitename })) {
        throw 'Sitename "' + siteParam.sitename + '" is already taken';
    }

    // copy siteParam properties to site
    Object.assign(site, siteParam);

    await site.save();
}

async function _delete(id) {
    await Site.findByIdAndRemove(id);
}