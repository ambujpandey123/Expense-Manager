import Dexie from "dexie";

const db = new Dexie("expenseDB");
db.version(2).stores({
    expense: "++id,userid,type,desc,date,ammount",
    user: "++id,name,email,password,createdat,[email+password]"
});

export async function Savedata(typ, desc, amm, userid) {
    let date = new Date();
    await db.open();
    await db.expense.add({
        userid: userid,
        type: typ,
        desc: desc,
        date: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(),
        ammount: amm
    })

}
export async function addUser(name, email, password) {
    let date = new Date();
    await db.open();
    console.log("user created:", name, email, password);
    await db.user.add({
        name: name,
        email: email,
        password: password,
        createdat: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(),

    })

}


export async function allExpenses(id) {
    try {

        await db.open();
        return await db.expense.where({userid:id}).toArray();
    } catch (error) {
        console.error("Could not fetch expenses:", error);
        return [];
    }
}
export async function loginuser(email, password) {
    try {
        await db.open();
        return await db.user.where({ email: email, password: password }).toArray();
    } catch (error) {
        console.error("Could not fetch expenses:", error);
        return false;
    }
}
export async function finduser(email) {
    try {
        await db.open();
        return await db.user.where('email').equalsIgnoreCase(email).toArray();
    } catch (error) {
        console.error("Could not fetch expenses:", error);
        return [];
    }
}