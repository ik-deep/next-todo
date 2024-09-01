export default async function addTodo(title, description, text_align,
    font_weight,
    font_style,
    text_underline,
    text_color,
    list_type, setTitle, setDescription) {
    try {
        const res = await fetch("http://localhost:3000/api/todos", {
            method: "POST",
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
        if (res.ok) {
            setTitle('');
            setDescription('')
            window.location.reload();
        }
    } catch (error) {
        console.log("error to adding todo: ", error);
    }
}