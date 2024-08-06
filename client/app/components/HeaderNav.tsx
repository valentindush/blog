import Link from "next/link";

export default function HeaderNav(){

    return(
        <div className="px-8 py-4 flex items-center justify-between w-full sticky top-0 bg-transparent backdrop-blur-sm">
          <div className="font-bold text-xl text-gray-600">BLOG APP</div>
          <div className="">
            <Link href={"/auth/login"} className="bg-blue-600 text-white py-2 px-5 rounded-md">Sign in</Link>
          </div>
        </div>
    )
}