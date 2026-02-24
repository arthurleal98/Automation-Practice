import * as fs from 'fs';
import * as path from 'path';

export class JsonUtils {
  /**
   * Grava dados em um arquivo JSON.
   * @param data O objeto a ser salvo.
   * @param fileName O nome do arquivo (ex: 'user-data.json').
   */
  static async writeJson(data: any, fileName: string): Promise<void> {
    const outputDir = path.join(__dirname, '../generated-data');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Lê dados de um arquivo JSON.
   * @param fileName O nome do arquivo a ser lido.
   * @returns O objeto parseado ou null se o arquivo não existir.
   */
  static readJson(fileName: string): any {
    const filePath = path.join(__dirname, '../generated-data', fileName);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo não encontrado: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  /**
   * Busca o arquivo JSON mais recente em um diretório baseado no padrão de nome.
   * Útil para recuperar dados do último teste de registro.
   */
  static getLatestJson(prefix: string): any {
    const outputDir = path.join(__dirname, '../generated-data');
    
    if (!fs.existsSync(outputDir)) return null;

    const files = fs.readdirSync(outputDir)
      .filter(file => file.startsWith(prefix) && file.endsWith('.json'))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(outputDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    return files.length > 0 ? this.readJson(files[0].name) : null;
  }
}
