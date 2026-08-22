# Pointeurs

::: info
Si vous connaissez déjà bien la programmation, vous risquerez parfois d'avoir envie de **hurler** en lisant ce mini cours. C'est normal, vous n'êtes pas le public cible :D 

Le but de ce rappel est de permettre à des néophytes de mettre des mots sur des concepts pas forcément évidents et de mieux comprendre pourquoi il faut faire telle ou telle action quand on navigue dans la mémoire des programmes. C'est volontairement assez généraliste, on ne va pas évoquer les cas particuliers et trop complexes mais plutôt la logique de fonctionnement générale.
:::

## Valeur Adresse et Pointeur, qui fait quoi ?

Je veux caler une petite explication ici pour différencier `Valeur`, `Adresse` et `Pointeur`.

Ci-dessous un exemple de code où on déclare un type de données `Camera` ainsi qu'une variable qui va contenir une nouvelle instance de type `Camera` :

```cpp
struct Camera {
    float fov;
    float x;
    float y;
    float z;
};

Camera* playerCamera = new Camera(); // On note `Camera*` (avec l'astérisque) pour indiquer que la variable est un pointeur
```

Dans cet exemple, `playerCamera` est un **pointeur** vers une structure de type `Camera`. Ce qui veut dire que la **valeur** de `playerCamera` est une **adresse** mémoire (celle de l'emplacement de notre structure `Camera`). On est habitué à ce que les valeurs des variables soient des valeurs classiques (des chiffres, des caractères, etc.) mais ici, ce n'est pas une valeur de ce genre qu'elle contient mais bien l'adresse à laquelle se trouve la valeur (voyez un peu la gymnastique mentale à faire).


## Pourquoi les pointeurs ? Ça sert vraiment ces trucs ?

En code, on stock nos données dans des variables de types **primitifs** tels que :

| Type    | Description                                          | Plage de valeurs                                     | Taille en mémoire |
| ------- | ---------------------------------------------------- | ---------------------------------------------------- | ----------------- |
| integer | Nombre entier                                        | de -2147483647 à 2147483647                          | 4 octets          |
| char    | 1 caractère                                          |                                                      | 1 octet           |
| float   | Nombre à virgule flottante                           | de 1,175494351e-38F à 3,402823466e+38F               | 4 octets          |
| double  | Nombre à virgule flottante mais beaucoup plus précis | de 2.2250738585072014e-308 à 1.7976931348623158e+308 | 8 octets          |

::: tip
La taille de ces types de variables est particulièrement importante lorsque l'on se déplace dans la mémoire. Comme une valeur prend de la place en mémoire, la taille et l'adresse à laquelle elle se trouve sont intrinsèquement liés.

Nous verrons un peu plus bas pourquoi connaître cette taille est importante quand on a une structure et que l'on veut lire une ou plusieurs valeurs.
:::


Sauf qu'avec la complexité croissante des programmes d'aujourd'hui, on a besoin de s'organiser un peu mieux. C'est pour ça que l'on fait souvent des structures ou des objets qui vont porter plusieurs variables. Comme des conteneurs qui vont porter une notion bien concrète (Joueur, Caméra, Arme, etc.) et être plus parlant pour l'humain qui va écrire le code (le programme final, lui, s'en fiche éperdument).

Par exemple :
```cpp
struct Camera {
    float fov;
    float x;
    float y;
    float z;
};
```

On voit que l'on n'est pas sur un type primitif classique dans ce genre de cas, on est sur un regroupement de variables que le développeur a décidé de mettre ensemble pour plus de clarté et de facilité d'utilisation.

