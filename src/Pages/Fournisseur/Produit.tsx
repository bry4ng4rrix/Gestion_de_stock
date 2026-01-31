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
import { Edit, Trash2, Plus, Search, Printer, Download } from 'lucide-react'

interface Produit {
  id: number
  nom: string
  quantite: number
  prix: number
  description: string
  dateAjout: string
  image?: string
}

const Produit = () => {
  const [produits, setProduits] = useState<Produit[]>([
    { id: 1, nom: 'Produit A', quantite: 50, prix: 25.99, description: 'Description du produit A', dateAjout: '2024-01-15', image: `https://picsum.photos/seed/produit1/400/300` },
    { id: 2, nom: 'Produit B', quantite: 30, prix: 15.50, description: 'Description du produit B', dateAjout: '2024-01-20', image: `https://picsum.photos/seed/produit2/400/300` },
    { id: 3, nom: 'Produit C', quantite: 100, prix: 45.00, description: 'Description du produit C', dateAjout: '2024-01-25', image: `https://picsum.photos/seed/produit3/400/300` },
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
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrer les produits
  React.useEffect(() => {
    const filtered = produits.filter(produit =>
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProduits(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, produits])

  // Pagination logic
  const totalPages = Math.ceil(filteredProduits.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProduits = filteredProduits.slice(startIndex, startIndex + itemsPerPage)

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Liste des Produits</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { text-align: center; }
          </style>
        </head>
        <body>
          <h1>Liste des Produits</h1>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Description</th>
                <th>Date d'ajout</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProduits.map(p => `
                <tr>
                  <td>${p.nom}</td>
                  <td>${p.quantite}</td>
                  <td>${p.prix.toFixed(2)} €</td>
                  <td>${p.description}</td>
                  <td>${new Date(p.dateAjout).toLocaleDateString('fr-FR')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleExportXLSX = () => {
    const csvContent = [
      ['Nom', 'Quantité', 'Prix', 'Description', 'Date d\'ajout'],
      ...filteredProduits.map(p => [
        p.nom,
        p.quantite.toString(),
        p.prix.toFixed(2),
        p.description,
        new Date(p.dateAjout).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n')

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
      dateAjout: new Date().toISOString().split('T')[0], // Date du jour au format YYYY-MM-DD
      image: `https://picsum.photos/seed/${Math.random()}/400/300`
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

      {/* Filtre et actions */}
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Rechercher un produit...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        
        <div className='flex gap-2 items-center'>
          <Button onClick={handlePrint} variant='outline' size='sm'>
            <Printer className='mr-2 h-4 w-4' />
            Imprimer
          </Button>
          <Button onClick={handleExportXLSX} variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Exporter
          </Button>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className='border rounded px-3 py-2 text-sm'
          >
            <option value={10}>10 lignes</option>
            <option value={25}>25 lignes</option>
            <option value={50}>50 lignes</option>
            <option value={100}>100 lignes</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date d'ajout</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProduits.map((produit) => (
              <TableRow key={produit.id}>
                <TableCell>
                  <img
                    src={produit.image}
                    alt={produit.nom}
                    className='w-16 h-16 object-cover rounded'
                  />
                </TableCell>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-600'>
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredProduits.length)} sur {filteredProduits.length} produits
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <span className='flex items-center px-3 py-1 text-sm'>
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Produit