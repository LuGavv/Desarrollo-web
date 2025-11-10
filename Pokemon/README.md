# Pokémon Invocator

Una aplicación web interactiva para invocar y visualizar Pokémon en 3D.

## Características

- Visualización de Pokémon con datos de la PokéAPI
- Modelos 3D interactivos usando model-viewer
- Filtrado por tipos de Pokémon
- Efectos de sonido al invocar
- Diseño responsive
- Paginación infinita

## Requisitos Previos

- Node.js (v14 o superior)
- npm (viene con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd pokemon-invocator
```

2. Instala las dependencias:

Para PowerShell (si encuentras errores de permisos):
```powershell
# Abre PowerShell como administrador y ejecuta:
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
```

Para CMD:
```cmd
npm install
```

## Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

El proyecto estará disponible en: http://localhost:5173

## Compilación para Producción

```bash
npm run build
npm run preview
```

## Tecnologías Utilizadas

- React
- Vite
- PokéAPI
- model-viewer
- CSS Modules

## Estructura del Proyecto

```
src/
  ├── components/
  │   ├── PokemonCard.jsx
  │   ├── PokemonList.jsx
  │   └── PokemonDetail.jsx
  ├── services/
  │   └── api.js
  ├── styles/
  │   └── styles.css
  ├── App.jsx
  └── main.jsx
public/
  ├── models/
  │   └── [modelos 3D]
  └── sounds/
      └── [efectos de sonido]
```

## Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Agradecimientos

- [PokéAPI](https://pokeapi.co/) por proporcionar los datos de Pokémon
- [model-viewer](https://modelviewer.dev/) por el visor 3D