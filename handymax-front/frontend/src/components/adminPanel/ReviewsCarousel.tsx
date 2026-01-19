import { useRef } from "react";

import btnNext from "../../assets/img/carouselBtnNext.svg";
import btnPrev from "../../assets/img/carouselBtnPrev.svg";
import trash from "../../assets/img/trash.svg";

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatarUrl: string;
};

type Props = {
  reviews: Review[];
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  className?: string;
  isButtons?: boolean;
};

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`w-[18px] h-[18px] ${i < full ? 'fill-[#ffb400]' : 'fill-[#3a3a3a]'}`}>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export const ReviewsCarousel = ({ reviews, onDelete, onApprove, className = '', isButtons }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 370;
      
      current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!reviews.length) {
    return (
      <div className="w-full p-8 border border-dashed border-gray-300 rounded-2xl text-center text-gray-500 bg-white">
        No reviews yet
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col ${className}`}>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {reviews.map((r) => (
          <div key={r.id} className="min-w-[300px] lg:min-w-[350px] snap-center flex-shrink-0">
            
            <div className="relative bg-[#141414] text-white rounded-[18px] p-[20px_20px_22px] 
                            min-h-[170px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex flex-col justify-between h-full">
              
              {!isButtons && (
                <img 
                  onClick={() => onDelete?.(r.id)}
                  src={trash} 
                  alt="delete" 
                  className="absolute top-[18px] right-[18px] w-[32px] h-[32px] cursor-pointer hover:scale-110 transition-transform"
                />
              )}

              <div className="grid grid-cols-[56px_1fr] gap-[14px] items-center mb-[12px]">
                <div className="w-[56px] h-[56px] rounded-full grid place-items-center 
                                bg-[radial-gradient(circle_at_center,transparent_60%,#2c2c2c_61%)] 
                                shadow-[inset_0_0_0_3px_#ff7a00]">
                  <img src={r.avatarUrl} alt={r.name} className="w-[48px] h-[48px] rounded-full p-[2px] object-cover block" />
                </div>

                <div className="grid gap-[6px]">
                  <div className="font-semibold truncate pr-8">{r.name}</div>
                  <Stars value={r.rating} />
                </div>
              </div>

              <p className="mt-[6px] leading-[1.5] text-[#d1d5db] text-sm line-clamp-4">
                {r.text}
              </p>

              {isButtons && (
                <div className="flex gap-[10px] mt-[12px]">
                  <button 
                    onClick={() => onApprove?.(r.id)}
                    className="w-full h-[40px] bg-orange-500 rounded-[12px] text-sm font-bold hover:bg-orange-600 transition"
                  >
                    Publish
                  </button>
                  
                  <button 
                    onClick={() => onDelete?.(r.id)}
                    className="w-full h-[40px] bg-[#191A19] border border-gray-700 rounded-[12px] text-sm font-bold hover:bg-black transition"
                  >
                    Remove
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}
        
        <div className="min-w-[1px] h-full"></div>
      </div>

      <div className={`flex justify-center gap-[18px] mt-[10px] ${isButtons ? 'mt-[20px]' : ''}`}>
        <img 
          onClick={() => scroll('left')}
          src={btnPrev} 
          alt="prev" 
          className="w-[74px] h-[74px] cursor-pointer hover:opacity-80 transition active:scale-95"
        />
        <img 
          onClick={() => scroll('right')}
          src={btnNext} 
          alt="next" 
          className="w-[74px] h-[74px] cursor-pointer hover:opacity-80 transition active:scale-95"
        />
      </div>

    </div>
  );
};