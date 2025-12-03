import viber from '../../assets/img/Viber.png';
import telegram from '../../assets/img/Telegram.png';
import whatsapp from '../../assets/img/whatsapp.png';
import contactsBg from '../../assets/img/contactsBackground.png';

export const Contacts = () => {
  return (
    <section 
      id="contacts"
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative text-white"
      style={{
        backgroundImage: `linear-gradient(180deg, #191A19 0%, rgba(0, 0, 0, 0) 100%), url(${contactsBg})`
      }}
    >
      <div className="container mx-auto px-4 pb-20 lg:pb-48">
        
        <h2 className="text-[3rem] font-bold text-center lg:text-left pt-16 pb-10">
          Contatti
        </h2>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          
          <div className="bg-orange-500 rounded-xl p-8 lg:p-12 w-full lg:w-[40%] flex flex-col gap-6 shadow-xl h-fit">
            
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">Telefono:</h3>
              <p className="text-lg">+3094877263874</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">Posta:</h3>
              <p className="text-lg">пошта@пошта.ком</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold leading-tight">Orari di lavoro:</h3>
              <p className="text-lg">пн-пт: в будь який час</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">Reti sociali:</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:scale-110 transition-transform">
                  <img src={whatsapp} alt="WhatsApp" className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <img src={telegram} alt="Telegram" className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <img src={viber} alt="Viber" className="w-8 h-8" />
                </a>
              </div>
            </div>
          
          </div>

          <div className="w-full lg:w-auto flex-grow lg:max-w-[700px]">
             <iframe
                className="w-full h-[400px] lg:h-[500px] rounded-xl shadow-xl bg-gray-800"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0257160775265!2d14.7884273!3d40.9197778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bc32e136c7277%3A0x92e934e038c39a29!2sAvellino%2C%20Province%20of%20Avellino!5e0!3m2!1sen!2sit!4v1684926645888!5m2!1sen!2sit"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
             ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};