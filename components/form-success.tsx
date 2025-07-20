import { BsCircleFill } from "react-icons/bs"

interface FormErrorProps{
    message?: string
}
const FormSuccess = ({message} : FormErrorProps) => {

    if(!message){
        return null
    }
  return (
    <div className=" p-3 rounded-md flex bg-green-300 items-center gap-x-2 text-sm text-green-500">
        <BsCircleFill className="h-4 w-4"/>
        <p>{message}</p>
    </div>
  ) 
}

export default FormSuccess
