import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, DialogActions, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

const EditTextModal: React.FC<{
    open: boolean
    onClose: () => void
    block: {id: string, text: string, color: string}
    setBlockDetails: (blockId: string, text: string, color: string) => void
}> = observer(({ open, onClose, block, setBlockDetails }) => {
    const [textContent, setTextContent] = useState<string>(block.text)
    const [textColor, setTextColor] = useState<string>(block.color)

    useEffect(() => {
        setTextContent(block.text);
        setTextColor(block.color);
    }, [block]);

    const handleUpdateText = () => {
        setBlockDetails(block.id, textContent, textColor)
        onClose()
    }

    const handleTextColorChange = () => {
        const newColor = textColor === "black" ? "white" : "black"
        setTextColor(newColor)
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Text</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Text"
                    type="text"
                    fullWidth
                    value={textContent}
                    onChange={({target}) => {setTextContent(target.value)}}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={textColor === "white"}
                            onChange={handleTextColorChange}
                            name="textColorSelector"
                            color="primary"
                        />
                    }
                    label="Use light text"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateText} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
})

export default EditTextModal;
