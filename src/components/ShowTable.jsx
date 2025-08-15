import { useEffect, useState } from "react";

export function ShowTable({ ExpenseData }) {
    const [type, setType] = useState("All");
    const [dateFilter, setDateFilter] = useState("desc");
    const [ammountFilter, setAmmountFilter] = useState("0");
    const [filteredData, setFilteredData] = useState(ExpenseData);
    const [searchHistory, setSearchHistory] = useState("");

    useEffect(() => {
        let temp_data = [...ExpenseData];

        if (type !== "All") {
            temp_data = temp_data.filter(item => item.type === type);
        }
        if (dateFilter === "desc") temp_data = temp_data.reverse();

        switch (ammountFilter) {
            case "0": break;
            case "1": temp_data = temp_data.filter(item => item.ammount <= 1000); break;
            case "2": temp_data = temp_data.filter(item => item.ammount <= 5000); break;
            case "3": temp_data = temp_data.filter(item => item.ammount <= 10000); break;
            case "4": temp_data = temp_data.filter(item => item.ammount > 10000); break;
        }
        if (searchHistory.length > 0) {
            temp_data = temp_data.filter(item => item.desc.toLowerCase().includes(searchHistory.toLowerCase()) || item.date.includes(searchHistory.toLowerCase()));
        }
        setFilteredData(temp_data);

    }, [type, dateFilter, ExpenseData, ammountFilter, searchHistory]);

    function resetfilters() {
        setType("All");
        setDateFilter("asc");
        setAmmountFilter("0");
    }
    function clearHistory() {
        setSearchHistory("");
    }

    return (
        <div className="max-w-full md:max-w-screen-xl mx-auto px-4 text-sm md:text-base lg:text-lg">
            <h2 className="text-center font-bold text-xl md:text-2xl my-5">Table History</h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center my-4 gap-2 md:gap-4 lg:gap-6 relative">
                <div>
                    <span className="font-medium text-sm md:text-lg lg:text-xl">Perform Operations: </span>
                    <button className="py-1 px-2 text-sm md:text-lg lg:text-xl border border-red-300 rounded-lg" onClick={() => resetfilters()}>Reset filters</button>
                </div>
                <input type="text" placeholder="Search(desc or date)"
                    className="w-full sm:w-auto border-2 py-1 px-2 text-sm md:text-lg lg:text-xl border-neutral-400 block rounded-lg bg-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                    value={searchHistory} onChange={e => setSearchHistory(e.target.value)} />
                <button className="py-1 px-2 text-sm md:text-lg lg:text-xl border border-red-300 rounded-lg absolute bottom-0 right-0 mb-[1px] mr-[1 px] sm:relative" onClick={() => clearHistory()}>clear</button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-slate-100 table-auto text-center border-collapse">
                    <thead>
                        <tr className="bg-slate-200">
                            <td className="px-2 py-2 text-xs md:text-sm lg:text-base">
                                Type
                                <select name="typefilter" id="typefilter" value={type} onChange={(e) => setType(e.target.value)} className="ml-1 text-xs md:text-sm">
                                    <option value="All">(All)</option>
                                    <option value="Income">(Income)</option>
                                    <option value="Expense">(Expense)</option>
                                </select>
                            </td>
                            <td className="px-2 py-2 text-xs md:text-sm lg:text-base">Description</td>
                            <td className="px-2 py-2 text-xs md:text-sm lg:text-base">
                                Date
                                <select name="datefilter" id="datefilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="ml-1 text-xs md:text-sm">
                                    <option value="asc">(Assending)</option>
                                    <option value="desc">(Descending)</option>
                                </select>
                            </td>
                            <td className="px-2 py-2 text-xs md:text-sm lg:text-base">Ammount
                                <select value={ammountFilter} onChange={e => setAmmountFilter(e.target.value)} className="ml-1 text-xs md:text-sm">
                                    <option value="0">(All)</option>
                                    <option value="1">(0-1000)</option>
                                    <option value="2">(1001-5000)</option>
                                    <option value="3">(5001-10000)</option>
                                    <option value="4">(10001)</option>
                                </select>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map(items => (
                                <tr key={items.id} className="border-t border-slate-300">
                                    <td className="p-2 text-xs md:text-sm">{items.type}</td>
                                    <td className="p-2 text-xs md:text-sm">{items.desc}</td>
                                    <td className="p-2 text-xs md:text-sm">{items.date}</td>
                                    <td className="p-2 text-xs md:text-sm">{items.ammount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}