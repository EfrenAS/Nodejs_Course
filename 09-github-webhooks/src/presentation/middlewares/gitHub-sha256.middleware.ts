import { NextFunction, Request, Response } from 'express'
import { envs } from '../../config/envs'

export class GitHubSHA256Middleware {
  private static readonly encoder = new TextEncoder()

  static async verifyGitHubSignature (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const xHubSignature = `${req.headers['x-hub-signature-256'] as string}`
    const body = JSON.stringify(req.body)
    const secret = envs.SECRET_TOKEN_WEBHOOK

    const isSignatureValid = await GitHubSHA256Middleware.verifySignature({ secret, header: xHubSignature, payload: body })

    if (!isSignatureValid) {
      res.status(400).send({ errorMessage: 'Invalid signature' })
      return
    }

    next()
  }

  private static async verifySignature ({ secret, header, payload }: { secret: string, header: string, payload: string }): Promise<boolean> {
    try {
      const parts = header.split('=')
      const sigHex = parts[1]

      const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } }

      const keyBytes = GitHubSHA256Middleware.encoder.encode(secret)
      const extractable = false
      const key = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        algorithm,
        extractable,
        ['sign', 'verify']
      )

      const sigBytes = GitHubSHA256Middleware.hexToBytes(sigHex)
      const dataBytes = GitHubSHA256Middleware.encoder.encode(payload)
      const equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes
      )

      return equal
    } catch (error) {
      console.error(error)
      return false
    }
  }

  private static hexToBytes (hex: string): Uint8Array<ArrayBuffer> {
    const len = hex.length / 2
    const bytes = new Uint8Array(len)

    let index = 0
    for (let i = 0; i < hex.length; i += 2) {
      const c = hex.slice(i, i + 2)
      const b = parseInt(c, 16)
      bytes[index] = b
      index += 1
    }

    return bytes
  }
}
