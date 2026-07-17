import { constants } from "node:buffer";

interface product {
    id: number;
    name: string;
    description: string;
    price: string;
}

export const addedProducts: product[] = [
    {
        id: 4,
        name: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        price: '$29.99'
    },
    {
        id: 0,
        name: 'Sauce Labs Bike Light',
        description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        price: '$9.99'
    }
]