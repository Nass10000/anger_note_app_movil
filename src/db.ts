import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('angertrack.db');

export async function initDB(): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts INTEGER NOT NULL,
      intensity INTEGER NOT NULL
    );
  `);
}

export async function addEntry(intensity: number): Promise<void> {
  const ts = Date.now();
  await db.runAsync(
    'INSERT INTO entries (ts, intensity) VALUES (?, ?)',
    [ts, intensity]
  );
}

function startOfDay(d: Date) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime(); }
function endOfDay(d: Date)   { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime(); }

type TodayStats = { count: number; avg: number };

export async function statsToday(): Promise<TodayStats> {
  const now = new Date();
  const s = startOfDay(now);
  const e = endOfDay(now);
  
  const result = await db.getAllAsync<{ cnt: number; avg: number }>(
    'SELECT COUNT(*) as cnt, AVG(intensity) as avg FROM entries WHERE ts BETWEEN ? AND ?',
    [s, e]
  );
  
  const row = result[0];
  return {
    count: row?.cnt ? Number(row.cnt) : 0,
    avg: row?.avg ? Number(Number(row.avg).toFixed(2)) : 0
  };
}

type MonthAvg = { label: string; avg: number };

function monthRange(year: number, monthIndex: number) {
  const start = new Date(year, monthIndex, 1, 0, 0, 0, 0).getTime();
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999).getTime();
  return { start, end };
}

function monthLabel(year: number, monthIndex: number) {
  const d = new Date(year, monthIndex, 1);
  return d.toLocaleString(undefined, { month: 'short' });
}

async function averageForMonth(year: number, monthIndex: number): Promise<number> {
  const { start, end } = monthRange(year, monthIndex);
  
  const result = await db.getAllAsync<{ avg: number }>(
    'SELECT AVG(intensity) as avg FROM entries WHERE ts BETWEEN ? AND ?',
    [start, end]
  );
  
  const row = result[0];
  return row?.avg ? Number(Number(row.avg).toFixed(2)) : 0;
}

export async function last3MonthsAverages(): Promise<MonthAvg[]> {
  const now = new Date();
  const months: MonthAvg[] = [];
  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const avg = await averageForMonth(d.getFullYear(), d.getMonth());
    months.push({ label: monthLabel(d.getFullYear(), d.getMonth()), avg });
  }
  return months;
}

export async function lastYearAverages(): Promise<MonthAvg[]> {
  const now = new Date();
  const months: MonthAvg[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const avg = await averageForMonth(d.getFullYear(), d.getMonth());
    months.push({ label: monthLabel(d.getFullYear(), d.getMonth()), avg });
  }
  return months;
}

// Nueva función para obtener estadísticas por semestre
type SemesterAvg = { label: string; avg: number };

export async function lastSemestersAverages(): Promise<SemesterAvg[]> {
  const now = new Date();
  const semesters: SemesterAvg[] = [];
  
  // Calculamos los últimos 2 semestres (1 año completo)
  for (let i = 1; i >= 0; i--) {
    const monthsAgo = i * 6;
    let sumAvg = 0;
    let count = 0;
    
    // Sumamos los promedios de 6 meses
    for (let j = 0; j < 6; j++) {
      const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo - j, 1);
      const avg = await averageForMonth(d.getFullYear(), d.getMonth());
      if (avg > 0) {
        sumAvg += avg;
        count++;
      }
    }
    
    const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const year = d.getFullYear();
    const semester = d.getMonth() < 6 ? 1 : 2;
    
    semesters.push({
      label: `S${semester} ${year}`,
      avg: count > 0 ? Number((sumAvg / count).toFixed(2)) : 0
    });
  }
  
  return semesters.reverse();
}

// Nueva función para obtener estadísticas de los últimos 7 días
type DayAvg = { label: string; avg: number };

export async function last7DaysAverages(): Promise<DayAvg[]> {
  const days: DayAvg[] = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const start = startOfDay(date);
    const end = endOfDay(date);
    
    const result = await db.getAllAsync<{ avg: number }>(
      'SELECT AVG(intensity) as avg FROM entries WHERE ts BETWEEN ? AND ?',
      [start, end]
    );
    
    const dayLabel = i === 0 ? 'Hoy' : 
                     i === 1 ? 'Ayer' : 
                     date.toLocaleString('es', { weekday: 'short' });
    
    days.push({
      label: dayLabel,
      avg: result[0]?.avg ? Number(Number(result[0].avg).toFixed(2)) : 0
    });
  }
  
  return days;
}

// Nueva función para obtener estadísticas del último mes (30 días)
export async function last30DaysAverage(): Promise<{ label: string; avg: number }> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const start = startOfDay(thirtyDaysAgo);
  const end = endOfDay(now);
  
  const result = await db.getAllAsync<{ avg: number; cnt: number }>(
    'SELECT AVG(intensity) as avg, COUNT(*) as cnt FROM entries WHERE ts BETWEEN ? AND ?',
    [start, end]
  );
  
  return {
    label: 'Últimos 30 días',
    avg: result[0]?.avg ? Number(Number(result[0].avg).toFixed(2)) : 0
  };
}

// Nueva función para obtener estadísticas de los últimos 6 meses
export async function last6MonthsAverages(): Promise<MonthAvg[]> {
  const now = new Date();
  const months: MonthAvg[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const avg = await averageForMonth(d.getFullYear(), d.getMonth());
    months.push({ label: monthLabel(d.getFullYear(), d.getMonth()), avg });
  }
  
  return months;
}
