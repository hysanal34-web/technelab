import { aktifSessions } from './src/app/tanisma-gunu/sessions.ts'
for (const d of ['2026-10-08T10:00:00','2026-10-11T10:00:00','2026-10-20T19:00:00']) console.log(d, aktifSessions(new Date(d)).filter(s=>s.slug==='techne-musical-lab').map(s=>s.label))
