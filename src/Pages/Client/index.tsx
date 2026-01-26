import { Card, CardHeader , CardContent,CardFooter} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search ,Home ,ListFilterPlus} from "lucide-react"
import { Button } from "@/components/ui/button"
const index = () => {



    const Produits = [
        {
            nom : "Produit 1",
            prix : 10,
            description : "Description du produit 1",
            image : "https://via.placeholder.com/150",
            stock : 10,
            
        },{
            nom : "Produit 2",
            prix : 10,
            description : "Description du produit 1",
            image : "https://via.placeholder.com/150",
            stock : 10,
            
        },{
            nom : "Produit 3",
            prix : 10,
            description : "Description du produit 1",
            image : "https://via.placeholder.com/150",
            stock : 10,
            
        },{
            nom : "Produit 4",
            prix : 10,
            description : "Description du produit 1",
            image : "https://via.placeholder.com/150",
            stock : 10,
            
        },{
            nom : "Produit 5",
            prix : 10,
            description : "Description du produit 1",
            image : "https://via.placeholder.com/150",
            stock : 10,
            
        },
    ]
  return ( 
    <div className='h-screen  py-2 m-2 rounded-lg '>
        <header>
            <Card className="rounded-md shadow-sm">
               <CardHeader className="">
                
               <div className="flex items-center gap-2"> <Home/> 
               <div className="font-bold text-lg">Home</div>
             
               </div>
                </CardHeader>  
                <CardContent className="flex justify-between ">
                   
                    <div className="flex items-center gap-2">
                        <Search size={24}/>
                        <Input placeholder="Rechercher" />
                    </div>
                     <Button className="bg-sky-500"><ListFilterPlus /> Filtre</Button>
                </CardContent>
            </Card>
        </header>
        <main className=" mt-2 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Produits.map((produit,index)=>(
                 <Card key={index}>
    <CardHeader>
        {produit.nom}
    </CardHeader>
    <CardContent>
        <img src={produit.image} alt="" />
        {produit.description}
    </CardContent>
    <CardFooter className="flex justify-between">
        
        <Badge>{produit.stock}</Badge>
        <div>{produit.prix} $</div>
    </CardFooter>
</Card>     
))}
        </main>
    </div>
  )
}

export default index