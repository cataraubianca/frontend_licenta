import React from 'react';
import styles from './footer.module.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className={`text-center text-white `} style={{ backgroundColor: '#303832', marginTop:"auto" }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <span className='me-3'>contact email: petconnectinformare@gmail.com</span>
          </p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#000e0a' }}>
        PetConnect @2023
      </div>
    </MDBFooter>
  );
}