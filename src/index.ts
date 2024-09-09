import app from "./app";
import { AppDataSource } from "./db/conexion";

const main = async () =>{
    try {
        await AppDataSource.initialize();
        console.log("API conectada");
        
        app.listen(4545, ()=>{

            console.log("Server activo con TS");
            
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            
        }
    }
    
};

main();