Une structure de ce genre contiendra généralement plusieurs variables regroupées au même endroit en mémoire. Pour y accéder, le programme peut soit utiliser directement la structure (comme si c'était un type classique), soit utiliser un pointeur qui contient **l'adresse de cette structure**.

```cpp
Camera playerCamera;  // la structure est directement stockée dans `playerCamera`
Camera* playerCamera; // `playerCamera` contient l'adresse d'une structure Camera, les données de la structure sont ailleurs et `playerCamera` ne sert qu'à connaître l'emplacement de ces données // [!code highlight]
```

Le cas qui nous intéresse ici est la seconde ligne, c'est aussi le plus fréquent.

Quand on voudra accéder au FOV (donc `playerCamera` -> `fov`), on fera en fait la gymnastique suivante :
1. Lire la valeur du pointeur `playerCamera` ==> renvoie l'adresse mémoire de la structure : `0x12345678`
1. Lire de `0x12345678 + 0x0` à `0x12345678 + 0x3` ==> **Pourquoi de 0x0 à 0x3 ?** Car notre variable `fov` est un float et un float mesure 4 octets, il nous faut donc lire les 4 premiers octets de la structure


Pour compléter sur le fait de devoir lire 4 octets afin d'obtenir le float, voici une représentation du stockage de la structure en mémoire :
```cpp
/* Structure Camera située à 0x12345678 */

// Le float `fov` occupe 4 octets à partir de 0x12345678
0x12345678 ┐
0x12345679 │
0x1234567A │ = les 4 octets du float fov
0x1234567B ┘

// Le float `x` commence à l'offset 0x4
0x1234567C ┐
0x1234567D │
0x1234567E │ = les 4 octets du float x
0x1234567F ┘

// Le float `y` commence à l'offset 0x8
0x12345680 ┐
0x12345681 │
0x12345682 │ = les 4 octets du float y
0x12345683 ┘

// Le float `z` commence à l'offset 0xC
0x12345684 ┐
0x12345685 │
0x12345686 │ = les 4 octets du float z
0x12345687 ┘
```
> Adresse de la structure + offset = adresse de début de la variable.
> La variable occupe ensuite l'espace mémoire correspondant à son type.

::: tip
Dans ce cas précis, notre adresse de structure est également notre adresse de FOV car il s'agit de la première variable. Ce sera rarement le cas en pratique (ce serait un vrai coup de bol que la variable qui nous intéresse soit la première variable de sa structure). Donc très souvent, on accédera à notre variable avec un décalage (`offset`).

Cas concret si on veut lire la valeur de `x` qui est la seconde variable de la structure, il faudra lire de `0x12345678 + 0x4` à `0x12345678 + 0x7`.
:::

Et ça se retrouve dans les pointeurs de Cheat Engine ! On va chercher une valeur et quand on va chercher ses pointeurs, on trouvera par exemple :
- `0x12345678` -> `0xC` -> `0x4`

On peut le schématiser de la façon suivante :
```
Adresse de Player
    └── offset 0xC
          └── pointeur vers Camera
                └── offset 0x4
                      └── valeur fov
```
> Cheat Engine suit le chemin étape par étape : il utilise un offset, lit éventuellement un pointeur, puis utilise l'adresse obtenue pour continuer.

Ça voudra dire que la valeur que l'on cherche se trouve derrière un code qui doit ressembler à ça :
::: code-group
```cpp [main.cpp]
Player* player; // contient 0x12345678
```

```cpp [player.cpp]
struct Player {
    int health; // 0x0
    int armor;  // 0x4
    float speed; // 0x8
    Camera* camera; // 0xC // [!code highlight]
};
```

```cpp [camera.cpp]
struct Camera {
    int camera_type; // 0x0
    float fov; // 0x4 // [!code highlight]
    float x; // 0x8
    float y; // 0xC
    float z; // 0x10
};
```
:::


## Pourquoi ça permet de retrouver sa variable même après avoir fermé le programme

Pour plusieurs raisons, beaucoup de données du jeu vont complètement changer d'adresses mémoire à chaque lancement. **Toutes** ? Non ! Des variables particulières (globales, statiques, en singleton, etc.) peuvent reprendre la même adresse à chaque chargement. Et ces variables vont devenir notre point d'entrée vers les valeurs qui nous intéressent réellement.

Par exemple, si on reprend le cas du joueur et de sa caméra, il y a fort à parier que le joueur soit une variable globale car il va être utilisé partout tout le long du jeu (ou alors il fera partie d'un autre système qui, lui, sera global ou statique).

Retrouver l'adresse mémoire de la structure `Player`, c'est s'assurer de retrouver le FOV en suivant le chemin des pointeurs.

L'adresse finale de la variable peut changer après un redémarrage, mais la manière d'y accéder peut rester identique : même point de départ, mêmes offsets et mêmes niveaux de pointeurs.
