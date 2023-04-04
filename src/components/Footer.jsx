import sendEmail from "../../SendEmail"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Footer() {
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // add user input to formData obj
        const formData = {
            emailType: "intro",
            userName: e.target.userName.value,
            userEmail: e.target.userEmail.value,
            message: e.target.message.value
        }
        // run SendEmail(formData) to send email
        const message = sendEmail(formData)
        return message;
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <h3>Contact Us</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="userEmail" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="userName" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" as="textarea" style={{ height: '100px' }} placeholder="Message" name="message" required/>
                </Form.Group>

                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}