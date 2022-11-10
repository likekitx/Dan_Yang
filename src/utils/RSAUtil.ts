import { JSEncrypt } from 'jsencrypt'
/**
 * 加密
 * @returns
 * @param dataString
 * @param publicKey
 */
export function encryption (dataString:string,publicKey:string) {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(dataString)
}

// 解密
export function decrypt (dataString:string,privateKey:string) {
    let decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decrypt(dataString)
}