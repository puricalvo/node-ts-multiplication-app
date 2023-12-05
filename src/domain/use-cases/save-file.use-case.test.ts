import { SaveFile } from "./save-file.use-case";
import fs from "fs";


describe('SaveFileUseCase', () => {

  const customOptions = {
     fileContent: 'custon content',
     fileDestination: 'custon-outputs/file-destination',
     fileName: ' custon-tabla-name',

     }

  const customfilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    
   test('should save a file with default values', () => {
 
     const saveFile = new SaveFile();
     const filePath = 'outputs/tabla.txt';
     const options = {
         fileContent: 'test content'
     }

      const result = saveFile.execute(options);
     const fileExists = fs.existsSync(filePath); // ojo
     const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
     
     expect(result).toBe(true);
     expect(fileExists).toBe(true);
     expect(fileContent).toBe(options.fileContent);

  });

  test('should save a file with custom values', () => {
 
     const saveFile = new SaveFile();
    
     const result = saveFile.execute(customOptions);
     const fileExists = fs.existsSync(customfilePath);
     const fileContent = fs.readFileSync(customfilePath, { encoding: 'utf-8' });

      expect( result ).toBe( true );
     expect( fileExists ).toBe( true );
     expect( fileContent ).toBe( customOptions.fileContent );
 
 });
 
 test('should return false if directory could not be created', () => {
    
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom message from testing'); }
        );

        const result = saveFile.execute(customOptions);
        
        expect(result).toBe(false);

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {
    
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs,'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });
        
        expect(result).toBe(false);
        
        writeFileSpy.mockRestore();


    });


      
 });

  

