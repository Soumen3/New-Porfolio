import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from '../assets/img/contact-img.svg'

function Contact() {
	const formInitialDetails = {
		firstName : '',
		lastName : '',
		email : '',
		phone : '',
		message : ''
	}

	const [formDetails, setFormDetails] = useState(formInitialDetails);
	const [buttonText, setButtonText] = useState('Send');
	const [status, setStatus] = useState('');

	const onFormUpdate = (catagory, value)=>{
		setFormDetails({
			...formDetails,
			[catagory]:value
		})
	}

	const handleSubmit = async (e) =>{
		e.preventDefault();
		setButtonText('Sending...');
		let response = await fetch('http/localhost:5173/contact',{
			method : "POST",
			header : {
				"Content-Type" : "application/json;charset=utf-8"
			},
			body : JSON.stringify(formDetails)
		});
		setButtonText('Send');
		let result = await response.json();
		setFormDetails(formInitialDetails);
		if (result.code === 200){
			setStatus({success:true, message:"Message sent successfully"})
		}else{
			setStatus({success:false, message:"Failed to send message"})
		}
	}

  	return (
		<section className="contact" id="connect">
			<Container>
				<Row>
					<Col md={6}>
						<img src={contactImg} alt="Contact Image" />
					</Col>
					<Col md={6}>
						<h2>Get In Touch</h2>
						<form  onSubmit={handleSubmit}>
							<Row>
								<Col sm={6} className="px-1">
									<input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e)=> onFormUpdate('firstName', e.target.value)} />
								</Col>
								<Col sm={6} className="px-1">
									<input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e)=> onFormUpdate('lastName', e.target.value)} />
								</Col>
								<Col sm={6} className="px-1">
									<input type="email" value={formDetails.email} placeholder="Email" onChange={(e)=> onFormUpdate('email', e.target.value)} />
								</Col>
								<Col sm={6} className="px-1">
									<input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e)=> onFormUpdate('phone', e.target.value)} />
								</Col>
								<Col>
									<textarea name="" id="" row="6" value={formDetails.message} placeholder="Type your message here..." onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
									<button type="submit"> <span>{buttonText}</span> </button>
								</Col>
								{
									status.message && 
									<Col>
										<p className={status.success===false ? 'danger' : 'success'}>{status.message}</p>
									</Col>
								}
							</Row>
						</form>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default Contact;
