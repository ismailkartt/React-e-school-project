import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import "./error.scss";

const Error404Page = () => {
  return (
    <Container className='error-page d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
          <Image src='/images/errors/401.webp' alt='Not Found'/>
        </Col>
      </Row>
      
    </Container>
  )
}

export default Error404Page;