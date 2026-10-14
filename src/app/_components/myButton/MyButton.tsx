
import { Button } from "@/components/ui/button"

function MyButton({ onClick, children, className }: { onClick?: () => void, children: React.ReactNode, className?: string }) {
  return <>

    <Button onClick={onClick} className={className}>{children}</Button>
  </>
}
export default MyButton

