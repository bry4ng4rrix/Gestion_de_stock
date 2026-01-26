import { Card, CardHeader , CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search ,Home} from "lucide-react"
const index = () => {
  return (
    <div className='h-screen  p-2 m-2 rounded-lg '>
        <header>
            <Card>
               <CardHeader className="">
                
               <div className="flex items-center gap-2"> <Home/> 
               <div className="font-bold text-lg">Home</div>
             
               </div>
                </CardHeader>  
                <CardContent className="flex justify-between ">
                    <div>efef</div>
                    <div className="flex items-center gap-2">
                        <Search size={24}/>
                        <Input placeholder="Rechercher" />
                    </div>
                </CardContent>
            </Card>
        </header>
    </div>
  )
}

export default index