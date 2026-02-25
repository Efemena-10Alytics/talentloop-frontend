import { Suspense } from "react";

function ReviewsContent() {
  return (
    <div>
      <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-4">Reviews</h1>
      <p className="text-white/50 font-mona-sans">View your client reviews and ratings here.</p>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ReviewsContent />
    </Suspense>
  );
}
