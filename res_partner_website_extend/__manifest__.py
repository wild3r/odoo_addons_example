# -*- coding: utf-8 -*-
{
    "name": "Create Contact from Res Partner",
    "version": "16.0.1.0.0",
    "summary": """ website Summary """,
    "author": "",
    "website": "",
    "category": "",
    "depends": ["base", "web", "website", "contacts"],
    "data": [
        "data/res_partner_website_menu.xml",
        "views/res_partner_website.xml",
        "views/res_partner_views.xml"
    ],
    # "assets": {
    #     "web.assets_frontend": [
    #         "res_partner_website_extend/static/src/js/online_admission.js",
    #     ],
    # },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
