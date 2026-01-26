
import { useState, useMemo } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')

  const Produits = [
    {
      nom: "Laptop Pro",
      prix: 1299,
      description: "Ordinateur portable haute performance",
      image: "https://via.placeholder.com/300x200?text=Laptop+Pro",
      stock: 5,
      categorie: "Électronique"
    },
    {
      nom: "Casque Audio",
      prix: 299,
      description: "Casque audio sans fil premium",
      image: "https://via.placeholder.com/300x200?text=Casque+Audio",
      stock: 12,
      categorie: "Électronique"
    },
    {
      nom: "Montre Connectée",
      prix: 199,
      description: "Montre intelligente avec GPS",
      image: "https://via.placeholder.com/300x200?text=Montre+Connectée",
      stock: 8,
      categorie: "Accessoires"
    },
    {
      nom: "Chaise Ergonomique",
      prix: 399,
      description: "Chaise de bureau confortable",
      image: "https://via.placeholder.com/300x200?text=Chaise+Ergonomique",
      stock: 3,
      categorie: "Mobilier"
    },
    {
      nom: "Desk Lamp LED",
      prix: 89,
      description: "Lampe de bureau à LED",
      image: "https://via.placeholder.com/300x200?text=Desk+Lamp",
      stock: 15,
      categorie: "Mobilier"
    },
    {
      nom: "Souris Sans Fil",
      prix: 45,
      description: "Souris ergonomique sans fil",
      image: "https://via.placeholder.com/300x200?text=Souris+Sans+Fil",
      stock: 20,
      categorie: "Accessoires"
    },
  ]

  const categories = ['Tous', 'Électronique', 'Accessoires', 'Mobilier']

  const filteredProduits = useMemo(() => {
    return Produits.filter(produit => {
      const matchCategory = selectedCategory === 'Tous' || produit.categorie === selectedCategory
      const matchSearch = produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         produit.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-8'>
      {/* Header */}
      <header className='mb-12'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8'>
            <h1 className='text-4xl font-serif font-bold text-foreground mb-2'>
              Notre Collection
            </h1>
            <p className='text-muted-foreground text-lg'>Découvrez nos produits premium et soigneusement sélectionnés</p>
          </div>

          {/* Search Bar */}
          <div className='flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow'>
            <Search size={20} className='text-muted-foreground' />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground'
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=' mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Category Filter */}
        <div className='mb-12'>
          <h2 className='text-sm font-semibold text-foreground mb-4'>Catégories</h2>
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-medium transition-all duration-200 text-sm',
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
                    : 'bg-card border border-border text-foreground hover:border-primary hover:bg-secondary/50'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProduits.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProduits.map((produit, index) => (
              <Card
                key={index}
                className='group overflow-hidden border-border hover:border-primary hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card'
              >
                {/* Image Container */}
                <div className='relative w-full h-48 bg-muted overflow-hidden'>
                  <img
                    src={produit.image || "/placeholder.svg"}
                    alt={produit.nom}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute top-3 right-3'>
                    <Badge className='bg-primary text-primary-foreground'>
                      {produit.stock > 0 ? 'Disponible' : 'Rupture'}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className='pt-4'>
                  <div className='mb-2'>
                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                      {produit.categorie}
                    </p>
                    <h3 className='text-lg font-semibold text-foreground mt-1 line-clamp-2'>
                      {produit.nom}
                    </h3>
                  </div>
                  <p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
                    {produit.description}
                  </p>

                  {/* Rating */}
                  <div className='flex items-center gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          'transition-colors',
                          i < 4 ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
                        )}
                      />
                    ))}
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className='flex items-center justify-between pt-4 border-t border-border'>
                  <div>
                    <p className='text-2xl font-bold text-primary'>
                      ${produit.prix}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Stock: {produit.stock}
                    </p>
                  </div>
                  <Button
                    size='sm'
                    className='bg-primary text-primary-foreground hover:bg-primary/90 gap-2'
                  >
                    <ShoppingCart size={16} />
                    Ajouter
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-muted-foreground text-lg'>
              Aucun produit ne correspond à votre recherche
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Page
