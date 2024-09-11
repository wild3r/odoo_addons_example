odoo.define('ap_online_admission.online_admission', function (require) {
    "use strict";
    console.log('El módulo ap_online_admission.online_admission se ha cargado');

    var publicWidget = require('web.public.widget');

    publicWidget.registry.OnlineAdmission = publicWidget.Widget.extend({
        selector: '.mb-3.col-6',  // Selecciona el contenedor del elemento select

        start: function () {
            this.$('select[name="register_id"]').on('change', this._onRegisterChange.bind(this));
            return this._super.apply(this, arguments);
        },

        _onRegisterChange: function (event) {
            console.log('El registro de admisión ha cambiado a: ' + event.target.value);
        },
    });

    return publicWidget.registry.OnlineAdmission;
});