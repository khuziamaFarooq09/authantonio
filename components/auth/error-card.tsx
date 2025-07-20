import { Card, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";



const ErrorCard = () => {
  return (
    <Card className="w-[400px] text-black bg-white shadow-md">
        <CardHeader className="w-full flex items-center justify-center">
            <p className="text-3xl text-black  font-bold ">Opps! Something went wrong!</p>
        </CardHeader>
        <CardFooter>
            <BackButton label="Back to login" href="/auth/login" />
        </CardFooter>
    </Card>
  )
}

export default ErrorCard
