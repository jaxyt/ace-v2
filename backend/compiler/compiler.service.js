const db = require('_helpers/db');
const Site = db.Site;
const Template = db.Template;

module.exports = {
    getAll,
    getSiteByName,
    getSiteById,
    getTemplateBySite,
    search
};

async function getAll() {
    return await Site.find();
}

async function getSiteByName(sitename) {
    return await Site.findOne({ sitename: sitename });
}

async function getSiteById(siteid) {
    return await Site.findOne({ siteid: siteid });
}

async function getTemplateBySite(site) {
    return {site, template: await Template.findOne({ templateid: site.templateid })};
}


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].route === nameKey) {
            return myArray[i];
        }
    }
}




