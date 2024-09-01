

export default async function removeTodo(id) {
    console.log(id)
    const confirmed = confirm("Are you sure? You want to delete.");

    if (confirmed) {
        await fetch(`http://localhost:3000/api/todos?id=${id}`, {
            method: "DELETE",
        });

        window.location.reload();

    }

}