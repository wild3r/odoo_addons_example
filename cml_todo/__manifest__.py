# -*- coding: utf-8 -*-
{
    'name': 'Cml_todo',
    'version': '1.0',
    'summary': """ Cml_todo Summary """,
    'author': 'CML',
    'website': '',
    'category': '',
    'depends': ['base'],
    "data": [
        "views/owl_todo_list_views.xml",
        "security/ir.model.access.csv"
    ],
    'assets': {
        'web.assets_backend': [
            'cml_todo/static/src/**/*',
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
