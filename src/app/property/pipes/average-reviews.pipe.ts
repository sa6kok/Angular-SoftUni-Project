import { Pipe, PipeTransform } from '@angular/core';
import { IReview } from '../../shared/interfaces/review';

const NO_REVIEWS = 'No Reviews';

@Pipe({
  name: 'averageReviews'
})
export class AverageReviewsPipe implements PipeTransform {

  transform(reviews: IReview[]): string {
    if (reviews === null || reviews === undefined || reviews?.length === 0 ) {
      return NO_REVIEWS;
    }
    const avg = reviews.map(r => r.level).reduce((a, b) => a + b, 0) / reviews.length;
    return avg.toFixed(2);
  }

}
