import { Create } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

type Props = {
  signatureID: string
  onSignature?: (adornment: string) => void
}
/**
 *
 * NOTE: This component is purely for demo right now! Still needs to be hooked up
 * to save the signature to the db if we want it. (Using localstore right now)
 *
 */
export const Signature = ({ signatureID, onSignature }: Props) => {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [signed, setSigned] = useState(false) // State to track if the signature has been signed
  const [adornment, setAdornment] = useState<string | null>(null) // State to track if the signature has been signed
  // Function to save the signature
  const saveSignature = (adornment: string) => {
    const signatureImage = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL('image/png')

    const toSave = {
      savedSignature: signatureImage,
      adornment,
    }
    localStorage.setItem(
      'savedSignature:' + signatureID,
      JSON.stringify(toSave)
    )
    setSigned(true)
  }

  const promptAccept = () => {
    const name = prompt('Please print name to accept signature.')
    if (!name || name.length === 0) {
      alert('Please enter a name to sign the document!')
      return
    }
    const adornment = 'Signed by ' + name + ' at ' + new Date().toLocaleString()
    saveSignature(adornment)
    setAdornment(adornment)
    onSignature && onSignature(adornment)
  }

  // Function to load the saved signature
  const loadSignature = () => {
    const { savedSignature, adornment } = JSON.parse(
      localStorage.getItem('savedSignature:' + signatureID) ?? '{}'
    )
    if (savedSignature) {
      console.log('has sig', true, saveSignature, adornment)
      sigCanvas.current?.fromDataURL(savedSignature)
      setSigned(true)
      console.log('adornment', adornment)
      setAdornment(adornment)
      onSignature && onSignature(adornment)
    } else {
      console.log('no sig', false, saveSignature, adornment)

      sigCanvas.current?.on()
    }
  }

  // Function to clear the signature
  const clearSignature = () => {
    localStorage.removeItem('savedSignature:' + signatureID)
    sigCanvas.current?.clear()
    setSigned(false)
    setAdornment(null)
  }

  useEffect(() => {
    loadSignature()
  }, [])

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
