import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface userInfoProps{
    user?: ExtendedUser
    label: string
}


export const UserInfo = ({user, label} : userInfoProps)=> {

    return (
        <Card className="w-[500px] shadow-md bg-white border-none">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="trucate font-mono p-1 text-xs max-w-[180px] bg-slate-100 rounded-me">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="trucate font-mono p-1 text-xs max-w-[180px] bg-slate-100 rounded-me">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="trucate font-mono p-1 text-xs max-w-[180px] bg-slate-100 rounded-me">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <p className="trucate font-mono p-1 text-xs max-w-[180px] bg-slate-100 rounded-me">
                        {user?.twoFactorEnabled ? "ON" : "OFF"}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

