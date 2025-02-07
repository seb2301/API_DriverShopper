import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column("float")
  distance: number;

  @Column()
  duration: string;

  // Armazena informações do motorista – aqui optei por guardar ID e nome separadamente
  @Column()
  driverId: number;

  @Column()
  driverName: string;

  @Column("float")
  value: number;

  @CreateDateColumn()
  date: Date;
}
