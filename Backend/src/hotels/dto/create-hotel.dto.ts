export class CreateHotelDto {
  img: string;
  name: string;
  location: string;
  desc: string;
  comments: { text: string; number: number };
  price: number;
  roomDetail: string[] = [
    'wifi',
    'smoking',
    'kitchen',
    'laundry',
    'parking',
    'pet',
  ];
}
