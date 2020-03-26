const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    templateid: { type: Number, unique: true, required: true },
    templatename: { type: String, unique: true, required: true },
    sitemetas: { type: String, required: true },
    sitelinks: { type: String, required: true },
    sitescripts: { type: String, required: true },
    sitestyle: { type: String, required: true },
    siteheader: { type: String, required: true },
    sitefooter: { type: String, required: true },
    sitecodes: { type: Object, required: true },
    pages: [{
        route: { type: String, required: true },
        content: { type: String, required: true },
        title: { type: String, required: true },
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

module.exports = mongoose.model('Template', schema);