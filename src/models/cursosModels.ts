import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Profesores } from "./profesoresModels";
import { Estudiantes } from "./estudiantesModels";

@Entity()
export class Cursos {

    @PrimaryGeneratedColumn()
    id : Number;

    @Column()
    nombre: String;

    @Column('text')
    descripcion: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> Profesores, (profesor) => profesor.cursos)
    @JoinColumn({name: 'profesor_id'})
    profesor: Profesores

    @ManyToMany(()=> Estudiantes)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn: {name: 'curso_id'},
        inverseJoinColumn: {name: 'estudiante_id'}
    })
    estudiantes: Estudiantes[];
}