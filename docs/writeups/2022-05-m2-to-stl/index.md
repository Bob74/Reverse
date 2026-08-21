
<img src="./medias/m2_stl.png" style="height: 300px"/>


# Conversion d'un modèle .M2 vers .STL

Conversion d'un modèle 3D issu du jeu World of Warcraft vers un format imprimable en 3D.

# Prérequis
- Commencer par télécharger le jeu dans sa dernière version (créer un compte d'essai gratuit si nécessaire) :
  - https://worldofwarcraft.com/fr-fr/start
- Wow Model Viewer dernière version impérativement :
  - https://wowmodelviewer.net/download/
- Blender :
  - https://www.blender.org/download/
- 3D Builder (ou votre slicer habituel) :
  - https://apps.microsoft.com/store/detail/3d-builder/9WZDNCRFJ3T6?hl=fr-fr&gl=FR
- WowHead (base de donnée d'objets dans Wow, permet de retrouver des items plus facilement que dans Wow Model Viewer) :
  - https://fr.wowhead.com/items

# Wow Model Viewer
## Utilisation
- Choisir un personnage (ou autre modèle 3D)
- Pour les personnages, prendre le nom qui se termine en **\_hd** et pas en **\_hd\_sdr** :  
![image](medias/m2-wowmodelviewer-view.png)

## Export du modèle 3D
- Exporter le modèle au format **.obj** :  
![image](medias/m2-wowmodelviewer-export.png)


# Blender
## Utilisation

![image](medias/m2-blender-base.png)

### Général
| Commande | Description  |
| -------- | ------------ |
| Clic molette | Tourner la caméra |
| Maj+Clic molette | Bouger la caméra |

### Mode Édition
| Commande | Description  |
| -------- | ------------ |
| Maj+Sélectionner | Ajouter à la sélection |
| Ctrl+Sélectionner | Soustraire à la sélection |


## Import du modèle
- Commencer par supprimer le cube qui est créé par défaut
- Importer le modèle 3D exporté auparavant :  
![image](medias/m2-blender-import.png)

## Correction du modèle
- Le modèle peut avoir des problèmes suite à l'export, pour vérifier ça, on passe en mode édition (Edit Mode), on se met en type de sélection "Face", on clic sur une face du modèle et on la déplace :  
![image](medias/m2-blender-check-corupted.png)
- Un exemple de modèle corrompu (les faces ne sont pas reliées en elles) : 
![image](medias/m2-blender-corrupted.png)
- Pour corriger ce problème : 
  - Passer en mode de sélection "Points"
  - Faire "A" (*Sélectionner tous les points*)
  - Faire "M" (*Merge vertices*)
  - Faire "B" (*By distance*)
- Un message devrait apparaître pour confirmer la fusion des points qui sont superposés :  
![image](medias/m2-blender-merge-vertices.png)
- On déplace une face pour confirmer qu'elle est bien attachée au reste :  
![image](medias/m2-blender-fixed.png)

## Lisser le modèle
- Sélectionner les faces que l'on veut lisser (voir tout sélectionner avec la touche "A")
- Ici je choisi tout sauf le visage qui est déjà très détaillé
- Faire clic-droit -> "Subdivide"
![image](medias/m2-blender-smooth-1.png)
- Les options pour la division vont s'afficher en bas à gauche de l'écran :  
![image](medias/m2-blender-smooth-2.png)
- Maintenant que le modèle a plus de faces, on peut les lisser (toujours avec les faces que l'ont veut lisser sélectionnées) :  
![image](medias/m2-blender-smooth-3.png)
- "Mais ! Mon modèle est devenu tout dégueulasse en rendu !"  
![image](medias/m2-blender-smooth-4.png)
- Alors déjà ça donne un style, et ensuite oui mais c'est facilement fixable ! Ce sont les normales des faces qui ne sont plus correctement alignées et donc le calcul des ombres se fait mal
  - Sélectionner toutes les faces du modèle
  - Menu "Mesh" -> "Normals" -> "Recalculate Outside"
  - Puis menu "Mesh" -> "Normals" -> "Set from faces"
![image](medias/m2-blender-fix-normals.png)
- ~A noter que ceci ne gêne en rien pour l'impression, c'est seulement gênant dans les moteurs de rendu 3D qui ont besoin des normales pour calculer des effets~ EDIT : ⚠️ C'est bien un paramètre dont les slicer tiennent compte pour l'impression ! Il est important de corriger le sens des normales avant l'export.

- Résultat du lissage :  
![image](medias/m2-blender-smooth-before.png)
![image](medias/m2-blender-smooth-after.png)


## Exporter le modèle au format STL

Il faut maintenant exporter le modèle depuis Blender et l'importer dans 3D Builder pour qu'il soit préparé à l'impression et mis aux dimensions voulues

### Blender
![image](medias/m2-blender-export.png)

### 3D Builder
- Importer le modèle STL dans 3D Builder
- Cliquer sur le warning de correction du modèle qui apparaît en bas à droite :  
![image](medias/m2-3dbuilder-fix.png)

Le modèle peut être déformé après la correction effectuée, vérifier s'il est toujours correct.

- Cliquer sur le modèle pour le redimensionner :  
![image](medias/m2-3dbuilder-scale.png)
- Une autre option intéressante du logiciel est de rendre le modèle creux :  
![image](medias/m2-3dbuilder-hollow.png)



