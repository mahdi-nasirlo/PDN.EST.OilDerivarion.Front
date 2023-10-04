'use client'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <>
            <div className="box-border w-full p-6">
                {children}
            </div>
        </>
    )
}

