import IconComponent from './components/Icon'
import { addCollection } from '@iconify/react';
import exampleIcons from '../json/custom-icons.json'
function App() {
  addCollection(exampleIcons)
  return (
    <>
      <h1>Teste de Ícones Personalizados - Iconify</h1>
      <IconComponent size="296px" icon="example:react" />
      <IconComponent size="296px" icon="example:1280px-walmart-logo" />
      <IconComponent size="296px" icon="example:2560px-americanas-com-logo" />
      <IconComponent size="296px" icon="example:coca-cola-2021" />
      <IconComponent size="296px" icon="example:ultragaz-1"/>
    </>
  )
}

export default App
