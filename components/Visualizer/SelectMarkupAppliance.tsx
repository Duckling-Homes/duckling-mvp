import { ApplianceMarkupSticker } from '@/types/types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { useState } from 'react'

type ApplianceMapping = {
  [type: string]: {
    [make: string]: {
      [model: string]: {
        [angle: string]: string
      }
    }
  }
}

const nestedApplianceImages: ApplianceMapping = {
  'HVAC - Mini-Split Head': {
    Carrier: {
      Infinity: {
        Front: '/assets/aircon.png',
        Side: '/assets/aircon.png',
      },
    },
    Gree: {
      'CONS[09-18]HP230V1AF': {
        Side: '/assets/Mini-Split Head_Gree_CONS[09-18]HP230V1AF_Side.png',
      },
      '4LIV[07-24]HP230V1AH': {
        Front: '/assets/Mini-Split Head_Gree_4LIV[07-24]HP230V1AH_Front.png',
      },
      'SAP[09-24]HP230V1A': {
        Front: '/assets/Mini-Split Head_Gree_SAP[09-24]HP230V1A_Front.png',
      },
    },
    Mitsubishi: {
      'MSZ-EF Silver': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_Silver_Front.png',
        Side: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_Silver_Side.png',
      },
      'MSZ-EF Black': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_Black_Front.png',
        Side: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_Black_Side.png',
      },
      'MSZ-EF White': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_White_Front.png',
        Side: '/assets/Mini-Split Head_Mitsubishi_MSZ-EF_White_Side.png',
      },
      'MSZ-FS': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-FS_Front.png',
      },
      'MSZ-GS': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-GS_Front.png',
      },
      'MSZ-GL': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MSZ-GL_Front.png',
      },
      'MLZ-KP': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MLZ-KP_Front.png',
      },
      'SLZ-KF': {
        Front:
          '/assets/M_City_Multi_Indoor_Commercial_CeilingCassette_PLFY-P.png',
      },
      'MFZ-KJ': {
        Front: '/assets/Mini-Split Head_Mitsubishi_MFZ-KJ_Front.png',
        Side: '/assets/Mini-Split Head_Mitsubishi_MFZ-KJ_Side.png',
      },
    },
  },
  'HVAC - Air Handler': {
    Mitsubishi: {
      'SVZ-KP': {
        Front: '/assets/M_M-Series_Indoor_Residential_AirHandler_SVZ_front.png',
      },
      'PVA-A42AA7': {
        Front:
          '/assets/M_M-Series_Indoor_Residential_AirHandler_MVZ.20191218174343626.png',
      },
    },
  },
  'HVAC - Condenser': {
    Gree: {
      'MULTIU[18-24]HP230V1DO Ultra': {
        Front: '/assets/Condenser_Gree_MULTIU[18-24]230V1DO Ultra_Front.png',
      },
      'MULTIU[36-42]HP230V1DO Ultra': {
        Front: '/assets/Condenser_Gree_MULTIU[36-42]230V1DO Ultra_Front.png',
      },
      'MULTIU48HP230V1BO Ultra': {
        Side: '/assets/Condenser_Gree_MULTIU48HP230V1BO Ultra_Side.png',
      },
      'MULTI[24-42]HP230V1EO': {
        Front: '/assets/Condenser_Gree_MULTI[24-42]HP230V1EO_Front.png',
      },
      MULTI18HP230V1EO: {
        Front: '/assets/Condenser_Gree_MULTI18HP230V1EO_Front.png',
      },
    },
    Mitsubishi: {
      'MSY-GE24NA': {
        Front: '/assets/condensor.png',
        Side: '/assets/condensor.png',
      },
      'MUZ-FS06NA': {
        Side: '/assets/ME_MUZ-FS06_09_12NA_H.png',
      },
      'MUZ-FS09NA': {
        Side: '/assets/ME_MUZ-FS06_09_12NA_H.png',
      },
      'MUZ-FS12NA': {
        Side: '/assets/ME_MUZ-FS06_09_12NA_H.png',
      },
      'MUZ-FS15NA': {
        Side: '/assets/ME_MUZ-FS15_18NA_H.png',
      },
      'MUZ-FS18NA': {
        Side: '/assets/ME_MUZ-FS15_18NA_H.png',
      },
      'SUZ-KA09NAHZ': {
        Front: '/assets/M_M-Series_Outdoor_H2i_Single_Medium_front.png',
      },
      'SUZ-KA12NAHZ': {
        Front: '/assets/M_M-Series_Outdoor_H2i_Single_Medium_front.png',
      },
      'SUZ-KA15NAHZ': {
        Front: '/assets/M_M-Series_Outdoor_H2i_Single_Medium_front.png',
      },
      'SUZ-KA18NAHZ': {
        Front: '/assets/M_SUZ-KA24_30_36_M-Series_Outdoor_Medium_front.png',
      },
      'SUZ-KA24NAHZ': {
        Front: '/assets/M_SUZ-KA24_30_36_M-Series_Outdoor_Medium_front.png',
      },
      'SUZ-KA30NAHZ': {
        Front: '/assets/SUZ-KA30NAHZ_SUZ-KA36NAHZ.png',
      },
      'SUZ-KA36NAHZ': {
        Front: '/assets/SUZ-KA30NAHZ_SUZ-KA36NAHZ.png',
      },
      'MXZ-SM36NAM': {
        Front: '/assets/ME_SmartMulti-HP.png',
      },
      'MXZ-SM48NAM': {
        Front: '/assets/ME_SmartMulti-HP.png',
      },
      'MXZ-SM60NAM': {
        Front: '/assets/ME_SmartMulti-HP.png',
      },
      'MXZ-SM36NAMHZ': {
        Front: '/assets/ME_SmartMulti-H2i.png',
      },
      'MXZ-SM42NAMHZ': {
        Front: '/assets/ME_SmartMulti-H2i.png',
      },
      'MXZ-SM48NAMHZ': {
        Front: '/assets/ME_SmartMulti-H2i.png',
      },
      'MXZ-2C20NA4': {
        Front: '/assets/ME_MXZ-2C20NA2-U4_Front.png',
      },
      'MXZ-5C42NA4': {
        Front: '/assets/M_M-Series_Outdoor_Multizone_Large_front.png',
      },
      'MXZ-2C20NA3': {
        Front: '/assets/ME_MXZ-2C20NA2-U4_Front.png',
      },
      'MXZ-2C20NA2': {
        Front: '/assets/ME_MXZ-2C20NA2-U4_Front.png',
      },
      'MXZ-3C30NA2': {
        Front: '/assets/ME_MXZ_3C24NA.png',
      },
      'MXZ-8C60NA2': {
        Front:
          '/assets/ME_MXZ-8C48-60NA2_M-Series_Outdoor_Multizone_Medium_front.png',
      },
      'MXZ-3C24NAHZ2': {
        Front: '/assets/M_M-Series_Outdoor_H2i_Multizone_Medium_front.png',
      },
      'MXZ-3C30NAHZ2': {
        Front: '/assets/M_M-Series_Outdoor_H2i_Multizone_Medium_front.png',
      },
      'MXZ-4C36NAHZ2': {
        Front:
          '/assets/ME_MXZ-4C36_5C42_8C48NAHZ2_M-Series_Outdoor_Multizone_Medium_front.png',
      },
      'MXZ-5C42NAHZ2': {
        Front:
          '/assets/ME_MXZ-4C36_5C42_8C48NAHZ2_M-Series_Outdoor_Multizone_Medium_front.png',
      },
      'MXZ-8C48NAHZ2': {
        Front:
          '/assets/ME_MXZ-4C36_5C42_8C48NAHZ2_M-Series_Outdoor_Multizone_Medium_front.png',
      },
      'PUZ-HA42NKA1': {
        Front: '/assets/ME_PUZ-HA30NKA_PUZ-HA36NKA_PUZ-HA42NKA1.png',
      },
    },
  },
}

