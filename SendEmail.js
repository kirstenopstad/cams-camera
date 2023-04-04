import emailjs from '@emailjs/browser'

// these populate email templates, edit with caution
const COMPANY = "Cam's Camera"
const CC_LIST = "kirsten.opstad@gmail.com, builtbyko@gmail.com"

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
  } else if (emailType === "quote") {
    // TODO: build message for quote
    templateParams = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhoneNumber: formData.userPhoneNumber,
      message: formData.userPhoneNumber,
      companyName: COMPANY,
      ccList: CC_LIST
    };
    // use intro template (sent to client, cc'd to ccList)
    templateId = process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID;
  }
  let resultObject;

  emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, templateId, templateParams, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  .then((result) => {
      // return success message
      if (result.status === 200) {
        resultObject = result;
        return result
      }
    }, (error) => {
      // return error message
      resultObject = error;
       return error
  });

  return resultObject
};

export default sendEmail;