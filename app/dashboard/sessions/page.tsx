import { Suspense } from "react";

function SessionsContent() {
  return (
    <div>
      <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-4">Sessions</h1>
      <p className="text-white/50 font-mona-sans">Manage your coaching sessions here.</p>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <SessionsContent />
    </Suspense>
  );
}
