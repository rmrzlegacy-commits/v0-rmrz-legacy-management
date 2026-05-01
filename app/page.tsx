export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-amber-500 mb-4">
        RMRZ Legacy Management
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        If you can see this, the base setup is working.
      </p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Test Card</h2>
        <p className="text-gray-400">This is a test card to verify rendering.</p>
      </div>
    </main>
  )
}
