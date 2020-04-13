export function isOccupancyAllowed(occupancy: string, propertyOccupancy: number): boolean {
  if (!occupancy || !propertyOccupancy) {
    return false;
  } else {
    const current = Number(occupancy);
    return (current > propertyOccupancy);
  }
}
