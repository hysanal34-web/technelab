/**
 * POST /api/generate-image
 * Fal.ai ile AI görsel üretimi
 *
 * Body: { prompt: string, width?: number, height?: number }
 * Returns: { imageUrl: string }
 *
 * Kullanım:
 *   const res = await fetch('/api/generate-image', {
 *     method: 'POST',
 *     body: JSON.stringify({ prompt: 'Theatre workshop Istanbul dark dramatic' })
 *   })
 *   const { imageUrl } = await res.json()
 */

export async function POST(req: Request) {
  const FAL_KEY = process.env.FAL_KEY
  if (!FAL_KEY) {
    return Response.json({ error: 'FAL_KEY env değişkeni tanımlı değil' }, { status: 500 })
  }

  let body: { prompt?: string; width?: number; height?: number }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Geçersiz JSON' }, { status: 400 })
  }

  const { prompt, width = 1024, height = 768 } = body
  if (!prompt) {
    return Response.json({ error: 'prompt zorunlu' }, { status: 400 })
  }

  // Techne Lab imzalı prompt prefix — tutarlı estetik için
  const fullPrompt = `${prompt}, black background, dramatic theatrical lighting, cinematic, high contrast, minimalist, editorial photography style`

  try {
    const falRes = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        image_size: { width, height },
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      }),
    })

    if (!falRes.ok) {
      const errText = await falRes.text()
      console.error('Fal.ai hata:', errText)
      return Response.json({ error: 'Fal.ai API hatası', detail: errText }, { status: 502 })
    }

    const data = await falRes.json()
    const imageUrl = data?.images?.[0]?.url

    if (!imageUrl) {
      return Response.json({ error: 'Görsel URL alınamadı' }, { status: 502 })
    }

    return Response.json({ imageUrl, prompt: fullPrompt })
  } catch (err) {
    console.error('Generate image error:', err)
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
