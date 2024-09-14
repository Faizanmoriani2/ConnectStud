import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AboutPage.css'; 
import Navbar from './Navbar';

export const AboutPage = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>        
        <Navbar />
        <div className="about-section">
            <h2 className='gradient-text'>Why Choose ConnectStud?</h2>
            <div className="card-container">
                <div className="card" data-aos="fade-up">
                    <div className='card-tag'>#one</div>
                    <div className="card-header gradient-text">Reliability</div>
                    <div className="card-content">
                        At ConnectStud, we connect students with qualified tutors who are dedicated to helping them achieve their academic goals. Our platform ensures that every connection made is secure and dependable, so students and tutors can focus on growth and success.
                    </div>
                </div>

                <div className="card" data-aos="fade-up" data-aos-delay="200">
                    <div className='card-tag'>#two</div>
                    <div className="card-header gradient-text">Transparency</div>
                    <div className="card-content">
                        We prioritize transparency by offering clear communication channels, fair pricing, and detailed tutor profiles. Students can make informed decisions when selecting a tutor, ensuring a seamless learning experience from start to finish.
                    </div>
                </div>

                <div className="card" data-aos="fade-up" data-aos-delay="400">
                    <div className='card-tag'>#three</div>
                    <div className="card-header gradient-text">Simplicity</div>
                    <div className="card-content">
                        ConnectStud makes the process of finding and booking a tutor as simple as possible. With an intuitive interface, easy search functionality, and efficient booking and payment systems, we make it easy for students to connect and learn.
                    </div>
                </div>
            </div>

            <div className="additional-content" data-aos="fade-up" data-aos-delay="600">
                <h3 className='gradient-text'>More About Us</h3>
                <p>
                    ConnectStud is more than just a tutoring platform. We're a community of learners and educators who are passionate about education and making a difference in students' lives. Our mission is to provide an inclusive, supportive environment where every student can thrive.
                </p>
            </div>

            <div className="testimonial-section" data-aos="fade-up" data-aos-delay="800">
                <h3 className='gradient-text'>What Our Users Say</h3>
                <div className="testimonial">
                    <p>
                        "ConnectStud has been a game changer for me. The tutors are highly knowledgeable and really care about helping you understand the material. I went from struggling to excelling in my courses thanks to their support." - <strong>Jane Doe, Student</strong>
                    </p>
                </div>
                <div className="testimonial" data-aos="fade-up" data-aos-delay="1000">
                    <p>
                        "As a tutor, ConnectStud has provided me with a platform to share my knowledge and make a real impact on students' academic journeys. It's a rewarding experience to see my students succeed." - <strong>John Smith, Tutor</strong>
                    </p>
                </div>
            </div>

        </div>
        </>
    );
};
