import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import styles from "../../styles/ContactPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
function ContactPage() {
 
    const [errors, setErrors] = useState({});  
  const [contactUsData, setContactUsData] = useState({
    contact_name: "",
    contact_email: "",
    contact_topic: "",
    contact_message: "",
  });
  const { contact_name, contact_email, contact_topic, contact_message, } = contactUsData;
 
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const contactFormData = new FormData();
    contactFormData.append("contact_name", contact_name);
    contactFormData.append("contact_email", contact_email);
    contactFormData.append("contact_topic", contact_topic);
    contactFormData.append("contact_message", contact_message);
    try {
      await axiosReq.post("/contact/", contactFormData);
      history.goBack();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  const handleChange = (event) => {
    setContactUsData({
      ...contactUsData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Contact Us</h1>
          <p className={`${styles.ContactInfo} mt-4 mb-4`}>Feel free to contact us if you got any questions through the form below!</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label className="d-none">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="contact_name"
                className={styles.Input}
                value={contact_name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.contact_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            
            <Form.Group controlId="email">
              <Form.Label className="d-none">Email adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="contact_email"
                className={styles.Input}
                value={contact_email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.contact_email?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="subject">
              <Form.Label className="d-none">Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="contact_topic"
                className={styles.Input}
                value={contact_topic}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.contact_topic?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="message">
              <Form.Label className="d-none">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Message"
                name="contact_message"
                className={styles.Input}
                value={contact_message}
                onChange={handleChange}
        
              />
            </Form.Group>
            {errors.contact_message?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="Send message"
            >
              Send message
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://res.cloudinary.com/dfjqihdnk/image/upload/v1727457880/contact_us_pvzsmm.webp"}
        />
      </Col>
    </Row>
  );
}
export default ContactPage;