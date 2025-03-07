import { Rating } from 'react-simple-star-rating';

import './reviews.scss';

import { Review } from '../../types/types';
import { formatDate, getInitials } from '../../utils/helper';

function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div id="reviews">
      <h3>Ratings & Reviews</h3>
      <div className="reviews__container">
        {reviews.map((review) => {
          return (
            <div className="review">
              <div className="user">
                <div className="avatar">{getInitials(review.reviewerName)}</div>
                <p>
                  {review.reviewerName}{' '}
                  <span className="email">({review.reviewerEmail})</span>
                </p>
              </div>
              <Rating initialValue={review.rating} readonly />
              <p className="reviewed">
                Reviewed on {formatDate(new Date(review.date))}
              </p>
              <p className="comment">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
