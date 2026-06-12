import { Word, WordCategory, Difficulty } from './types';

export const WORD_BANK: Word[] = [
  // ============================================================
  // RHYME FAMILY: -ón
  // ============================================================
  { text: 'corazón', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ón', category: 'cuerpo' },
  { text: 'razón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'canción', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'musica' },
  { text: 'pasión', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'acción', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'nación', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'comun' },
  { text: 'estación', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'tiempo' },
  { text: 'función', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'posición', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'misión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'visión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'ilusión', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'situación', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'tradición', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'revolución', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'perdón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'rincón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'dirección', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'conexión', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'expresión', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'decisión', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'destrucción', syllables: 3, difficulty: 'experto', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'evolución', syllables: 4, difficulty: 'experto', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'inspiración', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'condición', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'atención', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'educación', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'generación', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'intención', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'ambición', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'león', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'campeón', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'urbano' },
  { text: 'prisión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'urbano' },
  { text: 'contradicción', syllables: 4, difficulty: 'experto', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'producción', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'musica' },
  { text: 'salvación', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'emocion' },

  // ============================================================
  // RHYME FAMILY: -ar
  // ============================================================
  { text: 'hablar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'cantar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'luchar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'caminar', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'soñar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'brillar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'volar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'lugar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'comun' },
  { text: 'hogar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'comun' },
  { text: 'pasar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'pensar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'ganar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'crear', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'respirar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'despertar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'demostrar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'gritar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'llorar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'amar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'matar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'olvidar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'encontrar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'escapar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'dominar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'rapear', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'musica' },
  { text: 'improvisar', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ar', category: 'musica' },
  { text: 'superar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'liberar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'levantar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'alcanzar', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'imaginar', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'disparar', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'triunfar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'reinar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'callar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'quemar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'solar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'naturaleza' },
  { text: 'lunar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -er
  // ============================================================
  { text: 'poder', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'abstracto' },
  { text: 'correr', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'saber', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'tener', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'querer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'nacer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'crecer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'caer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'vencer', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'romper', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'perder', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'mujer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'comun' },
  { text: 'placer', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-er', category: 'emocion' },
  { text: 'amanecer', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-er', category: 'tiempo' },
  { text: 'atardecer', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-er', category: 'tiempo' },
  { text: 'reconocer', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'comprender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'responder', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'proteger', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'convencer', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'parecer', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'merecer', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'obedecer', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'pertenecer', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'establecer', syllables: 4, difficulty: 'experto', rhymeEnding: '-er', category: 'verbo' },
  { text: 'deber', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'ayer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'tiempo' },

  // ============================================================
  // RHYME FAMILY: -ir
  // ============================================================
  { text: 'vivir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'sentir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'seguir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'salir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'morir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'decir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'subir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'sufrir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'dormir', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'escribir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'existir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'resistir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'competir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'destruir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'construir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'descubrir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'aplaudir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'combatir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'definir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'sobrevivir', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'predecir', syllables: 3, difficulty: 'experto', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'porvenir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'tiempo' },
  { text: 'latir', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'cuerpo' },
  { text: 'huir', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'hervir', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'compartir', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'insistir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },
  { text: 'transmitir', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ir', category: 'verbo' },

  // ============================================================
  // RHYME FAMILY: -ía
  // ============================================================
  { text: 'día', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ía', category: 'tiempo' },
  { text: 'alegría', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'valentía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'melodía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'musica' },
  { text: 'energía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'poesía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'musica' },
  { text: 'armonía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'musica' },
  { text: 'compañía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'fantasía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'cobardía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'rebeldía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'vida', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ida', category: 'abstracto' },
  { text: 'todavía', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ía', category: 'tiempo' },
  { text: 'sabiduría', syllables: 5, difficulty: 'experto', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'soberanía', syllables: 5, difficulty: 'experto', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'agonía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'emocion' },
  { text: 'ironía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'hipocresía', syllables: 5, difficulty: 'experto', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'garantía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'filosofía', syllables: 5, difficulty: 'experto', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'autonomía', syllables: 5, difficulty: 'experto', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'vía', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ía', category: 'comun' },
  { text: 'mía', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ía', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ado
  // ============================================================
  { text: 'pasado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'tiempo' },
  { text: 'lado', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ado', category: 'comun' },
  { text: 'estado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'abstracto' },
  { text: 'cansado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'soldado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'comun' },
  { text: 'resultado', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'abstracto' },
  { text: 'cuidado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'comun' },
  { text: 'mercado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'urbano' },
  { text: 'sagrado', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'callado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'pesado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'cerrado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'armado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'condenado', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'desesperado', syllables: 5, difficulty: 'experto', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'enamorado', syllables: 5, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'determinado', syllables: 5, difficulty: 'experto', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'olvidado', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'liberado', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'encerrado', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'bendecido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'abrazado', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'acostumbrado', syllables: 5, difficulty: 'experto', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'complicado', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'blindado', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'urbano' },

  // ============================================================
  // RHYME FAMILY: -ido
  // ============================================================
  { text: 'sentido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'abstracto' },
  { text: 'perdido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'sonido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'musica' },
  { text: 'partido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'comun' },
  { text: 'querido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'nacido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'camino', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ino', category: 'comun' },
  { text: 'ruido', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ido', category: 'musica' },
  { text: 'herido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'latido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'cuerpo' },
  { text: 'tejido', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'comun' },
  { text: 'unido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'elegido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'recorrido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'comun' },
  { text: 'conocido', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'agradecido', syllables: 5, difficulty: 'experto', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'prohibido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'temido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'protegido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'contenido', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ido', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ente
  // ============================================================
  { text: 'gente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'comun' },
  { text: 'mente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'cuerpo' },
  { text: 'frente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'cuerpo' },
  { text: 'caliente', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'valiente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'presente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'tiempo' },
  { text: 'diferente', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'ambiente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'comun' },
  { text: 'ardiente', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'corriente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'consciente', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'permanente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'siguiente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'independiente', syllables: 5, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'paciente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'potente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'inocente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'evidente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'contundente', syllables: 4, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'coherente', syllables: 4, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'demente', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'serpiente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'naturaleza' },
  { text: 'pendiente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ento / -iento
  // ============================================================
  { text: 'momento', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ento', category: 'tiempo' },
  { text: 'aliento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'cuerpo' },
  { text: 'sentimiento', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'viento', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ento', category: 'naturaleza' },
  { text: 'talento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'movimiento', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'pensamiento', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'sufrimiento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'conocimiento', syllables: 5, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'crecimiento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'nacimiento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'instrumento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'musica' },
  { text: 'aislamiento', syllables: 4, difficulty: 'experto', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'fundamento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'lamento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'tormento', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'argumento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'juramento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'alimento', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'comun' },
  { text: 'agradecimiento', syllables: 6, difficulty: 'experto', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'entrenamiento', syllables: 5, difficulty: 'experto', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'experimento', syllables: 5, difficulty: 'experto', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'elemento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'complemento', syllables: 4, difficulty: 'experto', rhymeEnding: '-ento', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ero
  // ============================================================
  { text: 'dinero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'guerrero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },
  { text: 'compañero', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },
  { text: 'primero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'sincero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'callejero', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'verdadero', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'entero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'extranjero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },
  { text: 'soltero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'sendero', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'naturaleza' },
  { text: 'certero', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'pasajero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'mensajero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },
  { text: 'rapero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'musica' },
  { text: 'pandillero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'prisionero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'pionero', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },
  { text: 'cero', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ero', category: 'comun' },
  { text: 'acero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },
  { text: 'severo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'vocero', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },
  { text: 'trasero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'cuerpo' },
  { text: 'heredero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ura
  // ============================================================
  { text: 'locura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'emocion' },
  { text: 'aventura', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'altura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'naturaleza' },
  { text: 'cultura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'pintura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'comun' },
  { text: 'criatura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'comun' },
  { text: 'oscura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'adjetivo' },
  { text: 'dura', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ura', category: 'adjetivo' },
  { text: 'pura', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ura', category: 'adjetivo' },
  { text: 'segura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'adjetivo' },
  { text: 'basura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'urbano' },
  { text: 'escritura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'estructura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'apertura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'rotura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'comun' },
  { text: 'amargura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'emocion' },
  { text: 'cordura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'hermosura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'ruptura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'postura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'cuerpo' },
  { text: 'figura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'comun' },
  { text: 'mesura', syllables: 3, difficulty: 'experto', rhymeEnding: '-ura', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -eza
  // ============================================================
  { text: 'belleza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'pobreza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'riqueza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'grandeza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'tristeza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'emocion' },
  { text: 'naturaleza', syllables: 5, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'naturaleza' },
  { text: 'fortaleza', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'certeza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'nobleza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'pureza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'cabeza', syllables: 3, difficulty: 'principiante', rhymeEnding: '-eza', category: 'cuerpo' },
  { text: 'pieza', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eza', category: 'comun' },
  { text: 'torpeza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'firmeza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'pereza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'emocion' },
  { text: 'crueldad', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'dureza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'destreza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'proeza', syllables: 3, difficulty: 'experto', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'vileza', syllables: 3, difficulty: 'experto', rhymeEnding: '-eza', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ancia / -encia
  // ============================================================
  { text: 'distancia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'elegancia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'constancia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'ignorancia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'abundancia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'tolerancia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'importancia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'arrogancia', syllables: 4, difficulty: 'experto', rhymeEnding: '-ancia', category: 'abstracto' },
  { text: 'paciencia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-encia', category: 'emocion' },
  { text: 'presencia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'experiencia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'violencia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-encia', category: 'urbano' },
  { text: 'conciencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'ausencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'emocion' },
  { text: 'existencia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'resistencia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'diferencia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'consecuencia', syllables: 4, difficulty: 'experto', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'frecuencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'musica' },
  { text: 'potencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'cadencia', syllables: 3, difficulty: 'experto', rhymeEnding: '-encia', category: 'musica' },
  { text: 'esencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'elocuencia', syllables: 4, difficulty: 'experto', rhymeEnding: '-encia', category: 'abstracto' },
  { text: 'sentencia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-encia', category: 'urbano' },

  // ============================================================
  // RHYME FAMILY: -oso
  // ============================================================
  { text: 'poderoso', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'hermoso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'furioso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'peligroso', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'valioso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'orgulloso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'misterioso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'ambicioso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'victorioso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'majestuoso', syllables: 4, difficulty: 'experto', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'cauteloso', syllables: 4, difficulty: 'experto', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'luminoso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'nervioso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'ruidoso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'doloroso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'grandioso', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'mentiroso', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'temeroso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'sospechoso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'exitoso', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oso', category: 'adjetivo' },
  { text: 'codicioso', syllables: 4, difficulty: 'experto', rhymeEnding: '-oso', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -able
  // ============================================================
  { text: 'imparable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'notable', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'admirable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'incansable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'indomable', syllables: 4, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'miserable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'vulnerable', syllables: 4, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'inevitable', syllables: 5, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'responsable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'inolvidable', syllables: 5, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'formidable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'inquebrantable', syllables: 5, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'impecable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'incalculable', syllables: 5, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'inigualable', syllables: 5, difficulty: 'experto', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'lamentable', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'agradable', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-able', category: 'adjetivo' },
  { text: 'amable', syllables: 3, difficulty: 'principiante', rhymeEnding: '-able', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -aje
  // ============================================================
  { text: 'viaje', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aje', category: 'comun' },
  { text: 'coraje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'emocion' },
  { text: 'mensaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'comun' },
  { text: 'paisaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'naturaleza' },
  { text: 'lenguaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'personaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'comun' },
  { text: 'salvaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'adjetivo' },
  { text: 'tatuaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'urbano' },
  { text: 'aterrizaje', syllables: 5, difficulty: 'experto', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'aprendizaje', syllables: 5, difficulty: 'experto', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'homenaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'sabotaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'urbano' },
  { text: 'camuflaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'urbano' },
  { text: 'garaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'comun' },
  { text: 'equipaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'comun' },
  { text: 'linaje', syllables: 3, difficulty: 'experto', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'reciclaje', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'comun' },
  { text: 'pasaje', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aje', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -alle / -ella
  // ============================================================
  { text: 'calle', syllables: 2, difficulty: 'principiante', rhymeEnding: '-alle', category: 'urbano' },
  { text: 'batalla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-alla', category: 'comun' },
  { text: 'estrella', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ella', category: 'naturaleza' },
  { text: 'huella', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ella', category: 'comun' },
  { text: 'detalle', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-alle', category: 'comun' },
  { text: 'valle', syllables: 2, difficulty: 'principiante', rhymeEnding: '-alle', category: 'naturaleza' },
  { text: 'talle', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-alle', category: 'cuerpo' },
  { text: 'muralla', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-alla', category: 'comun' },
  { text: 'pantalla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-alla', category: 'comun' },
  { text: 'medalla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-alla', category: 'comun' },
  { text: 'metralla', syllables: 3, difficulty: 'experto', rhymeEnding: '-alla', category: 'urbano' },
  { text: 'botella', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ella', category: 'comun' },
  { text: 'aquella', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ella', category: 'comun' },
  { text: 'centella', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ella', category: 'naturaleza' },
  { text: 'doncella', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ella', category: 'comun' },
  { text: 'destello', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ello', category: 'naturaleza' },
  { text: 'cabello', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ello', category: 'cuerpo' },
  { text: 'sello', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ello', category: 'comun' },
  { text: 'bello', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ello', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ego / -iego
  // ============================================================
  { text: 'fuego', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ego', category: 'naturaleza' },
  { text: 'juego', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ego', category: 'comun' },
  { text: 'ciego', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ego', category: 'adjetivo' },
  { text: 'luego', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ego', category: 'tiempo' },
  { text: 'ruego', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ego', category: 'verbo' },
  { text: 'sosiego', syllables: 3, difficulty: 'experto', rhymeEnding: '-ego', category: 'emocion' },
  { text: 'griego', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ego', category: 'comun' },
  { text: 'riego', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ego', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -elo / -ielo
  // ============================================================
  { text: 'cielo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-elo', category: 'naturaleza' },
  { text: 'vuelo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-elo', category: 'comun' },
  { text: 'suelo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-elo', category: 'comun' },
  { text: 'hielo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-elo', category: 'naturaleza' },
  { text: 'anhelo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-elo', category: 'emocion' },
  { text: 'consuelo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-elo', category: 'emocion' },
  { text: 'desvelo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-elo', category: 'emocion' },
  { text: 'modelo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-elo', category: 'comun' },
  { text: 'pelo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-elo', category: 'cuerpo' },
  { text: 'paralelo', syllables: 4, difficulty: 'experto', rhymeEnding: '-elo', category: 'adjetivo' },
  { text: 'duelo', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-elo', category: 'emocion' },
  { text: 'abuelo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-elo', category: 'comun' },
  { text: 'pañuelo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-elo', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -undo
  // ============================================================
  { text: 'mundo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-undo', category: 'comun' },
  { text: 'profundo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-undo', category: 'adjetivo' },
  { text: 'segundo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-undo', category: 'tiempo' },
  { text: 'inmundo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-undo', category: 'adjetivo' },
  { text: 'vagabundo', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-undo', category: 'urbano' },
  { text: 'moribundo', syllables: 4, difficulty: 'experto', rhymeEnding: '-undo', category: 'adjetivo' },
  { text: 'rotundo', syllables: 3, difficulty: 'experto', rhymeEnding: '-undo', category: 'adjetivo' },
  { text: 'iracundo', syllables: 4, difficulty: 'experto', rhymeEnding: '-undo', category: 'adjetivo' },
  { text: 'fecundo', syllables: 3, difficulty: 'experto', rhymeEnding: '-undo', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ucha / -ucho
  // ============================================================
  { text: 'lucha', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ucha', category: 'comun' },
  { text: 'escucha', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ucha', category: 'verbo' },
  { text: 'mucho', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ucho', category: 'comun' },
  { text: 'macho', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-acho', category: 'urbano' },
  { text: 'muchacho', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-acho', category: 'comun' },
  { text: 'despacho', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-acho', category: 'comun' },
  { text: 'ducha', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ucha', category: 'comun' },
  { text: 'capucha', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ucha', category: 'urbano' },

  // ============================================================
  // RHYME FAMILY: -ida
  // ============================================================
  { text: 'herida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'cuerpo' },
  { text: 'salida', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ida', category: 'comun' },
  { text: 'comida', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ida', category: 'comun' },
  { text: 'caída', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'comun' },
  { text: 'medida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'abstracto' },
  { text: 'partida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'comun' },
  { text: 'perdida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'adjetivo' },
  { text: 'querida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'adjetivo' },
  { text: 'avenida', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ida', category: 'urbano' },
  { text: 'guarida', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ida', category: 'comun' },
  { text: 'despedida', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ida', category: 'emocion' },
  { text: 'acogida', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ida', category: 'emocion' },
  { text: 'huida', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'comun' },
  { text: 'bebida', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ida', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ama / -ame
  // ============================================================
  { text: 'llama', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ama', category: 'naturaleza' },
  { text: 'fama', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ama', category: 'urbano' },
  { text: 'drama', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ama', category: 'abstracto' },
  { text: 'cama', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ama', category: 'comun' },
  { text: 'alma', syllables: 2, difficulty: 'principiante', rhymeEnding: '-alma', category: 'abstracto' },
  { text: 'calma', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-alma', category: 'emocion' },
  { text: 'palma', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-alma', category: 'naturaleza' },
  { text: 'programa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ama', category: 'comun' },
  { text: 'panorama', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ama', category: 'naturaleza' },
  { text: 'trama', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ama', category: 'abstracto' },
  { text: 'rama', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ama', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -oche / -oche
  // ============================================================
  { text: 'noche', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oche', category: 'tiempo' },
  { text: 'coche', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oche', category: 'comun' },
  { text: 'reproche', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oche', category: 'emocion' },
  { text: 'derroche', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oche', category: 'comun' },
  { text: 'broche', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oche', category: 'comun' },
  { text: 'medianoche', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-oche', category: 'tiempo' },

  // ============================================================
  // RHYME FAMILY: -oro / -ora
  // ============================================================
  { text: 'oro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oro', category: 'comun' },
  { text: 'tesoro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oro', category: 'comun' },
  { text: 'lloro', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oro', category: 'emocion' },
  { text: 'toro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oro', category: 'naturaleza' },
  { text: 'coro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oro', category: 'musica' },
  { text: 'decoro', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oro', category: 'abstracto' },
  { text: 'sonoro', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oro', category: 'adjetivo' },
  { text: 'hora', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ora', category: 'tiempo' },
  { text: 'ahora', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ora', category: 'tiempo' },
  { text: 'señora', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ora', category: 'comun' },
  { text: 'demora', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ora', category: 'tiempo' },
  { text: 'aurora', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ora', category: 'naturaleza' },
  { text: 'mejora', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ora', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ino
  // ============================================================
  { text: 'destino', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'abstracto' },
  { text: 'vecino', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ino', category: 'comun' },
  { text: 'divino', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'adjetivo' },
  { text: 'latino', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'urbano' },
  { text: 'asesino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'urbano' },
  { text: 'adrenalina', syllables: 5, difficulty: 'experto', rhymeEnding: '-ina', category: 'cuerpo' },
  { text: 'genuino', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'adjetivo' },
  { text: 'peregrino', syllables: 4, difficulty: 'experto', rhymeEnding: '-ino', category: 'comun' },
  { text: 'clandestino', syllables: 4, difficulty: 'experto', rhymeEnding: '-ino', category: 'urbano' },
  { text: 'torbellino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'naturaleza' },
  { text: 'remolino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'naturaleza' },
  { text: 'masculino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'adjetivo' },
  { text: 'femenino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ero (more) / -era
  // ============================================================
  { text: 'manera', syllables: 3, difficulty: 'principiante', rhymeEnding: '-era', category: 'comun' },
  { text: 'primera', syllables: 3, difficulty: 'principiante', rhymeEnding: '-era', category: 'adjetivo' },
  { text: 'frontera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'comun' },
  { text: 'carretera', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-era', category: 'comun' },
  { text: 'bandera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'comun' },
  { text: 'quimera', syllables: 3, difficulty: 'experto', rhymeEnding: '-era', category: 'abstracto' },
  { text: 'espera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'verbo' },
  { text: 'calavera', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-era', category: 'comun' },
  { text: 'primavera', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-era', category: 'naturaleza' },
  { text: 'cualquiera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'comun' },
  { text: 'trinchera', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-era', category: 'comun' },
  { text: 'cadera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'cuerpo' },
  { text: 'madera', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-era', category: 'naturaleza' },
  { text: 'cabecera', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-era', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -erte / -uerte
  // ============================================================
  { text: 'muerte', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erte', category: 'abstracto' },
  { text: 'suerte', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erte', category: 'abstracto' },
  { text: 'fuerte', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erte', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -erra / -ierra
  // ============================================================
  { text: 'tierra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erra', category: 'naturaleza' },
  { text: 'guerra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erra', category: 'comun' },
  { text: 'sierra', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-erra', category: 'naturaleza' },
  { text: 'encierra', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-erra', category: 'verbo' },
  { text: 'destierro', syllables: 3, difficulty: 'experto', rhymeEnding: '-erro', category: 'abstracto' },
  { text: 'hierro', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-erro', category: 'comun' },
  { text: 'fierro', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-erro', category: 'urbano' },

  // ============================================================
  // RHYME FAMILY: -az / -as
  // ============================================================
  { text: 'paz', syllables: 1, difficulty: 'principiante', rhymeEnding: '-az', category: 'abstracto' },
  { text: 'capaz', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'audaz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'tenaz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'fugaz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'voraz', syllables: 2, difficulty: 'experto', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'eficaz', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'veraz', syllables: 2, difficulty: 'experto', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'sagaz', syllables: 2, difficulty: 'experto', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'perspicaz', syllables: 3, difficulty: 'experto', rhymeEnding: '-az', category: 'adjetivo' },
  { text: 'mordaz', syllables: 2, difficulty: 'experto', rhymeEnding: '-az', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ad
  // ============================================================
  { text: 'verdad', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'ciudad', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ad', category: 'urbano' },
  { text: 'libertad', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'realidad', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'voluntad', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'dignidad', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'soledad', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ad', category: 'emocion' },
  { text: 'humildad', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'identidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'mitad', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ad', category: 'comun' },
  { text: 'necesidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'oscuridad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'adversidad', syllables: 4, difficulty: 'experto', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'eternidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'tiempo' },
  { text: 'maldad', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'lealtad', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'amistad', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ad', category: 'emocion' },
  { text: 'felicidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'emocion' },
  { text: 'autoridad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'intensidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'capacidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'curiosidad', syllables: 5, difficulty: 'experto', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'oportunidad', syllables: 5, difficulty: 'experto', rhymeEnding: '-ad', category: 'abstracto' },
  { text: 'comunidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'comun' },
  { text: 'velocidad', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ad', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -anza
  // ============================================================
  { text: 'esperanza', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-anza', category: 'emocion' },
  { text: 'confianza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-anza', category: 'emocion' },
  { text: 'venganza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'emocion' },
  { text: 'alianza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'abstracto' },
  { text: 'danza', syllables: 2, difficulty: 'principiante', rhymeEnding: '-anza', category: 'musica' },
  { text: 'lanza', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-anza', category: 'comun' },
  { text: 'mudanza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'comun' },
  { text: 'panza', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-anza', category: 'cuerpo' },
  { text: 'enseñanza', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'abstracto' },
  { text: 'bonanza', syllables: 3, difficulty: 'experto', rhymeEnding: '-anza', category: 'abstracto' },
  { text: 'semejanza', syllables: 4, difficulty: 'experto', rhymeEnding: '-anza', category: 'abstracto' },
  { text: 'tardanza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'tiempo' },

  // ============================================================
  // RHYME FAMILY: -ito / -ita
  // ============================================================
  { text: 'grito', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ito', category: 'comun' },
  { text: 'bonito', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ito', category: 'adjetivo' },
  { text: 'maldito', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ito', category: 'adjetivo' },
  { text: 'bendito', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ito', category: 'adjetivo' },
  { text: 'infinito', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ito', category: 'adjetivo' },
  { text: 'distrito', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ito', category: 'urbano' },
  { text: 'escrito', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ito', category: 'comun' },
  { text: 'conflicto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-icto', category: 'abstracto' },
  { text: 'delito', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ito', category: 'urbano' },
  { text: 'favorito', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ito', category: 'adjetivo' },
  { text: 'exquisito', syllables: 4, difficulty: 'experto', rhymeEnding: '-ito', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -osa / -oso (femeninos)
  // ============================================================
  { text: 'cosa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-osa', category: 'comun' },
  { text: 'rosa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-osa', category: 'naturaleza' },
  { text: 'hermosa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-osa', category: 'adjetivo' },
  { text: 'mariposa', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-osa', category: 'naturaleza' },
  { text: 'peligrosa', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-osa', category: 'adjetivo' },
  { text: 'poderosa', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-osa', category: 'adjetivo' },
  { text: 'valiosa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-osa', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ato
  // ============================================================
  { text: 'rato', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ato', category: 'tiempo' },
  { text: 'trato', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ato', category: 'comun' },
  { text: 'gato', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ato', category: 'naturaleza' },
  { text: 'retrato', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ato', category: 'comun' },
  { text: 'arrebato', syllables: 4, difficulty: 'experto', rhymeEnding: '-ato', category: 'emocion' },
  { text: 'barato', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ato', category: 'adjetivo' },
  { text: 'ingrato', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ato', category: 'adjetivo' },
  { text: 'aparato', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ato', category: 'comun' },
  { text: 'relato', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ato', category: 'comun' },
  { text: 'maltrato', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ato', category: 'urbano' },

  // ============================================================
  // RHYME FAMILY: -oche (extra), -ocho
  // ============================================================
  { text: 'ocho', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ocho', category: 'comun' },
  { text: 'bizcocho', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ocho', category: 'comun' },
  { text: 'derecho', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-echo', category: 'abstracto' },
  { text: 'hecho', syllables: 2, difficulty: 'principiante', rhymeEnding: '-echo', category: 'comun' },
  { text: 'pecho', syllables: 2, difficulty: 'principiante', rhymeEnding: '-echo', category: 'cuerpo' },
  { text: 'techo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-echo', category: 'comun' },
  { text: 'provecho', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-echo', category: 'abstracto' },
  { text: 'sospecho', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-echo', category: 'verbo' },
  { text: 'despecho', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-echo', category: 'emocion' },
  { text: 'satisfecho', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-echo', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -oco / -oca
  // ============================================================
  { text: 'poco', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oco', category: 'comun' },
  { text: 'loco', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oco', category: 'adjetivo' },
  { text: 'foco', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oco', category: 'comun' },
  { text: 'toco', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oco', category: 'verbo' },
  { text: 'bloque', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oque', category: 'urbano' },
  { text: 'choque', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oque', category: 'comun' },
  { text: 'enfoque', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oque', category: 'abstracto' },
  { text: 'boca', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oca', category: 'cuerpo' },
  { text: 'roca', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oca', category: 'naturaleza' },
  { text: 'toca', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oca', category: 'verbo' },
  { text: 'provoca', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oca', category: 'verbo' },
  { text: 'loca', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oca', category: 'adjetivo' },
  { text: 'época', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-oca', category: 'tiempo' },

  // ============================================================
  // RHYME FAMILY: -ango / -ango
  // ============================================================
  { text: 'rango', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ango', category: 'comun' },
  { text: 'fango', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ango', category: 'naturaleza' },
  { text: 'tango', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ango', category: 'musica' },
  { text: 'mango', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ango', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -ante
  // ============================================================
  { text: 'delante', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ante', category: 'comun' },
  { text: 'gigante', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'brillante', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'importante', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'instante', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'tiempo' },
  { text: 'constante', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'dominante', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'elegante', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'arrogante', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'adjetivo' },
  { text: 'diamante', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'comun' },
  { text: 'amante', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ante', category: 'comun' },
  { text: 'vigilante', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'comun' },
  { text: 'semblante', syllables: 3, difficulty: 'experto', rhymeEnding: '-ante', category: 'cuerpo' },
  { text: 'militante', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ante', category: 'comun' },
  { text: 'sangre', syllables: 2, difficulty: 'principiante', rhymeEnding: '-angre', category: 'cuerpo' },

  // ============================================================
  // RHYME FAMILY: -aso / -asa
  // ============================================================
  { text: 'paso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aso', category: 'comun' },
  { text: 'caso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aso', category: 'comun' },
  { text: 'abrazo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'emocion' },
  { text: 'fracaso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aso', category: 'abstracto' },
  { text: 'acaso', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aso', category: 'comun' },
  { text: 'payaso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aso', category: 'comun' },
  { text: 'vaso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aso', category: 'comun' },
  { text: 'casa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-asa', category: 'comun' },
  { text: 'masa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-asa', category: 'comun' },
  { text: 'brasa', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-asa', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -azo
  // ============================================================
  { text: 'brazo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-azo', category: 'cuerpo' },
  { text: 'pedazo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'comun' },
  { text: 'rechazo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-azo', category: 'emocion' },
  { text: 'lazo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-azo', category: 'comun' },
  { text: 'reemplazo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-azo', category: 'abstracto' },
  { text: 'espinazo', syllables: 4, difficulty: 'experto', rhymeEnding: '-azo', category: 'cuerpo' },
  { text: 'flechazo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-azo', category: 'emocion' },
  { text: 'portazo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-azo', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ima / -imo
  // ============================================================
  { text: 'rima', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ima', category: 'musica' },
  { text: 'cima', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ima', category: 'naturaleza' },
  { text: 'víctima', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ima', category: 'comun' },
  { text: 'estima', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ima', category: 'emocion' },
  { text: 'lágrima', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ima', category: 'emocion' },
  { text: 'último', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-imo', category: 'adjetivo' },
  { text: 'legítimo', syllables: 4, difficulty: 'experto', rhymeEnding: '-imo', category: 'adjetivo' },
  { text: 'máximo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-imo', category: 'adjetivo' },
  { text: 'íntimo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-imo', category: 'adjetivo' },
  { text: 'ánimo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-imo', category: 'emocion' },
  { text: 'ritmo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-itmo', category: 'musica' },

  // ============================================================
  // RHYME FAMILY: -ojo / -oja
  // ============================================================
  { text: 'ojo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ojo', category: 'cuerpo' },
  { text: 'rojo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ojo', category: 'adjetivo' },
  { text: 'enojo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ojo', category: 'emocion' },
  { text: 'antojo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ojo', category: 'emocion' },
  { text: 'despojo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ojo', category: 'comun' },
  { text: 'cerrojo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ojo', category: 'comun' },
  { text: 'hoja', syllables: 2, difficulty: 'principiante', rhymeEnding: '-oja', category: 'naturaleza' },
  { text: 'congoja', syllables: 3, difficulty: 'experto', rhymeEnding: '-oja', category: 'emocion' },

  // ============================================================
  // URBAN SLANG & RAP CULTURE
  // ============================================================
  { text: 'barrio', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ario', category: 'urbano' },
  { text: 'pana', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ana', category: 'urbano' },
  { text: 'bacano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'urbano' },
  { text: 'parcero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'flow', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ow', category: 'musica' },
  { text: 'freestyle', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ail', category: 'musica' },
  { text: 'micro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-icro', category: 'musica' },
  { text: 'verso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erso', category: 'musica' },
  { text: 'barra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-arra', category: 'musica' },
  { text: 'pista', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ista', category: 'musica' },
  { text: 'beat', syllables: 1, difficulty: 'principiante', rhymeEnding: '-eat', category: 'musica' },
  { text: 'tarima', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ima', category: 'musica' },
  { text: 'ghetto', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-eto', category: 'urbano' },
  { text: 'cuadra', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-adra', category: 'urbano' },
  { text: 'esquina', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'urbano' },
  { text: 'trampa', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ampa', category: 'urbano' },
  { text: 'cana', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ana', category: 'urbano' },
  { text: 'plata', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ata', category: 'urbano' },
  { text: 'combo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ombo', category: 'urbano' },
  { text: 'hambre', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ambre', category: 'emocion' },
  { text: 'parche', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-arche', category: 'urbano' },
  { text: 'respeto', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eto', category: 'abstracto' },
  { text: 'concreto', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eto', category: 'urbano' },
  { text: 'secreto', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eto', category: 'abstracto' },
  { text: 'sujeto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eto', category: 'comun' },
  { text: 'proyecto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eto', category: 'abstracto' },
  { text: 'completo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eto', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ano / -ana
  // ============================================================
  { text: 'mano', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ano', category: 'cuerpo' },
  { text: 'hermano', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ano', category: 'comun' },
  { text: 'humano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'lejano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'temprano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'tiempo' },
  { text: 'urbano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'soberano', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'cotidiano', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'liviano', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'tirano', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ano', category: 'comun' },
  { text: 'arcano', syllables: 3, difficulty: 'experto', rhymeEnding: '-ano', category: 'adjetivo' },
  { text: 'gusano', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ano', category: 'naturaleza' },
  { text: 'verano', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ano', category: 'tiempo' },
  { text: 'mañana', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ana', category: 'tiempo' },
  { text: 'ventana', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ana', category: 'comun' },
  { text: 'semana', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ana', category: 'tiempo' },
  { text: 'campana', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ana', category: 'comun' },
  { text: 'rana', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ana', category: 'naturaleza' },
  { text: 'humana', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ana', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ombre / -ombra
  // ============================================================
  { text: 'hombre', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ombre', category: 'comun' },
  { text: 'nombre', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ombre', category: 'comun' },
  { text: 'costumbre', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-umbre', category: 'abstracto' },
  { text: 'cumbre', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-umbre', category: 'naturaleza' },
  { text: 'incertidumbre', syllables: 4, difficulty: 'experto', rhymeEnding: '-umbre', category: 'emocion' },
  { text: 'muchedumbre', syllables: 4, difficulty: 'experto', rhymeEnding: '-umbre', category: 'comun' },
  { text: 'sombra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ombra', category: 'naturaleza' },
  { text: 'asombra', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ombra', category: 'verbo' },
  { text: 'penumbra', syllables: 3, difficulty: 'experto', rhymeEnding: '-umbra', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -iempo / -empo
  // ============================================================
  { text: 'tiempo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-empo', category: 'tiempo' },
  { text: 'ejemplo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-emplo', category: 'comun' },
  { text: 'templo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-emplo', category: 'comun' },
  { text: 'siempre', syllables: 2, difficulty: 'principiante', rhymeEnding: '-empre', category: 'tiempo' },

  // ============================================================
  // RHYME FAMILY: -uz / -us
  // ============================================================
  { text: 'luz', syllables: 1, difficulty: 'principiante', rhymeEnding: '-uz', category: 'naturaleza' },
  { text: 'cruz', syllables: 1, difficulty: 'principiante', rhymeEnding: '-uz', category: 'comun' },
  { text: 'andaluz', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-uz', category: 'comun' },
  { text: 'capuz', syllables: 2, difficulty: 'experto', rhymeEnding: '-uz', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -aje (extra), -age-style words
  // ============================================================
  { text: 'traje', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aje', category: 'comun' },
  { text: 'blindaje', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'urbano' },
  { text: 'espionaje', syllables: 4, difficulty: 'experto', rhymeEnding: '-aje', category: 'urbano' },
  { text: 'engranaje', syllables: 4, difficulty: 'experto', rhymeEnding: '-aje', category: 'abstracto' },
  { text: 'oleaje', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aje', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -illo / -illa
  // ============================================================
  { text: 'brillo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-illo', category: 'comun' },
  { text: 'cuchillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'comun' },
  { text: 'sencillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'adjetivo' },
  { text: 'castillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'comun' },
  { text: 'anillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'comun' },
  { text: 'martillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'comun' },
  { text: 'estribillo', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-illo', category: 'musica' },
  { text: 'gatillo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-illo', category: 'urbano' },
  { text: 'amarillo', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'adjetivo' },
  { text: 'orilla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illa', category: 'naturaleza' },
  { text: 'semilla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illa', category: 'naturaleza' },
  { text: 'rodilla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illa', category: 'cuerpo' },
  { text: 'pesadilla', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-illa', category: 'emocion' },
  { text: 'maravilla', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-illa', category: 'abstracto' },
  { text: 'pandilla', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illa', category: 'urbano' },
  { text: 'guerrilla', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-illa', category: 'urbano' },
  { text: 'familia', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ilia', category: 'comun' },

  // ============================================================
  // EMOTIONS & FEELINGS
  // ============================================================
  { text: 'miedo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-edo', category: 'emocion' },
  { text: 'odio', syllables: 2, difficulty: 'principiante', rhymeEnding: '-odio', category: 'emocion' },
  { text: 'orgullo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ullo', category: 'emocion' },
  { text: 'amor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'emocion' },
  { text: 'dolor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'emocion' },
  { text: 'temor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'emocion' },
  { text: 'valor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'emocion' },
  { text: 'honor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'abstracto' },
  { text: 'rencor', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-or', category: 'emocion' },
  { text: 'furor', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-or', category: 'emocion' },
  { text: 'calor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'naturaleza' },
  { text: 'sudor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'cuerpo' },
  { text: 'favor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'sabor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'comun' },
  { text: 'interior', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'exterior', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'superior', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'inferior', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'error', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'abstracto' },
  { text: 'terror', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'emocion' },
  { text: 'mejor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'peor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'adjetivo' },
  { text: 'alrededor', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-or', category: 'comun' },
  { text: 'resplandor', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-or', category: 'naturaleza' },
  { text: 'esplendor', syllables: 3, difficulty: 'experto', rhymeEnding: '-or', category: 'abstracto' },
  { text: 'clamor', syllables: 2, difficulty: 'experto', rhymeEnding: '-or', category: 'emocion' },
  { text: 'rumor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'comun' },
  { text: 'tambor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'musica' },
  { text: 'fervor', syllables: 2, difficulty: 'experto', rhymeEnding: '-or', category: 'emocion' },

  // ============================================================
  // BODY & PHYSICAL
  // ============================================================
  { text: 'puño', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-uño', category: 'cuerpo' },
  { text: 'dedo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-edo', category: 'cuerpo' },
  { text: 'hueso', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-eso', category: 'cuerpo' },
  { text: 'peso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eso', category: 'comun' },
  { text: 'beso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eso', category: 'emocion' },
  { text: 'regreso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eso', category: 'comun' },
  { text: 'progreso', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eso', category: 'abstracto' },
  { text: 'exceso', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eso', category: 'abstracto' },
  { text: 'proceso', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eso', category: 'abstracto' },
  { text: 'acceso', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eso', category: 'abstracto' },
  { text: 'piel', syllables: 1, difficulty: 'principiante', rhymeEnding: '-el', category: 'cuerpo' },
  { text: 'papel', syllables: 2, difficulty: 'principiante', rhymeEnding: '-el', category: 'comun' },
  { text: 'nivel', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-el', category: 'abstracto' },
  { text: 'fiel', syllables: 1, difficulty: 'intermedio', rhymeEnding: '-el', category: 'adjetivo' },
  { text: 'cruel', syllables: 1, difficulty: 'intermedio', rhymeEnding: '-el', category: 'adjetivo' },
  { text: 'miel', syllables: 1, difficulty: 'principiante', rhymeEnding: '-el', category: 'naturaleza' },
  { text: 'pastel', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-el', category: 'comun' },

  // ============================================================
  // NATURE & ELEMENTS
  // ============================================================
  { text: 'sol', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ol', category: 'naturaleza' },
  { text: 'mar', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ar', category: 'naturaleza' },
  { text: 'agua', syllables: 2, difficulty: 'principiante', rhymeEnding: '-agua', category: 'naturaleza' },
  { text: 'montaña', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aña', category: 'naturaleza' },
  { text: 'lluvia', syllables: 2, difficulty: 'principiante', rhymeEnding: '-uvia', category: 'naturaleza' },
  { text: 'río', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ío', category: 'naturaleza' },
  { text: 'frío', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ío', category: 'naturaleza' },
  { text: 'vacío', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ío', category: 'adjetivo' },
  { text: 'desafío', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ío', category: 'abstracto' },
  { text: 'desvío', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ío', category: 'comun' },
  { text: 'brío', syllables: 2, difficulty: 'experto', rhymeEnding: '-ío', category: 'emocion' },
  { text: 'albedrío', syllables: 4, difficulty: 'experto', rhymeEnding: '-ío', category: 'abstracto' },
  { text: 'navío', syllables: 3, difficulty: 'experto', rhymeEnding: '-ío', category: 'comun' },
  { text: 'neblina', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'naturaleza' },
  { text: 'ceniza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iza', category: 'naturaleza' },
  { text: 'trueno', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-eno', category: 'naturaleza' },
  { text: 'veneno', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eno', category: 'comun' },
  { text: 'terreno', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eno', category: 'naturaleza' },
  { text: 'lleno', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eno', category: 'adjetivo' },
  { text: 'bueno', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eno', category: 'adjetivo' },
  { text: 'sereno', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eno', category: 'adjetivo' },
  { text: 'pleno', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-eno', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -uerza / -erza
  // ============================================================
  { text: 'fuerza', syllables: 2, difficulty: 'principiante', rhymeEnding: '-erza', category: 'abstracto' },
  { text: 'esfuerzo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-erzo', category: 'abstracto' },
  { text: 'refuerzo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-erzo', category: 'abstracto' },
  { text: 'almuerzo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-erzo', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ista
  // ============================================================
  { text: 'artista', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ista', category: 'musica' },
  { text: 'vista', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ista', category: 'comun' },
  { text: 'lista', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ista', category: 'comun' },
  { text: 'conquista', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'abstracto' },
  { text: 'entrevista', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'comun' },
  { text: 'optimista', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'adjetivo' },
  { text: 'realista', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'adjetivo' },
  { text: 'protagonista', syllables: 5, difficulty: 'experto', rhymeEnding: '-ista', category: 'comun' },
  { text: 'activista', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'comun' },
  { text: 'letrista', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ista', category: 'musica' },
  { text: 'cronista', syllables: 3, difficulty: 'experto', rhymeEnding: '-ista', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ero (professions / identity)
  // ============================================================
  { text: 'obrero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },
  { text: 'cocinero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'comun' },
  { text: 'aventurero', syllables: 5, difficulty: 'experto', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'embustero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'traicionero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'matadero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'bandolero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'urbano' },

  // ============================================================
  // MUSIC & ART
  // ============================================================
  { text: 'compás', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ás', category: 'musica' },
  { text: 'demás', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ás', category: 'comun' },
  { text: 'jamás', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ás', category: 'tiempo' },
  { text: 'quizás', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ás', category: 'comun' },
  { text: 'atrás', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ás', category: 'comun' },
  { text: 'además', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ás', category: 'comun' },
  { text: 'verás', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ás', category: 'verbo' },
  { text: 'más', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ás', category: 'comun' },
  { text: 'escenario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'musica' },
  { text: 'necesario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'ordinario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'contrario', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'solitario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'diario', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ario', category: 'tiempo' },
  { text: 'legendario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'milenario', syllables: 4, difficulty: 'experto', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'revolucionario', syllables: 6, difficulty: 'experto', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'voluntario', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ario', category: 'adjetivo' },
  { text: 'imaginario', syllables: 5, difficulty: 'experto', rhymeEnding: '-ario', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -ue / -ue (short)
  // ============================================================
  { text: 'que', syllables: 1, difficulty: 'principiante', rhymeEnding: '-e', category: 'comun' },
  { text: 'fe', syllables: 1, difficulty: 'principiante', rhymeEnding: '-e', category: 'abstracto' },
  { text: 'porqué', syllables: 2, difficulty: 'principiante', rhymeEnding: '-é', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ema
  // ============================================================
  { text: 'problema', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'sistema', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'tema', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ema', category: 'comun' },
  { text: 'poema', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ema', category: 'musica' },
  { text: 'esquema', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'dilema', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'emblema', syllables: 3, difficulty: 'experto', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'estrategia', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-egia', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ero (more urban/rap)
  // ============================================================
  { text: 'rastrero', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'grosero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'altanero', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ero', category: 'adjetivo' },
  { text: 'letrero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -enta
  // ============================================================
  { text: 'cuenta', syllables: 2, difficulty: 'principiante', rhymeEnding: '-enta', category: 'comun' },
  { text: 'sedienta', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-enta', category: 'adjetivo' },
  { text: 'herramienta', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-enta', category: 'comun' },
  { text: 'violenta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-enta', category: 'adjetivo' },
  { text: 'lenta', syllables: 2, difficulty: 'principiante', rhymeEnding: '-enta', category: 'adjetivo' },
  { text: 'contenta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-enta', category: 'adjetivo' },
  { text: 'atenta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-enta', category: 'adjetivo' },
  { text: 'inventa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-enta', category: 'verbo' },

  // ============================================================
  // ADDITIONAL COMMON WORDS
  // ============================================================
  { text: 'sueño', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eño', category: 'abstracto' },
  { text: 'dueño', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-eño', category: 'comun' },
  { text: 'pequeño', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eño', category: 'adjetivo' },
  { text: 'diseño', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eño', category: 'abstracto' },
  { text: 'empeño', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eño', category: 'abstracto' },
  { text: 'leño', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-eño', category: 'naturaleza' },
  { text: 'isleño', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eño', category: 'comun' },
  { text: 'desempeño', syllables: 4, difficulty: 'experto', rhymeEnding: '-eño', category: 'abstracto' },
  { text: 'risueño', syllables: 3, difficulty: 'experto', rhymeEnding: '-eño', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -aya / -alla
  // ============================================================
  { text: 'playa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aya', category: 'naturaleza' },
  { text: 'raya', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aya', category: 'comun' },
  { text: 'vaya', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aya', category: 'verbo' },
  { text: 'ensaya', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aya', category: 'verbo' },
  { text: 'atalaya', syllables: 4, difficulty: 'experto', rhymeEnding: '-aya', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -asa / -aza
  // ============================================================
  { text: 'amenaza', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-aza', category: 'comun' },
  { text: 'plaza', syllables: 2, difficulty: 'principiante', rhymeEnding: '-aza', category: 'urbano' },
  { text: 'raza', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-aza', category: 'comun' },
  { text: 'coraza', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aza', category: 'comun' },
  { text: 'terraza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aza', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ura (extra)
  // ============================================================
  { text: 'dictadura', syllables: 4, difficulty: 'experto', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'armadura', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'comun' },
  { text: 'sepultura', syllables: 4, difficulty: 'experto', rhymeEnding: '-ura', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -ina
  // ============================================================
  { text: 'ruina', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'comun' },
  { text: 'rutina', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'comun' },
  { text: 'medicina', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'comun' },
  { text: 'disciplina', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'abstracto' },
  { text: 'oficina', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'comun' },
  { text: 'mina', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ina', category: 'comun' },
  { text: 'gasolina', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'comun' },
  { text: 'divina', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'adjetivo' },
  { text: 'cortina', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'comun' },
  { text: 'colina', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ina', category: 'naturaleza' },
  { text: 'vitamina', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ina', category: 'cuerpo' },

  // ============================================================
  // EXTRA VERBS
  // ============================================================
  { text: 'resolver', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'envolver', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'defender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'encender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'sorprender', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'emprender', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },
  { text: 'atender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'entender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'aprender', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'ofender', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-er', category: 'verbo' },

  // ============================================================
  // RHYME FAMILY: -ual / -al
  // ============================================================
  { text: 'final', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'abstracto' },
  { text: 'general', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'mal', syllables: 1, difficulty: 'principiante', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'animal', syllables: 3, difficulty: 'principiante', rhymeEnding: '-al', category: 'naturaleza' },
  { text: 'especial', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'total', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'metal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'musica' },
  { text: 'mortal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'señal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'comun' },
  { text: 'capital', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'urbano' },
  { text: 'material', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-al', category: 'comun' },
  { text: 'original', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'brutal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'criminal', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-al', category: 'urbano' },
  { text: 'inmortal', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'colosal', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'fenomenal', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'celestial', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'sensacional', syllables: 4, difficulty: 'experto', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'fundamental', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'monumental', syllables: 4, difficulty: 'experto', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'ideal', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'rival', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'comun' },
  { text: 'canal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'comun' },
  { text: 'tropical', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-al', category: 'naturaleza' },

  // ============================================================
  // RHYME FAMILY: -ento (additional)
  // ============================================================
  { text: 'cemento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'urbano' },
  { text: 'sacramento', syllables: 4, difficulty: 'experto', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'testamento', syllables: 4, difficulty: 'experto', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'monumento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'comun' },
  { text: 'aumento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'documento', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'comun' },
  { text: 'fragmento', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'comun' },

  // ============================================================
  // RHYME FAMILY: -ogo / -oga
  // ============================================================
  { text: 'diálogo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ogo', category: 'comun' },
  { text: 'prólogo', syllables: 3, difficulty: 'experto', rhymeEnding: '-ogo', category: 'comun' },
  { text: 'monólogo', syllables: 4, difficulty: 'experto', rhymeEnding: '-ogo', category: 'comun' },

  // ============================================================
  // ADDITIONAL DIVERSE WORDS
  // ============================================================
  { text: 'rey', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ey', category: 'comun' },
  { text: 'ley', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ey', category: 'abstracto' },
  { text: 'grey', syllables: 1, difficulty: 'avanzado', rhymeEnding: '-ey', category: 'comun' },
  { text: 'buey', syllables: 1, difficulty: 'intermedio', rhymeEnding: '-ey', category: 'naturaleza' },

  { text: 'voz', syllables: 1, difficulty: 'principiante', rhymeEnding: '-oz', category: 'cuerpo' },
  { text: 'feroz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-oz', category: 'adjetivo' },
  { text: 'veloz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-oz', category: 'adjetivo' },
  { text: 'atroz', syllables: 2, difficulty: 'experto', rhymeEnding: '-oz', category: 'adjetivo' },
  { text: 'precoz', syllables: 2, difficulty: 'experto', rhymeEnding: '-oz', category: 'adjetivo' },

  { text: 'raíz', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-iz', category: 'naturaleza' },
  { text: 'feliz', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iz', category: 'adjetivo' },
  { text: 'cicatriz', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iz', category: 'cuerpo' },
  { text: 'nariz', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iz', category: 'cuerpo' },
  { text: 'matiz', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-iz', category: 'abstracto' },
  { text: 'directriz', syllables: 3, difficulty: 'experto', rhymeEnding: '-iz', category: 'abstracto' },
  { text: 'aprendiz', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iz', category: 'comun' },

  // ============================================================
  // EXTRA EMOTIONS / RAP CONCEPTS
  // ============================================================
  { text: 'rabia', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-abia', category: 'emocion' },
  { text: 'envidia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-idia', category: 'emocion' },
  { text: 'angustia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ustia', category: 'emocion' },
  { text: 'justicia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-icia', category: 'abstracto' },
  { text: 'malicia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-icia', category: 'abstracto' },
  { text: 'codicia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-icia', category: 'emocion' },
  { text: 'noticia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-icia', category: 'comun' },
  { text: 'delicia', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-icia', category: 'emocion' },
  { text: 'injusticia', syllables: 4, difficulty: 'experto', rhymeEnding: '-icia', category: 'abstracto' },

  // ============================================================
  // RHYME FAMILY: -oria / -orio
  // ============================================================
  { text: 'historia', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oria', category: 'abstracto' },
  { text: 'gloria', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oria', category: 'abstracto' },
  { text: 'victoria', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oria', category: 'abstracto' },
  { text: 'memoria', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-oria', category: 'abstracto' },
  { text: 'trayectoria', syllables: 4, difficulty: 'experto', rhymeEnding: '-oria', category: 'abstracto' },
  { text: 'territorio', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-orio', category: 'comun' },
  { text: 'escritorio', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-orio', category: 'comun' },
  { text: 'obligatorio', syllables: 5, difficulty: 'experto', rhymeEnding: '-orio', category: 'adjetivo' },
  { text: 'laboratorio', syllables: 5, difficulty: 'experto', rhymeEnding: '-orio', category: 'comun' },
  { text: 'auditorio', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-orio', category: 'musica' },
  { text: 'notorio', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-orio', category: 'adjetivo' },

  // ============================================================
  // RHYME FAMILY: -iente (same as -ente but diphthong)
  // ============================================================
  { text: 'suficiente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'obediente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'inconsciente', syllables: 4, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'omnipotente', syllables: 5, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'impaciente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'inclemente', syllables: 4, difficulty: 'experto', rhymeEnding: '-ente', category: 'adjetivo' },

  // ============================================================
  // MISCELLANEOUS FREESTYLE WORDS
  // ============================================================
  { text: 'trono', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ono', category: 'comun' },
  { text: 'tono', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ono', category: 'musica' },
  { text: 'abono', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ono', category: 'comun' },
  { text: 'abandono', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ono', category: 'emocion' },
  { text: 'entorno', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-orno', category: 'comun' },
  { text: 'retorno', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-orno', category: 'comun' },
  { text: 'contorno', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-orno', category: 'comun' },
  { text: 'corona', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ona', category: 'comun' },
  { text: 'persona', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ona', category: 'comun' },
  { text: 'zona', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ona', category: 'comun' },
  { text: 'traiciona', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ona', category: 'verbo' },
  { text: 'apasiona', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ona', category: 'verbo' },

  { text: 'respiro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-iro', category: 'cuerpo' },
  { text: 'suspiro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-iro', category: 'emocion' },
  { text: 'retiro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-iro', category: 'comun' },
  { text: 'giro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iro', category: 'comun' },
  { text: 'tiro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iro', category: 'urbano' },
  { text: 'deliro', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iro', category: 'emocion' },

  { text: 'oscuro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-uro', category: 'adjetivo' },
  { text: 'futuro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-uro', category: 'tiempo' },
  { text: 'seguro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-uro', category: 'adjetivo' },
  { text: 'maduro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-uro', category: 'adjetivo' },
  { text: 'puro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-uro', category: 'adjetivo' },
  { text: 'duro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-uro', category: 'adjetivo' },
  { text: 'muro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-uro', category: 'comun' },
  { text: 'conjuro', syllables: 3, difficulty: 'experto', rhymeEnding: '-uro', category: 'abstracto' },
  { text: 'apuro', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-uro', category: 'emocion' },

  { text: 'llanto', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-anto', category: 'emocion' },
  { text: 'canto', syllables: 2, difficulty: 'principiante', rhymeEnding: '-anto', category: 'musica' },
  { text: 'encanto', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-anto', category: 'emocion' },
  { text: 'espanto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-anto', category: 'emocion' },
  { text: 'quebranto', syllables: 3, difficulty: 'experto', rhymeEnding: '-anto', category: 'emocion' },
  { text: 'tanto', syllables: 2, difficulty: 'principiante', rhymeEnding: '-anto', category: 'comun' },
  { text: 'santo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-anto', category: 'comun' },
  { text: 'manto', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-anto', category: 'comun' },

  { text: 'soga', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oga', category: 'comun' },
  { text: 'droga', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-oga', category: 'urbano' },
  { text: 'ropa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-opa', category: 'comun' },
  { text: 'copa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-opa', category: 'comun' },
  { text: 'Europa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-opa', category: 'comun' },

  { text: 'rampa', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ampa', category: 'comun' },
  { text: 'estampa', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ampa', category: 'comun' },

  { text: 'relámpago', syllables: 4, difficulty: 'experto', rhymeEnding: '-ago', category: 'naturaleza' },
  { text: 'estrago', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ago', category: 'abstracto' },
  { text: 'halago', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ago', category: 'emocion' },
  { text: 'presagio', syllables: 3, difficulty: 'experto', rhymeEnding: '-agio', category: 'abstracto' },
  { text: 'naufragio', syllables: 3, difficulty: 'experto', rhymeEnding: '-agio', category: 'naturaleza' },

  { text: 'cifra', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ifra', category: 'abstracto' },
  { text: 'letra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-etra', category: 'musica' },
  { text: 'piedra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-edra', category: 'naturaleza' },
  { text: 'cintura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'cuerpo' },

  // ============================================================
  // EXTRA URBAN / SLANG (Latin American rap)
  // ============================================================
  { text: 'cuero', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'barras', syllables: 2, difficulty: 'principiante', rhymeEnding: '-arra', category: 'musica' },
  { text: 'garra', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-arra', category: 'cuerpo' },
  { text: 'cigarra', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-arra', category: 'naturaleza' },
  { text: 'guitarra', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-arra', category: 'musica' },
  { text: 'amarra', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-arra', category: 'comun' },
  { text: 'hazaña', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aña', category: 'abstracto' },
  { text: 'cabaña', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aña', category: 'comun' },
  { text: 'maña', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-aña', category: 'abstracto' },
  { text: 'araña', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-aña', category: 'naturaleza' },
  { text: 'entraña', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-aña', category: 'cuerpo' },

  { text: 'talón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'cuerpo' },
  { text: 'eslabón', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'comun' },
  { text: 'buzón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'comun' },
  { text: 'cajón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'comun' },
  { text: 'escalón', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ón', category: 'comun' },

  // ============================================================
  // FILL TO HIT 1000+ — assorted high-value freestyle words
  // ============================================================
  { text: 'espejo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ejo', category: 'comun' },
  { text: 'viejo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ejo', category: 'adjetivo' },
  { text: 'consejo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ejo', category: 'comun' },
  { text: 'complejo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ejo', category: 'adjetivo' },
  { text: 'reflejo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ejo', category: 'comun' },
  { text: 'festejo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ejo', category: 'comun' },
  { text: 'parejo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ejo', category: 'adjetivo' },
  { text: 'despejo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ejo', category: 'comun' },

  { text: 'puente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'comun' },
  { text: 'fuente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'naturaleza' },

  { text: 'cadena', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ena', category: 'urbano' },
  { text: 'pena', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ena', category: 'emocion' },
  { text: 'escena', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ena', category: 'musica' },
  { text: 'sirena', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ena', category: 'urbano' },
  { text: 'condena', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ena', category: 'urbano' },
  { text: 'arena', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ena', category: 'naturaleza' },
  { text: 'buena', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ena', category: 'adjetivo' },
  { text: 'llena', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ena', category: 'adjetivo' },
  { text: 'ajena', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ena', category: 'adjetivo' },

  { text: 'centro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-entro', category: 'comun' },
  { text: 'dentro', syllables: 2, difficulty: 'principiante', rhymeEnding: '-entro', category: 'comun' },
  { text: 'encuentro', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-entro', category: 'comun' },
  { text: 'reencuentro', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-entro', category: 'emocion' },

  { text: 'laberinto', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-into', category: 'abstracto' },
  { text: 'instinto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-into', category: 'abstracto' },
  { text: 'distinto', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-into', category: 'adjetivo' },
  { text: 'recinto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-into', category: 'comun' },
  { text: 'extinto', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-into', category: 'adjetivo' },

  { text: 'humo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-umo', category: 'naturaleza' },
  { text: 'consumo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-umo', category: 'abstracto' },
  { text: 'rumbo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-umbo', category: 'comun' },
  { text: 'tumbo', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-umbo', category: 'comun' },
  { text: 'columna', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-umna', category: 'comun' },
  { text: 'tribuna', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-una', category: 'comun' },
  { text: 'fortuna', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-una', category: 'abstracto' },
  { text: 'luna', syllables: 2, difficulty: 'principiante', rhymeEnding: '-una', category: 'naturaleza' },
  { text: 'cuna', syllables: 2, difficulty: 'principiante', rhymeEnding: '-una', category: 'comun' },
  { text: 'ninguna', syllables: 3, difficulty: 'principiante', rhymeEnding: '-una', category: 'comun' },
  { text: 'laguna', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-una', category: 'naturaleza' },
  { text: 'oportuna', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-una', category: 'adjetivo' },
  { text: 'inoportuna', syllables: 5, difficulty: 'experto', rhymeEnding: '-una', category: 'adjetivo' },

  { text: 'triste', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iste', category: 'adjetivo' },
  { text: 'existe', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-iste', category: 'verbo' },
  { text: 'resiste', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-iste', category: 'verbo' },
  { text: 'insiste', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iste', category: 'verbo' },
  { text: 'persiste', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iste', category: 'verbo' },
  { text: 'consiste', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-iste', category: 'verbo' },

  { text: 'profeta', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eta', category: 'comun' },
  { text: 'meta', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eta', category: 'abstracto' },
  { text: 'atleta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eta', category: 'comun' },
  { text: 'poeta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eta', category: 'musica' },
  { text: 'secreta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eta', category: 'adjetivo' },
  { text: 'concreta', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eta', category: 'adjetivo' },
  { text: 'completa', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eta', category: 'adjetivo' },
  { text: 'planeta', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eta', category: 'naturaleza' },
  { text: 'trompeta', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eta', category: 'musica' },
  { text: 'silueta', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-eta', category: 'comun' },

  { text: 'trampolín', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'comun' },
  { text: 'jardín', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ín', category: 'naturaleza' },
  { text: 'fin', syllables: 1, difficulty: 'principiante', rhymeEnding: '-in', category: 'abstracto' },
  { text: 'confín', syllables: 2, difficulty: 'experto', rhymeEnding: '-ín', category: 'abstracto' },
  { text: 'violín', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'musica' },
  { text: 'motín', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'urbano' },
  { text: 'botín', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'urbano' },
  { text: 'festín', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'comun' },
  { text: 'berlín', syllables: 2, difficulty: 'avanzado', rhymeEnding: '-ín', category: 'comun' },
  // ============================================================
  // EXPANSION 2026-06-12 — more variety per family + new families
  // (-or, -al, -ez). Dialect-neutral, no lazy-rhyme suffix traps.
  // ============================================================
  { text: 'balón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'urbano' },
  { text: 'melón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'limón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'botón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'sillón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'ratón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'montón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'telón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'musica' },
  { text: 'dragón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'renglón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'comun' },
  { text: 'emoción', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'reacción', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'presión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'abstracto' },
  { text: 'tensión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'emocion' },
  { text: 'versión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'musica' },
  { text: 'sesión', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'musica' },
  { text: 'pulmón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'cuerpo' },
  { text: 'vagón', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ón', category: 'urbano' },
  { text: 'bailar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'jugar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'saltar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'mirar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'tocar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'llegar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'dejar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'tomar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'sacar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'llamar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'buscar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'mandar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'verbo' },
  { text: 'rimar', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ar', category: 'musica' },
  { text: 'sudar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'cuerpo' },
  { text: 'azar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'abstracto' },
  { text: 'altar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'comun' },
  { text: 'collar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'urbano' },
  { text: 'pilar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'comun' },
  { text: 'radar', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ar', category: 'urbano' },
  { text: 'comer', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'beber', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'vender', syllables: 2, difficulty: 'principiante', rhymeEnding: '-er', category: 'verbo' },
  { text: 'doler', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-er', category: 'emocion' },
  { text: 'valer', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-er', category: 'verbo' },
  { text: 'sombrero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'comun' },
  { text: 'viajero', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'comun' },
  { text: 'delantero', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'vestido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'comun' },
  { text: 'olvido', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'emocion' },
  { text: 'dormido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'escondido', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'encendido', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'aburrido', syllables: 4, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'divertido', syllables: 4, difficulty: 'principiante', rhymeEnding: '-ido', category: 'adjetivo' },
  { text: 'pescado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'naturaleza' },
  { text: 'helado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'comun' },
  { text: 'candado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'comun' },
  { text: 'tejado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'urbano' },
  { text: 'pecado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'abstracto' },
  { text: 'bocado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'comun' },
  { text: 'mojado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'colgado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'dorado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'morado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'salado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'cuadrado', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ado', category: 'comun' },
  { text: 'abogado', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ado', category: 'urbano' },
  { text: 'significado', syllables: 5, difficulty: 'experto', rhymeEnding: '-ado', category: 'abstracto' },
  { text: 'diente', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ente', category: 'cuerpo' },
  { text: 'urgente', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'accidente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'urbano' },
  { text: 'continente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'naturaleza' },
  { text: 'ingrediente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'comun' },
  { text: 'sorprendente', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ente', category: 'adjetivo' },
  { text: 'lejanía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'cercanía', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ía', category: 'abstracto' },
  { text: 'policía', syllables: 4, difficulty: 'principiante', rhymeEnding: '-ía', category: 'urbano' },
  { text: 'rareza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-eza', category: 'abstracto' },
  { text: 'limpieza', syllables: 3, difficulty: 'principiante', rhymeEnding: '-eza', category: 'comun' },
  { text: 'cereza', syllables: 3, difficulty: 'principiante', rhymeEnding: '-eza', category: 'naturaleza' },
  { text: 'plazo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'tiempo' },
  { text: 'trazo', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'comun' },
  { text: 'balazo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'urbano' },
  { text: 'zarpazo', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-azo', category: 'naturaleza' },
  { text: 'vistazo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'comun' },
  { text: 'pelotazo', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-azo', category: 'urbano' },
  { text: 'vino', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ino', category: 'comun' },
  { text: 'pino', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ino', category: 'naturaleza' },
  { text: 'molino', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'comun' },
  { text: 'padrino', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'comun' },
  { text: 'repentino', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ino', category: 'adjetivo' },
  { text: 'campesino', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ino', category: 'comun' },
  { text: 'bolsillo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-illo', category: 'comun' },
  { text: 'pasillo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-illo', category: 'urbano' },
  { text: 'tobillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'cuerpo' },
  { text: 'colmillo', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-illo', category: 'cuerpo' },
  { text: 'dulzura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'emocion' },
  { text: 'ternura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'emocion' },
  { text: 'frescura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'naturaleza' },
  { text: 'llanura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'naturaleza' },
  { text: 'factura', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ura', category: 'comun' },
  { text: 'fractura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'cuerpo' },
  { text: 'censura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'abstracto' },
  { text: 'bravura', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ura', category: 'emocion' },
  { text: 'alabanza', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-anza', category: 'abstracto' },
  { text: 'balanza', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-anza', category: 'comun' },
  { text: 'añoranza', syllables: 4, difficulty: 'experto', rhymeEnding: '-anza', category: 'emocion' },
  { text: 'dama', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ama', category: 'comun' },
  { text: 'melodrama', syllables: 4, difficulty: 'experto', rhymeEnding: '-ama', category: 'musica' },
  { text: 'diagrama', syllables: 4, difficulty: 'avanzado', rhymeEnding: '-ama', category: 'abstracto' },
  { text: 'crema', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ema', category: 'comun' },
  { text: 'teorema', syllables: 4, difficulty: 'experto', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'cuento', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ento', category: 'comun' },
  { text: 'asiento', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ento', category: 'comun' },
  { text: 'intento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'abstracto' },
  { text: 'evento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'comun' },
  { text: 'acento', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'musica' },
  { text: 'apartamento', syllables: 5, difficulty: 'avanzado', rhymeEnding: '-ento', category: 'urbano' },
  { text: 'campamento', syllables: 4, difficulty: 'intermedio', rhymeEnding: '-ento', category: 'comun' },
  { text: 'color', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'olor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'flor', syllables: 1, difficulty: 'principiante', rhymeEnding: '-or', category: 'naturaleza' },
  { text: 'motor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'urbano' },
  { text: 'humor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'emocion' },
  { text: 'horror', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'emocion' },
  { text: 'doctor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'actor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'autor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'musica' },
  { text: 'vapor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'naturaleza' },
  { text: 'traidor', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-or', category: 'urbano' },
  { text: 'vencedor', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-or', category: 'urbano' },
  { text: 'soñador', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-or', category: 'emocion' },
  { text: 'luchador', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-or', category: 'urbano' },
  { text: 'jugador', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-or', category: 'urbano' },
  { text: 'locutor', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-or', category: 'musica' },
  { text: 'hospital', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'urbano' },
  { text: 'cristal', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'comun' },
  { text: 'moral', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'abstracto' },
  { text: 'normal', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'adjetivo' },
  { text: 'legal', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'urbano' },
  { text: 'mental', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'abstracto' },
  { text: 'central', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'urbano' },
  { text: 'natural', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'naturaleza' },
  { text: 'oficial', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-al', category: 'urbano' },
  { text: 'social', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-al', category: 'abstracto' },
  { text: 'musical', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'musica' },
  { text: 'festival', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'musica' },
  { text: 'carnaval', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-al', category: 'musica' },
  { text: 'manantial', syllables: 3, difficulty: 'experto', rhymeEnding: '-al', category: 'naturaleza' },
  { text: 'vejez', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'tiempo' },
  { text: 'niñez', syllables: 2, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'tiempo' },
  { text: 'honradez', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ez', category: 'abstracto' },
  { text: 'rapidez', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'abstracto' },
  { text: 'sencillez', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ez', category: 'abstracto' },
  { text: 'madurez', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ez', category: 'tiempo' },
  { text: 'palidez', syllables: 3, difficulty: 'experto', rhymeEnding: '-ez', category: 'cuerpo' },
  { text: 'timidez', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ez', category: 'emocion' },
  { text: 'fluidez', syllables: 3, difficulty: 'avanzado', rhymeEnding: '-ez', category: 'musica' },
  { text: 'vez', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ez', category: 'tiempo' },
  { text: 'pez', syllables: 1, difficulty: 'principiante', rhymeEnding: '-ez', category: 'naturaleza' },
  { text: 'juez', syllables: 1, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'urbano' },
  { text: 'nuez', syllables: 1, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'naturaleza' },
  { text: 'ajedrez', syllables: 3, difficulty: 'intermedio', rhymeEnding: '-ez', category: 'comun' },
  // ============================================================
  // EXPANSION 2026-06-12b — principiante depth: small families to
  // >=4 words so every scheme (incl. monorrima) has fresh picks.
  // ============================================================
  { text: 'lectura', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ura', category: 'comun' },
  { text: 'trucha', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ucha', category: 'naturaleza' },
  { text: 'carrera', syllables: 3, difficulty: 'principiante', rhymeEnding: '-era', category: 'urbano' },
  { text: 'escalera', syllables: 4, difficulty: 'principiante', rhymeEnding: '-era', category: 'urbano' },
  { text: 'mosquito', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ito', category: 'naturaleza' },
  { text: 'circuito', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ito', category: 'urbano' },
  { text: 'diosa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-osa', category: 'comun' },
  { text: 'famosa', syllables: 3, difficulty: 'principiante', rhymeEnding: '-osa', category: 'adjetivo' },
  { text: 'plato', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ato', category: 'comun' },
  { text: 'pato', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ato', category: 'naturaleza' },
  { text: 'zapato', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ato', category: 'comun' },
  { text: 'grasa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-asa', category: 'comun' },
  { text: 'pasa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-asa', category: 'verbo' },
  { text: 'golazo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-azo', category: 'urbano' },
  { text: 'piojo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ojo', category: 'naturaleza' },
  { text: 'parra', syllables: 2, difficulty: 'principiante', rhymeEnding: '-arra', category: 'naturaleza' },
  { text: 'avestruz', syllables: 3, difficulty: 'principiante', rhymeEnding: '-uz', category: 'naturaleza' },
  { text: 'ruedo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-edo', category: 'urbano' },
  { text: 'queso', syllables: 2, difficulty: 'principiante', rhymeEnding: '-eso', category: 'comun' },
  { text: 'quema', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ema', category: 'verbo' },
  { text: 'lema', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ema', category: 'abstracto' },
  { text: 'tormenta', syllables: 3, difficulty: 'principiante', rhymeEnding: '-enta', category: 'naturaleza' },
  { text: 'lombriz', syllables: 2, difficulty: 'principiante', rhymeEnding: '-iz', category: 'naturaleza' },
  { text: 'sopa', syllables: 2, difficulty: 'principiante', rhymeEnding: '-opa', category: 'comun' },
  { text: 'antena', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ena', category: 'urbano' },
  { text: 'hermana', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ana', category: 'comun' },
  { text: 'manzana', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ana', category: 'naturaleza' },
  { text: 'grano', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ano', category: 'naturaleza' },
  { text: 'piano', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ano', category: 'musica' },
  { text: 'cochino', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ino', category: 'naturaleza' },
  { text: 'casino', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ino', category: 'urbano' },
  { text: 'grillo', syllables: 2, difficulty: 'principiante', rhymeEnding: '-illo', category: 'naturaleza' },
  { text: 'cepillo', syllables: 3, difficulty: 'principiante', rhymeEnding: '-illo', category: 'comun' },
  { text: 'repente', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ente', category: 'tiempo' },
  { text: 'pintado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'ganado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'naturaleza' },
  { text: 'sentado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'parado', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ado', category: 'adjetivo' },
  { text: 'nido', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ido', category: 'naturaleza' },
  { text: 'pedido', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ido', category: 'comun' },
  { text: 'sinfonía', syllables: 4, difficulty: 'principiante', rhymeEnding: '-ía', category: 'musica' },
  { text: 'travesía', syllables: 4, difficulty: 'principiante', rhymeEnding: '-ía', category: 'comun' },
  { text: 'señor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'pintor', syllables: 2, difficulty: 'principiante', rhymeEnding: '-or', category: 'comun' },
  { text: 'corral', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'naturaleza' },
  { text: 'local', syllables: 2, difficulty: 'principiante', rhymeEnding: '-al', category: 'urbano' },
  { text: 'sal', syllables: 1, difficulty: 'principiante', rhymeEnding: '-al', category: 'comun' },
  { text: 'colchón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'tiburón', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ón', category: 'naturaleza' },
  { text: 'salón', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'comun' },
  { text: 'camión', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ón', category: 'urbano' },
  { text: 'bombero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'urbano' },
  { text: 'cartero', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ero', category: 'comun' },
  { text: 'escama', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ama', category: 'naturaleza' },
  { text: 'crianza', syllables: 2, difficulty: 'principiante', rhymeEnding: '-anza', category: 'comun' },
  { text: 'invento', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ento', category: 'comun' },
  { text: 'contento', syllables: 3, difficulty: 'principiante', rhymeEnding: '-ento', category: 'emocion' },
  { text: 'ciento', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ento', category: 'comun' },
  { text: 'tino', syllables: 2, difficulty: 'principiante', rhymeEnding: '-ino', category: 'abstracto' },
];

// ============================================================
// GENERATED WORDS — verb conjugations + suffix forms
// ============================================================
// We programmatically expand the bank using regular Spanish conjugation
// patterns, which adds 1000+ rhyming forms across high-value endings:
//   • -ar verbs    → -ado, -ada, -ando, -aba, -é, -ó
//   • -er/-ir vb   → -ido, -ida, -iendo, -ía, -í, -ió
//   • adjective/n. → -mente, -ísimo, -ito  forms
// This costs ~30KB of source but no extra runtime — it generates once at
// module load. Forms that collide with the hand-curated bank are dropped.

function diffByLen(text: string): Difficulty {
  const n = text.length;
  if (n <= 5) return 'principiante';
  if (n <= 7) return 'intermedio';
  if (n <= 10) return 'avanzado';
  return 'experto';
}

function countSyl(text: string): number {
  const v = text.toLowerCase().match(/[aeiouáéíóúü]+/g);
  return v ? Math.max(1, v.length) : 1;
}

// Stems of regular -ar verbs (no trailing "ar"). All chosen to be regular
// for the forms below — irregulars like "jugar", "soñar", "sentar" excluded.
const AR_STEMS = [
  'am','cant','llev','mir','pens','habl','pas','tom','dej','llam','baill',
  'busc','toc','quit','llor','rez','firm','dur','grit','sac','call','llev',
  'mont','escap','ayud','entrar','olvid','asust','viaj','escuch','trabaj',
  'cre','espera','firm','cobr','gast','pint','disfraz','crem','frenar',
  'chocar','cans','adelant','complet','demostr','desafi','despert','afect',
  'alej','aclar','adopt','agarr','aguant','alegr','amen','anim','anunci',
  'apag','apost','apret','apunt','arregl','arroj','asest','asom','aviv',
  'azot','aterriz','batall','blanqu','bombarde','bostez','brom','brot',
  'burl','cabalg','calcul','calenta','calentar','calm','canjeat','cazar',
  'celebr','cenar','centrar','cerrar','chasque','clasific','clonar','colocar',
  'combatir','comentar','componer','comprar','conectar','confes','confiar',
  'conmemor','conserv','consumir','contagiar','contar','convers','convidar',
  'cooperar','corregir','crit','curar','danzar','decor','demand','derribar',
  'descans','descubr','desear','despeg','destac','detect','dictar','diseñ',
  'disfrut','distrib','divid','divis','divulg','dominar','dop','dur','enamor',
  'encend','enfri','engañ','engord','entusiasm','envenenar','equip','escal',
  'esquiv','establec','estafar','estim','estudi','evapor','evitar','exager',
  'examin','exhort','exhumar','exigir','expandir','exporta','expres','fabric',
  'facilit','fallar','fascina','firmar','fil','filmar','final','fingir','flam',
  'flotar','fluir','formar','forjar','franqu','frecuentar','fregar','frenar',
  'fugar','funcion','garantiz','gast','gener','germinar','gestionar','gobern',
  'graduar','grav','grit','guard','guerre','habitar','hered','hidrat','idolatr',
  'iluminar','imitar','impulsar','inaugur','incit','inclin','indicar','indignar',
  'industri','infect','inform','inhalar','iniciar','injuri','innov','inquiet',
  'inspir','instal','instig','insul','intercept','interrogar','intim','invent',
  'investig','invitar','invocar','jact','jur','justific','juzgar','laborar',
  'lament','lanz','lav','lev','liber','lider','limit','limpi','lisonj',
  'litig','lleg','manch','manej','marc','masc','medit','mejor','memori',
  'menci','merec','mezcl','mim','minim','mol','molest','motiv','mov',
  'multi','mut','naveg','negoci','niv','not','nom','obed','observ','obten',
  'ocup','odi','ofert','olvid','oper','opin','opon','orden','organ','orient',
  'orillarse','oscur','pact','pad','pag','para','parl','particip','partir',
  'pas','pase','pat','peg','pelar','perdon','permit','persuad','pertur',
  'pes','plant','plat','poblar','poses','prac','predic','prepara','present',
  'preserv','presion','preten','preserv','prest','prim','priv','probar',
  'proces','proclam','prol','promov','propon','propul','protest','proven',
  'prov','pud','quej','quem','quer','rad','rapt','razon','realiz','rebot',
  'recit','recom','recon','record','recoger','recor','redoblar','reduc',
  'reflej','reflex','reform','regal','regaña','registrar','regul','reir',
  'rel','rem','remed','remend','remit','remont','rend','renunc','reparar',
  'rep','repon','report','reposar','reprobar','repuls','requerir','respald',
  'respir','respond','restaurar','result','resum','retir','retor','retr',
  'reun','revel','revers','revis','rid','riñ','rob','rod','rog','romper',
  'ron','sabor','sacrific','sal','salvar','sangrar','satisfacer','secret',
  'seducir','segregar','selecc','semb','sent','separa','servir','silbar',
  'simul','sirv','sobr','solu','soport','sospech','sostener','soñar','suav',
  'subir','subray','sucumb','sufrir','sugerir','sumar','superar','suplic',
  'suprim','susp','sutil','tacha','taladr','talv','tej','telef','tem','tend',
  'tens','tent','term','test','tira','tit','toc','tom','tort','toser','tradu',
  'traer','traf','tramita','transcurr','transferir','transform','transmit',
  'transport','trasl','tratar','trazar','trep','trian','tritur','triunfar',
  'trocar','trovar','trun','tutel','ubic','ufan','un','unific','unir',
  'usar','utiliz','vac','vacil','vag','val','vari','veg','venc','venerar',
  'venir','ven','verguenza','verificar','vers','vestir','viaj','vibrar',
  'vict','vol','vot','vulner','yacer','yantar','zambull','zarpar','zur',
];

// Common -er and -ir verb stems (without trailing -er / -ir)
const ER_IR_STEMS = [
  'beb','com','corr','vend','aprend','pad','met','perd','romp','sub',
  'viv','part','sub','sufr','recib','escrib','abr','cubr','descub','prefer',
  'pers','elig','ley','tem','mov','prend','responde','depend','suspend',
  'cre','cae','tra','prom','recog','cog','huy','constru','extend','prend',
  'arrep','asum','atend','tend','vend','fund','mord','encend','suced',
  'concurr','aplaud','transcurri','asisti','consist','desis','exist','insist',
  'persist','resist','subsist','conv','herv','interv','prev','rev','sirv',
  'segu','cons','dispon','retr','sostengo','urd','engull','conduc','traduc',
  'reduc','induc','seduc','produc','introduc','deduc','obstrui','destrui','disminu',
  'recurr','ocurr','transcurr','incumb','distribu','transgredi','contraven',
];

const RAP_NOUNS_GENERATED: { ending: string; words: string[]; cat: WordCategory }[] = [
  // Common rap-friendly extra entries — short bursts per family
  { ending: '-eo', cat: 'musica', words: ['flow','toreo','rodeo','espejo','correo','recreo','ateo','afeo','manejo','consejo','reflejo','feo'] },
  { ending: '-elo', cat: 'comun', words: ['cielo','suelo','abuelo','vuelo','duelo','anhelo','pañuelo','consuelo','desvelo','recelo'] },
  { ending: '-eta', cat: 'comun', words: ['meta','poeta','silueta','etiqueta','receta','dieta','careta','peseta','maleta','escopeta'] },
  { ending: '-ote', cat: 'urbano', words: ['cogote','azote','bigote','garrote','escote','rebote','bote','golote','soporte','machote'] },
  { ending: '-aña', cat: 'comun', words: ['hazaña','montaña','cabaña','telaraña','España','araña','maraña','caña','ñoña','pestaña'] },
  { ending: '-iza', cat: 'urbano', words: ['paliza','ceniza','nodriza','triza','riza','hechiza','realiza','idealiza','desliza','aliza'] },
  { ending: '-orro', cat: 'urbano', words: ['borro','chorro','gorro','morro','porro','socorro','zorro','cigarrillo','cogote','peñasco'] },
  { ending: '-uta', cat: 'comun', words: ['ruta','disputa','bruta','escruta','minuta','permuta','recluta','tributa','astuta','enjuta'] },
  { ending: '-ico', cat: 'comun', words: ['mágico','romántico','frenético','plástico','clásico','crítico','físico','público','único','típico','cómico','lógico'] },
  { ending: '-aco', cat: 'urbano', words: ['flaco','chaco','tabaco','sobaco','saco','banco','vinagre','franco','tacaño','rasco'] },
  { ending: '-imo', cat: 'comun', words: ['último','íntimo','mínimo','máximo','óptimo','décimo','víctima','víbora','pésimo','agrícola'] },
];

(function expandWordBank() {
  const have = new Set(WORD_BANK.map((w) => w.text.toLowerCase()));
  const push = (w: Word) => {
    if (!have.has(w.text.toLowerCase())) {
      WORD_BANK.push(w);
      have.add(w.text.toLowerCase());
    }
  };

  // ── -AR verb forms ─────────────────────────────────────────────
  for (const raw of AR_STEMS) {
    const stem = raw.replace(/[^a-záéíóúüñ]/gi, '').toLowerCase();
    if (!stem) continue;
    const forms: { suf: string; end: string; cat: WordCategory }[] = [
      { suf: 'ado', end: '-ado', cat: 'verbo' },
      { suf: 'ada', end: '-ada', cat: 'verbo' },
      { suf: 'ando', end: '-ando', cat: 'verbo' },
      { suf: 'aba', end: '-aba', cat: 'verbo' },
    ];
    for (const f of forms) {
      const text = stem + f.suf;
      push({
        text,
        syllables: countSyl(text),
        difficulty: diffByLen(text),
        rhymeEnding: f.end,
        category: f.cat,
      });
    }
  }

  // ── -ER / -IR verb forms ───────────────────────────────────────
  for (const raw of ER_IR_STEMS) {
    const stem = raw.replace(/[^a-záéíóúüñ]/gi, '').toLowerCase();
    if (!stem) continue;
    const forms: { suf: string; end: string; cat: WordCategory }[] = [
      { suf: 'ido', end: '-ido', cat: 'verbo' },
      { suf: 'ida', end: '-ida', cat: 'verbo' },
      { suf: 'iendo', end: '-iendo', cat: 'verbo' },
      { suf: 'ía', end: '-ía', cat: 'verbo' },
    ];
    for (const f of forms) {
      const text = stem + f.suf;
      push({
        text,
        syllables: countSyl(text),
        difficulty: diffByLen(text),
        rhymeEnding: f.end,
        category: f.cat,
      });
    }
  }

  // ── Extra hand-curated noun/adjective groups ───────────────────
  for (const block of RAP_NOUNS_GENERATED) {
    for (const text of block.words) {
      push({
        text,
        syllables: countSyl(text),
        difficulty: diffByLen(text),
        rhymeEnding: block.ending,
        category: block.cat,
      });
    }
  }
})();

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Groups words by their rhyme ending.
 * Returns a Map where keys are rhyme endings and values are arrays of matching words.
 */
export function getRhymeGroups(words: Word[]): Map<string, Word[]> {
  const groups = new Map<string, Word[]>();
  words.forEach(w => {
    const existing = groups.get(w.rhymeEnding) || [];
    existing.push(w);
    groups.set(w.rhymeEnding, existing);
  });
  return groups;
}

/**
 * Returns all words at or below the given difficulty level.
 * 'principiante' returns only principiante words.
 * 'experto' returns all words.
 */
export function getWordsByDifficulty(difficulty: Difficulty): Word[] {
  const levels: Difficulty[] = ['principiante', 'intermedio', 'avanzado', 'experto'];
  const maxLevel = levels.indexOf(difficulty);
  return WORD_BANK.filter(w => levels.indexOf(w.difficulty) <= maxLevel);
}
