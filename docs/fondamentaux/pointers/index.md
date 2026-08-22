# Pointeurs

# Les pointeurs mémoire, c'est quoi ?

> C'est un petit rappel rapide sur pourquoi les pointeurs existent et sont importants.

En code, on stock nos données dans des variables de types primitifs tels quel :
- `integer` : nombre entier de -2147483647 à 2147483647 (a une taille de **4 octets**)
- `char` : 1 caractère (a une taille de **1 octet**)
- `float` : nombre à virgule flottante de 1,175494351e-38F à 3,402823466e+38F (a une taille de **4 octets**)
- `double` : nombre à virgule flottante mais beaucoup plus précis de 2.2250738585072014e-308 à 1.7976931348623158e+308 (a une taille de **8 octets**)

Bon c'est bien mais avec la complexité des programmes d'aujourd'hui, on a besoin de s'organiser un peu mieux. C'est pour ça qu'on fait souvent des structures ou des objets qui vont porter plusieurs variables, comme des conteneurs.

Par exemple :
```cpp
struct Camera {
    float fov;
    float x;
    float y;
    float z;
};
```

On voit que l'on n'est pas sur un type primitif classique dans ce genre de cas, on ne peut pas juste dire qu'une variable a pour valeur "toute la structure". A la place, la variable sera une référence vers l'adresse mémoire de la structure, ce sera un pointeur :

```cpp
Camera* playerCamera; // Contient en fait une adresse mémoire. En code ça se gère avec des symboles particulier (`*`, `->`) pour dire au programme de ne pas lire la valeur (adresse) mais d'aller chercher ce qui se trouve derrière cette valeur
```

Quand on voudra accéder au FOV (donc `playerCamera->fov`), on fera en fait la gymnastique suivante :
- Lire la valeur de la variable `playerCamera` ==> renvoie l'adresse mémoire de la structure : `0x12345678`
- Lire de `0x12345678 + 0x0` à `0x12345678 + 0x3` ==> **Pourquoi de 0x0 à 0x3 ?** Car notre variable `fov` est un float et un float mesure 4 octets, il nous faut donc lire les 4 premiers octets de la structure
- Transformer cette valeur binaire en `float` et nous la retourner

Voici une représentation du stockage de la structure en mémoire :
```
// Structure Camera située à 0x12345678
0x12345678 = float fov
0x12345679 = float fov
0x1234567A = float fov
0x1234567B = float fov
//
0x1234567C = float x
0x1234567D = float x
0x1234567E = float x
0x1234567F = float x
//
0x12345680 = float y
0x12345681 = float y
0x12345682 = float y
0x12345683 = float y
//
0x12345684 = float z
0x12345685 = float z
0x12345686 = float z
0x12345687 = float z
```

Petite note. Dans ce cas précis, notre adresse de structure est également notre adresse de FOV car il s'agit de la première variable. Ce sera rarement le cas en pratique (ce serait un vrai coup de bol que la variable qui nous intéresse soit la première variable de sa structure). Donc très souvent, on accédera à notre variable avec un décalage (`offset`). Cas concret si on veut lire la valeur de `x` qui est la seconde variable de la structure, il faudra lire de `0x12345678 + 0x4` à `0x12345678 + 0x7`.

Et ça se retrouve dans les pointeurs de Cheat Engine ! On va chercher une valeur et quand on va chercher ses pointeurs, on trouvera par exemple :
- `0x12345678` + `0xC` + `0x4`

Ça voudra dire que la valeur que l'on cherche se trouve derrière un code qui doit ressembler à ça :
```cpp
// main.cpp
Player* player; // contient 0x12345678

// player.cpp
struct Player {
    int health; // 0x0
    int armor;  // 0x4
    float speed; // 0x8
    Camera* camera; // 0xC
}

// camera.cpp
struct Camera {
    int camera_type; // 0x0
    float fov; // 0x4
    float x; // 0x8
    float y; // 0xC
    float z; // 0x10
};
```

# Pourquoi ça permet de retrouver sa variable même après avoir fermé le programme

Pour plusieurs raisons, toutes les données du jeu vont complètement changer d'adresses mémoire à chaque lancement. **Toutes** ? Non ! Les variables globales et statiques reprennent la même adresse à chaque chargement. Et ces variables vont devenir notre point d'entrée vers les valeurs qui nous intéressent réellement.

Par exemple, si on reprend le cas du joueur et de sa caméra, il y a fort à parier que le joueur soit une variable globale car il va être utilisé partout tout le long du jeu (ou alors il fera partie d'un autre système qui, lui, sera global ou statique).

Retrouver l'adresse mémoire de la structure `Player`, c'est s'assurer de retrouver le FOV en suivant le chemin des pointeurs.
