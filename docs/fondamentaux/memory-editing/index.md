# Memory Editing

# C'est quoi ?
> La mémoire du processus contient tout ce qui est utilisé par le programme pour fonctionner.

La pratique du `memory editing` consiste à ouvrir la mémoire d'un processus en mode écriture et à chercher/remplacer les valeurs. La mémoire contient tout à propos du programme, que ce soit ses variables ou même son code (les instructions assembleurs).

Ainsi on sera capable via cette technique de réaliser des choses comme :
- modifier le nombre de munitions dans un jeu (la quantité de munition étant stockée dans une variable)
- faire en sorte de ne pas perdre de munitions en tirant (la logique de décrémentation de munitions étant une suite d'opérations effectuées en assembleur pour décrémenter la variable)

# Mémoire et code assembleur

Sur la partie modification de la logique du programme (comme pour ne pas perdre de munitions en tirant), on se rapproche beaucoup de ce que l'on fait en [désassemblant](../../fondamentaux/desassembler/) un programme. On va modifier directement le code assembleur et altérer le fonctionnement du programme. C'est la base de fonctionnement de pas mal de cracks notamment, où on va bypasser le code effectuant la vérification de license.

La grosse différence entre `désassembler` et `modifier en mémoire` est que l'on n'intervient pas au même moment dans la vie du programme. Désassembler va permettre de `patcher` le programme et d'avoir un fonctionnement définitif dès son lancement (très pratique pour le partager). Modifier en mémoire va charger le programme `intact` en mémoire, puis appliquer les modifications.

Concrètement on va privilégier un patch du fichier binaire pour un crack, et une édition en mémoire pour de la triche.
