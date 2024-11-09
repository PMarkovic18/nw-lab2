import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-600">Napredni web labos 2</h1>
      </header>
      <section className="max-w-3xl p-8 bg-white rounded-lg shadow-lg text-gray-700">
        <p className="text-lg mb-6">
          Idite na neku od ranjivosti
        </p>
        <div className="flex space-x-4">
          {/* Button to SQL Injection Page */}
          <Link
            href="/sqlinjection"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
            Go to SQL Injection
          </Link>

          {/* Button to CSFR Page */}
          <Link
            href="/csfr"
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300">
            Go to CSFR
          </Link>
        </div>
      </section>
    </main>
  );
}
