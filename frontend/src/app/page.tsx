import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <div>
            hello world!

            <Link href={"./subscribe"}>
                subscribe page
            </Link>
        </div>
    );
};

export default Page;