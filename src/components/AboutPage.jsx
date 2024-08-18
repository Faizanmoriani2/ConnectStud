import React from 'react';
import '../styles/AboutPage.css'; // Ensure to style the section according to your design needs.
import Navbar from './Navbar';

export const AboutPage = () => {
    return (
        <>        
        <Navbar />
        <div className="about-section">
            <h2>Reasons to ConnectStud</h2>
            <div className="card-container">
                <div className="card">
                    <div className='card-tag'>#one</div>
                    <div className="card-header">Reliability</div>
                    <div className="card-content">
                        At ConnectStud, we connect students with qualified tutors who are dedicated to helping them achieve their academic goals. Our platform ensures that every connection made is secure and dependable, so students and tutors can focus on growth and success.
                    </div>
                </div>

                <div className="card">
                    <div className='card-tag'>#two</div>
                    <div className="card-header">Transparency</div>
                    <div className="card-content">
                        We prioritize transparency by offering clear communication channels, fair pricing, and detailed tutor profiles. Students can make informed decisions when selecting a tutor, ensuring a seamless learning experience from start to finish.
                    </div>
                </div>

                <div className="card">
                    <div className='card-tag'>#three</div>
                    <div className="card-header">Simplicity</div>
                    <div className="card-content">
                        ConnectStud makes the process of finding and booking a tutor as simple as possible. With an intuitive interface, easy search functionality, and efficient booking and payment systems, we make it easy for students to connect and learn.
                    </div>
                </div>
            </div>
        </div>
        </>

    );
};

// export default AboutPage;
