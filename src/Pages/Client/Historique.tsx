import { useState } from 'react'
import { Search, Printer, Trash2, Eye, SendHorizontal, ArrowUpDown, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Types
type ProduitVendu = {
  id: number
  nom: string
  quantite: number
  prixUnitaire: number
  categorie: string
}

type Facture = {
  id: string
  date: Date
  produits: ProduitVendu[]
  montantTotal: number
}

const Historique = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [factureSelectionnee, setFactureSelectionnee] = useState<Facture | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Données factices pour l'exemple
  const factures: Facture[] = [
    {
      id: 'FACT-001',
      date: new Date('2024-01-20'),
      produits: [
        { id: 1, nom: 'Laptop Pro', quantite: 1, prixUnitaire: 1299, categorie: 'Électronique' },
        { id: 2, nom: 'Souris Sans Fil', quantite: 2, prixUnitaire: 45, categorie: 'Accessoires' }
      ],
      montantTotal: 1389
    },
    {
      id: 'FACT-002',
      date: new Date('2024-01-25'),
      produits: [
        { id: 3, nom: 'Clavier Mécanique', quantite: 1, prixUnitaire: 189, categorie: 'Accessoires' },
        { id: 4, nom: 'Écran 4K', quantite: 1, prixUnitaire: 599, categorie: 'Électronique' }
      ],
      montantTotal: 788
    },
    {
      id: 'FACT-003',
      date: new Date('2024-02-10'),
      produits: [
        { id: 5, nom: 'Adaptateur USB-C', quantite: 3, prixUnitaire: 29, categorie: 'Accessoires' }
      ],
      montantTotal: 87
    }
  ]

  // Filtrer les factures
  const facturesFiltrees = factures.filter(facture => {
    const correspondRecherche = facture.id.toLowerCase().includes(searchTerm.toLowerCase())
    const correspondDateDebut = !dateDebut || new Date(facture.date) >= new Date(dateDebut)
    const correspondDateFin = !dateFin || new Date(facture.date) <= new Date(dateFin + 'T23:59:59')

    return correspondRecherche && correspondDateDebut && correspondDateFin
  })

  // Calculer les totaux
  const calculerTotalProduits = (produits: ProduitVendu[]) => {
    return produits.reduce((total, produit) => total + produit.quantite, 0)
  }

  const getNombreCategories = (produits: ProduitVendu[]) => {
    const categories = new Set(produits.map(p => p.categorie))
    return categories.size
  }

  // Gérer l'impression
  const handlePrint = () => {
    window.print()
  }

  // Gérer la suppression
  const handleDelete = (id: string) => {
    console.log('Supprimer la facture', id)
  }

  // Formater la date
  const formaterDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: fr })
  }

  const totalVentes = facturesFiltrees.reduce((sum, f) => sum + f.montantTotal, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-foreground">Historique des Ventes</h1>
          <p className="text-muted-foreground">Consultez et gérez vos factures de vente</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground">Total des factures</div>
            <div className="mt-2 text-3xl font-light text-primary">{facturesFiltrees.length}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground">Montant total</div>
            <div className="mt-2 text-3xl font-light text-primary">{totalVentes.toFixed(2)} €</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground">Produits Totale</div>
            <div className="mt-2 text-3xl font-light text-primary">
              {facturesFiltrees.reduce((sum, f) => sum + calculerTotalProduits(f.produits), 0)}
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-foreground">Filtres</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date de début</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date de fin</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="N° Facture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des factures */}
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-secondary/50 border-secondary/20">
                <TableHead className="font-semibold text-foreground">N° Facture</TableHead>
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Montant Total</TableHead>
                <TableHead className="text-center font-semibold text-foreground">Produits</TableHead>
                <TableHead className="text-center font-semibold text-foreground">Catégories</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facturesFiltrees.map((facture) => (
                <TableRow key={facture.id} className="border-secondary/30 hover:bg-secondary/30">
                  <TableCell className="font-medium text-foreground">{facture.id}</TableCell>
                  <TableCell className="text-muted-foreground">{formaterDate(facture.date)}</TableCell>
                  <TableCell className="text-right font-medium text-primary">
                    {facture.montantTotal.toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {calculerTotalProduits(facture.produits)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                      {getNombreCategories(facture.produits)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFactureSelectionnee(facture)
                          setIsDialogOpen(true)
                        }}
                        className="text-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrint}
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(facture.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {facturesFiltrees.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucune facture trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détail de la facture */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-foreground">
              Détails de la facture {factureSelectionnee?.id}
            </DialogTitle>
          </DialogHeader>

          {factureSelectionnee && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 border-b border-border pb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {formaterDate(factureSelectionnee.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                  <p className="mt-1 text-2xl font-light text-primary">
                    {factureSelectionnee.montantTotal.toFixed(2)} €
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium text-foreground">Produits</h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-secondary/50">
                      <TableRow className="hover:bg-secondary/50 border-secondary/20">
                        <TableHead className="font-semibold text-foreground">Produit</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Quantité</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Prix unitaire</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {factureSelectionnee.produits.map((produit) => (
                        <TableRow key={produit.id} className="border-secondary/30 hover:bg-secondary/30">
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{produit.nom}</div>
                              <div className="text-xs text-muted-foreground">{produit.categorie}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">{produit.quantite}</TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {produit.prixUnitaire.toFixed(2)} €
                          </TableCell>
                          <TableCell className="text-right font-medium text-primary">
                            {(produit.quantite * produit.prixUnitaire).toFixed(2)} €
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDelete(factureSelectionnee.id)
                    setIsDialogOpen(false)
                  }}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handlePrint}
                  >
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Envoyer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Historique
