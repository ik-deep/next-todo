

export default async function updateTodo(title, description, text_align,
    font_weight,
    font_style,
    text_underline,
    text_color,
    list_type, id, router) {

    try {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title, description, text_align,
                font_weight,
                font_style,
                text_underline,
                text_color,
                list_type
            })
        });

        if (!res.ok) {
            throw new Error("Failed to update todo");
        }

        window.location.reload();
        alert("Todo updated successfully!")
        // router.refresh();
    } catch (error) {
        console.log(error)
    }
}