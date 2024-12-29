import { promises as fs } from 'fs';
import { dirname } from 'path';

import {
    importDirectory,
    cleanupSVG,
    parseColors,
    isEmptyColor,
    runSVGO,
} from '@iconify/tools';
import { fileURLToPath } from 'url';

// Arquivo JSON onde os ícones serão salvos
const target = 'json/custom-icons.json';

// Diretório de origem dos ícones SVG
const sourceSVGDir = dirname(fileURLToPath(import.meta.url)) + '/../assets';

// Prefixos para os ícones
const prefix = 'example';



// Importa os ícones do diretório e salva em um arquivo JSON
(async function () {
    // Importar os ícones do diretório
    const iconSet = await importDirectory(sourceSVGDir, {
        prefix,
        ignoreImportErrors: true,
    });

    // Valida, limpa e otimiza os ícones
    await iconSet.forEach((name, type) => {
        if (type !== 'icon') {
            return;
        }

        // Obtém o SVG para converter
        const svg = iconSet.toSVG(name);
        if (!svg) {
            // Ícone inválido
            iconSet.remove(name);
            return;
        }

        // Limpa o código do ícone e substitui a cor pelo currentColor, adicionando se estiver faltando
        try {
            // Cleanup
            cleanupSVG(svg);

            // Substitui a cor pelo currentColor, mantendo cores inválidas
            parseColors(svg, {
                defaultColor: 'currentColor',
                callback: (attr, colorStr, color) => {
                    return !color || isEmptyColor(color) ? colorStr : 'currentColor';
                },
            });

            // Otimização
            runSVGO(svg);
        } catch (err) {
            // Ícone inválido
            console.error(`Error ao otimizar e inserir o ícone ${name} no JSON:`, err);
            iconSet.remove(name);
            return;
        }

        // Salva o ícone otimizado
        iconSet.fromSVG(name, svg);
    });
    console.log(`Total de ícones importados: ${iconSet.count()}`);

    // Exporta os ícones para JSON e salva no arquivo
    const output = JSON.stringify(iconSet.export(), null, '\t');

    // Cria diretório se não existir
    const dir = dirname(target);
    try {
        await fs.mkdir(dir, {
            recursive: true,
        });
    } catch (err) {
        console.error(`Erro ao criar diretório ${dir}:`, err);
    }

    // Salvar no JSON
    await fs.writeFile(target, output, 'utf8');

})().catch((err) => {
    console.error(err);
});