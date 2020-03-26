const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * site codes
        owner: { type: String, default: "" },
        phone: { type: String, default: "" },
        email: { type: String, default: "" },
        service: { type: String, default: "" },
    
    pages
    
 */


const schema = new Schema({
    siteid: { type: Number, unique: true, required: true },
    sitename: { type: String, unique: true, required: true },
    templateid: { type: Number, required: true },
    sitemetas: { type: String, default: "" },
    sitelinks: { type: String, default: "" },
    sitescripts: { type: String, default: "" },
    sitestyle: { type: String, default: "" },
    siteheader: { type: String, default: "" },
    sitefooter: { type: String, default: "" },
    sitecodes: { type: Object, default: {}},
    pages: [{
        route: { type: String, default: "" },
        content: { type: String, default: "" },
        title: { type: String, default: "" },
        pagemetas: { type: String, default: "" },
        pagelinks: { type: String, default: "" },
        pagescripts: { type: String, default: "" },
        pagestyle: { type: String, default: "" },
        pageheader: { type: String, default: "" },
        pagefooter: { type: String, default: "" },
    }],
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Site', schema);