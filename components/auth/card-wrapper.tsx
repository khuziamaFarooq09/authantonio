"use client"

import Social from "../social"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import BackButton from "./back-button"


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial? : boolean

}
const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] bg-white text-black shadow-md">
        <CardHeader className="flex w-full items-center justify-center">
            <p className="font-bold text-black text-3xl drop-shadow-2xl ">{headerLabel}</p>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButton  label={backButtonLabel} href={backButtonHref}/>
        </CardFooter>
    </Card>     
  )
}

export default CardWrapper
