export type schemaBranch = {
    id: number;
    location: string;
};

export const dataBranch: schemaBranch[] = [
    { id: 1, location: 'Singapura' },
    { id: 2, location: 'Jakarta' },
    { id: 3, location: 'Bandung' },
    { id: 4, location: 'Surabaya' },
];

export const dataLocations = [
    { value: 'Singapura', label: 'Singapura' },
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Bandung', label: 'Bandung' },
    { value: 'Surabaya', label: 'Surabaya' },
];
