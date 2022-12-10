import React from 'react';
import treatment from '../../../assets/images/treatment.png'

const Exceptional = () => {
    return (
        <div className='exceptional items-center flex flex-col lg:flex-row mt-40 justify-between mx-56;
        '>
            <img src={treatment} alt="" className='lg:h-[576px] rounded-lg mb-4'/>
            <div className='lg:w-[497px] h-[347px] flex items-center'>
                <div>
                <h1 className='text-4xl font-bold mb-7'>Exceptional Dental <br /> Care, on Your Terms</h1>
                <p className=''>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary mt-7'>GET STARTED</button>
                </div>
            </div>
        </div>
    );
};

export default Exceptional;