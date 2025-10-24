import contactImg from '../assets/contact-animation.gif'



const Contact = () => {
  return (
    
    <section className='pt-28 pb-5'>
    <div className='container max-w-7xl mx-auto px-4 '>
        <h2 className='text-3xl text-center font-semibold pb-8'>Get in Touch</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-3'>
            <div>
                <img src={contactImg} alt='contact image' className='size-64'/>
                <h3 className='font-semibold text-2xl pb-4'>Contact Information</h3>
                <p className='pb-4'>Feel free to reach out to us through the form or the contact information below:</p>
                <p className='pb-4'><strong>Email:</strong>Info@gmail.com</p>
                <p className='pb-4'><strong>Phone:</strong>+8801705776033</p>
                <p className='pb-4'><strong>Adress:</strong>Hazaribag Dhaka , Bangladesh</p>

            </div>
            <div>
                <form className='bg-white shadow-md rounded-lg p-6'>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                        <input placeholder='Enter Your Name' type='text' name='name' id='name' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                        <input placeholder='Enter Your Email' type='email' name='email' id='email' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='number' className='block text-gray-700 text-sm font-bold mb-2'>Phone Number</label>
                        <input placeholder='Enter Your Number' type='text' name='number' id='number' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='message' className='block text-gray-700 text-sm font-bold mb-2'>Message</label>
                       <textarea rows="4"  placeholder='Enter Your Message' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                    </div>
                    <div>
                        <button className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-secondary text-black bg-red-600'>
                            Send Message
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</section>


  )
}

export default Contact