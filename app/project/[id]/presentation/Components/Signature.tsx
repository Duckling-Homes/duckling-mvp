import { Create } from '@mui/icons-material'
import { useEffect, useMemo, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export type SignatureObject = {
  signer: string
  date: string
  signatureBase64: string
}

type Props = {
  onSignature?: (signature: SignatureObject) => void
}

export const Signature = ({ onSignature }: Props) => {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [signature, setSignature] = useState<SignatureObject | null>(null)

  const adornment = useMemo(() => {
    return signature?.signer && signature?.date
      ? `Signed by ${signature.signer} at ${signature.date}`
      : null
  }, [signature])

  const signed = useMemo(() => {
    return signature !== null
  }, [signature])

  // Function to save the signature
  const saveSignature = (signer: string, date: string) => {
    const signatureImage = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL('image/png')

    const signature: SignatureObject = {
      signer: signer,
      date: date,
      signatureBase64: signatureImage!,
    }

    onSignature && onSignature(signature)
    setSignature(signature)
  }

  const promptAccept = () => {
    const name = prompt('Please print name to accept signature.')
    if (!name || name.length === 0) {
      alert('Please enter a name to sign the document!')
      return
    }
    saveSignature(name, new Date().toLocaleString())
  }

  // Function to clear the signature
  const clearSignature = () => {
    sigCanvas.current?.clear()
    setSignature(null)
  }

  useEffect(() => {
    if (signed) {
      sigCanvas.current?.off()
    } else {
      sigCanvas.current?.on()
    }
  }, [signed])

  return (
    <div className={`signatureHolder ${signed ? 'signed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Signature</span>
        <Create fontSize="small" style={{ marginLeft: '5px' }} />
      </div>
      {/* Apply 'signed' class when signed */}
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: 'sigCanvas' }}
      />
      <hr />

      <div className="signatureFooter">
        <div className="adornment">{adornment}</div>
        <div className="signatureActions">
          {!signed && (
            <div className="signatureAccept" onClick={promptAccept}>
              Accept
            </div>
          )}
          <div className="signatureClear" onClick={clearSignature}>
            Clear
          </div>
        </div>
      </div>
    </div>
  )
}
