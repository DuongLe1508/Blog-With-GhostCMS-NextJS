import Image from "next/image";
import Link from "next/link";
import type {Settings} from "@tryghost/content-api"
import SocialIcons from "./SocialIcons";


export default function Header({setting}: {setting: Settings}) {
  return (
    <header className="px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
             {/* Logo for Blog */}
             <Link href="/" className="flex items-center">
                {
                    setting.logo !== null ? 
                    <Image alt={`${setting.title}`} width={200} height={100} src={`${setting.logo}`} 
                    className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                    ></Image> : setting.title
                }
             </Link>
             <div className="flex md:order-2">
                <ul className="flex flex-wrap p-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                    {
                        // Blog Navigation Edit in GHOST CMS
                        setting.navigation !== undefined ? setting?.navigation.map(item => <li key={item.label}
                        className="block py-2 pl-3 pr-4 rounded text-gry-700 hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white"
                        aria-current="page"
                        >
                            <Link href={item.url}>
                                {item.label}
                            </Link>

                        </li>) : ""

                    }
                </ul>

                <div>
                    <SocialIcons setting={setting}></SocialIcons>
                </div>
             </div>
        </div>
    </header>
  )
}
