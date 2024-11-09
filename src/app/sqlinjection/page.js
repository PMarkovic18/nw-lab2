"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function SqlInjectionPage() {
    const [vulnerabilityEnabled, setVulnerabilityEnabled] = useState(false);
    const [queryInput, setQueryInput] = useState('');
    const [executionResult, setExecutionResult] = useState('');

    const handleCheckboxChange = () => {
        setVulnerabilityEnabled(!vulnerabilityEnabled);
    };

    const handleInputChange = (e) => {
        setQueryInput(e.target.value);
    };

    const handleSubmit = async () => {
        setExecutionResult('');
        const tautologyPattern = /^[a-zA-Z0-9_-]+$/;

        if (queryInput == '') {
            alert('Prazan input!');
            return
        }

        if (vulnerabilityEnabled) {
            if (!tautologyPattern.test(queryInput)) {
                alert('SQL umetanje je uspješno izvršeno!');
            } else {
                alert('Upit izvršen ali bez umetanja.');
            }
        } else {
            if (!tautologyPattern.test(queryInput)) {
                alert('Pokušaj SQL umetanja je spriječen!');
                return;
            } else {
                alert('Upit izvršen.');
            }
        }

        try {
            const response = await fetch('/api/sqlinjection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sql: queryInput,
                    vulnerabilityEnabled,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Error.');
            }
            setExecutionResult(JSON.stringify(data.result, null, 2));
        } catch (error) {
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert('Nepoznati error.');
            }
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="text-center mb-8">
                <h1 className="text-5xl font-bold text-blue-600">SQL Injection</h1>
            </header>
            <section className="w-1/2 p-8 bg-white rounded-lg shadow-lg text-gray-700 space-y-6">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="vulnerability"
                        checked={vulnerabilityEnabled}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="vulnerability" className="text-lg">
                        Omogući ranjivost
                    </label>
                </div>

                <div className="space-y-2">
                    <label htmlFor="query" className="text-lg">Upiši parametar za query:</label>
                    <input
                        id="query"
                        type="text"
                        value={queryInput}
                        onChange={handleInputChange}
                        placeholder="Upiši parametar za query"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        {vulnerabilityEnabled
                            ? 'SQL injection ranjivost je omogućena. Parametar se može koristiti u nesigurnom upitu.'
                            : 'SQL injection ranjivost je onemogućena. Parametar je siguran.'}
                    </p>
                </div>
                {/* Submit and Go Back Buttons */}
                <div className="flex space-x-4 mt-6">
                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                    >
                        Submit
                    </button>

                    {/* Go Back to Home Button */}
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300">
                        Nazad na početnu
                    </Link>
                </div>
            </section>
        </main>
    );
}