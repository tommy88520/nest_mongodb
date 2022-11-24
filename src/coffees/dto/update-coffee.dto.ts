export class UpdateCoffeeDto {
  brand: string;
  category: string;
  cold: string;
  ice: boolean;
  args: string[] = ['milk'];
  price: number;
}
