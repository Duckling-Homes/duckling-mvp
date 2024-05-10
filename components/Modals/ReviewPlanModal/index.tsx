import { Signature } from '@/app/project/[id]/presentation/Components/Signature'
import ModelStore from '@/app/stores/modelStore'
import { Download, Print } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

type Props = {
  open: boolean
  onCancel: () => void
  onAccept: () => void
}

export const ReviewPlanModal = observer(
  ({ open, onCancel, onAccept }: Props) => {
    const [mode, setMode] = useState<'documents' | 'signature' | 'finalize'>(
      'documents'
    )

    const documents =
      ModelStore.organization?.documents ??
      // NOTE: Temporary mocks for demo
      [
        {
          name: 'Terms',
          url: 'https://dbiweb02.sfgov.org/Contractor_Agreement_DBI.pdf',
        },
        {
          name: 'Privacy Policy',
          url: 'https://static.googleusercontent.com/media/www.google.com/en//intl/en/policies/privacy/google_privacy_policy_en.pdf',
        },
      ]
        .slice()
        .sort((a, b) => a?.name.localeCompare(b?.name))

    return (
      <Modal open={open} onClose={() => onCancel()} className="createModal">
        <div
          className="createModal__content"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {mode === 'documents' && (
            <ReviewDocumentsView
              documents={documents}
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
)

type ReviewDocumentsViewProps = {
  documents: { name: string; url: string }[]
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
        <div style={{ fontWeight: 'bold' }}> {currentDocument.name}</div>{' '}
      </div>

      <iframe
        src={currentDocument.url}
        style={{ width: '100%', height: 600 }}
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
        Your plan has been approved! You can download a PDF of your proposal now
        or find it later in documents.
      </div>

      <Button
        onClick={() => window.print()}
        style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit' }}
      >
        <span>Print</span> <Print />
      </Button>

      <div className="createModal__footer">
        <Button onClick={onCancel}>Back</Button>
        <Button onClick={onAccept}>Continue</Button>
      </div>
    </>
  )
}
