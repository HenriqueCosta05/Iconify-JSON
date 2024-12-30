# Iconify 

## Intro
Iconify is an open-source icon library that enables developers to manage icon sets efficiently and create custom collections, enhancing performance and code organization.

## Use cases
### Creating custom icon collections
Using `@iconify/tools`, developers can group multiple SVG files into a single JSON file, simplifying the management of extensive icon sets. This approach allows seamless manipulation of icons within a custom component.

### Access to 200+ Open-Source Icon Collections
Iconify includes a wide range of collections such as Lucide, Material UI, MDI, and various community-contributed sets. With this extensive library, finding the perfect icon becomes almost effortless.

### Intuitive Syntax
Iconify features a straightforward syntax that simplifies the process of declaring icons. The following example demonstrates how customizable and easy-to-use Iconify can be through a custom React component:

```
import { Icon } from "@iconify/react";

interface IconProps {
    size: string;
    color?: string;
    icon: string;
}

export default function IconComponent({ size, color, icon }: IconProps) {
    return (
        <Icon
            icon={icon}
            color={color}
            width={size}
        />
    );
    
}
```

```
<IconComponent size="296px" icon="example:react" />
```

### Seamless Integration with Design Tools
Iconify offers plugins for popular design tools like Figma and Sketch, enabling designers to easily browse and insert icons directly into their projects. This integration streamlines the design process by providing quick access to a vast library of icons without leaving the design environment. 
