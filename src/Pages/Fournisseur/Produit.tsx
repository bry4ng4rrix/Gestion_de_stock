'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit, Trash2, Plus, Search, Download, Printer } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ImageIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Produit {
  id: number
  nom: string
  quantite: number
  prix: number
  description: string
  dateAjout: string
  categorie: string
  image?: string
}

const Produit = () => {
  const [produits, setProduits] = useState<Produit[]>([
    { id: 1, nom: 'Produit A', quantite: 50, prix: 25.99, description: 'Description du produit A', dateAjout: '2024-01-15', categorie: 'Électronique', image: `https://picsum.photos/seed/produit1/400/300` },
    { id: 2, nom: 'Produit B', quantite: 30, prix: 15.50, description: 'Description du produit B', dateAjout: '2024-01-20', categorie: 'Vêtements', image: `https://picsum.photos/seed/produit2/400/300` },
    { id: 3, nom: 'Produit C', quantite: 100, prix: 45.00, description: 'Description du produit C', dateAjout: '2024-01-25', categorie: 'Électronique', image: `https://picsum.photos/seed/produit3/400/300` },
  ])

  const [filteredProduits, setFilteredProduits] = useState<Produit[]>(produits)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategorie, setFilterCategorie] = useState('all')
  const [filterDate, setFilterDate] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null)
  const [formData, setFormData] = useState({
    nom: '',
    quantite: '',
    prix: '',
    description: '',
    categorie: '',
    image: ''
  })

  const categories = ['Électronique', 'Vêtements', 'Livres', 'Maison', 'Sports']

  React.useEffect(() => {
    let filtered = produits.filter(produit =>
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filterCategorie && filterCategorie !== 'all') {
      filtered = filtered.filter(produit => produit.categorie === filterCategorie)
    }

    if (filterDate) {
      filtered = filtered.filter(produit => produit.dateAjout === filterDate)
    }

    setFilteredProduits(filtered)
  }, [searchTerm, produits, filterCategorie, filterDate])

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    if (imageFile) {
      handleImageUpload(imageFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleEdit = (produit: Produit) => {
    setSelectedProduit(produit)
    setFormData({
      nom: produit.nom,
      quantite: produit.quantite.toString(),
      prix: produit.prix.toString(),
      description: produit.description,
      categorie: produit.categorie,
      image: produit.image || ''
    })
    setEditModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProduits(produits.filter(p => p.id !== id))
    }
  }

  const handleUpdate = () => {
    if (selectedProduit) {
      setProduits(produits.map(p =>
        p.id === selectedProduit.id
          ? {
              ...p,
              nom: formData.nom,
              quantite: parseInt(formData.quantite),
              prix: parseFloat(formData.prix),
              description: formData.description,
              categorie: formData.categorie,
              image: formData.image
            }
          : p
      ))
      setEditModalOpen(false)
      setSelectedProduit(null)
      setFormData({ nom: '', quantite: '', prix: '', description: '', categorie: '', image: '' })
    }
  }

  const handleAdd = () => {
    const newProduit: Produit = {
      id: Math.max(...produits.map(p => p.id), 0) + 1,
      nom: formData.nom,
      quantite: parseInt(formData.quantite),
      prix: parseFloat(formData.prix),
      description: formData.description,
      categorie: formData.categorie,
      dateAjout: new Date().toISOString().split('T')[0],
      image: formData.image || `https://picsum.photos/seed/${Math.random()}/400/300`
    }
    setProduits([...produits, newProduit])
    setAddModalOpen(false)
    setFormData({ nom: '', quantite: '', prix: '', description: '', categorie: '', image: '' })
  }

  const getStockStatus = (quantite: number) => {
    if (quantite === 0) return { label: 'Rupture', color: 'bg-red-500/10 text-red-700' }
    if (quantite < 20) return { label: 'Faible', color: 'bg-amber-500/10 text-amber-700' }
    return { label: 'En stock', color: 'bg-emerald-500/10 text-emerald-700' }
  }

  const handleExportXLSX = () => {
    const headers = ['ID', 'Nom', 'Catégorie', 'Prix', 'Quantité', 'Date d\'ajout', 'Description']
    const data = filteredProduits.map(p => [
      p.id,
      p.nom,
      p.categorie,
      p.prix.toFixed(2),
      p.quantite,
      p.dateAjout,
      p.description
    ])

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `produits_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      const html = `
        <html>
          <head>
            <title>Catalogue de Produits</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f5f5f5; font-weight: bold; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .date { color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <h1>Catalogue de Produits</h1>
            <p class="date">Généré le: ${new Date().toLocaleDateString('fr-FR')}</p>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Stock</th>
                  <th>Date d'ajout</th>
                </tr>
              </thead>
              <tbody>
                ${filteredProduits.map(p => {
                  const stockStatus = getStockStatus(p.quantite)
                  return `
                    <tr>
                      <td>${p.nom}</td>
                      <td>${p.categorie}</td>
                      <td>${p.prix.toFixed(2)} €</td>
                      <td>${p.quantite}</td>
                      <td>${stockStatus.label}</td>
                      <td>${p.dateAjout}</td>
                    </tr>
                  `
                }).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `
      printWindow.document.write(html)
      printWindow.document.close()
      setTimeout(() => printWindow.print(), 250)
    }
  }

  const FormModal = ({ isEdit = false }: { isEdit?: boolean }) => (
    <DialogContent className='max-w-2xl'>
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</DialogTitle>
        <DialogDescription>
          {isEdit ? 'Modifiez les informations du produit ci-dessous.' : 'Remplissez les informations pour ajouter un nouveau produit.'}
        </DialogDescription>
      </DialogHeader>
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Nom du produit</label>
            <Input
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder='Ex: Produit Premium'
              className='h-10'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Catégorie</label>
            <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
              <SelectTrigger className='h-10'>
                <SelectValue placeholder='Sélectionner une catégorie' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Prix (€)</label>
            <Input
              type='number'
              step='0.01'
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
              placeholder='0.00'
              className='h-10'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Quantité</label>
            <Input
              type='number'
              value={formData.quantite}
              onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
              placeholder='0'
              className='h-10'
            />
          </div>
        </div>



        <div>
          <label className='block text-sm font-medium mb-2'>Description</label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder='Description du produit'
            className='h-10'
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-3'>Image du produit</label>
          <div
            className='border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {formData.image ? (
              <div className='space-y-3'>
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt='Aperçu'
                  className='w-40 h-40 object-cover rounded-lg mx-auto'
                />
                <p className='text-sm text-muted-foreground'>Cliquez ou glissez pour changer l'image</p>
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='w-16 h-16 bg-secondary rounded-full mx-auto flex items-center justify-center'>
                  <ImageIcon className='w-8 h-8 text-muted-foreground' />
                </div>
                <div>
                  <p className='text-sm font-medium'>Glissez une image ici</p>
                  <p className='text-xs text-muted-foreground mt-1'>ou cliquez pour sélectionner</p>
                </div>
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
              id={`image-upload-${isEdit ? 'edit' : 'add'}`}
            />
            <label
              htmlFor={`image-upload-${isEdit ? 'edit' : 'add'}`}
              className='cursor-pointer text-primary hover:text-primary/80 text-sm font-medium inline-block mt-3'
            >
              Choisir un fichier
            </label>
          </div>
        </div>
      </div>
      <DialogFooter>
        
        <Button onClick={isEdit ? handleUpdate : handleAdd} className='gap-2'>
          {isEdit ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-accent/5'>
      {/* Header */}
      <div className='sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
        <div className=' mx-auto px-6 py-8'>
          <div className='flex justify-between items-center gap-4'>
            <div className='flex-1'>
              <h1 className='text-4xl font-bold text-foreground mb-2'>Catalogue</h1>
              <p className='text-muted-foreground text-lg'>Gérez votre catalogue de {produits.length} produit{produits.length > 1 ? 's' : ''}</p>
            </div>
            <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
              <DialogTrigger asChild>
                <Button size='lg' className='gap-2 h-12 px-6 whitespace-nowrap bg-green-500 hover:bg-green-800 hover:shadow-lg'>
                  <Plus className='h-5 w-5' />
                  Nouveau produit
                </Button>
              </DialogTrigger>
              <FormModal />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=' mx-auto px-6 py-8'>
        {/* Search Bar */}
        <div className='mb-6'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none' />
            <Input
              placeholder='Rechercher un produit par nom ou description...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-12 h-12 text-base'
            />
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className='mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center flex-wrap'>
          <div className='flex gap-4 flex-wrap items-center'>
            <Select value={filterCategorie} onValueChange={setFilterCategorie}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Filtrer par catégorie' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type='date'
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className='w-48'
              placeholder='Filtrer par date'
            />

            {(filterCategorie || filterDate || searchTerm) && (
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setFilterCategorie('all')
                  setFilterDate('')
                }}
                variant='outline'
                size='sm'
              >
                Réinitialiser
              </Button>
            )}
          </div>

          <div className='flex gap-2 w-full sm:w-auto'>
            <Button
              onClick={handlePrint}
              className='gap-2 flex-1 sm:flex-initial bg-yellow-100 text-stone-800 hover:bg-yellow-200 hover:shadow-md'
            >
              <Printer className='h-4 w-4' />
              Imprimer
            </Button>
            <Button
              onClick={handleExportXLSX}
              
              className='bg-sky-500 hover:bg-sky-700 gap-2 flex-1 sm:flex-initial hover:shadow-md'
            >
              <Download className='h-4 w-4' />
              Exporter
            </Button>
          </div>
        </div>

        {(searchTerm || filterCategorie || filterDate) && (
          <p className='text-sm text-muted-foreground mb-6'>
            {filteredProduits.length} résultat{filteredProduits.length !== 1 ? 's' : ''} trouvé{filteredProduits.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Table avec recherche */}
        {filteredProduits.length > 0 ? (
          <div className='rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='border-b font-bold border-border/50 bg-muted/40 hover:bg-muted/40'>
                    <TableHead className='font-bold h-14'>Produit</TableHead>
                    <TableHead className='font-bold h-14'>Catégorie</TableHead>
                    <TableHead className='font-bold h-14'>Prix</TableHead>
                    <TableHead className='font-bold h-14'>Quantité</TableHead>
                    <TableHead className='font-bold h-14'>Stock</TableHead>
                    <TableHead className='font-bold h-14'>Date d'ajout</TableHead>
                    <TableHead className='font-bold h-14 text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProduits.map((produit, idx) => {
                    const stockStatus = getStockStatus(produit.quantite)
                    return (
                      <TableRow key={produit.id} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${idx !== filteredProduits.length - 1 ? '' : 'border-b-0'}`}>
                        <TableCell className='py-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0'>
                              <img
                                src={produit.image || '/placeholder.svg'}
                                alt={produit.nom}
                                className='w-full h-full object-cover'
                              />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='font-semibold text-foreground truncate'>{produit.nom}</p>
                              <p className='text-sm text-muted-foreground truncate'>{produit.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='py-4'>
                          <Badge variant='outline' className='font-medium'>
                            {produit.categorie}
                          </Badge>
                        </TableCell>
                        <TableCell className='py-4'>
                          <span className='font-semibold text-foreground'>{produit.prix.toFixed(2)} €</span>
                        </TableCell>
                        <TableCell className='py-4'>
                          <span className='text-foreground'>{produit.quantite}</span>
                        </TableCell>
                        <TableCell className='py-4'>
                          <Badge variant='secondary' className={`${stockStatus.color} border-0 font-medium`}>
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell className='py-4'>
                          <span className='text-sm text-muted-foreground'>{produit.dateAjout}</span>
                        </TableCell>
                        <TableCell className='py-4 text-right'>
                          <div className='flex gap-2 justify-end'>
                            <Button
                              onClick={() => handleEdit(produit)}
                              variant='outline'
                              size='sm'
                              className='gap-2'
                            >
                              <Edit className='h-4 w-4' />
                              Modifier
                            </Button>
                            <Button
                              onClick={() => handleDelete(produit.id)}
                              variant='destructive'
                              size='sm'
                              className='gap-2'
                            >
                              <Trash2 className='h-4 w-4' />
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className='rounded-xl border border-border/50 bg-card/50 p-12 text-center'>
            <div className='w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center'>
              <Search className='h-8 w-8 text-muted-foreground' />
            </div>
            <h3 className='text-lg font-semibold text-foreground mb-2'>Aucun produit trouvé</h3>
            <p className='text-muted-foreground mb-6'>
              {searchTerm ? 'Essayez de modifier votre recherche.' : 'Commencez par ajouter votre premier produit.'}
            </p>
            {searchTerm && (
              <Button onClick={() => setSearchTerm('')} variant='outline'>
                Réinitialiser la recherche
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <FormModal isEdit={true} />
      </Dialog>
    </div>
  )
}

export default Produit
