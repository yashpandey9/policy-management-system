const policy_acknowledgement = require("../database/models/policy_acknowledgement");
const policy_approval = require("../database/models/policy_approval");
const acknowledgement_request = require("./acknowledgement_request");

module.exports = {
    db_entities: {
        customer_company: 'customer_company',
        user_roles: 'user_roles',
        employee: 'employee',
        role_policy_mapping: 'role_policy_mapping',
        policy: 'policy',
        policy_template: 'policy_template',
        policy_approval: 'policy_approval',
        policy_acknowledgement: 'policy_acknowledgement',
        acknowledgement_request: 'acknowledgement_request',
    }
}