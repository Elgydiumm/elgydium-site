import { technologies } from "./data/technologies";

export function findTechDetails(techName: string) {
    const tech = technologies.find(t => t.name.toLowerCase() === techName.toLowerCase());
    return tech || { name: techName, color: null, icon: null };
}

export function hexToRgb(hex: string) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
}