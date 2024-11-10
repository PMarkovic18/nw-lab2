"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function CsfrPage() {
    const [amount, setAmount] = useState('');
    const [accountUser, setAccountUser] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleSend = async () => {
        const url = `/api/transferFunds?amount=${encodeURIComponent(amount)}&destinationAccount=${encodeURIComponent(accountUser)}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Error.');
            }
            fetchTableData()
        } catch (error) {
            alert(error);
        }
    };

    const fetchTableData = async () => {
        const url = `/api/getInfo?&destinationAccount=${encodeURIComponent(accountUser)}`;
        setTableData([]);
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="text-center mb-8">
                <h1 className="text-5xl font-bold text-red-600">Cross Site Request Forgery</h1>
            </header>
            <section className="w-1/2 p-8 bg-white rounded-lg shadow-lg text-gray-700 space-y-6">

                <div className="space-y-2">
                    <label htmlFor="amount" className="text-lg">Količina:</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Unesite količinu novca za prenjeti"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="accountUser" className="text-lg">Ciljani korisnik:</label>
                    <input
                        id="accountUser"
                        type="text"
                        value={accountUser}
                        onChange={(e) => setAccountUser(e.target.value)}
                        placeholder="Ciljani user (user1 primjer)"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="flex space-x-4 mt-6">
                    {/* Send Button */}
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                    >
                        Pošalji
                    </button>

                    {/* Go Back Home Button */}
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300"
                    >
                        Nazad na početnu
                    </Link>

                    {/* Maliciouse Button */}
                    <Link
                        href="/api/transferFunds?amount=10&destinationAccount=napadac"
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-pink-600 transition duration-300 animate-pulse"
                    >
                        FREE IPHONE
                    </Link>
                </div>
            </section>
            <section className="w-1/2 p-8 bg-white rounded-lg shadow-lg text-gray-700 space-y-6 mt-8">
                <button
                    onClick={fetchTableData}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
                >
                    Učitaj stanja računa
                </button>
                {tableData && tableData[0] && (<div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0]).map((column) => (
                                    <th key={column} className="border px-4 py-2 bg-gray-100">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex} className="border px-4 py-2">
                                            {value === null ? 'NULL' : value.toString()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
                <p className="text-lg">
                    Ulogirani ste kao Žrtva.Napadač pokušava ukrasti vaš auth token i napraviti request u vaše ime. U ovom primjeru prebaciti novac na svoj račun. Pritiskom na gumb FREE IPHONE šalje se request u vaše ime. Ovakav gumb je inače žrtva stisne na mailu ili nekoj drugoj stranici. Radi jednostavnosti sada je taj gumb tu. Ako je žrtva ulogirana u bankovnu aplikaciju kada stisne gumbe, napadač uspješno odrađuje napad. Ako se hovera preko gumba vidjet će se gdje gumb vodi. U prikazu inznad može se vidjeti stanje računa žrtve, napdača i ciljanog korisnika (ako ga ima)
                </p>
            </section>
        </main>
    );
}