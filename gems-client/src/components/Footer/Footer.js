import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { Row, Container } from "reactstrap";

const Footer = () => {
  return (
    <footer className='footer'>
      <Container className='footer-icons'>
        <Row>
          <h6>Адреса</h6>
          <div className='footer-icon-block'>
            <a className='footer-icon' href='https://goo.gl/maps/29U9n7vXEwYs6UFF6'><FontAwesomeIcon icon={faMapMarked} /></a>
            <div><b>Beren Gold</b>: ул. Усенбаева 106 (рядом с ЦУМом, с западной стороны фонтана Бишкек), 2 этаж
            </div>
          </div>
          <div className='footer-icon-block'>
            <a className='footer-icon' href='https://goo.gl/maps/fKxFnCBGbYcvoCLM6'><FontAwesomeIcon icon={faMapMarked} /></a>
            <div><b>Beta Stores</b>: пр. Чуй 150а (пер. ул. Исанова), 2 этаж
            </div>
          </div>
        </Row>
        <Row>
          <div className='footer-icon-block'>
            <a className='footer-icon' href='mailto: jamilk@mail.ru'><FontAwesomeIcon icon={faEnvelope} /></a>
            <div>jamilk@mail.ru</div>
          </div>
          <div className='footer-icon-block'>
            <a className='footer-icon' href='https://www.instagram.com/gemstown.kg/'><FontAwesomeIcon icon={faInstagramSquare} /></a>
            <div>www.instagram.com/gemstown.kg</div>
          </div>
          <div className='footer-icon-block'>
            <a className='footer-icon' href='https://wa.me/996555722819'><FontAwesomeIcon icon={faWhatsappSquare} /></a>
            <div>+996-555-722-819</div>
          </div>
          <div className='footer-icon-block'>
            <a className='footer-icon' href="tg://resolve?domain=alsaruiz"><FontAwesomeIcon icon={faTelegram} /></a>
            <div>@alsaruiz</div>
          </div>
          <div className='footer-icon-block'>
            <a className='footer-icon' href="tel:+996-555-722-819"><FontAwesomeIcon icon={faPhoneSquare} /></a>
            <div>+996-555-722-819</div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;