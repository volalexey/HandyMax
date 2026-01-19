import { ReviewsCarousel } from "../../components/adminPanel/ReviewsCarousel";
import { 
  useGetAllReviewsQuery, 
  useApproveReviewMutation, 
  useDeleteReviewMutation 
} from "../../store/api/reviewsApi";

import type { Review } from "../../store/api/reviewsApi"; 

import defaultAvatar from "../../assets/img/review1.png"; 

export const ReviewsAdminPage = () => {
  const { data, isLoading } = useGetAllReviewsQuery();
  
  const [approveReview] = useApproveReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const mapReviewToUI = (r: Review) => ({
    id: String(r.id),
    name: r.user.name,
    rating: r.rating,
    text: r.text,

    avatarUrl: r.user.avatarUrl || defaultAvatar, 
  });

  const publishedReviews = data
    ?.filter((r) => r.isApproved)
    .map(mapReviewToUI) || [];

  const pendingReviews = data
    ?.filter((r) => !r.isApproved)
    .map(mapReviewToUI) || [];

  const handleDelete = async (id: string) => {
    if(window.confirm('Delete review?')) {
      await deleteReview(Number(id));
    }
  }

  const handleApprove = async (id: string) => {
    await approveReview(Number(id));
  }

  if (isLoading) return <div className="p-10">Loading reviews...</div>;

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] overflow-hidden rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_0px_80px_60px]">
      
      <h1 className="text-[2.25rem] font-extrabold text-black ml-[20px] lg:ml-0">
        Reviews
      </h1>

      <div className="flex flex-col gap-[20px]">
        <h3 className="text-[1rem] font-bold uppercase ml-[20px] lg:ml-0">
          Published reviews ({publishedReviews.length})
        </h3>
        
        {publishedReviews.length > 0 ? (
          <ReviewsCarousel 
            reviews={publishedReviews} 
            onDelete={handleDelete} 
          />
        ) : (
          <p className="text-gray-400 ml-[20px]">No published reviews yet.</p>
        )}
      </div>

      <div className="flex flex-col gap-[20px] mt-10">
        <h3 className="text-[1rem] font-bold uppercase ml-[20px] lg:ml-0 text-orange-500">
          Awaiting confirmation ({pendingReviews.length})
        </h3>
        
        {pendingReviews.length > 0 ? (
          <ReviewsCarousel 
            isButtons={true}
            reviews={pendingReviews} 
            onDelete={handleDelete} 
            onApprove={handleApprove}
          />
        ) : (
          <p className="text-gray-400 ml-[20px]">No pending reviews.</p>
        )}
      </div>

    </div>
  );
};