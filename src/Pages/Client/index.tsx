'use client';

import { useState, useMemo } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Star, BadgeCheck, AlertTriangle, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Produit {
  nom: string;
  prix: number;
  description: string;
  image: string;
  stock: number;
  categorie: string;
  fournisseur: string;
}

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [fournisseurQuery, setFournisseurQuery] = useState('')
  // Cart items type with description and fournisseur properties - Fixed for Vercel deployment
  const [cartItems, setCartItems] = useState<Array<{nom: string; prix: number; quantity: number; image?: string; categorie: string; description?: string; fournisseur?: string}>>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const Produits = [
    {
      nom: "Laptop Pro",
      prix: 1299,
      description: "Ordinateur portable haute performance",
      image: "https://source.unsplash.com/random/400x300",
      stock: 5,
      categorie: "Électronique",
      fournisseur : "star",
    },
    {
      nom: "Casque Audio",
      prix: 299,
      description: "Casque audio sans fil premium",
      image: "https://picsum.photos/200/300",
      stock: 0,
      categorie: "Électronique",
      fournisseur : "star",
    },
    {
      nom: "Montre Connectée",
      prix: 199,
      description: "Montre intelligente avec GPS",
      image: "https://via.placeholder.com/300x200?text=Montre+Connectée",
      stock: 8,
      categorie: "Accessoires",
      fournisseur : "obe",
    },
    {
      nom: "Chaise Ergonomique",
      prix: 399,
      description: "Chaise de bureau confortable",
      image: "https://via.placeholder.com/300x200?text=Chaise+Ergonomique",
      stock: 3,
      categorie: "Mobilier",
      fournisseur : "obe",
    },
    {
      nom: "Desk Lamp LED",
      prix: 89,
      description: "Lampe de bureau à LED",
      image: "https://via.placeholder.com/300x200?text=Desk+Lamp",
      stock: 15,
      categorie: "Mobilier",
      fournisseur : "abc",
    },
    {
      nom: "Souris Sans Fil",
      prix: 45,
      description: "Souris ergonomique sans fil",
      image: "https://via.placeholder.com/300x200?text=Souris+Sans+Fil",
      stock: 20,
      categorie: "Accessoires",
      fournisseur : "abc",
    },
  ]

  const categories = ['Tous', 'Électronique', 'Accessoires', 'Mobilier']

  const filteredProduits = useMemo(() => {
    return Produits.filter(produit => {
      const matchesSearch = produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         produit.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'Tous' || produit.categorie === selectedCategory
      const matchesFournisseur = !fournisseurQuery || 
                               produit.fournisseur.toLowerCase().includes(fournisseurQuery.toLowerCase())
      return matchesSearch && matchesCategory && matchesFournisseur
    })
  }, [searchQuery, selectedCategory, fournisseurQuery])

  // Gestion du panier
  const addToCart = (produit: Produit) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.nom === produit.nom);
      if (existingItem) {
        return prevItems.map(item =>
          item.nom === produit.nom
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { 
        nom: produit.nom, 
        prix: produit.prix, 
        quantity: 1, 
        image: produit.image, 
        categorie: produit.categorie,
        description: produit.description,
        fournisseur: produit.fournisseur
      }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.nom !== productName));
  };

  const updateQuantity = (productName: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.nom === productName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0)

  return (
    <div className='min-h-screen  py-8'>
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
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='flex-1 flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow'>
              <Search size={20} className='text-muted-foreground' />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground'
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=' mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Category Filter */}
       <div className='flex justify-between items-center'>
         <div className='mb-12 '>
          <h2 className='text-sm font-semibold text-foreground mb-4'>Catégories</h2>
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-medium transition-all duration-200 text-sm',
                  selectedCategory === category
                    ? 'bg-sky-500 text-sky-50 shadow-md hover:shadow-lg'
                    : 'bg-card border border-border text-foreground hover:border-sky-500 hover:bg-secondary/50'
                )}
              >
                {category}
              </button>
            ))}
          </div>
          
        </div>
        {/* recherche fournisseur */}
        <div className=' flex items-center gap-3'>
          
          <div className='flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-2.5 w-full max-w-xs shadow-sm hover:shadow-md transition-shadow'>
            <Search size={18} className='text-muted-foreground' />
            <Input
              placeholder="Filtrer par fournisseur..."
              value={fournisseurQuery}
              onChange={(e) => setFournisseurQuery(e.target.value)}
              className='border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground p-0 h-auto'
            />
            {fournisseurQuery && (
              <button 
                onClick={() => setFournisseurQuery('')}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
       </div>

       
      {totalItems > 0 && (
  <div className="fixed bottom-6 right-6 z-50">
    <Button 
      onClick={() => setIsCartOpen(true)}
      className="relative inline-flex items-center gap-2 px-6 py-3 bg-lime-800 text-lime-50 hover:bg-lime-600 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-semibold">Panier</span>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
        {totalItems}
      </span>
    </Button>
  </div>
)}

        {/* Products Grid */}
        {filteredProduits.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProduits.map((produit, index) => (
              <Card
                key={index}
                className='group overflow-hidden border-border hover:border-sky-500 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card'
              >
                {/* Image Container */}
                <div className='relative w-full h-48 bg-muted overflow-hidden'>
                  <img
                    // src={produit.image || "/placeholder.svg"}
                    src={`https://picsum.photos/seed/${Math.random()}/400/300`}
                    alt={produit.nom}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute top-3 right-3'>
                    <Badge className={cn(
                      'text-white flex items-center gap-1',
                      produit.stock > 0 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-amber-500 hover:bg-amber-600'
                    )}>
                      {produit.stock > 0 ? (
                        <>
                          <BadgeCheck className="h-3.5 w-3.5" />
                          <span>Disponible</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Rupture</span>
                        </>
                      )}
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
                    {produit.fournisseur && (
                      <div className='mt-1'>
                        <span className='text-xs bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 px-2 py-1 rounded-full'>
                          {produit.fournisseur}
                        </span>
                      </div>
                    )}
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
                  {/* panier ajouter*/}
                  <Button
                    size='sm'
                    onClick={() => addToCart(produit)}
                    disabled={produit.stock === 0}
                    className='bg-green-700 text-lime-50 hover:bg-lime-800 hover:text-lime-50 gap-2 disabled:bg-lime-500 disabled:text-lime-950 disabled:cursor-not-allowed '
                  >
                    <ShoppingCart size={16} />
                    Ajouter
                  </Button>
                  {/* endpannier ajouter */}
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

      {/* Cart Modal/Dialog */}
      {isCartOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card'>
              <div className='flex items-center gap-3'>
                <ShoppingCart className='h-6 w-6 text-lime-600' />
                <h2 className='text-2xl font-bold text-foreground'>Panier</h2>
              </div>
              <Button
                onClick={() => setIsCartOpen(false)}
                className='p-2 hover:bg-muted hover:rounded-full hover:bg-red-500 hover:text-secondary hover:border-red-500 rounded-lg transition-colors'
                variant='outline'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              {cartItems.length === 0 ? (
                <div className='text-center py-12'>
                  <ShoppingCart className='h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50' />
                  <p className='text-muted-foreground text-lg'>Votre panier est vide</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <div
                      key={item.nom}
                      className='flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors'
                    >
                      {/* Product Image */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.nom}
                        className='w-20 h-20 object-cover rounded-lg'
                      />

                      {/* Product Info */}
                      <CardContent className='p-4'>
                        <h3 className='font-semibold text-lg mb-1 line-clamp-1'>{item.nom}</h3>
                        {item.fournisseur && (
                          <div className='mb-2'>
                            <span className='text-xs bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 px-2 py-1 rounded-full'>
                              {item.fournisseur}
                            </span>
                          </div>
                        )}
                        <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>{item.description}</p>
                        <p className='text-xs text-muted-foreground mt-1'>{item.categorie}</p>
                      </CardContent>

                      {/* Quantity Controls */}
                      <div className='flex items-center gap-2 bg-background rounded-lg p-2'>
                        <button
                          onClick={() => updateQuantity(item.nom, item.quantity - 1)}
                          className='p-1 hover:bg-secondary rounded transition-colors'
                        >
                          <Minus size={16} className='text-foreground' />
                        </button>
                        <span className='w-8 text-center font-semibold text-foreground'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.nom, item.quantity + 1)}
                          className='p-1 hover:bg-secondary rounded transition-colors'
                        >
                          <Plus size={16} className='text-foreground' />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className='text-right'>
                        <p className='font-bold text-foreground'>
                          ${(item.prix * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.nom)}
                        className='p-2 hover:bg-red-500/20 rounded-lg transition-colors'
                      >
                        <X size={20} className='text-red-500' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {cartItems.length > 0 && (
              <div className='sticky bottom-0 border-t border-border p-6 bg-card space-y-4'>
                <div className='flex items-center justify-between text-lg'>
                  <span className='font-semibold text-foreground'>Total:</span>
                  <span className='font-bold text-2xl text-lime-600'>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className='flex gap-3'>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    variant='outline'
                    className='flex-1'
                  >
                    Continuer vos achats
                  </Button>
                  <Button
                    className='flex-1 bg-lime-500 text-lime-50 hover:bg-lime-600'
                  >
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
