# Furnify2

## Overzicht

Dit project is een 3D-kamerervaring ontwikkeld met React Three Fiber (R3F) en Vite op Node.js. Het stelt gebruikers in staat om aan de hand van een vragenlijst de kamer te configureren met de verschillende modules van Furnify.

## Repository-indeling

- **/src:** Bevat de broncode van de applicatie.
- **/public/textures:** Bevat de textures gebruikt voor het 3D model.
- **/src/assets:** Bevatten afbeeldingen, logos, etc.
- **/src/components:** Bevatten alle components die met het 3D model te maken hebben.
- **/src/components/contexts:** Bevat context die met het 3D model te maken heeft.
- **/src/components/other:** Bevat modules die geen deel uitmaken van de kamer.
- **/src/components/roomComponents:** Bevat modules die deel uitmaken van de kamer.
- **/src/contexts:** Bevat MyContext.jsx. Deze is bedoelt om de vragenlijst te koppelen.
- **/src/sidebar:** Bevat code voor de sidebar.
- **/src/sidebar/components:** Bevat code voor de componenten van de sidebar.
- **/src/i18n.ts:** Bevat de configuratie voor de internationalisatie.


## Setup

### Compileren en uitvoeren

http://157.193.171.41

**start dev test server (niet om te deployen):**
```bash
npm run dev
```
**installeer node packages**:
```bash
npm install
```
**build for production**:
```bash
npm run build
```
in de root voer deze commando's uit:
```bash
sudo rm -rf /var/www/html/*

sudo cp -r furnify2/project/dist/* /var/www/html
```
**locally preview production build**:
```bash
npm run preview
```

