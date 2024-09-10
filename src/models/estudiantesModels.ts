import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Estudiantes {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}