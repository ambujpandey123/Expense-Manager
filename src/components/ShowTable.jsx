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
        <>
            <h2 className="text-center font-bold text-2xl my-5">Table History</h2>
            <div className="flex justify-center items-center my-4 px-[5vw] gap-2 p-2">
                <span className="font-medium text-lg">Perform Operations: </span>
                <button className="py-1 px-2 text-lg border border-red-300 rounded-lg" onClick={() => resetfilters()}>Reset filters</button>
                <input type="text" placeholder="Search(desc or date)"
                    className="border-2 border-neutral-400 block rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                    value={searchHistory} onChange={e => setSearchHistory(e.target.value)} />
                <button className="py-1 px-2 text-lg border border-red-300 rounded-lg" onClick={() => clearHistory()}>clear</button>
            </div>
            <table className="max-w-screen-xl bg-slate-100 md:mx-auto lg:min-w-[70vw] w-[90vw] mx-auto text-center">
                <thead>
                    <tr>
                        <td>
                            Type
                            <select name="typefilter" id="typefilter" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="All">(All)</option>
                                <option value="Income">(Income)</option>
                                <option value="Expense">(Expense)</option>
                            </select>
                        </td>
                        <td>Description</td>
                        <td>
                            Date
                            <select name="datefilter" id="datefilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                                <option value="asc">(Assending)</option>
                                <option value="desc">(Descending)</option>
                            </select>
                        </td>
                        <td>Ammount
                            <select value={ammountFilter} onChange={e => setAmmountFilter(e.target.value)}>
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
                            <tr key={items.id}>
                                <td>{items.type}</td>
                                <td>{items.desc}</td>
                                <td>{items.date}</td>
                                <td>{items.ammount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    );
}