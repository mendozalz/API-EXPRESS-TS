import { DataSource } from "typeorm";
import { Profesores } from "../models/profesoresModels";
import { Estudiantes } from "../models/estudiantesModels";
import { Cursos } from "../models/cursosModels";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "expressts",
    password: "71365208",
    database: "tsexpress",
    logging: true,
    entities: [Cursos, Estudiantes, Profesores],
    synchronize: true
})