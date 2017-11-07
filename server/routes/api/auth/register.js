var mysql = require('../../../models/mysql');
var crypto = require('crypto');

module.exports = (req, res) => {
  console.log('register called()');

  const company = req.body.company.toString();
  const email = req.body.email.toString();
  var password = req.body.password;

  var lead = {};
  var lead_update = {};
  var account = {};
  var account_update = {};
  var contact = {};
  var last_lead_id = null;
  var last_account_id = null;
  var last_contact_id = null;

  mysql.query('SELECT * FROM contacts_copy WHERE lower(contact_email) = ?', email,
    function(err, rows) {
      if (err) {
        console.log(err);
        throw err;
      }

      // domain is already exist
      if (rows.length > 0) {
        res.send("email is already exist. try another one.");
        return
      }

      // Password encrypt
      crypto.randomBytes(64, function (err, buf) { //randomBtyes로 salt를 생성 -> buf로 바꿈
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', function (err, key) {

          const encrypted_password = key.toString('base64');
          const password_salt = buf.toString('base64');
          console.log('password encrypted')

          lead = {
            company: company,
            email: email,
            lead_source: 'website',
            lead_status: 'Open - Not Contacted',
            lead_type: 'Supplier',
            languages: 'Korean',
            mailing_country: '대한민국',
            mailing_country_english: 'Republic of Korea'
          };

          // Create lead ( Open - not contacted )
          mysql.query(
            "INSERT INTO leads_copy SET ?", lead,
            function(err, lead_result){
              if(err){
                console.log(err);
                throw err;
              }
              console.log('lead create success');

              last_lead_id = lead_result.insertId;
              account = {
                account_name: company,
                account_type: 'Supplier',
                membership_type: 'Standard',
                mailing_country: '대한민국',
                mailing_country_english: 'Republic of Korea',
                billing_country: 'Republic of Korea'
              };

              // Create account without domain value
              mysql.query(
                "INSERT INTO accounts_copy SET ?", account,
                function(err, account_result){
                  if(err){
                    console.log(err);
                    throw err;
                  }
                  console.log('account create success');

                  last_account_id = account_result.insertId;
                  contact = {
                    account_id: last_account_id,
                    contact_email: email,
                    password: encrypted_password,
                    password_salt: password_salt,
                    lead_source: 'Supplier',
                    contact_level: '1',
                    management_level: '1'
                  };

                  // Create contact
                  mysql.query(
                    "INSERT INTO contacts_copy SET ?", contact,
                    function(err, contact_result) {
                      if(err){
                        console.log(err);
                        throw err;
                      }
                      console.log('contact created success');

                      last_contact_id = contact_result.insertId;
                      lead_update = {
                        account_id: last_account_id,
                        lead_status: 'Closed - Converted',
                        converted_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
                      };

                      // Receive account_id and convert lead (update status and date)
                      mysql.query(
                        "UPDATE leads_copy SET ? WHERE lead_id = " + last_lead_id, lead_update,
                        function(err, result) {
                          if(err){
                            console.log(err);
                            throw err;
                          }
                          console.log('lead Converted success');
                        });

                      account_update = {
                        domain: 56789 + last_account_id
                      };
                      // Update domain
                      mysql.query(
                        "UPDATE accounts_copy a SET ? WHERE account_id = " + last_account_id, account_update,
                        function(err, result) {
                          if(err){
                            console.log(err);
                            throw err;
                          }
                          console.log('domain changed');
                          console.log('Sign up success');
                          res.status(200).json({msg: 'success'})
                        });
                    });

                });
            });
        });
      });
    });
};
