# -*- coding: utf-8 -*-
import base64
from odoo import http
from odoo.http import request


class ResPartner(http.Controller):

    @http.route("/create_res_partner", type="http", auth="user", website=True)
    def create_res_partner(self):
        """To pass certain default field values to the website registration form."""
        logged_in_user_id = request.uid
        country_ids = request.env["res.country"].sudo().search([])
        res_user_id = (
            request.env["res.users"].sudo().search([("id", "=", logged_in_user_id)])
        )
        vals = {
            "country_ids": country_ids,
            "user_id": res_user_id,
        }
        return request.render("res_partner_website_extend.create_res_partner", vals)

    @http.route(
        "/admission/submit", type="http", auth="user", methods=["POST"], website=True
    )
    def register_admission(self, **vals):
        """This will create a new record with the values in the back end."""
        logged_in_user_id = request.uid
        attachment_id = (
            request.env["ir.attachment"]
            .sudo()
            .create(
                {
                    "name": vals.get("attachment").filename,
                    "res_name": "Document",
                    "type": "binary",
                    "datas": base64.encodebytes((vals.get("attachment")).read()),
                }
            )
        )

        res_partner = (
            request.env["res.partner"]
            .sudo()
            .create(
                {
                    "name": vals.get("name"),
                    "country_id": vals.get("country_id"),
                    "date_of_birth": vals.get("date_of_birth"),
                    "attachment": attachment_id.datas,
                }
            )
        )
        if res_partner:
            vals = {
                "message": "Record created successfully",
                "name": res_partner.name,
            }
        return request.render("res_partner_website_extend.submit_admission", vals)
