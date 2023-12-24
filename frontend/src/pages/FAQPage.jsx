import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import styles from '../styles/styles';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5}/>
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      // Close the tab if it's already open
      setActiveTab(null);
    } else {
      // Open the clicked tab
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
      {/* single faq */}
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(1)}
        >
          <span className='text-lg font-medium text-gray-900'>
          What is your return policy?
          </span>
          {activeTab === 1 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 1 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            If you're not satisfied with your purchase, we accept returns
                within 30 days of delivery. To initiate a return, please email
                us at support@myecommercestore.com with your order number and a
                brief explanation of why you're returning the item.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(2)}
        >
          <span className='text-lg font-medium text-gray-900'>
          How do I track my order?
          </span>
          {activeTab === 2 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 2 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            You can track your order by clicking the tracking link in your
                shipping confirmation email, or by logging into your account on
                our website and viewing the order details.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(3)}
        >
          <span className='text-lg font-medium text-gray-900'>
          How do I contact customer support?
          </span>
          {activeTab === 3 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 3 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            You can contact our customer support team by emailing us at
                support@myecommercestore.com, or by calling us at (555) 123-4567
                between the hours of 9am and 5pm EST, Monday through Friday.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(4)}
        >
          <span className='text-lg font-medium text-gray-900'>
          Can I change or cancel my order?
          </span>
          {activeTab === 4 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 4 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            Unfortunately, once an order has been placed, we are not able to
                make changes or cancellations. If you no longer want the items
                you've ordered, you can return them for a refund within 30 days
                of delivery.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(5)}
        >
          <span className='text-lg font-medium text-gray-900'>
          Do you offer international shipping?
          </span>
          {activeTab === 5 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 5 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            Currently, we only offer shipping within the United States.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(6)}
        >
          <span className='text-lg font-medium text-gray-900'>
            How do I track my order?
          </span>
          {activeTab === 6 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 6 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              neque facere eius, similique, sed unde at, corporis nemo minus non
              quo ipsa cumque eaque! Quae, ipsa autem. Illum, mollitia
              voluptatem.
            </p>
          </div>
        )}
      </div>
      <div className='border-b border-gray-200 pb-4'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => toggleTab(7)}
        >
          <span className='text-lg font-medium text-gray-900'>
          What payment methods do you accept?
          </span>
          {activeTab === 7 ? (
            <AiOutlineClose size={20} /> // Show close icon if the tab is open
          ) : (
            <IoIosArrowForward size={20} /> // Show expand icon if the tab is closed
          )}
        </button>
        {/* Render the answer if the tab is active */}
        {activeTab === 7 && (
          <div className='mt-4'>
            <p className='text-base text-gray-500'>
            We accept visa,mastercard,paypal payment method also we have
                cash on delivery system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
