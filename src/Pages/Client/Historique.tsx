import { useState } from 'react';
import { Search, Printer, Trash2, Eye,SendHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '@/components/ui/card';

// Types
type ProduitVendu = {
  id: number;
  nom: string;
  quantite: number;
  prixUnitaire: number;
  categorie: string;
};

type Facture = {
  id: string;
  date: Date;
  produits: ProduitVendu[];
  montantTotal: number;
};

const Historique = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [factureSelectionnee, setFactureSelectionnee] = useState<Facture | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    // Ajoutez plus de factures ici
  ];

  // Filtrer les factures
  const facturesFiltrees = factures.filter(facture => {
    const correspondRecherche = facture.id.toLowerCase().includes(searchTerm.toLowerCase());
    const correspondDateDebut = !dateDebut || new Date(facture.date) >= new Date(dateDebut);
    const correspondDateFin = !dateFin || new Date(facture.date) <= new Date(dateFin + 'T23:59:59');
    
    return correspondRecherche && correspondDateDebut && correspondDateFin;
  });

  // Calculer les totaux
  const calculerTotalProduits = (produits: ProduitVendu[]) => {
    return produits.reduce((total, produit) => total + produit.quantite, 0);
  };

  const getNombreCategories = (produits: ProduitVendu[]) => {
    const categories = new Set(produits.map(p => p.categorie));
    return categories.size;
  };

  // Gérer l'impression
  const handlePrint = () => {
    // Logique d'impression
    window.print();
  };

  // Gérer la suppression
  const handleDelete = (id: string) => {
    // Logique de suppression
    console.log('Supprimer la facture', id);
  };

  // Formater la date
  const formaterDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Historique des Ventes</h1>
        
        {/* Filtres */}
        <div className=" p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <Input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <Input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher une facture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des factures */}
        <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 fon-bold">
                <tr >
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      N° Facture
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Montant Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Produits
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Catégories
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facturesFiltrees.map((facture) => (
                  <tr key={facture.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {facture.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formaterDate(facture.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {facture.montantTotal.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculerTotalProduits(facture.produits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {getNombreCategories(facture.produits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFactureSelectionnee(facture);
                          setIsDialogOpen(true);
                        }}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        className="text-gray-600 hover:bg-gray-50"
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Imprimer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(facture.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal de détail de la facture */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Détails de la facture {factureSelectionnee?.id}</span>
              
            </DialogTitle>
          </DialogHeader>
          
          {factureSelectionnee && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formaterDate(factureSelectionnee.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold">{factureSelectionnee.montantTotal.toFixed(2)} €</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-4">Produits</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produit
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix unitaire
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {factureSelectionnee.produits.map((produit) => (
                        <tr key={produit.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {produit.nom}
                            <p className="text-xs text-gray-500">{produit.categorie}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {produit.quantite}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {produit.prixUnitaire.toFixed(2)} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            {(produit.quantite * produit.prixUnitaire).toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between space-x-4 pt-4 border-t border-gray-200">
               
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(factureSelectionnee.id);
                    setIsDialogOpen(false);
                  }}
                  className="flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                <div className='flex gap-2'>
                   <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="flex items-center border-lime-200"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>

                 <Button
                  variant="default"
                  onClick={handlePrint}
                  className="flex items-center bg-blue-500 text-white hover:bg-blue-800"
                >
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  
                 Envoyer
                </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Historique;