interface SelectMarkupApplianceProps {
  open: boolean
  onClose: () => void
  addApplianceSticker: (photoUrl: string) => void
}

const SelectMarkupAppliance: React.FC<SelectMarkupApplianceProps> = ({
  open,
  onClose,
  addApplianceSticker,
}) => {
  const [selectedAppliance, setSelectedAppliance] =
    useState<ApplianceMarkupSticker | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleChange =
    (prop: keyof ApplianceMarkupSticker) => (event: SelectChangeEvent) => {
      setSelectedAppliance((prev) => {
        const updatedDetails = { ...prev, [prop]: event.target.value as string }

        if (prop === 'type') {
          updatedDetails.make = ''
          updatedDetails.model = ''
          updatedDetails.angle = ''
          setPreviewImage(null)
        } else if (prop === 'make') {
          updatedDetails.model = ''
          updatedDetails.angle = ''
          setPreviewImage(null)
        } else if (prop === 'model') {
          updatedDetails.angle = ''
          setPreviewImage(null)
        }

        if (
          prop === 'angle' &&
          updatedDetails.type &&
          updatedDetails.make &&
          updatedDetails.model &&
          updatedDetails.angle
        ) {
          const potentialImage =
            nestedApplianceImages[updatedDetails.type][updatedDetails.make][
              updatedDetails.model
            ][updatedDetails.angle]

          if (potentialImage) {
            setPreviewImage(potentialImage)
          }
        }

        return updatedDetails
      })
    }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="form-dialog-title">Select Appliance</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: '600px',
              padding: '20px',
              minWidth: '400px',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                label="Type"
                value={selectedAppliance?.type || ''}
                onChange={handleChange('type')}
              >
                {Object.keys(nestedApplianceImages).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="make-label">Make</InputLabel>
              <Select
                labelId="make-label"
                id="make-select"
                label="Make"
                disabled={!selectedAppliance?.type} // Disable if type is not selected
                value={selectedAppliance?.make || ''}
                onChange={handleChange('make')}
              >
                {selectedAppliance?.type &&
                  Object.keys(
                    nestedApplianceImages[selectedAppliance.type]
                  ).map((make) => (
                    <MenuItem key={make} value={make}>
                      {make}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="model-label">Model</InputLabel>
              <Select
                labelId="model-label"
                id="model-select"
                label="Model"
                disabled={!selectedAppliance?.make} // Disable if make is not selected
                value={selectedAppliance?.model || ''}
                onChange={handleChange('model')}
              >
                {selectedAppliance?.make &&
                  Object.keys(
                    nestedApplianceImages[
                      selectedAppliance.type as keyof typeof nestedApplianceImages
                    ][selectedAppliance.make]
                  ).map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="angle-label">Angle</InputLabel>
              <Select
                labelId="angle-label"
                id="angle-select"
                label="Angle"
                disabled={!selectedAppliance?.model}
                value={selectedAppliance?.angle || ''}
                onChange={handleChange('angle')}
              >
                {selectedAppliance?.model &&
                  Object.keys(
                    nestedApplianceImages[
                      selectedAppliance.type as keyof typeof nestedApplianceImages
                    ][
                      selectedAppliance.make as keyof typeof nestedApplianceImages
                    ][selectedAppliance.model]
                  ).map((angle) => (
                    <MenuItem key={angle} value={angle}>
                      {angle}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {previewImage && (
              <img
                src={previewImage}
                alt="Appliance preview"
                style={{ maxWidth: '100%', marginTop: '16px' }}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (previewImage) {
                addApplianceSticker(previewImage)
              }
              onClose()
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SelectMarkupAppliance
