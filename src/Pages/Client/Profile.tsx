import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Save, X, Eye, EyeOff } from 'lucide-react';

type ProfileFormData = {
  nom: string;
  email: string;
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
  confirmerMotDePasse: string;
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    defaultValues: {
      nom: 'John Doe', // Remplacer par les données de l'utilisateur connecté
      email: 'john.doe@example.com', // Remplacer par les données de l'utilisateur connecté
    }
  });


  const onSubmit = (data: ProfileFormData) => {
    console.log('Données du formulaire:', data);
    // Ici, vous ajouterez la logique pour mettre à jour le profil
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carte d'information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="nom"
                        disabled={!isEditing}
                        className="pl-10"
                        {...register('nom', { required: 'Le nom est requis' })}
                      />
                    </div>
                    {errors.nom && (
                      <p className="text-sm text-red-500">{errors.nom.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        disabled={!isEditing}
                        className="pl-10"
                        {...register('email', {
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Adresse email invalide"
                          }
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {isEditing && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="ancienMotDePasse">Ancien mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="ancienMotDePasse"
                            type={showPassword ? 'text' : 'password'}
                            className="pl-10"
                            {...register('ancienMotDePasse', {
                              minLength: {
                                value: 6,
                                message: "Le mot de passe doit contenir au moins 6 caractères"
                              }
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.ancienMotDePasse && (
                          <p className="text-sm text-red-500">{errors.ancienMotDePasse.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nouveauMotDePasse">Nouveau mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="nouveauMotDePasse"
                            type={showNewPassword ? 'text' : 'password'}
                            className="pl-10"
                            {...register('nouveauMotDePasse', {
                              minLength: {
                                value: 6,
                                message: "Le mot de passe doit contenir au moins 6 caractères"
                              }
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.nouveauMotDePasse && (
                          <p className="text-sm text-red-500">{errors.nouveauMotDePasse.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmerMotDePasse">Confirmer le nouveau mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="confirmerMotDePasse"
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="pl-10"
                            {...register('confirmerMotDePasse', {
                              validate: (value, formValues) =>
                                value === formValues.nouveauMotDePasse || "Les mots de passe ne correspondent pas"
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirmerMotDePasse && (
                          <p className="text-sm text-red-500">{errors.confirmerMotDePasse.message}</p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-4 pt-4">
                    {isEditing ? (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer les modifications
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Modifier le profil
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Paramètres */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
                <CardDescription>Personnalisez votre expérience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Les préférences de thème ont été désactivées.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Changer d'email
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Désactiver le compte
                </Button>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              <p>Dernière connexion: Il y a 2 heures</p>
              <p>Compte créé le: 15 Jan 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;