import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Cursos } from "./cursosModels";

@Entity()
export class Profesores {

    @PrimaryGeneratedColumn()
    id : Number;

    @Column()
    dni: String;

    @Column()
    nombre: String;

    @Column()
    apellido: String;

    @Column()
    email: String;
    
    @Column()
    profesion: String;
    
    @Column()
    telefono: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Cursos, (cursos) => cursos.profesor)
    cursos: Cursos[]
}