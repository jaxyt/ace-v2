
const express = require('express');
const router = express.Router();
const compilerService = require('./compiler.service');

// routes
router.get('/', getAll);
router.get('/api', getSiteById);


module.exports = router;



function getAll(req, res, next) {
    compilerService.getAll()
        .then(sites => res.json(sites))
        .catch(err => next(err));
}


function getSiteById(req, res, next) {
    compilerService.getSiteById(req.query.id)
        .then((site) => {
            if (site) {
                compilerService.getTemplateBySite(site)
                    .then((info) => {
                        if (info) {
                            const pageroute = req.query.route
                            const { template, site } = info;
                            const tpage = compilerService.search(pageroute, template.pages);
                            const spage = compilerService.search(pageroute, site.pages) ? compilerService.search(pageroute, site.pages) : null;
                            if (!tpage) {
                                res.sendStatus(404)
                            }
                            let compiled = `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                            `;
                            compiled += site.sitemetas ? `\t${site.sitemetas}` : `\t${template.sitemetas}`;
                            compiled += spage.pagemetas ? `\t\t${spage.pagemetas}` : `\t${tpage.pagemetas ? tpage.pagemetas : ""}`;
            
                            compiled += site.sitelinks ? `\t${site.sitelinks}` : `\t${template.sitelinks}`;
                            compiled += spage.pagelinks ? `\t${spage.pagelinks}` : `\t${tpage.pagelinks ? tpage.pagelinks : ""}`;
            
                            compiled += spage.title ? `\t${spage.title}` : `\t${tpage.title}`;
            
                            compiled += `\t<style>\n`;
                            compiled += site.sitestyle ? `\t\t${site.sitestyle}` : `\t\t${template.sitestyle}`;
                            compiled += spage.pagestyle ? `\t\t${spage.pagestyle}` : `\t\t${tpage.pagestyle ? tpage.pagestyle : ""}`;
                            compiled += `\t</style>\n`;
                            compiled += `
                            </head>
                            <body>
                            <div class="grid">`;
                            switch ({template, site, tpage, spage}) {
                                case spage.pageheader:
                                    compiled += `\t${spage.pageheader}`;
                                    break;
                                case site.siteheader:
                                    compiled += `\t${site.siteheader}`;
                                    break;
                                case tpage.pageheader:
                                    compiled += `\t${tpage.pageheader}`;
                                    break;
                                case template.siteheader:
                                    compiled += `\t${template.siteheader}`;
                                    break;
                            
                                default:
                                    break;
                            }
            
                            compiled += spage.content ? `\t\t${spage.content}` : `\t\t${tpage.content}`;
            
                            switch ({template, site, tpage, spage}) {
                                case spage.pagefooter:
                                    compiled += `\t${spage.pagefooter}`;
                                    break;
                                case site.sitefooter:
                                    compiled += `\t${site.sitefooter}`;
                                    break;
                                case tpage.pagefooter:
                                    compiled += `\t${tpage.pagefooter}`;
                                    break;
                                case template.sitefooter:
                                    compiled += `\t${template.sitefooter}`;
                                    break;
                            
                                default:
                                    break;
                            }
                            compiled += `</div>\n`
            
                            compiled += site.sitescripts ? `\t${site.sitescripts}` : `\t${template.sitescripts}`;
                            compiled += `
                            </body>
                            </html>
                            `;
                            if (site.sitecodes) {
                                for (const key in site.sitecodes) {
                                    if (site.sitecodes.hasOwnProperty(key)) {
                                        const code = site.sitecodes[key];
                                        if (code) {
                                            let re = new RegExp(`XX${key}XX`, 'g');
                                            compiled = compiled.replace(re, code);
                                        } 
                                    }
                                }
                            }
                            if (template.sitecodes) {
                                for (const key in template.sitecodes) {
                                    if (template.sitecodes.hasOwnProperty(key)) {
                                        const code = template.sitecodes[key];
                                        let re = new RegExp(`XX${key}XX`, 'g');
                                        compiled = compiled.replace(re, code);
                                    }
                                }
                            }
                            res.send(`${compiled}`);
                        } else {
                            res.sendStatus(404)
                        }
                    })
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => next(err));
}
