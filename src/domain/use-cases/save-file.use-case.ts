import fs from "fs";


export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContet: string;
    fileDestination?: string;
    fileName?: string;
}


export class SaveFile implements SaveFileUseCase {

    constructor(  
       /* repositorio: StorageRepository */ 
    ) {}
    
    execute({ 
        fileContet , 
        fileDestination = 'outputs', 
        fileName = 'tabla'
     }: Options ): boolean {
        
    try {
        fs.mkdirSync(fileDestination, { recursive: true });
        fs.writeFileSync(`${ fileDestination }/${ fileName }.txt`, fileContet);
        return true;
     } catch (error) {
        console.error(error);
        return false;
    }
        
 } 
   
}       