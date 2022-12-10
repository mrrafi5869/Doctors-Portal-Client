import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
const Contact = () => {
    return (
        <div className='p-5' style={{background: `url(${appointment})`}}>
            <div className='lg:w-[450px] mx-auto text-center'>
            <p className='text-green-400 font-bold'>Contact Us</p>
            <p className='text-3xl text-white mb-5'>Stay connected with us</p>
            <input type="text" placeholder="Your Email" className="input w-full input-bordered mb-3" />
            <input type="text" placeholder="Subject" className="input w-full input-bordered mb-3" />
            <textarea className="textarea textarea-bordered w-full h-[136px]" placeholder="Your message"></textarea>
            </div>
            <div className='text-center mt-7'>
            <PrimaryButton>Submit</PrimaryButton>
            </div>
        </div>
    );
};

export default Contact;