import crypto from 'crypto'

export type PayTRInitParams = {
  merchantOid: string
  email: string
  paymentAmount: number // TL cinsinden, kuruşa dönüştürülecek
  userName: string
  userAddress: string
  userPhone: string
  userIp: string
  basket: { name: string; price: number; count: number }[]
  okUrl: string
  failUrl: string
  callbackUrl: string
  currency?: string
  testMode?: '0' | '1'
  noInstallment?: '0' | '1'
  maxInstallment?: string
}

export async function createPayTRToken(params: PayTRInitParams): Promise<{ token: string; iframeUrl: string }> {
  const merchantId   = process.env.PAYTR_MERCHANT_ID!
  const merchantKey  = process.env.PAYTR_MERCHANT_KEY!
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT!

  const {
    merchantOid, email, paymentAmount, userName,
    userAddress, userPhone, userIp, basket,
    okUrl, failUrl, currency = 'TL',
    testMode = '1', noInstallment = '0', maxInstallment = '0',
  } = params

  const amountKurus = String(Math.round(paymentAmount * 100))

  const userBasket = Buffer.from(
    JSON.stringify(basket.map((b) => [b.name, String(b.price * 100), b.count]))
  ).toString('base64')

  const hashStr = [
    merchantId, userIp, merchantOid, email, amountKurus,
    userBasket, noInstallment, maxInstallment, currency, testMode,
  ].join('')

  const paytrToken = crypto
    .createHmac('sha256', merchantKey)
    .update(hashStr + merchantSalt)
    .digest('base64')

  const body = new URLSearchParams({
    merchant_id:      merchantId,
    user_ip:          userIp,
    merchant_oid:     merchantOid,
    email,
    payment_amount:   amountKurus,
    paytr_token:      paytrToken,
    user_basket:      userBasket,
    debug_on:         '0',
    no_installment:   noInstallment,
    max_installment:  maxInstallment,
    user_name:        userName,
    user_address:     userAddress,
    user_phone:       userPhone,
    merchant_ok_url:  okUrl,
    merchant_fail_url: failUrl,
    timeout_limit:    '30',
    currency,
    test_mode:        testMode,
    lang:             'tr',
  })

  const res = await fetch('https://www.paytr.com/odeme/api/v1', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  const data = await res.json()
  if (data.status !== 'success') throw new Error(data.reason || 'PayTR hata')

  return {
    token: data.token,
    iframeUrl: `https://www.paytr.com/odeme/guvenli/${data.token}`,
  }
}

export function verifyPayTRCallback(
  merchantOid: string,
  status: string,
  totalAmount: string,
  hash: string
): boolean {
  const merchantKey  = process.env.PAYTR_MERCHANT_KEY!
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT!

  const expected = crypto
    .createHmac('sha256', merchantKey)
    .update(merchantOid + merchantSalt + status + totalAmount)
    .digest('base64')

  return expected === hash
}
