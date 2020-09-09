const contactusRepo = require('contact/repositories/contact.repository');
const settingsRepo = require('setting/repositories/setting.repository');
const mailer = require('../../helpers/mailer.js');

class contactusController {
	constructor() { }


	async getcontactStatic(req, res) {
		try {
			var searchQuery = {
				"isDeleted": false,
				"status": "Active"
			};
			var contact = await contactusRepo.contactstaticGetByField(searchQuery);
			return { status: 200, data: contact, message: 'Record fetched Successfully' };
		} catch (error) {
			return { "status": 500, data: {}, "message": error.message }
		}
	};


	async contactusformSave(req, res) {
		try {
			let save = await contactusRepo.save(req.body);

			let locals = {
				name: save.name,
				//phone: save.phone_number,
				//email: save.email_id,
				//message: save.message
			};

			const setting_data = await settingsRepo.getAllByField({ "isDeleted": false });
			var settingObj = {};
			if (!_.isEmpty(setting_data)) {
				setting_data.forEach(function (element) {
					settingObj[element.setting_name.replace(/\s+/g, "_")] = element.setting_value;
				});
			}

			if (save) {
				if (!_.isEmpty(save)) {
					let isUserMailSend = await mailer.sendMail(process.env.MAIL_USERNAME, save.email_id, 'Contact Form Submitted', 'contact-us-user', locals);

					let isMailSend = await mailer.sendMail(process.env.MAIL_USERNAME, settingObj.Support, 'Contact Form Submitted', 'contact-us', locals);

					return { status: 200, data: save, message: "Contact Us form submitted successfully." };
				}
			}
			else {
				return { status: 201, data: [], message: "There are some problem at this moment." };
			}
		}
		catch (error) {
			return { status: 500, data: [], message: error.message };
		}
	}



}

module.exports = new contactusController();