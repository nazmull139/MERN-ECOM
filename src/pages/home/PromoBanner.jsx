

const PromoBanner = () => {
  const promoItems = [
    {
      icon: "ri-truck-line",
      title: "Fast Delivery",
      description: "Enjoy fast shipping across the country.",
    },
    {
      icon: "ri-money-dollar-circle-line",
      title: "100% Money Back Guarantee",
      description: "Get a full refund if you're not satisfied with your purchase. (T&C apply)",
    },
    {
      icon: "ri-user-voice-fill",
      title: "24/7 Customer Support",
      description: "We’re here to help you anytime, anywhere.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {promoItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          <span className="text-4xl text-primary mb-3">
            <i className={item.icon}></i>
          </span>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default PromoBanner;
