import { Signature } from '@/app/project/[id]/presentation/Components/Signature'
import { Download } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onCancel: () => void
  onAccept: () => void
}

export const ReviewPlanModal = ({ open, onCancel, onAccept }: Props) => {
  const [mode, setMode] = useState<'documents' | 'signature' | 'finalize'>(
    'documents'
  )

  return (
    <Modal open={open} onClose={() => onCancel()} className="createModal">
      <div
        className="createModal__content"
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        {mode === 'documents' && (
          <ReviewDocumentsView
            documents={MockDocuments}
            onAccept={() => setMode('signature')}
            onCancel={() => onCancel()}
          />
        )}

        {mode === 'signature' && (
          <SignatureView
            onCancel={() => setMode('documents')}
            onAccept={() => setMode('finalize')}
          />
        )}

        {mode === 'finalize' && (
          <FinalizeView
            onCancel={() => setMode('signature')}
            onAccept={() => onAccept()}
          />
        )}
      </div>
    </Modal>
  )
}

type ReviewDocumentsViewProps = {
  documents: { title: string; url: string }[]
  onAccept: () => void
  onCancel: () => void
}

const ReviewDocumentsView = ({
  documents,
  onAccept,
  onCancel,
}: ReviewDocumentsViewProps) => {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0)
  const currentDocument = documents[currentDocumentIndex] ?? documents[-1]

  const advanceDocument = () => {
    if (currentDocumentIndex < documents.length - 1) {
      setCurrentDocumentIndex(currentDocumentIndex + 1)
    }
    if (currentDocumentIndex === documents.length - 1) {
      onAccept()
    }
  }

  const backDocument = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex(currentDocumentIndex - 1)
    }
    if (currentDocumentIndex === 0) {
      onCancel()
    }
  }

  return (
    <>
      <div
        className="createModal__header"
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {' '}
        <div
          className="createModal__title"
          style={{ textAlign: 'center', fontSize: 18 }}
        >
          {' '}
          Review Documents ({currentDocumentIndex + 1} of {documents.length}){' '}
        </div>
        <div style={{ fontWeight: 'bold' }}> {currentDocument.title}</div>{' '}
      </div>

      {/* Using iFrames now but should probably switch to using a PDF viewer */}
      <iframe
        src={currentDocument.url}
        style={{ minWidth: '100%', minHeight: 600 }}
      />
      <div
        className="createModal__footer"
        style={{ display: 'flex', justifyContent: 'end', width: '100%' }}
      >
        <Button onClick={backDocument}>Back</Button>
        <Button onClick={advanceDocument}>Continue</Button>
      </div>
    </>
  )
}

const MockDocuments = [
  {
    title: 'Terms & conditions',
    url: 'https://sfgov.org/adultprobation/sites/default/files/P-600%20Contract%20Sample%20post%20on%20website2.pdf',
  },
  {
    title: 'Privacy Policy',
    url: 'https://sfgov.org/adultprobation/sites/default/files/P-600%20Contract%20Sample%20post%20on%20website2.pdf',
  },
]

type SignatureViewProps = {
  onCancel: () => void
  onAccept: () => void
}

const SignatureView = ({ onCancel, onAccept }: SignatureViewProps) => {
  const [continueable, setContinueable] = useState(false)

  return (
    <>
      <div className="createModal__header">
        <div
          className="createModal__title"
          style={{ textAlign: 'center', width: '100%', fontSize: 18 }}
        >
          Sign To Accept
        </div>
      </div>

      <Signature signatureID="MOCK" onSignature={() => setContinueable(true)} />
      <div className="createModal__footer">
        <Button onClick={onCancel}>Back</Button>
        <Button disabled={!continueable} onClick={onAccept}>
          Continue
        </Button>
      </div>
    </>
  )
}

type FinalizeViewProps = {
  onCancel: () => void
  onAccept: () => void
}

const FinalizeView = ({ onCancel, onAccept }: FinalizeViewProps) => {
  return (
    <>
      <div className="createModal__header">
        <div
          className="createModal__title"
          style={{ textAlign: 'center', width: '100%', fontSize: 18 }}
        >
          Plan Approved
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Your plan has been approved! Download a PDF of your proposal now or find
        it later in documents.
      </div>

      <Button
        style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit' }}
      >
        <span>Download PDF</span> <Download />{' '}
      </Button>

      <div className="createModal__footer">
        <Button onClick={onCancel}>Back</Button>
        <Button onClick={onAccept}>Continue</Button>
      </div>
    </>
  )
}
