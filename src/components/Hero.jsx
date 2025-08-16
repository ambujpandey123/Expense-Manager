import { useEffect, useState } from "react";
import { allExpenses, finduser, Savedata } from "../utils/indexDB";
import { ShowTable } from "./ShowTable";
import { useNavigate } from "react-router-dom";
import {
    AnimateFromDown,
    AnimateFromLeft,
    AnimateFromRight,
    AnimateFromTop,
    AnimateScale,
    AnimateScaleButton
}
    from "./motion/animation";

export function Hero() {
    const [userData, setUser] = useState([]);
    const [type, setType] = useState();
    const [desc, setDesc] = useState("");
    const [ammount, setAmmount] = useState();
    const [inputError, setInputError] = useState(false);
    const [ExpenseData, setExpenseData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalSaving, setTotalSaving] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        async function loaduser() {
            const userEmail = localStorage.getItem('currentUserEmail');
            let user = [];
            if (userEmail) {
                user = await finduser(userEmail);
            }
            if (user.length <= 0) {
                navigate("/login");
            }
            setUser(user[0]);
        }
        loaduser();
    }, [navigate]);

    useEffect(() => {
        async function runCode() {
            if (!userData.id) return;
            setExpenseData(await allExpenses(userData.id));
        }
        runCode();
    }, [loadData, userData.id]);

    useEffect(() => {
        let totalinc = 0;
        let totalexp = 0;

        for (let ies of ExpenseData) {
            if (ies.type === "Income") {
                totalinc += parseInt(ies.ammount);
            } else {
                totalexp += parseInt(ies.ammount);
            }
        }
        setTotalIncome(totalinc);
        setTotalExpense(totalexp);
        setTotalSaving(totalinc - totalexp);
    }, [ExpenseData]);
    console.log(userData.id);

    function Submit() {
        if (type === "Select" || desc.length < 3 || !ammount) {
            setInputError(true);
            setTimeout(() => setInputError(false), 1000);
            return;
        }


        if (!userData.id) return
        Savedata(type, desc, ammount, userData.id);
        setType("Select");
        setAmmount("");
        setDesc("");
        setLoadData(!loadData);
    }

    return (
        <div className="container mx-auto my-2">
            <div>
                <AnimateFromTop>
                    <div className="flex items-center justify-around text-lg md:text-2xl  md:font-medium  px-2 lg:px-8">
                        <h3>Income</h3>
                        <h3>Expense</h3>
                        <h3>Saving</h3>
                    </div>
                </AnimateFromTop>
                <div className="flex items-center justify-around text:xl  lg:text-3xl font-bold p-5" >
                    <AnimateScale>
                        <h2 className="text-purple-500 bg-slate-200 py-2 px-5 rounded-lg">{totalIncome}</h2>
                    </AnimateScale>
                    <AnimateScale>
                        <h2 className="text-red-400 bg-slate-200 py-2 px-5 rounded-lg">{totalExpense}</h2>
                    </AnimateScale>
                    <AnimateScale>
                        <h2 className="text-green-400 bg-slate-200 py-2 px-5 rounded-lg">{totalSaving}</h2>
                    </AnimateScale>
                </div>
            </div>
            <h2 className="text-center font-bold text-xl md:text-2xl my-5">Add Expense</h2>
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 xl:mx-20 p-2">
                <AnimateFromLeft>
                    <div
                        className=" border rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                        <select id="dropdown" name="dropdown" className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Select">Type</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                </AnimateFromLeft>
                <AnimateFromDown>
                    <div>
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="border-2 border-neutral-400 block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Enter Desception"></input>
                    </div>
                </AnimateFromDown>
                <AnimateFromRight>
                    <div>
                        <input type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)} className="border-2 border-neutral-400 block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Price"></input>
                    </div>
                </AnimateFromRight>
            </div>
            {inputError && <p className="text-red-400 text-center p-2">Invalid input</p>}
            <div className="flex justify-center items-center">
                <AnimateScaleButton>
                    <button

                        className="border py-2 px-8 hover:bg-purple-500 bg-purple-300 rounded-lg font-semibold" onClick={Submit}> Submit</button>
                </AnimateScaleButton>
            </div>
            {ExpenseData.length > 0 &&
                <ShowTable ExpenseData={ExpenseData} />}
        </div>
    );
}