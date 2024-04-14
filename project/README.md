<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-pkgname-)

# ➤ furnify2

Welkom op furnify2. Dit is versie 2.0.0!

Dit project is een 3D-kamerervaring ontwikkeld met React Three Fiber (R3F) en Vite op Node.js. Het stelt gebruikers in staat om aan de hand van een vragenlijst de kamer te configureren met de verschillende modules van Furnify.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ furnify2](#-furnify2)
	* [➤ Repository-indeling](#-repository-indeling)
	* [➤ Developer server opstarten](#-developer-server-opstarten)
	* [➤ Tests Uitvoeren](#-tests-uitvoeren)
			* [Zonder beeld](#zonder-beeld)
			* [Met beeld](#met-beeld)
	* [➤ Productie-omgeving deployen](#-productie-omgeving-deployen)
		* [Applicatie bereiken:](#applicatie-bereiken)
		* [Applicatie deployen op de server](#applicatie-deployen-op-de-server)
			* [Op de server:](#op-de-server)
	* [➤ Contributors](#-contributors)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#repository-indeling)

## ➤ Repository-indeling

- **/public/textures/:** Bevat de textures gebruikt voor het 3D model.
- **/public/models/:** Bevat de models gebruikt voor het 3D model.
- **/src/:** Bevat de broncode van de applicatie.
  - **/src/3D/:** Bevat alle 3D componenten.
    - **/src/3D/Draggables/:** Bevat alle versleepbare 3D componenten.
    - **/src/3D/models/:** Bevat alle meshes van de models uit /public/models.
    - **/src/3D/other/:** Bevat alle andere 3D componenten.
    - **/src/3D/roomComponents/:** Bevat alle 3D componenten nodig voor de kamer.
    - **/src/3D/Scene.jsx:** Bevat de compositie van de 3D scene die wordt getoond op het canvas.
  - **/src/algorithm/:** Bevat algoritme componenten.
    - **/src/algoritm/module_choise.ts:** Bevat code voor bepalen van correcte module.
    - **/src/algoritm/module.ts:** Klasse voor de modules met getters en bepalingfuncties.
    - **/src/algoritm/read_file_csv.ts:** Bevat code voor inlezen van csv bestand.
  - **/src/assets/:**  Bevat afbeeldingen.
  - **/src/contexts/:** Bevat contexten (data die realtime aangepast en gebruikt kan worden in de volledige applicatie).
  - **/src/sidebar/:** Bevat sidebar componenten.
    - **/src/sidebar/components_sidebar/:** Bevat componenten gebruikt in de sidebar.
    - **/src/sidebar/Sidebar.jsx:** Bevat de sidebar compositie.
  - **/src/App.jsx:** React app.
  - **/src/i18.ts:** Internationalisatie configuratie.
  - **/src/main.jsx:** Bevat React app met alle contextproviders.
- **/index.html** Bevat de html index.
- **/README.md** Bevat de README, gegenereerd door blueprint.md.
**Config:**
- **/blueprint.md** Genereerd de README.
- **/cypress.config.cjs** Configuratie van testen.
- **/package.json** Packages.
- **/vite.config.js** Vite configuratie.



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#developer-server-opstarten)

## ➤ Developer server opstarten

**start dev server:**
```bash
npm run dev
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#tests-uitvoeren)

## ➤ Tests Uitvoeren

#### Zonder beeld
**start dev test server (niet om te deployen):**
```bash
npm run dev
```
**voer de tests uit:**
```bash
npm run testViewless
```
#### Met beeld
```bash
npm run dev
```
**voer de tests uit:**
```bash
npm run test
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#productie-omgeving-deployen)

## ➤ Productie-omgeving deployen

### Applicatie bereiken:

Productie is gedeployed op: http://157.193.171.41

### Applicatie deployen op de server

#### Op de server:
**installeer node packages**:
```bash
npm install
```
**build for production**:
```bash
npm run build
```
In de root van de server voer deze commando's uit:
```bash
sudo rm -rf /var/www/html/*

sudo cp -r furnify2/project/dist/* /var/www/html
```
**locally preview production build**:
```bash
npm run preview
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Wiebe Vandendriessche" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/393/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/wievdndr) | [<img alt="Thomas Lonneville" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/373/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/tlonnevi) | [<img alt="Xander Vanparys" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/376/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/xvparys) | [<img alt="Alexandra Ganseman" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/268/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/algansem) | [<img alt="Nathan Salabiaku" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/301/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/nathan.s) |
|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|
| [Wiebe Vandendriessche](https://gitlab.stud.atlantis.ugent.be/wievdndr) | [Thomas Lonneville](https://gitlab.stud.atlantis.ugent.be/tlonnevi) | [Xander Vanparys](https://gitlab.stud.atlantis.ugent.be/xvparys) | [Alexandra Ganseman](https://gitlab.stud.atlantis.ugent.be/algansem) | [Nathan Salabiaku](https://gitlab.stud.atlantis.ugent.be/nathan.s) |
| 🔥                                               | 🔥                                               | 🔥                                               | 🔥                                               | 🔥                                               |
