import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  vehicle: string;

  @Column("float")
  rate: number;

  @Column("float")
  minKm: number;

  @Column()
  photoUrl: string;

  @Column()
  vehiclePhotoUrl: string;

  @Column("float")
  reviewRating: number;

  @Column()
  reviewComment: string;
}
