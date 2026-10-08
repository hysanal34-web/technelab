import { aktifSessions } from './src/app/tanisma-gunu/sessions.ts'
console.log(aktifSessions(new Date('2026-10-08T12:00:00')).filter(s=>s.slug==='broadway-musical-dance').map(s=>s.label))
