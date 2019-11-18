

import { animals, fruits, words } from '../resources/resourcesLoad'


export const Tree = [
    {
        title: 'Letras',
        options: [
            {
                enabled: true, title: 'A - G', image: words.a,
                toNavigate: 'Couples', items: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], type: 'letras',
                description: 'Actividad lúdica para aprender letras a traves de repeticiones (7).Se emplea el uso de las letras A hasta la G.'
            },
            {
                enabled: true, title: 'H - N', image: null,
                toNavigate: 'Couples', items: ['h', 'i', 'j', 'k', 'l', 'm', 'n'], type: 'letras',
                description: 'Actividad lúdica para aprender letras a traves de repeticiones (7). Se emplea el uso de las letras H hasta la N.'
            },
            {
                enabled: true, title: 'O - Z', image: null,
                toNavigate: 'Couples', items: ['o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], type: 'letras',
                description: 'Actividad lúdica para aprender letras a traves de repeticiones (7). Se emplea el uso de las letras O hasta la Z.'
            }
        ]
    },

    {
        title: 'Animales',
        options: [
            {
                title: 'Domesticos', image: animals.perro, toNavigate: 'Couples',
                enabled: true, type: 'animals', items: ['Perro', 'Gato', 'Conejo', 'Paloma', 'Ratón']
            },
            {
                title: 'Granja', image: animals.pollo, toNavigate: 'Couples',
                enabled: true, type: 'animals', items: ['Caballo', 'Cabra', 'Cerdo', 'Oveja', 'Pato', 'Pavo', 'Pollo', 'Vaca']
            },
            {
                title: 'Insectos', image: animals.hormiga, toNavigate: 'Couples',
                enabled: true, type: 'animals', items: ['Abeja', 'Cucaracha', 'Caracol', 'Hormiga']
            },
            {
                title: 'Más', image: animals.pulpo, toNavigate: 'Couples',
                enabled: true, type: 'animals', items: ['Alce', 'Castor', 'Llama', 'Pulpo', 'Venado']
            }
        ]
    },
    {
        title: 'Plantas',
        options: [
            { title: 'Frutos', image: null, enabled: true },
            { title: 'Verduras', image: null, enabled: false },
            { title: 'otros', image: null, enabled: false },
        ]
    },
    {
        title: 'Muebles',
        options: [
            { title: 'Sala', image: null, enabled: false },
            { title: 'Cocina', image: null, enabled: false },
            { title: 'Baño', image: null, enabled: false },
            { title: 'Recamara', image: null, enabled: false },
            { title: 'Oficina', image: null, enabled: false },
            // { title: 'Recamara', image: null, enabled: false },

        ]
    },
    {
        title: 'Instrumentos',
        options: [
            { title: 'Electronica', image: null, enabled: false },
            { title: 'Cocina', image: null, enabled: false },
            { title: 'Baño', image: null, enabled: false },
            { title: 'Recamara', image: null, enabled: false },
        ]
    },
    {
        title: 'Numeros',
        options: [
            { enabled: false, title: 'Suma', image: null },
            { enabled: false, title: 'Resta', image: null },
            { enabled: false, title: 'Multiplicación', image: null }
        ]
    },

    // { title: 'Verduras', items: [] }
]