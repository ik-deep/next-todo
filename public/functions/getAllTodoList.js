export default async function getAllTodoList (){
    try {
        const res = await fetch("http://localhost:3000/api/todos", {
            cache: "no-store",
        })
        if (!res.ok) {
            throw new Error("Faild to fetch todos!");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading todos: ", error);
    }

}