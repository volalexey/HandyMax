import { ReviewsCarousel } from "../../components/adminPanel/ReviewsCarousel";
import type { Review } from "../../components/adminPanel/ReviewsCarousel";
import reviewImg from "../../assets/img/review1.png";

export const ReviewsAdminPage = () => {
  const data: Review[] = [
    {
      id: '1',
      name: 'Lorem Ipsum',
      rating: 5,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatarUrl: reviewImg,
    },
    {
      id: '2',
      name: 'Mario Rossi',
      rating: 4,
      text: "Ottimo servizio, molto veloce e professionale.",
      avatarUrl: reviewImg,
    },
    {
      id: '3',
      name: 'Luigi Verdi',
      rating: 3,
      text: "Tutto bene ma il prezzo è un po' alto.",
      avatarUrl: reviewImg,
    },
    {
      id: '4',
      name: 'Anna Bianchi',
      rating: 5,
      text: "Perfetto!",
      avatarUrl: reviewImg,
    },
    {
      id: '3',
      name: 'Luigi Verdi',
      rating: 3,
      text: "Tutto bene ma il prezzo è un po' alto.",
      avatarUrl: reviewImg,
    },
    {
      id: '4',
      name: 'Anna Bianchi',
      rating: 5,
      text: "Perfetto!",
      avatarUrl: reviewImg,
    },
    
    
  ];

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] overflow-hidden
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_0px_80px_60px]">
      
      <h1 className="text-[2.25rem] font-extrabold text-black ml-[20px] lg:ml-0">
        Reviews
      </h1>

      <div className="flex flex-col gap-[20px]">
        <h3 className="text-[1rem] font-bold uppercase ml-[20px] lg:ml-0">
          Published reviews
        </h3>
        <ReviewsCarousel 
          reviews={data} 
          onDelete={(id) => console.log('delete', id)} 
        />
      </div>

      <div className="flex flex-col gap-[20px] mt-10">
        <h3 className="text-[1rem] font-bold uppercase ml-[20px] lg:ml-0">
          Awaiting confirmation
        </h3>
        <ReviewsCarousel 
          isButtons={true}
          reviews={data} 
          onDelete={(id) => console.log('delete', id)} 
        />
      </div>

    </div>
  );
};