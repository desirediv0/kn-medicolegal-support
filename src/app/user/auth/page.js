
import { UserAuthForm } from '@/components/user-auth-form'
import React from 'react'

const UserAuth = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UserAuthForm />
            </div>
        </div>
    )
}

export default UserAuth
