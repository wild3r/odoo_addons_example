odoo.define('res_partner_website_extend.res_partner', function (require) {
    "use strict";
    console.log('El módulo res_partner_website_extend.res_partner se ha cargado');

    var publicWidget = require('web.public.widget');

    publicWidget.registry.OnlineAdmission = publicWidget.Widget.extend({
        selector: '.mb-3.col-6',  // Selecciona el contenedor del elemento select

        start: function () {
            this._super.apply(this, arguments);
            this.$('select[name="country_id"]').on('change', this._onCountryChange.bind(this));
            this.$('select.select2').select2();
        },

        _onCountryChange: function (event) {
            console.log('El país seleccionado ha cambiado a: ' + event.target.value);
            // Puedes agregar aquí cualquier otra lógica que necesites al cambiar el país
        },
    });

    return publicWidget.registry.OnlineAdmission;
});
