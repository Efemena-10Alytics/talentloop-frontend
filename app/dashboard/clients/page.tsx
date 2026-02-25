import { Suspense } from "react";

function ClientsContent() {
  return (
    <div>
      <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-4">Clients</h1>
      <p className="text-white/50 font-mona-sans">View and manage your clients here.</p>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ClientsContent />
    </Suspense>
  );
}
