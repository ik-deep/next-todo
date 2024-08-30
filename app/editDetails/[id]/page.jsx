import TodoDetails from "@/components/TodoDetals"

export default function EditDetails({params}){
    const {id} = params;
    return (
        <div className="details todo-details-media bg-white rounded-lg p-5">
        <TodoDetails id={id}/>
       </div>
    )
}