import emailjs from '@emailjs/browser'

// these populate email templates, edit with caution
const COMPANY = "Cam's Camera"
const CC_LIST = "kirsten.opstad@gmail.com, mauro.rosales247@gmail.com, robbryandev@gmail.com "
const SUBJECT = "Your quote from Cam's Camera"

// takes formData as input and returns success or error message
const sendEmail = (formData) => {
  // NOTE: ensure formData.emailType is included
  let templateParams = {};
  let templateId = null;
  // if intro email, send to 
  if (formData.emailType === "intro") {
    templateParams = {
      // parameters match existing template -> if changed, emailJS template must be changed
      user_name: formData.userName,
      user_email: formData.userEmail,
      message: formData.message
    };
    // use intro template (sent to company)
    templateId = process.env.NEXT_PUBLIC_EMAILJS_INTRO_TEMPLATE_ID;
  } else if (formData.emailType === "quote") {
    // TODO: build message for quote
    templateParams = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhoneNumber: formData.userPhoneNumber,
      message: formData.message,
      companyName: COMPANY,
      ccList: CC_LIST,
      subject: SUBJECT
    };
    // use intro template (sent to client, cc'd to ccList)
    templateId = process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID;
  }

  return emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, templateId, templateParams, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  .then((result) => {
      // return success message
      if (result.status === 200) {
        return result
      }
    }, (error) => {
      // return error message
       return error
  });

};

export default sendEmail;