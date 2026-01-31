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
import { Edit, Trash2, Plus, Search } from 'lucide-react'

interface Produit {
  id: number
  nom: string
  quantite: number
  prix: number
  description: string
  dateAjout: string
}

const Produit = () => {
  const [produits, setProduits] = useState<Produit[]>([
    { id: 1, nom: 'Produit A', quantite: 50, prix: 25.99, description: 'Description du produit A', dateAjout: '2024-01-15' },
    { id: 2, nom: 'Produit B', quantite: 30, prix: 15.50, description: 'Description du produit B', dateAjout: '2024-01-20' },
    { id: 3, nom: 'Produit C', quantite: 100, prix: 45.00, description: 'Description du produit C', dateAjout: '2024-01-25' },
  ])
  
  const [filteredProduits, setFilteredProduits] = useState<Produit[]>(produits)
  const [searchTerm, setSearchTerm] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null)
  const [formData, setFormData] = useState({
    nom: '',
    quantite: '',
    prix: '',
    description: '',
    dateAjout: ''
  })

  // Filtrer les produits
  React.useEffect(() => {
    const filtered = produits.filter(produit =>
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProduits(filtered)
  }, [searchTerm, produits])

  const handleEdit = (produit: Produit) => {
    setSelectedProduit(produit)
    setFormData({
      nom: produit.nom,
      quantite: produit.quantite.toString(),
      prix: produit.prix.toString(),
      description: produit.description,
      dateAjout: produit.dateAjout
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
              dateAjout: formData.dateAjout
            }
          : p
      ))
      setEditModalOpen(false)
      setSelectedProduit(null)
    }
  }

  const handleAdd = () => {
    const newProduit: Produit = {
      id: Math.max(...produits.map(p => p.id)) + 1,
      nom: formData.nom,
      quantite: parseInt(formData.quantite),
      prix: parseFloat(formData.prix),
      description: formData.description,
      dateAjout: new Date().toISOString().split('T')[0] // Date du jour au format YYYY-MM-DD
    }
    setProduits([...produits, newProduit])
    setAddModalOpen(false)
    setFormData({ nom: '', quantite: '', prix: '', description: '', dateAjout: '' })
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Gestion des Produits</h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 hover:bg-blue-700'>
              <Plus className='mr-2 h-4 w-4' />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour ajouter un nouveau produit.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium'>Nom</label>
                <Input
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder='Nom du produit'
                />
              </div>
              <div>
                <label className='text-sm font-medium'>Quantité</label>
                <Input
                  type='number'
                  value={formData.quantite}
                  onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                  placeholder='Quantité'
                />
              </div>
              <div>
                <label className='text-sm font-medium'>Prix</label>
                <Input
                  type='number'
                  step='0.01'
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  placeholder='Prix'
                />
              </div>
              <div>
                <label className='text-sm font-medium'>Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder='Description'
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtre */}
      <div className='flex items-center space-x-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Rechercher un produit...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      {/* Tableau */}
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date d'ajout</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProduits.map((produit) => (
              <TableRow key={produit.id}>
                <TableCell className='font-medium'>{produit.nom}</TableCell>
                <TableCell>{produit.quantite}</TableCell>
                <TableCell>{produit.prix.toFixed(2)} €</TableCell>
                <TableCell>{produit.description}</TableCell>
                <TableCell>{new Date(produit.dateAjout).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Dialog open={editModalOpen && selectedProduit?.id === produit.id} onOpenChange={setEditModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEdit(produit)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Modifier le produit</DialogTitle>
                          <DialogDescription>
                            Modifiez les informations du produit.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4'>
                          <div>
                            <label className='text-sm font-medium'>Nom</label>
                            <Input
                              value={formData.nom}
                              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                              placeholder='Nom du produit'
                            />
                          </div>
                          <div>
                            <label className='text-sm font-medium'>Quantité</label>
                            <Input
                              type='number'
                              value={formData.quantite}
                              onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                              placeholder='Quantité'
                            />
                          </div>
                          <div>
                            <label className='text-sm font-medium'>Prix</label>
                            <Input
                              type='number'
                              step='0.01'
                              value={formData.prix}
                              onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                              placeholder='Prix'
                            />
                          </div>
                          <div>
                            <label className='text-sm font-medium'>Description</label>
                            <Input
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder='Description'
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdate}>Mettre à jour</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(produit.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Produit