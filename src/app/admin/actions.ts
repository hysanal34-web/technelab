'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, OTURUM_SURESI, oturumUret, panelKuruluMu } from '@/lib/adminAuth'
import { durumGuncelle, icNotGuncelle, type BasvuruDurum } from '@/lib/basvuruStore'

export type GirisState = { hata?: string }

export async function girisYap(_prev: GirisState, formData: FormData): Promise<GirisState> {
  if (!panelKuruluMu()) {
    return { hata: 'Panel henüz kurulmamış: ADMIN_PASSWORD ortam değişkeni tanımlı değil.' }
  }

  const sifre = ((formData.get('sifre') as string | null) ?? '').trim()
  if (!sifre) return { hata: 'Şifre boş olamaz.' }

  const oturum = await oturumUret(sifre)
  if (!oturum) {
    // Kaba kuvvet denemesini yavaşlatmak için küçük bir gecikme. Tek şifre
    // olduğu için bu ucuz önlem anlamlı: saniyede yüzlerce deneme yapılamıyor.
    await new Promise((r) => setTimeout(r, 600))
    return { hata: 'Şifre hatalı.' }
  }

  const c = await cookies()
  c.set(ADMIN_COOKIE, oturum, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(OTURUM_SURESI / 1000),
  })

  const devam = ((formData.get('devam') as string | null) ?? '').trim()
  // Açık yönlendirme (open redirect) olmasın: yalnız site içi yollar kabul.
  const hedef = devam.startsWith('/admin') && !devam.startsWith('//') ? devam : '/admin'
  redirect(hedef)
}

export async function cikisYap() {
  const c = await cookies()
  c.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

export async function basvuruDurumDegistir(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  const durum = String(formData.get('durum')) as BasvuruDurum
  if (id) await durumGuncelle(id, durum)
}

export async function basvuruNotKaydet(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  const not = String(formData.get('not') ?? '')
  if (id) await icNotGuncelle(id, not)
}
