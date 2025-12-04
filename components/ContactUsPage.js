"use client"
import { useState } from 'react';
import '../style/contact.css';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for contacting us! We will get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-wrapper">
      <div className="container">
        <div className="contact-us-container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Have a question or feedback? We'd love to hear from you.</p>
          </div>

          <div className="row">
            {/* Contact Information */}
            <div className="col-lg-4 col-md-12">
              <div className="contact-info-box">
                <h3>Get In Touch</h3>
                <div className="contact-info-item">
                  <i className="bi bi-person-fill"></i>
                  <div>
                    <h5>Name</h5>
                    <p>K P Sasi Nair</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  <div>
                    <h5>Address</h5>
                    <p>Mumbai, India</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="bi bi-envelope-fill"></i>
                  <div>
                    <h5>Email</h5>
                    <p>info@mediaeyenews.com</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="bi bi-telephone-fill"></i>
                  <div>
                    <h5>Phone</h5>
                    <p><a href="tel:+919820029241">+91 9820029241</a></p>
                  </div>
                </div>
                <div className="social-links">
                  <h5>Follow Us</h5>
                  <div className="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8 col-md-12">
              <div className="contact-form-box">
                <h3>Send Us a Message</h3>

                {submitStatus && (
                  <div className={`alert alert-${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Name <span className="required">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject <span className="required">*</span></label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
