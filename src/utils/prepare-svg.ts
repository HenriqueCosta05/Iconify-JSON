import { SVG } from '@iconify/tools/lib';
import { promises as fs } from 'fs';
import { join, dirname, basename } from 'path';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'; // Import DOMParser and XMLSerializer

export async function prepareSvg(filePath: string): Promise<SVG> {
    // Lê o conteúdo do arquivo SVG
    const svgContent = await fs.readFile(filePath, 'utf-8');

    // Cria um novo documento SVG usando xmldom
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');

    // Processa e converte as imagens em paths
    const images = doc.getElementsByTagName('image');
    Array.from(images).forEach(image => {
        const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0 0h24v24H0z');
        path.setAttribute('fill', 'currentColor');
        image.parentNode?.replaceChild(path, image);
    });

    // Serializa o documento SVG atualizado
    const serializer = new XMLSerializer();
    const updatedSVGContent = serializer.serializeToString(doc);

    // Cria um novo arquivo SVG
    const dir = dirname(filePath);
    const originalName = basename(filePath, '.svg');
    const newPath = join(dir, `${originalName}-processed.svg`);

    // Salva o novo arquivo SVG
    await fs.writeFile(newPath, updatedSVGContent);

    // Retorna um novo objeto SVG
    return new SVG(updatedSVGContent);
}
