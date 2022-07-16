export class CreateTrackDto {
  readonly name: string;
  readonly artistId?: string;
  readonly albumId?: string;
  readonly duration?: number;
}
