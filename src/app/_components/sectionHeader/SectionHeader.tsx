import Breadcrumb from "../breadcrumb/Breadcrumb";
import { IconType } from "react-icons";

export default function SectionHeader({title,className, bgColor, Icon, icons, iconBg ,desc }: {title: string,className?: string, bgColor?: string, Icon: IconType , icons?:string , iconBg?:string , desc?:string}) {
    return <>
        <div className={`w-full h-56 px-30   bg-linear-to-r ${bgColor} `}>
            <div className={`pt-3 `}>
                <Breadcrumb currentPage={title} />

            </div>      
                  <div className={`flex gap-5 items-center relative top-10 ${className}`}>

                <div className={`shadow-lg     rounded-2xl w-16 h-16 flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-8 h-8 ${icons}`} /> 

                </div>
                <div className=''>
                    <h1 className='text-[32px] font-bold'>{title}</h1>
                    <p>{desc}</p>
                </div>
            </div>
        </div>


    </>
}
