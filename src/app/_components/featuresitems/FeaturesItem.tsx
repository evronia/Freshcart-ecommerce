import { IconType } from "react-icons";
export default function FeaturesItem({ Icon, title, subtitle, className ,  iconColor , iconBg }: { Icon: IconType, title: string, subtitle: string, className?: string , iconColor?: string , iconBg?:string}) {
  return <>

    <div className={`flex  items-center gap-3 md:ml-5 ${className}`}>

      <div className={`shadow-lg  rounded-2xl w-11 h-11 flex items-center justify-center ${iconBg}`}>
        <Icon className={`w-5 h-5  ${iconColor}`} />
      </div>
      <div >
        <h4 className=" font-bold text-[14px]">{title}</h4>
        <p className="text-[13px] font-medium text-muted-foreground">{subtitle}</p>
      </div>

    </div>




  </>
}